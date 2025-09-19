'use client';

import { LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from './button';
import { ThemeToggle } from './theme-toggle';

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block">Tasks Pro</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Espaço para busca futura */}
          </div>
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            {user && (
              <>
                <div className="flex items-center space-x-2 text-sm">
                  <User className="h-4 w-4" />
                  <span>{user.email}</span>
                  {user.role === 'ADMIN' && (
                    <span className="rounded bg-primary px-2 py-1 text-xs text-primary-foreground">
                      Admin
                    </span>
                  )}
                </div>
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                  Sair
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </nav>
  );
}
