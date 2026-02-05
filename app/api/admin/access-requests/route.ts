import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import {
  getPendingUsers,
  approveUser,
  denyUser,
  isUsernameTaken,
} from '@/lib/user-database';

const ACCESS_APPROVER_EMAIL = 'administrator@suryas.in';

const normalizeBaseUsername = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '.');

const buildAvailableUsername = (fullName: string) => {
  const base = normalizeBaseUsername(fullName) || 'user';
  if (!isUsernameTaken(base)) {
    return base;
  }
  let counter = 1;
  let candidate = `${base}${counter}`;
  while (isUsernameTaken(candidate)) {
    counter += 1;
    candidate = `${base}${counter}`;
  }
  return candidate;
};

const buildDefaultPassword = (fullName: string) => {
  const firstName = fullName.trim().split(/\s+/)[0] || 'User';
  return `${firstName}@123`;
};

export async function GET() {
  const pending = getPendingUsers().map((user) => ({
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    requestedAt: user.requestedAt || user.createdAt,
  }));

  return NextResponse.json({
    success: true,
    approver: ACCESS_APPROVER_EMAIL,
    requests: pending,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, userId } = body;

    if (!action || !userId) {
      return NextResponse.json(
        { error: 'Action and userId are required' },
        { status: 400 }
      );
    }

    if (action === 'deny') {
      const removed = denyUser(userId);
      if (!removed) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true });
    }

    if (action === 'approve') {
      const pending = getPendingUsers().find((u) => u.id === userId);
      if (!pending) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      const username = buildAvailableUsername(pending.fullName || pending.email);
      const password = buildDefaultPassword(pending.fullName || 'User');
      const passwordHash = await bcrypt.hash(password, 10);

      const updated = approveUser(userId, username, passwordHash);
      if (!updated) {
        return NextResponse.json({ error: 'Unable to approve user' }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        approver: ACCESS_APPROVER_EMAIL,
        credentials: {
          username,
          password,
          email: updated.email,
          fullName: updated.fullName,
        },
      });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Access request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
