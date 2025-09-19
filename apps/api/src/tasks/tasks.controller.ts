import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '@prisma/client';

@ApiTags('tasks')
@Controller('tasks')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova tarefa' })
  @ApiResponse({
    status: 201,
    description: 'Tarefa criada com sucesso',
    type: TaskEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Token inválido',
  })
  create(@Body() createTaskDto: CreateTaskDto, @CurrentUser() user: User) {
    return this.tasksService.create(createTaskDto, user);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar tarefas',
    description:
      'Usuários comuns veem apenas suas tarefas. Admins veem todas as tarefas.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de tarefas',
    type: [TaskEntity],
  })
  @ApiResponse({
    status: 401,
    description: 'Token inválido',
  })
  findAll(@CurrentUser() user: User) {
    return this.tasksService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter tarefa por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID da tarefa',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Tarefa encontrada',
    type: TaskEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Token inválido',
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso negado a esta tarefa',
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
    return this.tasksService.findOne(id, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar tarefa' })
  @ApiParam({
    name: 'id',
    description: 'ID da tarefa',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Tarefa atualizada com sucesso',
    type: TaskEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Token inválido',
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso negado para atualizar esta tarefa',
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @CurrentUser() user: User,
  ) {
    return this.tasksService.update(id, updateTaskDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar tarefa' })
  @ApiParam({
    name: 'id',
    description: 'ID da tarefa',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Tarefa deletada com sucesso',
  })
  @ApiResponse({
    status: 401,
    description: 'Token inválido',
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso negado para deletar esta tarefa',
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada',
  })
  remove(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
    return this.tasksService.remove(id, user);
  }
}
