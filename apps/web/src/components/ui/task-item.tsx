'use client';

import { useState } from 'react';
import { Check, Edit2, Trash2, User } from 'lucide-react';
import { Task } from '@/types';
import { formatDate } from '@/lib/utils';
import { Button } from './button';
import { Card, CardContent } from './card';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, done: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  showOwner?: boolean;
}

export function TaskItem({ task, onToggle, onEdit, onDelete, showOwner }: TaskItemProps) {
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async () => {
    setIsToggling(true);
    try {
      await onToggle(task.id, !task.done);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <Card className={`transition-all hover:shadow-md ${task.done ? 'opacity-75' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <Button
              variant="outline"
              size="icon"
              onClick={handleToggle}
              disabled={isToggling}
              className={`h-8 w-8 ${task.done ? 'bg-primary text-primary-foreground' : ''}`}
            >
              {task.done && <Check className="h-4 w-4" />}
            </Button>
            
            <div className="flex-1 min-w-0">
              <h3 className={`font-medium ${task.done ? 'line-through text-muted-foreground' : ''}`}>
                {task.title}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                <span>{formatDate(task.createdAt)}</span>
                {showOwner && task.owner && (
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>{task.owner.email}</span>
                    {task.owner.role === 'ADMIN' && (
                      <span className="rounded bg-primary px-1 py-0.5 text-xs text-primary-foreground">
                        Admin
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(task)}
              className="h-8 w-8"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(task.id)}
              className="h-8 w-8 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
