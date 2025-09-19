'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Filter } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { tasksApi } from '@/lib/api';
import { Task } from '@/types';
import { Navbar } from '@/components/ui/navbar';
import { Button } from '@/components/ui/button';
import { TaskItem } from '@/components/ui/task-item';
import { TaskForm } from '@/components/forms/task-form';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  const loadTasks = async () => {
    try {
      const data = await tasksApi.getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (data: { title: string }) => {
    await tasksApi.createTask(data);
    await loadTasks();
    setShowForm(false);
  };

  const handleUpdateTask = async (data: { title: string }) => {
    if (editingTask) {
      await tasksApi.updateTask(editingTask.id, data);
      await loadTasks();
      setEditingTask(null);
    }
  };

  const handleToggleTask = async (id: string, done: boolean) => {
    await tasksApi.updateTask(id, { done });
    await loadTasks();
  };

  const handleDeleteTask = async (id: string) => {
    if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
      await tasksApi.deleteTask(id);
      await loadTasks();
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'pending') return !task.done;
    if (filter === 'completed') return task.done;
    return true;
  });

  if (authLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Minhas Tarefas</h1>
            <p className="text-muted-foreground">
              {user.role === 'ADMIN' ? 'Visualizando todas as tarefas' : 'Gerencie suas tarefas'}
            </p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Tarefa
          </Button>
        </div>

        <div className="flex items-center space-x-2 mb-6">
          <Filter className="h-4 w-4" />
          <div className="flex space-x-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              Todas ({tasks.length})
            </Button>
            <Button
              variant={filter === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('pending')}
            >
              Pendentes ({tasks.filter(t => !t.done).length})
            </Button>
            <Button
              variant={filter === 'completed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('completed')}
            >
              Concluídas ({tasks.filter(t => t.done).length})
            </Button>
          </div>
        </div>

        {(showForm || editingTask) && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <TaskForm
              task={editingTask || undefined}
              onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
              onCancel={() => {
                setShowForm(false);
                setEditingTask(null);
              }}
            />
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando tarefas...</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              {filter === 'all' 
                ? 'Nenhuma tarefa encontrada'
                : filter === 'pending'
                ? 'Nenhuma tarefa pendente'
                : 'Nenhuma tarefa concluída'
              }
            </p>
            {filter === 'all' && (
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Criar primeira tarefa
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggleTask}
                onEdit={setEditingTask}
                onDelete={handleDeleteTask}
                showOwner={user.role === 'ADMIN'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
