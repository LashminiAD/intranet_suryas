// Simple in-memory user storage (can be replaced with PostgreSQL)
// For production, use a real database

interface StoredUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'user' | 'guest';
  fullName: string;
  profilePhoto?: string;
  profilePictureUploaded?: boolean;
  designation?: string;
  createdAt: string;
}

// In-memory database (in production, use PostgreSQL)
let users: StoredUser[] = [
  {
    id: 'admin-001',
    username: 'admin@suryas.com',
    email: 'admin@suryas.com',
    passwordHash: '$2a$10$k1jKgHnKPx6V7CL0R4Q/Hu4v4KQKQKQKQKQKQKQKQKQKQKQKQKQKe', // hashed 'Admin@123'
    role: 'admin',
    fullName: 'Admin User',
    designation: 'Administrator',
    profilePictureUploaded: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user-001',
    username: 'lash',
    email: 'lash@example.com',
    passwordHash: '$2a$10$k1jKgHnKPx6V7CL0R4Q/Hu4v4KQKQKQKQKQKQKQKQKQKQKQKQKQKe', // hashed 'lash@123'
    role: 'user',
    fullName: 'Lashmini',
    profilePictureUploaded: false,
    createdAt: new Date().toISOString(),
  },
];

export function findUserByUsername(username: string): StoredUser | undefined {
  return users.find((u) => u.username === username || u.email === username);
}

export function addUser(user: StoredUser): StoredUser {
  users.push(user);
  return user;
}

export function getAllUsers(): StoredUser[] {
  return users;
}

export function updateUser(username: string, updates: Partial<StoredUser>): StoredUser | undefined {
  const index = users.findIndex((u) => u.username === username);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    return users[index];
  }
  return undefined;
}
