import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { findUserByUsername, updateUser } from '@/lib/user-database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { currentUsername, updates } = body as {
      currentUsername: string;
      updates: {
        username?: string;
        email?: string;
        fullName?: string;
        phone?: string;
        designation?: string;
        profilePhoto?: string;
        profilePictureUploaded?: boolean;
        password?: string;
      };
    };

    if (!currentUsername || !updates) {
      return NextResponse.json({ error: 'Missing update payload' }, { status: 400 });
    }

    const currentUser = findUserByUsername(currentUsername);
    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (updates.username && updates.username !== currentUser.username) {
      const existing = findUserByUsername(updates.username);
      if (existing) {
        return NextResponse.json({ error: 'Username already exists' }, { status: 409 });
      }
    }

    const updatePayload: any = { ...updates };

    if (updates.password) {
      updatePayload.passwordHash = await bcrypt.hash(updates.password, 10);
      delete updatePayload.password;
    }

    const updatedUser = updateUser(currentUsername, updatePayload);

    if (!updatedUser) {
      return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }

    const { passwordHash, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
