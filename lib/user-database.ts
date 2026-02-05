// Simple in-memory user storage (can be replaced with PostgreSQL)
// For production, use a real database

interface StoredUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'user' | 'guest' | 'founder';
  fullName: string;
  phone?: string;
  profilePhoto?: string;
  profilePictureUploaded?: boolean;
  designation?: string;
  status?: 'pending' | 'active' | 'denied';
  requestedAt?: string;
  approvedAt?: string;
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
    passwordHash: '$2b$10$9c0854Bl7jRNuzJPsMEziOzIQ3Mw4iULIW8ql6ErBGne1my5IwzeW', // bcrypt hash of 'Admin@123'
    role: 'admin',
    fullName: 'Admin User',
    designation: 'Administrator',
    profilePictureUploaded: true,
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'founder-001',
    username: 'GollaKumar',
    email: 'proprietor@suryas.in',
    passwordHash: '$2b$10$Hhn4OO4pSRjdatwdam0sLeQR.Q9.XpA0C8dH7BohUbJ0vLSoXrMwe',
    role: 'founder',
    fullName: 'Golla Kumar Bharath',
    designation: 'Founder',
    profilePictureUploaded: true,
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'admin-002',
    username: 'JayendranM',
    email: 'administrator@suryas.in',
    passwordHash: '$2b$10$oDV1ytaHja0s8m99I8IL7uO5kDSJpBvos4vleZSPMQUMEusx91YyS',
    role: 'admin',
    fullName: 'Jayendra M',
    designation: 'Administrator',
    profilePictureUploaded: true,
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user-001',
    username: 'lash',
    email: 'lash@example.com',
    passwordHash: '$2b$10$DDmcqgg0ZyRC8Q9RHom3B.waYCgzIFqGRi/u9/Apo.ota6rhwLnuS', // bcrypt hash of 'lash@123'
    role: 'user',
    fullName: 'Lashmini',
    profilePictureUploaded: false,
    designation: 'Employee',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user-002',
    username: 'hareesh',
    email: 'hareesh@suryas.in',
    passwordHash: '$2b$10$lrUMdDaiocF683vZgrPikOT7ucILBjJ26hv6ai0sk51M5RyaSPB.O', // bcrypt hash of 'hareesh@123'
    role: 'user',
    fullName: 'Hareesh',
    profilePictureUploaded: false,
    designation: 'Technical Team',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user-003',
    username: 'SanthanaKumar',
    email: 'santhana@suryas.in',
    passwordHash: '$2b$10$ShL20DIS/JFjb7avMWa0zetnpg.xLoaFSaWYWINxYX.KfmW/av0zO', // bcrypt hash of 'santhaK@123'
    role: 'user',
    fullName: 'Santhana Kumar',
    profilePictureUploaded: false,
    designation: 'Technical Team Head',
    status: 'active',
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

export function getPendingUsers(): StoredUser[] {
  return users.filter((u) => u.status === 'pending');
}

export function isUsernameTaken(username: string): boolean {
  return !!findUserByUsername(username);
}

export function approveUser(userId: string, username: string, passwordHash: string): StoredUser | undefined {
  const index = users.findIndex((u) => u.id === userId);
  if (index !== -1) {
    users[index] = {
      ...users[index],
      username,
      passwordHash,
      status: 'active',
      approvedAt: new Date().toISOString(),
    };
    return users[index];
  }
  return undefined;
}

export function denyUser(userId: string): boolean {
  const initial = users.length;
  users = users.filter((u) => u.id !== userId);
  return users.length !== initial;
}

export function updateUser(username: string, updates: Partial<StoredUser>): StoredUser | undefined {
  const index = users.findIndex((u) => u.username === username);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    return users[index];
  }
  return undefined;
}
