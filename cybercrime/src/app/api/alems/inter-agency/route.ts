import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Simulate inter-agency communications
    const communications = [
      {
        id: "IAC-2024-5501",
        type: "intelligence_sharing",
        subject: "Cross-Border Cybercrime Investigation",
        from: {
          agency: "PNG Police Cybercrime Unit",
          contact: "Det. Sarah Connor",
          email: "s.connor@pngpolice.gov.pg"
        },
        to: {
          agency: "Australian Federal Police",
          contact: "Agent Michael Ross",
          email: "m.ross@afp.gov.au"
        },
        classification: "RESTRICTED",
        priority: "high",
        timestamp: new Date().toISOString(),
        status: "pending_response",
        caseReference: "CC-2024-0891",
        attachments: 2,
        encryptionLevel: "AES-256",
        readReceipts: true
      },
      {
        id: "IAC-2024-5502",
        type: "joint_operation",
        subject: "Operation Pacific Shield - Coordination",
        from: {
          agency: "INTERPOL Pacific Region",
          contact: "Commander Liu Wei",
          email: "l.wei@interpol.int"
        },
        to: {
          agency: "PNG Police Cybercrime Unit",
          contact: "Chief Inspector Rodriguez",
          email: "c.rodriguez@pngpolice.gov.pg"
        },
        classification: "CONFIDENTIAL",
        priority: "critical",
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        status: "acknowledged",
        operationCode: "PACSHIELD-2024",
        attachments: 5,
        encryptionLevel: "AES-256",
        readReceipts: true
      },
      {
        id: "IAC-2024-5503",
        type: "evidence_request",
        subject: "Digital Evidence Request - Money Laundering Case",
        from: {
          agency: "Reserve Bank of Australia",
          contact: "Dr. Emily Chen",
          email: "e.chen@rba.gov.au"
        },
        to: {
          agency: "PNG Police Financial Crime Unit",
          contact: "Analyst Johnson",
          email: "p.johnson@pngpolice.gov.pg"
        },
        classification: "OFFICIAL",
        priority: "medium",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: "completed",
        caseReference: "FC-2024-0445",
        attachments: 1,
        encryptionLevel: "TLS-1.3",
        readReceipts: false
      },
      {
        id: "IAC-2024-5504",
        type: "alert_notification",
        subject: "Threat Intelligence Alert - APT Group Activity",
        from: {
          agency: "US FBI Cyber Division",
          contact: "Agent Sarah Mitchell",
          email: "s.mitchell@fbi.gov"
        },
        to: {
          agency: "PNG Police Cybercrime Unit",
          contact: "Threat Intelligence Team",
          email: "threats@pngpolice.gov.pg"
        },
        classification: "SECRET",
        priority: "urgent",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        status: "read",
        threatLevel: "HIGH",
        attachments: 3,
        encryptionLevel: "SUITE-B",
        readReceipts: true
      }
    ];

    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const classification = searchParams.get('classification');

    let filteredCommunications = communications;

    if (type) {
      filteredCommunications = filteredCommunications.filter(comm => comm.type === type);
    }

    if (status) {
      filteredCommunications = filteredCommunications.filter(comm => comm.status === status);
    }

    if (classification) {
      filteredCommunications = filteredCommunications.filter(comm => comm.classification === classification);
    }

    // Simulate connected agencies
    const connectedAgencies = [
      {
        id: "agency-001",
        name: "Australian Federal Police",
        country: "Australia",
        type: "law_enforcement",
        connectionStatus: "active",
        lastActivity: new Date(Date.now() - 1800000).toISOString(),
        trustLevel: "high",
        communicationChannels: ["secure_email", "encrypted_messaging", "video_conference"],
        activeOperations: 3
      },
      {
        id: "agency-002",
        name: "INTERPOL Pacific Region",
        country: "Singapore",
        type: "international_police",
        connectionStatus: "active",
        lastActivity: new Date(Date.now() - 3600000).toISOString(),
        trustLevel: "high",
        communicationChannels: ["secure_portal", "encrypted_messaging"],
        activeOperations: 7
      },
      {
        id: "agency-003",
        name: "US FBI Cyber Division",
        country: "United States",
        type: "federal_agency",
        connectionStatus: "active",
        lastActivity: new Date(Date.now() - 7200000).toISOString(),
        trustLevel: "high",
        communicationChannels: ["classified_network", "secure_email"],
        activeOperations: 2
      },
      {
        id: "agency-004",
        name: "Reserve Bank of Australia",
        country: "Australia",
        type: "financial_intelligence",
        connectionStatus: "active",
        lastActivity: new Date(Date.now() - 14400000).toISOString(),
        trustLevel: "medium",
        communicationChannels: ["secure_email", "encrypted_file_transfer"],
        activeOperations: 1
      }
    ];

    return NextResponse.json({
      success: true,
      data: {
        communications: filteredCommunications,
        connectedAgencies,
        totalCommunications: filteredCommunications.length,
        pendingCount: filteredCommunications.filter(c => c.status === 'pending_response').length,
        urgentCount: filteredCommunications.filter(c => c.priority === 'urgent' || c.priority === 'critical').length,
        classifiedCount: filteredCommunications.filter(c => c.classification === 'SECRET' || c.classification === 'CONFIDENTIAL').length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Inter-agency API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inter-agency communications' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, subject, toAgency, classification, priority, message, attachments } = body;

    const newCommunication = {
      id: `IAC-${Date.now()}`,
      type,
      subject,
      from: {
        agency: "PNG Police Cybercrime Unit",
        contact: "ALEMS System",
        email: "alems@pngpolice.gov.pg"
      },
      to: toAgency,
      classification,
      priority,
      timestamp: new Date().toISOString(),
      status: "sent",
      message,
      attachments: attachments?.length || 0,
      encryptionLevel: classification === 'SECRET' ? 'SUITE-B' : 'AES-256',
      readReceipts: true
    };

    return NextResponse.json({
      success: true,
      data: newCommunication,
      message: 'Communication sent successfully'
    });
  } catch (error) {
    console.error('Send communication error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send communication' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { communicationId, status, response } = body;

    const updatedCommunication = {
      id: communicationId,
      status,
      response,
      responseTimestamp: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: updatedCommunication,
      message: 'Communication updated successfully'
    });
  } catch (error) {
    console.error('Update communication error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update communication' },
      { status: 500 }
    );
  }
}
