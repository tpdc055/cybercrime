import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const evidenceId = params.id;
    
    // Mock evidence data for development
    const mockEvidence = {
      id: evidenceId,
      fileName: "evidence-sample.jpg",
      fileType: "image/jpeg",
      fileSize: 2048576,
      uploadedBy: "Detective Sarah Wilson",
      uploadDate: new Date().toISOString(),
      caseId: "case1",
      description: "Digital evidence from cyber crime investigation",
      metadata: {
        camera: "iPhone 13",
        location: "Port Moresby",
        timestamp: new Date().toISOString()
      },
      viewUrl: `/api/evidence/${evidenceId}/download`,
      thumbnailUrl: "/images/evidence-placeholder.jpg"
    };

    return NextResponse.json({
      success: true,
      evidence: mockEvidence
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve evidence" },
      { status: 500 }
    );
  }
}
