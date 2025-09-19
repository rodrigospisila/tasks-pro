import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, user: User) {
    return this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        ownerId: user.id,
      },
    });
  }

  async findAll(user: User) {
    // Admins podem ver todas as tarefas, usuários comuns apenas as suas
    if (user.role === 'ADMIN') {
      return this.prisma.task.findMany({
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
    }

    return this.prisma.task.findMany({
      where: {
        ownerId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string, user: User) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    // Verificar se o usuário tem permissão para ver a tarefa
    if (user.role !== 'ADMIN' && task.ownerId !== user.id) {
      throw new ForbiddenException('Acesso negado a esta tarefa');
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, user: User) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    // Verificar se o usuário tem permissão para atualizar a tarefa
    if (user.role !== 'ADMIN' && task.ownerId !== user.id) {
      throw new ForbiddenException('Acesso negado para atualizar esta tarefa');
    }

    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async remove(id: string, user: User) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    // Verificar se o usuário tem permissão para deletar a tarefa
    if (user.role !== 'ADMIN' && task.ownerId !== user.id) {
      throw new ForbiddenException('Acesso negado para deletar esta tarefa');
    }

    return this.prisma.task.delete({
      where: { id },
    });
  }
}
