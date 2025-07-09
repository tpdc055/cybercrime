import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const threats = [
    {
      id: '1',
      threat_type: 'MALWARE',
      severity: 'HIGH',
      title: 'New Banking Trojan Campaign',
      description: 'Banking trojan targeting PNG financial institutions',
      confidence: 0.92,
      isActive: true,
      createdAt: new Date().toISOString(),
    }
  ];
  
  return NextResponse.json({ threats });
}
