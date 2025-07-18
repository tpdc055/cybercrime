import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Simulate AI fraud detection results
    const fraudAlerts = [
      {
        id: "FRD-2024-8901",
        type: "account_takeover",
        severity: "high",
        confidence: 94.7,
        targetAccount: "user_8472",
        detectedAt: new Date().toISOString(),
        indicators: [
          "Unusual login location",
          "Multiple failed password attempts",
          "Device fingerprint mismatch"
        ],
        riskScore: 8.7,
        actionTaken: "Account temporarily locked",
        investigationStatus: "active"
      },
      {
        id: "FRD-2024-8902",
        type: "transaction_fraud",
        severity: "critical",
        confidence: 97.3,
        targetAccount: "merchant_4521",
        detectedAt: new Date(Date.now() - 1800000).toISOString(),
        indicators: [
          "Velocity anomaly detected",
          "Payment pattern deviation",
          "High-risk merchant category"
        ],
        riskScore: 9.3,
        actionTaken: "Transaction blocked",
        investigationStatus: "escalated"
      },
      {
        id: "FRD-2024-8903",
        type: "synthetic_identity",
        severity: "medium",
        confidence: 87.1,
        targetAccount: "applicant_7832",
        detectedAt: new Date(Date.now() - 3600000).toISOString(),
        indicators: [
          "Identity verification inconsistencies",
          "Credit file thin/new",
          "Address verification failed"
        ],
        riskScore: 7.1,
        actionTaken: "Manual review required",
        investigationStatus: "pending"
      }
    ];

    return NextResponse.json({
      success: true,
      data: {
        alerts: fraudAlerts,
        totalAlerts: fraudAlerts.length,
        highRiskCount: fraudAlerts.filter(a => a.severity === 'high' || a.severity === 'critical').length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Fraud detection API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch fraud detection data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { transactionId, accountId, amount, merchant } = body;

    // Simulate real-time fraud analysis
    const riskScore = Math.random() * 10;
    const confidence = 85 + Math.random() * 15;

    const fraudResult = {
      transactionId,
      accountId,
      riskScore: parseFloat(riskScore.toFixed(1)),
      confidence: parseFloat(confidence.toFixed(1)),
      decision: riskScore > 7 ? 'block' : riskScore > 5 ? 'review' : 'approve',
      riskFactors: riskScore > 5 ? [
        'Unusual transaction amount',
        'Off-hours activity',
        'New merchant'
      ] : ['Normal transaction pattern'],
      timestamp: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: fraudResult
    });
  } catch (error) {
    console.error('Fraud analysis error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to analyze transaction' },
      { status: 500 }
    );
  }
}
