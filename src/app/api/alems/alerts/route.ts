import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Mock ALEMS alerts data
    const alerts = [
      {
        id: '1',
        alertType: 'FRAUD_DETECTED',
        severity: 'HIGH',
        title: 'Suspicious Transaction Pattern Detected',
        description: 'AI fraud detection model identified unusual transaction pattern matching known fraud schemes',
        source: 'AI Fraud Detection System',
        isRead: false,
        isResolved: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        alertType: 'THREAT_INTELLIGENCE',
        severity: 'CRITICAL',
        title: 'New APT Campaign Detected',
        description: 'Threat intelligence indicates new advanced persistent threat targeting financial institutions',
        source: 'Threat Intelligence Feed',
        isRead: false,
        isResolved: false,
        createdAt: new Date().toISOString(),
      }
    ];

    return NextResponse.json({ alerts, total: alerts.length });
  } catch (error) {
    console.error('Error fetching ALEMS alerts:', error);
    return NextResponse.json({ error: 'Failed to fetch alerts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Mock alert creation
    const newAlert = {
      id: Math.random().toString(36).substr(2, 9),
      ...body,
      createdAt: new Date().toISOString(),
      isRead: false,
      isResolved: false,
    };

    return NextResponse.json({ alert: newAlert }, { status: 201 });
  } catch (error) {
    console.error('Error creating ALEMS alert:', error);
    return NextResponse.json({ error: 'Failed to create alert' }, { status: 500 });
  }
}
EOF  
cd /home/project && cd cybercrime-repo/src/app/api/alems/alerts && cat > route.ts << 'EOF'
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Mock ALEMS alerts data
    const alerts = [
      {
        id: '1',
        alertType: 'FRAUD_DETECTED',
        severity: 'HIGH',
        title: 'Suspicious Transaction Pattern Detected',
        description: 'AI fraud detection model identified unusual transaction pattern matching known fraud schemes',
        source: 'AI Fraud Detection System',
        isRead: false,
        isResolved: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        alertType: 'THREAT_INTELLIGENCE',
        severity: 'CRITICAL',
        title: 'New APT Campaign Detected',
        description: 'Threat intelligence indicates new advanced persistent threat targeting financial institutions',
        source: 'Threat Intelligence Feed',
        isRead: false,
        isResolved: false,
        createdAt: new Date().toISOString(),
      }
    ];

    return NextResponse.json({ alerts, total: alerts.length });
  } catch (error) {
    console.error('Error fetching ALEMS alerts:', error);
    return NextResponse.json({ error: 'Failed to fetch alerts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Mock alert creation
    const newAlert = {
      id: Math.random().toString(36).substr(2, 9),
      ...body,
      createdAt: new Date().toISOString(),
      isRead: false,
      isResolved: false,
    };

    return NextResponse.json({ alert: newAlert }, { status: 201 });
  } catch (error) {
    console.error('Error creating ALEMS alert:', error);
    return NextResponse.json({ error: 'Failed to create alert' }, { status: 500 });
  }
}
