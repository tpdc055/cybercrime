import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const workflows = [
    {
      id: '1',
      name: 'Fraud Investigation Workflow',
      category: 'CASE_MANAGEMENT',
      status: 'RUNNING',
      description: 'Automated fraud case processing workflow',
      createdAt: new Date().toISOString(),
    }
  ];
  
  return NextResponse.json({ workflows });
}
