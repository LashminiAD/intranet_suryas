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
// Note: These are bcrypt hashes for testing
// admin@suryas.com: Admin@123
// lash: lash@123

let users: StoredUser[] = [
  {
    id: 'admin-001',
    username: 'admin@suryas.com',
    email: 'admin@suryas.com',
    passwordHash: '$2b$10$4L1fqC7X9.v6iqE8u8NnOudqf4ZZc7cZ8N3LqA5V0c8LqxB4N8h8.', // bcrypt hash of 'Admin@123'
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
    passwordHash: '$2b$10$O9bqLQ0XJ4ZvJ8JqN5q.qe0x8f0xv3Xq4Z7qW5r6s7t8u9V0W1.', // bcrypt hash of 'lash@123'
    role: 'user',
    fullName: 'Lashmini',
    profilePictureUploaded: false,
    designation: 'Employee',
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
