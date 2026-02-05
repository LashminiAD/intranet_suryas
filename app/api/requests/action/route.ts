import { NextRequest, NextResponse } from 'next/server';
import { getRequestById, updateRequestStatus } from '@/lib/request-store';

const isIntern = (designation?: string) =>
  !!designation && designation.toLowerCase().includes('intern');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, requestId } = body as { action: 'approve' | 'reject' | 'sign'; requestId: string };

    if (!action || !requestId) {
      return NextResponse.json({ error: 'Missing action or requestId' }, { status: 400 });
    }

    const current = getRequestById(requestId);
    if (!current) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    if (action === 'approve') {
      const updated = updateRequestStatus(requestId, 'approved');
      return NextResponse.json({ success: true, request: updated });
    }

    if (action === 'reject') {
      const updated = updateRequestStatus(requestId, 'rejected');
      return NextResponse.json({ success: true, request: updated });
    }

    if (action === 'sign') {
      const forwardedTo = isIntern(current.createdByDesignation) ? 'Harish – Admin Login' : 'Admin';
      const updated = updateRequestStatus(requestId, 'forwarded', {
        target: 'admin',
        forwardedTo,
      });
      return NextResponse.json({ success: true, request: updated, forwardedTo });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Request action error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
