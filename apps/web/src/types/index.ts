export interface User {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

export interface Task {
  id: string;
  title: string;
  done: boolean;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  owner?: {
    id: string;
    email: string;
    role: string;
  };
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
}

export interface CreateTaskData {
  title: string;
}

export interface UpdateTaskData {
  title?: string;
  done?: boolean;
}
