import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for notifications (replace with database in production)
let notifications: any[] = [];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const targetUser = searchParams.get('targetUser');

    let filtered = notifications;
    if (targetUser) {
      filtered = notifications.filter(
        (n) => !n.targetUser || n.targetUser === targetUser || n.targetUser === 'all'
      );
    }

    return NextResponse.json({ notifications: filtered });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, title, message, targetUser, relatedId } = body;

    const notification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      title,
      message,
      targetUser: targetUser || 'all',
      relatedId,
      timestamp: new Date().toISOString(),
      read: false,
    };

    notifications.unshift(notification);

    // Keep only last 100 notifications
    if (notifications.length > 100) {
      notifications = notifications.slice(0, 100);
    }

    return NextResponse.json({ success: true, notification });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create notification' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { notificationId, markAllAsRead } = body;

    if (markAllAsRead) {
      notifications = notifications.map((n) => ({ ...n, read: true }));
      return NextResponse.json({ success: true });
    }

    const index = notifications.findIndex((n) => n.id === notificationId);
    if (index !== -1) {
      notifications[index].read = true;
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update notification' }, { status: 500 });
  }
}
