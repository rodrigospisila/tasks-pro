import { ApiProperty } from '@nestjs/swagger';

export class TaskEntity {
  @ApiProperty({
    description: 'ID único da tarefa',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Título da tarefa',
    example: 'Implementar autenticação',
  })
  title: string;

  @ApiProperty({
    description: 'Status de conclusão da tarefa',
    example: false,
  })
  done: boolean;

  @ApiProperty({
    description: 'ID do proprietário da tarefa',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  ownerId: string;

  @ApiProperty({
    description: 'Data de criação da tarefa',
    example: '2023-12-01T10:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de última atualização da tarefa',
    example: '2023-12-01T10:00:00.000Z',
  })
  updatedAt: Date;
}
