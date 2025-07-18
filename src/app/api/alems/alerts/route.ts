import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Simulate ALEMS system alerts
    const alerts = [
      {
        id: "ALERT-2024-3401",
        type: "threat_intelligence",
        severity: "critical",
        title: "Advanced Persistent Threat Detected",
        description: "Sophisticated malware campaign targeting financial institutions identified in network traffic",
        source: "ALEMS Threat Intelligence",
        confidence: 96.8,
        timestamp: new Date().toISOString(),
        status: "active",
        affectedSystems: ["Financial Crime Module", "Evidence Management"],
        actionRequired: true,
        investigationId: "INV-2024-8901"
      },
      {
        id: "ALERT-2024-3402",
        type: "system_anomaly",
        severity: "high",
        title: "Unusual Data Access Pattern",
        description: "Multiple high-privilege accounts accessing sensitive evidence databases outside normal hours",
        source: "ALEMS Behavioral Analytics",
        confidence: 89.2,
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        status: "investigating",
        affectedSystems: ["Evidence Management", "User Management"],
        actionRequired: true,
        assignedTo: "Security Team Alpha"
      },
      {
        id: "ALERT-2024-3403",
        type: "fraud_detection",
        severity: "medium",
        title: "Cryptocurrency Mixing Activity",
        description: "Suspicious cryptocurrency transactions using privacy-focused mixing services detected",
        source: "ALEMS Fraud Detection AI",
        confidence: 85.7,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: "resolved",
        affectedSystems: ["Financial Crime Module"],
        actionRequired: false,
        resolution: "Confirmed legitimate privacy transaction"
      },
      {
        id: "ALERT-2024-3404",
        type: "integration_failure",
        severity: "medium",
        title: "External System Connection Lost",
        description: "Connection to PNG Police PIMS database has been interrupted",
        source: "ALEMS Integration Monitor",
        confidence: 100,
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        status: "resolved",
        affectedSystems: ["System Integration"],
        actionRequired: false,
        resolution: "Connection restored after network maintenance"
      }
    ];

    const searchParams = request.nextUrl.searchParams;
    const severity = searchParams.get('severity');
    const status = searchParams.get('status');

    let filteredAlerts = alerts;

    if (severity) {
      filteredAlerts = filteredAlerts.filter(alert => alert.severity === severity);
    }

    if (status) {
      filteredAlerts = filteredAlerts.filter(alert => alert.status === status);
    }

    return NextResponse.json({
      success: true,
      data: {
        alerts: filteredAlerts,
        totalAlerts: filteredAlerts.length,
        criticalCount: filteredAlerts.filter(a => a.severity === 'critical').length,
        highCount: filteredAlerts.filter(a => a.severity === 'high').length,
        activeCount: filteredAlerts.filter(a => a.status === 'active').length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('ALEMS alerts API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch ALEMS alerts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, severity, title, description, source, affectedSystems } = body;

    const newAlert = {
      id: `ALERT-${Date.now()}`,
      type,
      severity,
      title,
      description,
      source,
      confidence: 95.0,
      timestamp: new Date().toISOString(),
      status: "active",
      affectedSystems: affectedSystems || [],
      actionRequired: severity === 'critical' || severity === 'high'
    };

    return NextResponse.json({
      success: true,
      data: newAlert,
      message: 'Alert created successfully'
    });
  } catch (error) {
    console.error('Create alert error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create alert' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { alertId, status, resolution, assignedTo } = body;

    // Simulate alert update
    const updatedAlert = {
      id: alertId,
      status,
      resolution,
      assignedTo,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: updatedAlert,
      message: 'Alert updated successfully'
    });
  } catch (error) {
    console.error('Update alert error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update alert' },
      { status: 500 }
    );
  }
}
