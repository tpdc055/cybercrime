"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Archive, Upload, Search, Filter, Plus, FileText, AlertTriangle, Info, Gavel, Clock, CheckCircle, User, Calendar, Download, Eye, Share, Image, Video } from "lucide-react";

// Mock evidence data
const mockEvidence = [
  {
    id: "1",
    title: "Facebook conversation screenshots",
    fileName: "facebook_chat_evidence.png",
    fileSize: 2048576,
    mimeType: "image/png",
    evidenceType: "SCREENSHOT",
    hash: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6",
    source: "Victim's Facebook account",
    collectedAt: "2024-01-05T10:30:00Z",
    claimStatus: "Available",
    claimedBy: null,
    claimedAt: null,
    uploadedBy: {
      id: "user1",
      name: "Det. Sarah Wilson",
      email: "sarah.wilson@pngpolice.gov.pg",
    },
    chainOfCustody: [
      {
        action: "UPLOADED",
        userId: "user1",
        userName: "Det. Sarah Wilson",
        timestamp: "2024-01-05T10:30:00Z",
        notes: "Evidence uploaded to system with security analysis",
      },
    ],
    isSecure: true,
    createdAt: "2024-01-05T10:30:00Z",
  },
  {
    id: "2",
    title: "Bank transaction records",
    fileName: "bank_transactions.pdf",
    fileSize: 1024768,
    mimeType: "application/pdf",
    evidenceType: "FINANCIAL",
    hash: "b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a1",
    source: "ANZ Bank PNG",
    collectedAt: "2024-01-06T14:20:00Z",
    claimStatus: "Claimed",
    claimedBy: "Det. John Smith",
    claimedAt: "2024-01-07T09:15:00Z",
    uploadedBy: {
      id: "user2",
      name: "Det. Mike Johnson",
      email: "mike.johnson@pngpolice.gov.pg",
    },
    chainOfCustody: [
      {
        action: "UPLOADED",
        userId: "user2",
        userName: "Det. Mike Johnson",
        timestamp: "2024-01-06T14:20:00Z",
        notes: "Bank records obtained via court order",
      },
      {
        action: "CLAIMED",
        userId: "user3",
        userName: "Det. John Smith",
        timestamp: "2024-01-07T09:15:00Z",
        notes: "Evidence claimed for case CYBER-2024-001",
      },
    ],
    isSecure: true,
    createdAt: "2024-01-06T14:20:00Z",
  },
  {
    id: "3",
    title: "WhatsApp backup data",
    fileName: "whatsapp_backup.zip",
    fileSize: 15728640,
    mimeType: "application/zip",
    evidenceType: "COMMUNICATION",
    hash: "c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a1b2",
    source: "Suspect's mobile device",
    collectedAt: "2024-01-08T11:45:00Z",
    claimStatus: "Pending Review",
    claimedBy: null,
    claimedAt: null,
    uploadedBy: {
      id: "user1",
      name: "Det. Sarah Wilson",
      email: "sarah.wilson@pngpolice.gov.pg",
    },
    chainOfCustody: [
      {
        action: "UPLOADED",
        userId: "user1",
        userName: "Det. Sarah Wilson",
        timestamp: "2024-01-08T11:45:00Z",
        notes: "Mobile device seized with warrant, backup extracted",
      },
    ],
    isSecure: true,
    createdAt: "2024-01-08T11:45:00Z",
  }
];

// Mock evidence claims data
const evidenceClaims = [
  {
    id: "claim-1",
    evidenceId: "2",
    evidenceTitle: "Bank transaction records",
    claimedBy: "Det. John Smith",
    claimedByEmail: "john.smith@pngpolice.gov.pg",
    claimedAt: "2024-01-07T09:15:00Z",
    caseNumber: "CYBER-2024-001",
    reason: "Evidence required for financial fraud investigation",
    status: "Active",
    dueDate: "2024-01-21T23:59:59Z",
    priority: "High"
  },
  {
    id: "claim-2",
    evidenceId: "1",
    evidenceTitle: "Facebook conversation screenshots",
    claimedBy: "Det. Maria Santos",
    claimedByEmail: "maria.santos@pngpolice.gov.pg",
    claimedAt: "2024-01-06T16:30:00Z",
    caseNumber: "CYBER-2024-002",
    reason: "Social media evidence for romance scam case",
    status: "Returned",
    dueDate: "2024-01-20T23:59:59Z",
    priority: "Medium",
    returnedAt: "2024-01-10T14:20:00Z"
  }
];

export default function EvidencePage() {
  const [selectedEvidence, setSelectedEvidence] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isClaimDialogOpen, setIsClaimDialogOpen] = useState(false);
  const [evidenceToView, setEvidenceToView] = useState<any>(null);
  const [claimForm, setClaimForm] = useState({
    caseNumber: "",
    reason: "",
    priority: "Medium",
    dueDate: ""
  });

  const filteredEvidence = mockEvidence.filter((evidence) => {
    const matchesSearch = evidence.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evidence.fileName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || evidence.evidenceType === filterType;
    const matchesStatus = filterStatus === "all" ||
      (filterStatus === "available" && evidence.claimStatus === "Available") ||
      (filterStatus === "claimed" && evidence.claimStatus === "Claimed") ||
      (filterStatus === "pending" && evidence.claimStatus === "Pending Review");

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleClaimEvidence = (evidence: any) => {
    setSelectedEvidence(evidence);
    setIsClaimDialogOpen(true);
  };

  const submitClaim = () => {
    // In real app, this would make API call
    console.log("Claiming evidence:", selectedEvidence.id, claimForm);
    setIsClaimDialogOpen(false);
    setClaimForm({ caseNumber: "", reason: "", priority: "Medium", dueDate: "" });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Available":
        return <Badge variant="secondary" className="bg-green-100 text-green-700">Available</Badge>;
      case "Claimed":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-700">Claimed</Badge>;
      case "Pending Review":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Pending Review</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge variant="destructive">High</Badge>;
      case "Medium":
        return <Badge variant="secondary" className="bg-orange-100 text-orange-700">Medium</Badge>;
      case "Low":
        return <Badge variant="secondary" className="bg-gray-100 text-gray-700">Low</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Evidence Management</h1>
            <p className="text-zinc-600 mt-2">Manage, track, and claim digital evidence securely</p>
          </div>
          <div className="flex gap-2">
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Evidence
            </Button>
          </div>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="evidence" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="evidence">Evidence Repository</TabsTrigger>
            <TabsTrigger value="claims">Evidence Claims</TabsTrigger>
            <TabsTrigger value="chain">Chain of Custody</TabsTrigger>
          </TabsList>

          {/* Evidence Repository Tab */}
          <TabsContent value="evidence" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="search">Search Evidence</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="search"
                        placeholder="Search by title, filename, or source..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="type-filter">Evidence Type</Label>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="SCREENSHOT">Screenshots</SelectItem>
                        <SelectItem value="FINANCIAL">Financial Records</SelectItem>
                        <SelectItem value="COMMUNICATION">Communications</SelectItem>
                        <SelectItem value="DEVICE">Device Data</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status-filter">Claim Status</Label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="claimed">Claimed</SelectItem>
                        <SelectItem value="pending">Pending Review</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Evidence Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvidence.map((evidence) => (
                <Card key={evidence.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{evidence.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {evidence.fileName} • {(evidence.fileSize / 1024 / 1024).toFixed(2)} MB
                        </CardDescription>
                      </div>
                      {getStatusBadge(evidence.claimStatus)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Type:</span>
                          <span className="font-medium">{evidence.evidenceType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Source:</span>
                          <span className="font-medium text-right">{evidence.source}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Collected:</span>
                          <span className="font-medium">
                            {new Date(evidence.collectedAt).toLocaleDateString()}
                          </span>
                        </div>
                        {evidence.claimedBy && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Claimed by:</span>
                            <span className="font-medium text-blue-600">{evidence.claimedBy}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEvidenceToView(evidence)}
                          className="flex-1"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        {evidence.claimStatus === "Available" && (
                          <Button
                            size="sm"
                            onClick={() => handleClaimEvidence(evidence)}
                            className="flex-1"
                          >
                            <Gavel className="h-4 w-4 mr-1" />
                            Claim
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Evidence Claims Tab */}
          <TabsContent value="claims" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="h-5 w-5" />
                  Evidence Claims Management
                </CardTitle>
                <CardDescription>
                  Track and manage evidence claims across all cases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Evidence</TableHead>
                      <TableHead>Claimed By</TableHead>
                      <TableHead>Case Number</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {evidenceClaims.map((claim) => (
                      <TableRow key={claim.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{claim.evidenceTitle}</div>
                            <div className="text-sm text-gray-600">{claim.reason}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{claim.claimedBy}</div>
                            <div className="text-sm text-gray-600">{claim.claimedByEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{claim.caseNumber}</Badge>
                        </TableCell>
                        <TableCell>{getPriorityBadge(claim.priority)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={claim.status === "Active" ? "default" : "secondary"}
                            className={claim.status === "Returned" ? "bg-gray-100 text-gray-700" : ""}
                          >
                            {claim.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            {new Date(claim.dueDate).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">View</Button>
                            {claim.status === "Active" && (
                              <Button variant="outline" size="sm">Return</Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Chain of Custody Tab */}
          <TabsContent value="chain" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Archive className="h-5 w-5" />
                  Chain of Custody Log
                </CardTitle>
                <CardDescription>
                  Complete audit trail for all evidence handling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEvidence.map((evidence) => (
                    <Card key={evidence.id} className="border-l-4 border-l-blue-500">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{evidence.title}</CardTitle>
                        <CardDescription>Evidence ID: {evidence.id}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {evidence.chainOfCustody.map((entry, index) => (
                            <div key={index} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                              <div className="flex-shrink-0">
                                {entry.action === "UPLOADED" && <Upload className="h-5 w-5 text-green-600" />}
                                {entry.action === "VIEWED" && <FileText className="h-5 w-5 text-blue-600" />}
                                {entry.action === "CLAIMED" && <Gavel className="h-5 w-5 text-orange-600" />}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="font-medium">{entry.action}</div>
                                    <div className="text-sm text-gray-600">{entry.userName}</div>
                                    <div className="text-sm text-gray-500 mt-1">{entry.notes}</div>
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {new Date(entry.timestamp).toLocaleString()}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Evidence Claim Dialog */}
        <Dialog open={isClaimDialogOpen} onOpenChange={setIsClaimDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Claim Evidence</DialogTitle>
              <DialogDescription>
                Claim this evidence for your investigation. You will be responsible for its proper handling and timely return.
              </DialogDescription>
            </DialogHeader>
            {selectedEvidence && (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium">{selectedEvidence.title}</h3>
                  <p className="text-sm text-gray-600">{selectedEvidence.fileName}</p>
                  <p className="text-sm text-gray-600">Source: {selectedEvidence.source}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="caseNumber">Case Number *</Label>
                    <Input
                      id="caseNumber"
                      placeholder="e.g., CYBER-2024-XXX"
                      value={claimForm.caseNumber}
                      onChange={(e) => setClaimForm({...claimForm, caseNumber: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={claimForm.priority}
                      onValueChange={(value) => setClaimForm({...claimForm, priority: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="dueDate">Expected Return Date *</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={claimForm.dueDate}
                    onChange={(e) => setClaimForm({...claimForm, dueDate: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="reason">Reason for Claim *</Label>
                  <Textarea
                    id="reason"
                    placeholder="Explain why you need this evidence and how it will be used in your investigation..."
                    value={claimForm.reason}
                    onChange={(e) => setClaimForm({...claimForm, reason: e.target.value})}
                    rows={3}
                  />
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    By claiming this evidence, you agree to handle it according to department protocols and return it by the specified date.
                  </AlertDescription>
                </Alert>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsClaimDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={submitClaim}
                    disabled={!claimForm.caseNumber || !claimForm.reason || !claimForm.dueDate}
                  >
                    <Gavel className="h-4 w-4 mr-2" />
                    Claim Evidence
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Evidence Viewer Dialog */}
        <Dialog open={!!evidenceToView} onOpenChange={() => setEvidenceToView(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {evidenceToView?.title}
              </DialogTitle>
              <DialogDescription>
                Evidence ID: {evidenceToView?.id} • File: {evidenceToView?.fileName}
              </DialogDescription>
            </DialogHeader>
            {evidenceToView && (
              <div className="space-y-6">
                {/* Evidence Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Evidence Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium">File Name:</span>
                        <span>{evidenceToView.fileName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">File Size:</span>
                        <span>{(evidenceToView.fileSize / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Type:</span>
                        <Badge variant="outline">{evidenceToView.evidenceType}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Source:</span>
                        <span>{evidenceToView.source}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Collected:</span>
                        <span>{new Date(evidenceToView.collectedAt).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Status:</span>
                        {getStatusBadge(evidenceToView.claimStatus)}
                      </div>
                      {evidenceToView.claimedBy && (
                        <div className="flex justify-between">
                          <span className="font-medium">Claimed by:</span>
                          <span className="text-blue-600">{evidenceToView.claimedBy}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Security & Integrity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Security Status:</span>
                        <Badge variant={evidenceToView.isSecure ? "default" : "destructive"}>
                          {evidenceToView.isSecure ? "Secure" : "Unsecure"}
                        </Badge>
                      </div>
                      <div>
                        <span className="font-medium">Hash:</span>
                        <div className="mt-1 p-2 bg-gray-100 rounded text-xs font-mono break-all">
                          {evidenceToView.hash}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Uploaded by:</span>
                        <span>{evidenceToView.uploadedBy.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Upload Date:</span>
                        <span>{new Date(evidenceToView.createdAt).toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* File Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">File Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      {evidenceToView.mimeType.startsWith('image/') ? (
                        <div>
                          <Image className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                          <p className="text-gray-600">Image file preview</p>
                          <p className="text-sm text-gray-500 mt-1">{evidenceToView.fileName}</p>
                        </div>
                      ) : evidenceToView.mimeType === 'application/pdf' ? (
                        <div>
                          <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                          <p className="text-gray-600">PDF document</p>
                          <p className="text-sm text-gray-500 mt-1">{evidenceToView.fileName}</p>
                        </div>
                      ) : evidenceToView.mimeType.startsWith('video/') ? (
                        <div>
                          <Video className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                          <p className="text-gray-600">Video file</p>
                          <p className="text-sm text-gray-500 mt-1">{evidenceToView.fileName}</p>
                        </div>
                      ) : (
                        <div>
                          <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                          <p className="text-gray-600">File preview not available</p>
                          <p className="text-sm text-gray-500 mt-1">{evidenceToView.fileName}</p>
                        </div>
                      )}
                      <div className="mt-4">
                        <Button variant="outline" className="mr-2">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Open in New Tab
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Chain of Custody */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Chain of Custody</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {evidenceToView.chainOfCustody.map((entry: any, index: number) => (
                        <div key={index} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0 mt-1">
                            {entry.action === "UPLOADED" && <Upload className="h-5 w-5 text-green-600" />}
                            {entry.action === "VIEWED" && <Eye className="h-5 w-5 text-blue-600" />}
                            {entry.action === "CLAIMED" && <Gavel className="h-5 w-5 text-orange-600" />}
                            {entry.action === "DOWNLOADED" && <Download className="h-5 w-5 text-purple-600" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium">{entry.action}</div>
                                <div className="text-sm text-gray-600">{entry.userName}</div>
                                <div className="text-sm text-gray-500 mt-1">{entry.notes}</div>
                              </div>
                              <div className="text-sm text-gray-500">
                                {new Date(entry.timestamp).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex gap-2">
                    {evidenceToView.claimStatus === "Available" && (
                      <Button onClick={() => handleClaimEvidence(evidenceToView)}>
                        <Gavel className="h-4 w-4 mr-2" />
                        Claim Evidence
                      </Button>
                    )}
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                  <Button variant="outline" onClick={() => setEvidenceToView(null)}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
