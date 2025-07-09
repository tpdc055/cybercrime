import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const messages = [
    {
      id: '1',
      fromAgency: 'PNG Police Cyber Crime Unit',
      toAgency: 'Bank of PNG',
      subject: 'Fraud Investigation Assistance',
      messageType: 'REQUEST_ASSISTANCE',
      priority: 'HIGH',
      status: 'SENT',
      sentAt: new Date().toISOString(),
    }
  ];
  
  return NextResponse.json({ messages });
}
