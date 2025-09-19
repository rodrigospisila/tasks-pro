'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { LoginForm } from '@/components/forms/login-form';
import { RegisterForm } from '@/components/forms/register-form';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push('/tasks');
    }
  }, [user, loading, router]);

  const handleSuccess = () => {
    router.push('/tasks');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Tasks Pro</h1>
            <p className="text-muted-foreground mt-2">
              Gerenciador de tarefas moderno e eficiente
            </p>
          </div>

          {isRegister ? (
            <RegisterForm onSuccess={handleSuccess} />
          ) : (
            <LoginForm onSuccess={handleSuccess} />
          )}

          <div className="text-center">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-sm text-primary hover:underline"
            >
              {isRegister
                ? 'Já tem uma conta? Faça login'
                : 'Não tem uma conta? Registre-se'}
            </button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Contas de teste:</p>
            <p>Admin: admin@tasks-pro.com / admin123</p>
            <p>User: user@tasks-pro.com / user123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
