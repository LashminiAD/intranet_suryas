import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { findUserByUsername, addUser } from '@/lib/user-database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, password, fullName, role = 'user', designation = '' } = body;

    // Validate inputs
    if (!username || !email || !password || !fullName) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    if (findUserByUsername(username)) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    const isPrivileged = role === 'admin' || role === 'founder';

    // Create new user
    const newUser = {
      id: `user-${Date.now()}`,
      username,
      email,
      passwordHash,
      role: role as 'admin' | 'user' | 'guest' | 'founder',
      fullName,
      designation: designation || 'User',
      profilePictureUploaded: false,
      status: isPrivileged ? 'active' : 'pending',
      requestedAt: isPrivileged ? undefined : new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    const savedUser = addUser(newUser);

    // Return user data (without password hash)
    const { passwordHash: _, ...userWithoutPassword } = savedUser;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      message: isPrivileged
        ? 'User registered successfully'
        : 'Access request submitted for admin approval',
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
