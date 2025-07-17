"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  Phone,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  Plus,
  Download,
  Eye,
  Edit,
  Shield,
  Gavel,
  Users,
  MapPin,
  Calendar,
  Activity,
  Bell,
  Database,
  Upload,
  RefreshCw,
  Settings,
  Lock,
  Smartphone,
  Globe,
  MessageSquare
} from "lucide-react";

interface EvidenceRequest {
  id: string;
  trackingId: string;
  caseReferenceNumber: string;
  suspectPhoneNumber: string;
  suspectName?: string;
  requestType: string[];
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' | 'EMERGENCY';
  status: 'PENDING' | 'SUBMITTED' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';
  telecomPartner?: string;
  requestorName: string;
  submissionDate: Date;
  expectedDate?: Date;
  completionDate?: Date;
  legalBasis: string;
  warrantNumber?: string;
  sensitivityLevel: string;
  hasDigitalSignature: boolean;
  evidenceReceived: number;
  totalExpected: number;
}

export default function EvidenceRequestsDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [dateRange, setDateRange] = useState("30d");

  const evidenceRequests: EvidenceRequest[] = [
    {
      id: "ER-2024-001",
      trackingId: "TRK-45A9B7C2",
      caseReferenceNumber: "CC-2024-0891",
      suspectPhoneNumber: "+675 7123 4567",
      suspectName: "John Suspect",
      requestType: ["CALL_LOGS", "SMS_RECORDS", "GEOLOCATION"],
      priority: "HIGH",
      status: "IN_PROGRESS",
      telecomPartner: "PNG DataCo Limited",
      requestorName: "Det. Sarah Connor",
      submissionDate: new Date(Date.now() - 172800000), // 2 days ago
      expectedDate: new Date(Date.now() + 345600000), // 4 days from now
      legalBasis: "Search Warrant under Cybercrime Code Act 2016",
      warrantNumber: "SW-2024-0123",
      sensitivityLevel: "RESTRICTED",
      hasDigitalSignature: true,
      evidenceReceived: 2,
      totalExpected: 3
    },
    {
      id: "ER-2024-002",
      trackingId: "TRK-B8F3E1D5",
      caseReferenceNumber: "CC-2024-0892",
      suspectPhoneNumber: "+675 7234 5678",
      requestType: ["INTERNET_LOGS", "DEVICE_INFO"],
      priority: "URGENT",
      status: "PENDING",
      telecomPartner: "Digicel PNG",
      requestorName: "DCI Michael Rodriguez",
      submissionDate: new Date(Date.now() - 86400000), // 1 day ago
      expectedDate: new Date(Date.now() + 172800000), // 2 days from now
      legalBasis: "Emergency Preservation Order",
      sensitivityLevel: "CONFIDENTIAL",
      hasDigitalSignature: true,
      evidenceReceived: 0,
      totalExpected: 2
    },
    {
      id: "ER-2024-003",
      trackingId: "TRK-C9A2D4E7",
      caseReferenceNumber: "CC-2024-0893",
      suspectPhoneNumber: "+675 7345 6789",
      suspectName: "Maria Fraudster",
      requestType: ["CALL_LOGS", "FINANCIAL_RECORDS"],
      priority: "MEDIUM",
      status: "COMPLETED",
      telecomPartner: "Bmobile Vodafone",
      requestorName: "Sgt. David Kim",
      submissionDate: new Date(Date.now() - 604800000), // 1 week ago
      completionDate: new Date(Date.now() - 86400000), // 1 day ago
      legalBasis: "Court Order under Evidence Act",
      warrantNumber: "CO-2024-0456",
      sensitivityLevel: "RESTRICTED",
      hasDigitalSignature: true,
      evidenceReceived: 2,
      totalExpected: 2
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-500';
      case 'IN_PROGRESS': return 'bg-blue-500';
      case 'PENDING': return 'bg-yellow-500';
      case 'REJECTED': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'EMERGENCY': return 'text-red-600 bg-red-50 border-red-200';
      case 'URGENT': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'HIGH': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'MEDIUM': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'LOW': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRequestTypeIcon = (types: string[]) => {
    if (types.includes('CALL_LOGS')) return <Phone className="h-4 w-4" />;
    if (types.includes('SMS_RECORDS')) return <MessageSquare className="h-4 w-4" />;
    if (types.includes('GEOLOCATION')) return <MapPin className="h-4 w-4" />;
    if (types.includes('INTERNET_LOGS')) return <Globe className="h-4 w-4" />;
    if (types.includes('DEVICE_INFO')) return <Smartphone className="h-4 w-4" />;
    return <Database className="h-4 w-4" />;
  };

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const formatDateUntil = (date: Date) => {
    const hours = Math.floor((date.getTime() - Date.now()) / 3600000);
    if (hours < 24) return `${hours}h remaining`;
    const days = Math.floor(hours / 24);
    return `${days}d remaining`;
  };

  const filteredRequests = evidenceRequests.filter(request => {
    const matchesSearch = request.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.caseReferenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.suspectPhoneNumber.includes(searchTerm) ||
                         (request.suspectName && request.suspectName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    total: evidenceRequests.length,
    pending: evidenceRequests.filter(r => r.status === 'PENDING').length,
    inProgress: evidenceRequests.filter(r => r.status === 'IN_PROGRESS').length,
    completed: evidenceRequests.filter(r => r.status === 'COMPLETED').length,
    urgent: evidenceRequests.filter(r => r.priority === 'URGENT' || r.priority === 'EMERGENCY').length
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Gavel className="h-8 w-8 text-blue-600" />
              Lawful Digital Evidence Requests
            </h1>
            <p className="text-slate-600">Secure telecoms integration for evidence collection</p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Request
            </Button>
          </div>
        </div>

        {/* Status Alert */}
        <Alert className="border-l-4 border-l-blue-500 bg-blue-50">
          <Shield className="h-4 w-4" />
          <AlertTitle>Secure Evidence Request System</AlertTitle>
          <AlertDescription>
            All evidence requests are encrypted, digitally signed, and maintain full audit trails.
            {stats.urgent > 0 && ` ${stats.urgent} urgent request(s) require immediate attention.`}
          </AlertDescription>
        </Alert>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <FileText className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-slate-600">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <p className="text-xs text-slate-600">Awaiting processing</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Activity className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
              <p className="text-xs text-slate-600">Being processed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <p className="text-xs text-slate-600">Evidence received</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Urgent</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.urgent}</div>
              <p className="text-xs text-slate-600">High priority</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-lg border">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by tracking ID, case number, or phone number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="EMERGENCY">Emergency</SelectItem>
              <SelectItem value="URGENT">Urgent</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="LOW">Low</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" />
            Advanced
          </Button>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="list" className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">Request List</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="partners">Telecom Partners</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            <div className="bg-white rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request Details</TableHead>
                    <TableHead>Suspect Info</TableHead>
                    <TableHead>Type & Priority</TableHead>
                    <TableHead>Partner & Timeline</TableHead>
                    <TableHead>Status & Progress</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium text-blue-600">{request.trackingId}</div>
                          <div className="text-sm text-slate-600">Case: {request.caseReferenceNumber}</div>
                          <div className="text-xs text-slate-500">
                            By: {request.requestorName} • {formatTimeAgo(request.submissionDate)}
                          </div>
                          {request.hasDigitalSignature && (
                            <Badge variant="outline" className="text-xs">
                              <Lock className="h-3 w-3 mr-1" />
                              Digitally Signed
                            </Badge>
                          )}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{request.suspectPhoneNumber}</div>
                          {request.suspectName && (
                            <div className="text-sm text-slate-600">{request.suspectName}</div>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {request.sensitivityLevel}
                          </Badge>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            {getRequestTypeIcon(request.requestType)}
                            <span className="text-sm">
                              {request.requestType.length} type(s)
                            </span>
                          </div>
                          <Badge className={getPriorityColor(request.priority)}>
                            {request.priority}
                          </Badge>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">{request.telecomPartner}</div>
                          {request.expectedDate && (
                            <div className="text-xs text-slate-500">
                              <Calendar className="h-3 w-3 inline mr-1" />
                              {formatDateUntil(request.expectedDate)}
                            </div>
                          )}
                          {request.warrantNumber && (
                            <div className="text-xs text-slate-500">
                              <Gavel className="h-3 w-3 inline mr-1" />
                              {request.warrantNumber}
                            </div>
                          )}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(request.status)}>
                              {request.status}
                            </Badge>
                          </div>
                          {request.totalExpected > 0 && (
                            <div className="space-y-1">
                              <div className="text-xs text-slate-600">
                                Evidence: {request.evidenceReceived}/{request.totalExpected}
                              </div>
                              <Progress
                                value={(request.evidenceReceived / request.totalExpected) * 100}
                                className="h-1"
                              />
                            </div>
                          )}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Request Volume Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-slate-100 rounded flex items-center justify-center text-slate-500">
                    [Chart: Request Volume Over Time]
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Response Time Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Avg Response Time:</span>
                      <span className="font-medium">2.3 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Fastest Response:</span>
                      <span className="font-medium">4 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">SLA Compliance:</span>
                      <span className="font-medium text-green-600">94%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Request Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Call Logs:</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">SMS Records:</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Geolocation:</span>
                      <span className="font-medium">15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Other:</span>
                      <span className="font-medium">10%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="partners" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {["PNG DataCo Limited", "Digicel PNG", "Bmobile Vodafone", "DataTec PNG"].map((partner, index) => (
                <Card key={partner}>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {partner}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Status:</span>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Avg Response:</span>
                        <span className="font-medium">{2 + index * 0.5} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Requests:</span>
                        <span className="font-medium">{12 + index * 8}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Success Rate:</span>
                        <span className="font-medium text-green-600">{95 + index}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
