import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const fraudDetections = [
    {
      id: '1',
      riskScore: 0.85,
      detectionType: 'PAYMENT_FRAUD',
      description: 'Unusual payment pattern detected',
      status: 'UNDER_REVIEW',
      isVerified: false,
      detectedAt: new Date().toISOString(),
    }
  ];
  
  return NextResponse.json({ detections: fraudDetections });
}
