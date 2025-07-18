"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Users,
  Globe,
  MessageSquare,
  Link2,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Download,
  Settings,
  Activity,
  Building,
  Phone,
  Mail,
  Bell
} from "lucide-react";

interface PlatformPartner {
  id: string;
  name: string;
  type: 'tech_company' | 'social_media' | 'financial' | 'telecom' | 'government';
  status: 'active' | 'pending' | 'suspended';
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  establishedDate: Date;
  lastContact: Date;
  responseTime: number; // hours
  cooperationLevel: 'full' | 'limited' | 'restricted';
  dataTypes: string[];
}

interface CommunicationRequest {
  id: string;
  platformId: string;
  requestType: 'data_request' | 'takedown' | 'preservation' | 'emergency';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'sent' | 'acknowledged' | 'completed' | 'rejected';
  subject: string;
  caseReference: string;
  requestedData: string[];
  submittedAt: Date;
  responseDeadline: Date;
  actualResponse?: Date;
}

export default function PlatformLiaison() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeConnections, setActiveConnections] = useState(12);

  const platforms: PlatformPartner[] = [
    {
      id: "PLT-001",
      name: "Meta (Facebook/Instagram)",
      type: "social_media",
      status: "active",
      contactPerson: "Sarah Chen",
      email: "law-enforcement@meta.com",
      phone: "+1-650-543-4800",
      country: "United States",
      establishedDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
      lastContact: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      responseTime: 24,
      cooperationLevel: "full",
      dataTypes: ["user_data", "content", "communications", "location"]
    },
    {
      id: "PLT-002",
      name: "Google LLC",
      type: "tech_company",
      status: "active",
      contactPerson: "Michael Johnson",
      email: "legal-requests@google.com",
      phone: "+1-650-253-0000",
      country: "United States",
      establishedDate: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000),
      lastContact: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      responseTime: 18,
      cooperationLevel: "full",
      dataTypes: ["search_data", "email", "location", "device_info"]
    },
    {
      id: "PLT-003",
      name: "Telegram Messenger",
      type: "social_media",
      status: "suspended",
      contactPerson: "Legal Department",
      email: "abuse@telegram.org",
      phone: "N/A",
      country: "Dubai",
      establishedDate: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000),
      lastContact: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      responseTime: 72,
      cooperationLevel: "limited",
      dataTypes: ["basic_info", "public_channels"]
    }
  ];

  const communicationRequests: CommunicationRequest[] = [
    {
      id: "REQ-2024-4501",
      platformId: "PLT-001",
      requestType: "data_request",
      urgency: "high",
      status: "pending",
      subject: "User Data Request - Fraud Investigation",
      caseReference: "CC-2024-0891",
      requestedData: ["account_info", "messages", "connections"],
      submittedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      responseDeadline: new Date(Date.now() + 18 * 60 * 60 * 1000)
    },
    {
      id: "REQ-2024-4502",
      platformId: "PLT-002",
      requestType: "emergency",
      urgency: "critical",
      status: "completed",
      subject: "Emergency Data Preservation - Child Safety",
      caseReference: "CC-2024-0892",
      requestedData: ["location_data", "search_history", "contacts"],
      submittedAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
      responseDeadline: new Date(Date.now() - 24 * 60 * 60 * 1000),
      actualResponse: new Date(Date.now() - 36 * 60 * 60 * 1000)
    }
  ];

  const formatTimeAgo = (date: Date) => {
    const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'completed': return 'bg-green-500';
      case 'pending': case 'sent': return 'bg-yellow-500';
      case 'suspended': case 'rejected': return 'bg-red-500';
      case 'acknowledged': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'social_media': return <MessageSquare className="h-4 w-4" />;
      case 'tech_company': return <Globe className="h-4 w-4" />;
      case 'financial': return <Building className="h-4 w-4" />;
      case 'telecom': return <Phone className="h-4 w-4" />;
      case 'government': return <Shield className="h-4 w-4" />;
      default: return <Link2 className="h-4 w-4" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              Platform Liaison Management
            </h1>
            <p className="text-slate-600">External platform communications and coordination hub</p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configure
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Request
            </Button>
          </div>
        </div>

        {/* System Status */}
        <Alert className="border-l-4 border-l-green-500 bg-green-50">
          <Activity className="h-4 w-4" />
          <AlertTitle>Platform Communication System Active</AlertTitle>
          <AlertDescription>
            {activeConnections} active platform connections • All critical channels operational •
            Average response time: 28 hours
          </AlertDescription>
        </Alert>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Platforms</CardTitle>
              <Link2 className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platforms.filter(p => p.status === 'active').length}</div>
              <p className="text-xs text-slate-600">Connected partners</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {communicationRequests.filter(r => r.status === 'pending').length}
              </div>
              <p className="text-xs text-slate-600">Awaiting response</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Activity className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">28h</div>
              <p className="text-xs text-slate-600">Cross-platform average</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">94%</div>
              <p className="text-xs text-slate-600">Request completion</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="platforms" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="platforms">Platform Partners</TabsTrigger>
            <TabsTrigger value="requests">Communication Requests</TabsTrigger>
            <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
            <TabsTrigger value="emergency">Emergency Protocols</TabsTrigger>
          </TabsList>

          <TabsContent value="platforms" className="space-y-4">
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search platforms..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {platforms.map((platform) => (
                <Card key={platform.id} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(platform.type)}
                        <div>
                          <CardTitle className="text-lg">{platform.name}</CardTitle>
                          <CardDescription>
                            {platform.id} • Contact: {platform.contactPerson} • {platform.country}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(platform.status)}>
                          {platform.status.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">
                          {platform.cooperationLevel} cooperation
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-slate-600">Response Time</div>
                          <div className="font-medium">{platform.responseTime}h avg</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Last Contact</div>
                          <div className="font-medium">{formatTimeAgo(platform.lastContact)}</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Data Types</div>
                          <div className="font-medium">{platform.dataTypes.length} available</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Established</div>
                          <div className="font-medium">{formatTimeAgo(platform.establishedDate)}</div>
                        </div>
                      </div>

                      <div className="border-t pt-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-slate-600">Contact Information:</div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Mail className="h-3 w-3" />
                                <span className="font-mono text-xs">{platform.email}</span>
                              </div>
                              {platform.phone !== "N/A" && (
                                <div className="flex items-center gap-2">
                                  <Phone className="h-3 w-3" />
                                  <span className="font-mono text-xs">{platform.phone}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="text-slate-600">Available Data Types:</div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {platform.dataTypes.slice(0, 3).map((type, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {type.replace('_', ' ')}
                                </Badge>
                              ))}
                              {platform.dataTypes.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{platform.dataTypes.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          New Request
                        </Button>
                        <Button size="sm" variant="outline">
                          <Activity className="h-3 w-3 mr-1" />
                          View History
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-3 w-3 mr-1" />
                          Configure
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <div className="bg-white rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request Details</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Type & Urgency</TableHead>
                    <TableHead>Timeline</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {communicationRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{request.subject}</div>
                          <div className="text-sm text-slate-600">{request.id}</div>
                          <div className="text-xs text-slate-500">Case: {request.caseReference}</div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="text-sm">
                          {platforms.find(p => p.id === request.platformId)?.name || "Unknown"}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-1">
                          <Badge variant="outline" className="text-xs">
                            {request.requestType.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <Badge className={getUrgencyColor(request.urgency)}>
                            {request.urgency.toUpperCase()}
                          </Badge>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="text-sm space-y-1">
                          <div>Submitted: {formatTimeAgo(request.submittedAt)}</div>
                          <div>Deadline: {formatTimeAgo(request.responseDeadline)}</div>
                          {request.actualResponse && (
                            <div className="text-green-600">
                              Responded: {formatTimeAgo(request.actualResponse)}
                            </div>
                          )}
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status.toUpperCase()}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-3 w-3" />
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Response Time Trends</CardTitle>
                  <CardDescription>Platform response performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-slate-100 rounded flex items-center justify-center text-slate-500">
                    [Response Time Chart - Shows decreasing trend from 48h to 28h average]
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Request Type Distribution</CardTitle>
                  <CardDescription>Breakdown of communication request types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Data Requests:</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Emergency:</span>
                      <span className="font-medium">20%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Takedowns:</span>
                      <span className="font-medium">10%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Preservation:</span>
                      <span className="font-medium">5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="emergency" className="space-y-4">
            <Alert className="border-l-4 border-l-red-500 bg-red-50">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Emergency Communication Protocols</AlertTitle>
              <AlertDescription>
                For life-threatening emergencies requiring immediate platform response within 1-4 hours.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Emergency Contacts
                  </CardTitle>
                  <CardDescription>24/7 emergency communication channels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border border-red-200 rounded-lg bg-red-50">
                      <div className="font-medium text-red-700">Meta Emergency Response</div>
                      <div className="text-sm text-red-600">emergency@meta.com</div>
                      <div className="text-sm text-red-600">+1-650-543-4800 (24/7)</div>
                    </div>
                    <div className="p-3 border border-orange-200 rounded-lg bg-orange-50">
                      <div className="font-medium text-orange-700">Google Emergency Disclosure</div>
                      <div className="text-sm text-orange-600">emergency@google.com</div>
                      <div className="text-sm text-orange-600">Online Portal: g.co/emergency</div>
                    </div>
                    <div className="p-3 border border-yellow-200 rounded-lg bg-yellow-50">
                      <div className="font-medium text-yellow-700">Inter-Agency Coordination</div>
                      <div className="text-sm text-yellow-600">iac.emergency@police.gov.pg</div>
                      <div className="text-sm text-yellow-600">+675 3000 (Operations Center)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Request Process</CardTitle>
                  <CardDescription>Streamlined process for urgent requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm">1</div>
                      <span className="text-sm">Immediate threat assessment and validation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm">2</div>
                      <span className="text-sm">Emergency contact notification (all channels)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm">3</div>
                      <span className="text-sm">Expedited review and approval process</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm">4</div>
                      <span className="text-sm">Real-time monitoring and follow-up</span>
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">
                    <Bell className="h-4 w-4 mr-2" />
                    Initiate Emergency Request
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
