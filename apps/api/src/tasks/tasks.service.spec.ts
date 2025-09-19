import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { Role } from '@prisma/client';

describe('TasksService', () => {
  let service: TasksService;
  let prismaService: PrismaService;

  const mockUser = {
    id: 'user-1',
    email: 'user@test.com',
    password: 'hashedpassword',
    role: Role.USER,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockAdmin = {
    id: 'admin-1',
    email: 'admin@test.com',
    password: 'hashedpassword',
    role: Role.ADMIN,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockTask = {
    id: 'task-1',
    title: 'Test Task',
    done: false,
    ownerId: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    task: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', async () => {
      const createTaskDto = { title: 'New Task' };
      mockPrismaService.task.create.mockResolvedValue(mockTask);

      const result = await service.create(createTaskDto, mockUser);

      expect(mockPrismaService.task.create).toHaveBeenCalledWith({
        data: {
          title: createTaskDto.title,
          ownerId: mockUser.id,
        },
      });
      expect(result).toEqual(mockTask);
    });
  });

  describe('findAll', () => {
    it('should return all tasks for admin', async () => {
      const tasks = [mockTask];
      mockPrismaService.task.findMany.mockResolvedValue(tasks);

      const result = await service.findAll(mockAdmin);

      expect(mockPrismaService.task.findMany).toHaveBeenCalledWith({
        include: {
          owner: {
            select: {
              id: true,
              email: true,
              role: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      expect(result).toEqual(tasks);
    });

    it('should return only user tasks for regular user', async () => {
      const tasks = [mockTask];
      mockPrismaService.task.findMany.mockResolvedValue(tasks);

      const result = await service.findAll(mockUser);

      expect(mockPrismaService.task.findMany).toHaveBeenCalledWith({
        where: {
          ownerId: mockUser.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      expect(result).toEqual(tasks);
    });
  });

  describe('findOne', () => {
    it('should return a task for the owner', async () => {
      mockPrismaService.task.findUnique.mockResolvedValue(mockTask);

      const result = await service.findOne('task-1', mockUser);

      expect(result).toEqual(mockTask);
    });

    it('should throw NotFoundException if task not found', async () => {
      mockPrismaService.task.findUnique.mockResolvedValue(null);

      await expect(service.findOne('task-1', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ForbiddenException if user is not owner and not admin', async () => {
      const otherUserTask = { ...mockTask, ownerId: 'other-user' };
      mockPrismaService.task.findUnique.mockResolvedValue(otherUserTask);

      await expect(service.findOne('task-1', mockUser)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('update', () => {
    it('should update a task for the owner', async () => {
      const updateTaskDto = { title: 'Updated Task' };
      mockPrismaService.task.findUnique.mockResolvedValue(mockTask);
      mockPrismaService.task.update.mockResolvedValue({
        ...mockTask,
        ...updateTaskDto,
      });

      const result = await service.update('task-1', updateTaskDto, mockUser);

      expect(mockPrismaService.task.update).toHaveBeenCalledWith({
        where: { id: 'task-1' },
        data: updateTaskDto,
      });
      expect(result.title).toBe(updateTaskDto.title);
    });

    it('should throw NotFoundException if task not found', async () => {
      mockPrismaService.task.findUnique.mockResolvedValue(null);

      await expect(
        service.update('task-1', { title: 'Updated' }, mockUser),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a task for the owner', async () => {
      mockPrismaService.task.findUnique.mockResolvedValue(mockTask);
      mockPrismaService.task.delete.mockResolvedValue(mockTask);

      const result = await service.remove('task-1', mockUser);

      expect(mockPrismaService.task.delete).toHaveBeenCalledWith({
        where: { id: 'task-1' },
      });
      expect(result).toEqual(mockTask);
    });

    it('should throw NotFoundException if task not found', async () => {
      mockPrismaService.task.findUnique.mockResolvedValue(null);

      await expect(service.remove('task-1', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
