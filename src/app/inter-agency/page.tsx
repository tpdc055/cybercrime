"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Shield,
  MessageSquare,
  Share2,
  Globe,
  Lock,
  Key,
  Radio,
  AlertTriangle,
  CheckCircle,
  Clock,
  Send,
  Search,
  Filter,
  Plus,
  Eye,
  Download,
  Upload,
  FileText,
  Database,
  MapPin,
  Phone,
  Mail,
  Activity,
  Zap,
  Target,
  Network,
  Verified,
  UserCheck,
  Settings,
  Bell,
  Info,
  ExternalLink,
  RefreshCw,
  Star,
  Flag,
  Archive
} from "lucide-react";

interface Agency {
  id: string;
  name: string;
  type: 'police' | 'federal' | 'sheriff' | 'state' | 'international';
  jurisdiction: string;
  contact: string;
  status: 'online' | 'offline' | 'busy';
  lastActive: Date;
  trustLevel: number;
  casesShared: number;
  responseTime: number;
}

interface SharedCase {
  id: string;
  title: string;
  type: 'fraud' | 'cybercrime' | 'terrorism' | 'trafficking' | 'investigation';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'pending' | 'resolved' | 'closed';
  originAgency: string;
  sharedWith: string[];
  createdAt: Date;
  lastUpdate: Date;
  securityLevel: 'public' | 'restricted' | 'confidential' | 'secret';
  description: string;
  attachments: number;
}

interface Communication {
  id: string;
  type: 'message' | 'alert' | 'bulletin' | 'request' | 'update';
  subject: string;
  content: string;
  sender: string;
  recipients: string[];
  priority: 'normal' | 'high' | 'urgent';
  timestamp: Date;
  read: boolean;
  encrypted: boolean;
  classification: 'unclassified' | 'restricted' | 'confidential';
}

interface JurisdictionRequest {
  id: string;
  type: 'assistance' | 'jurisdiction' | 'extradition' | 'information';
  title: string;
  requestingAgency: string;
  targetAgency: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'approved' | 'denied' | 'in_progress' | 'completed';
  createdAt: Date;
  deadline?: Date;
}

export default function InterAgencyHub() {
  const [selectedAgency, setSelectedAgency] = useState<string>("");
  const [communicationFilter, setCommunicationFilter] = useState("all");
  const [showEncryptedOnly, setShowEncryptedOnly] = useState(false);

  const [agencies] = useState<Agency[]>([
    {
      id: "NYPD-001",
      name: "New York Police Department",
      type: "police",
      jurisdiction: "New York City",
      contact: "dispatch@nypd.gov",
      status: "online",
      lastActive: new Date(Date.now() - 300000),
      trustLevel: 95,
      casesShared: 147,
      responseTime: 12
    },
    {
      id: "FBI-NYC",
      name: "FBI New York Field Office",
      type: "federal",
      jurisdiction: "New York Region",
      contact: "nyc.field@fbi.gov",
      status: "online",
      lastActive: new Date(Date.now() - 180000),
      trustLevel: 98,
      casesShared: 89,
      responseTime: 8
    },
    {
      id: "STATE-NY",
      name: "New York State Police",
      type: "state",
      jurisdiction: "New York State",
      contact: "central@nysp.ny.gov",
      status: "busy",
      lastActive: new Date(Date.now() - 600000),
      trustLevel: 92,
      casesShared: 203,
      responseTime: 15
    },
    {
      id: "SHERIFF-MAN",
      name: "Manhattan Sheriff's Office",
      type: "sheriff",
      jurisdiction: "Manhattan County",
      contact: "operations@manhattansheriff.org",
      status: "online",
      lastActive: new Date(Date.now() - 120000),
      trustLevel: 88,
      casesShared: 67,
      responseTime: 18
    },
    {
      id: "INTERPOL-NY",
      name: "INTERPOL New York",
      type: "international",
      jurisdiction: "International",
      contact: "ny.bureau@interpol.int",
      status: "offline",
      lastActive: new Date(Date.now() - 3600000),
      trustLevel: 96,
      casesShared: 23,
      responseTime: 45
    }
  ]);

  const [sharedCases] = useState<SharedCase[]>([
    {
      id: "SC-2024-0891",
      title: "Multi-Jurisdictional Fraud Investigation",
      type: "fraud",
      priority: "high",
      status: "active",
      originAgency: "NYPD-001",
      sharedWith: ["FBI-NYC", "STATE-NY"],
      createdAt: new Date(Date.now() - 7200000),
      lastUpdate: new Date(Date.now() - 1800000),
      securityLevel: "confidential",
      description: "Coordinated investigation into financial fraud ring operating across state lines",
      attachments: 15
    },
    {
      id: "SC-2024-0892",
      title: "Cybercrime Task Force Operation",
      type: "cybercrime",
      priority: "critical",
      status: "active",
      originAgency: "FBI-NYC",
      sharedWith: ["NYPD-001", "STATE-NY", "INTERPOL-NY"],
      createdAt: new Date(Date.now() - 14400000),
      lastUpdate: new Date(Date.now() - 900000),
      securityLevel: "secret",
      description: "International cybercrime network targeting financial institutions",
      attachments: 28
    },
    {
      id: "SC-2024-0893",
      title: "Regional Drug Trafficking Investigation",
      type: "trafficking",
      priority: "medium",
      status: "pending",
      originAgency: "STATE-NY",
      sharedWith: ["SHERIFF-MAN", "NYPD-001"],
      createdAt: new Date(Date.now() - 21600000),
      lastUpdate: new Date(Date.now() - 3600000),
      securityLevel: "restricted",
      description: "Multi-county drug trafficking operation requires coordinated response",
      attachments: 9
    }
  ]);

  const [communications] = useState<Communication[]>([
    {
      id: "COM-2024-5891",
      type: "alert",
      subject: "BOLO: Suspect Vehicle - Multi-State Alert",
      content: "All units be advised: Suspect vehicle license plate ABC-1234, last seen heading north on I-95. Armed and dangerous.",
      sender: "FBI-NYC",
      recipients: ["NYPD-001", "STATE-NY", "SHERIFF-MAN"],
      priority: "urgent",
      timestamp: new Date(Date.now() - 900000),
      read: false,
      encrypted: true,
      classification: "restricted"
    },
    {
      id: "COM-2024-5892",
      type: "update",
      subject: "Case Update: Financial Fraud Investigation",
      content: "Significant progress made in SC-2024-0891. Three arrests made this morning. Requesting analysis of seized computers.",
      sender: "NYPD-001",
      recipients: ["FBI-NYC", "STATE-NY"],
      priority: "high",
      timestamp: new Date(Date.now() - 1800000),
      read: true,
      encrypted: true,
      classification: "confidential"
    },
    {
      id: "COM-2024-5893",
      type: "request",
      subject: "Request for Technical Assistance",
      content: "Need digital forensics support for cybercrime investigation. Time-sensitive evidence requires immediate analysis.",
      sender: "SHERIFF-MAN",
      recipients: ["FBI-NYC"],
      priority: "high",
      timestamp: new Date(Date.now() - 3600000),
      read: true,
      encrypted: false,
      classification: "unclassified"
    },
    {
      id: "COM-2024-5894",
      type: "bulletin",
      subject: "Weekly Intelligence Bulletin",
      content: "Regional crime trends analysis for the week ending December 15, 2024. Notable increase in financial fraud cases.",
      sender: "STATE-NY",
      recipients: ["NYPD-001", "FBI-NYC", "SHERIFF-MAN"],
      priority: "normal",
      timestamp: new Date(Date.now() - 7200000),
      read: true,
      encrypted: false,
      classification: "unclassified"
    }
  ]);

  const [jurisdictionRequests] = useState<JurisdictionRequest[]>([
    {
      id: "JR-2024-0234",
      type: "assistance",
      title: "Request for Tactical Support",
      requestingAgency: "SHERIFF-MAN",
      targetAgency: "NYPD-001",
      description: "High-risk warrant execution requires additional tactical personnel and equipment",
      priority: "high",
      status: "approved",
      createdAt: new Date(Date.now() - 3600000),
      deadline: new Date(Date.now() + 21600000)
    },
    {
      id: "JR-2024-0235",
      type: "jurisdiction",
      title: "Cross-Border Investigation Authority",
      requestingAgency: "NYPD-001",
      targetAgency: "STATE-NY",
      description: "Request permission to operate in state jurisdiction for ongoing fraud investigation",
      priority: "medium",
      status: "pending",
      createdAt: new Date(Date.now() - 7200000),
      deadline: new Date(Date.now() + 86400000)
    },
    {
      id: "JR-2024-0236",
      type: "information",
      title: "Intelligence Sharing Request",
      requestingAgency: "FBI-NYC",
      targetAgency: "INTERPOL-NY",
      description: "Need access to international criminal database for cybercrime investigation",
      priority: "urgent",
      status: "in_progress",
      createdAt: new Date(Date.now() - 1800000)
    }
  ]);

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': case 'active': case 'approved': case 'completed': return 'bg-green-500';
      case 'busy': case 'pending': case 'in_progress': return 'bg-yellow-500';
      case 'offline': case 'denied': case 'closed': return 'bg-red-500';
      case 'resolved': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': case 'normal': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSecurityLevelColor = (level: string) => {
    switch (level) {
      case 'secret': return 'bg-red-500';
      case 'confidential': return 'bg-orange-500';
      case 'restricted': return 'bg-yellow-500';
      case 'public': case 'unclassified': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getAgencyTypeIcon = (type: string) => {
    switch (type) {
      case 'federal': return '🏛️';
      case 'state': return '🏢';
      case 'police': return '👮';
      case 'sheriff': return '⭐';
      case 'international': return '🌍';
      default: return '🛡️';
    }
  };

  const filteredCommunications = communications.filter(comm => {
    if (communicationFilter === 'all') return true;
    if (communicationFilter === 'unread') return !comm.read;
    if (communicationFilter === 'urgent') return comm.priority === 'urgent';
    if (communicationFilter === 'encrypted') return comm.encrypted;
    return comm.type === communicationFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              Inter-Agency Collaboration Hub
            </h1>
            <p className="text-slate-600">Secure communication and coordination platform for regional law enforcement</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Label htmlFor="encrypted">Encrypted Only</Label>
              <Switch
                id="encrypted"
                checked={showEncryptedOnly}
                onCheckedChange={setShowEncryptedOnly}
              />
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Communication
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Security Settings
            </Button>
          </div>
        </div>

        {/* Security Status Alert */}
        <Alert className="border-l-4 border-l-green-500 bg-green-50">
          <Shield className="h-4 w-4" />
          <AlertTitle className="flex items-center justify-between">
            <span>Secure Network Status</span>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <Badge className="bg-green-500">Encrypted & Operational</Badge>
            </div>
          </AlertTitle>
          <AlertDescription>
            All communications are end-to-end encrypted. Security clearance verified for {agencies.filter(a => a.status === 'online').length} connected agencies.
          </AlertDescription>
        </Alert>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Connected Agencies</CardTitle>
              <Network className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {agencies.filter(a => a.status === 'online').length}
              </div>
              <p className="text-xs text-slate-600">
                of {agencies.length} total agencies
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
              <FileText className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sharedCases.filter(c => c.status === 'active').length}
              </div>
              <p className="text-xs text-slate-600">Shared investigations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Communications</CardTitle>
              <MessageSquare className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {communications.filter(c => !c.read).length}
              </div>
              <p className="text-xs text-slate-600">Unread messages</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Time</CardTitle>
              <Clock className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {Math.round(agencies.reduce((acc, a) => acc + a.responseTime, 0) / agencies.length)}min
              </div>
              <p className="text-xs text-slate-600">Average response</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="agencies" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="agencies">Partner Agencies</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
            <TabsTrigger value="cases">Shared Cases</TabsTrigger>
            <TabsTrigger value="requests">Jurisdiction Requests</TabsTrigger>
            <TabsTrigger value="directory">Global Directory</TabsTrigger>
          </TabsList>

          <TabsContent value="agencies" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Partner Law Enforcement Agencies</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Agency
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Refresh Status
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {agencies.map((agency) => (
                <Card key={agency.id} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getAgencyTypeIcon(agency.type)}</span>
                        <div>
                          <CardTitle className="text-base">{agency.name}</CardTitle>
                          <CardDescription>{agency.jurisdiction}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getStatusColor(agency.status)}>
                        {agency.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-slate-600">Trust Level</div>
                          <div className="font-medium flex items-center gap-1">
                            {agency.trustLevel}%
                            <div className="w-12 bg-slate-200 rounded-full h-1">
                              <div
                                className="bg-green-500 h-1 rounded-full"
                                style={{width: `${agency.trustLevel}%`}}
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-600">Response Time</div>
                          <div className="font-medium">{agency.responseTime}min avg</div>
                        </div>
                      </div>

                      <div className="text-sm">
                        <div className="text-slate-600">Cases Shared</div>
                        <div className="font-medium">{agency.casesShared} active collaborations</div>
                      </div>

                      <div className="text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Last active: {formatTimeAgo(agency.lastActive)}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Mail className="h-3 w-3" />
                          {agency.contact}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-3 w-3 mr-1" />
                          Share Case
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="communications" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Secure Communications</h3>
              <div className="flex items-center gap-2">
                <Select value={communicationFilter} onValueChange={setCommunicationFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Messages</SelectItem>
                    <SelectItem value="unread">Unread</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="alert">Alerts</SelectItem>
                    <SelectItem value="encrypted">Encrypted Only</SelectItem>
                  </SelectContent>
                </Select>
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  New Message
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredCommunications.map((comm) => (
                <Card key={comm.id} className={`border-l-4 ${comm.read ? 'border-l-gray-300' : 'border-l-blue-500'} ${!comm.read ? 'bg-blue-50' : ''}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {comm.subject}
                          {comm.encrypted && <Lock className="h-4 w-4 text-green-600" />}
                          {!comm.read && <Badge variant="secondary">New</Badge>}
                        </CardTitle>
                        <CardDescription>
                          From: {comm.sender} • To: {comm.recipients.join(', ')} • {formatTimeAgo(comm.timestamp)}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(comm.priority)}>
                          {comm.priority.toUpperCase()}
                        </Badge>
                        <Badge className={getSecurityLevelColor(comm.classification)}>
                          {comm.classification.toUpperCase()}
                        </Badge>
                        <Badge className={`${comm.type === 'alert' ? 'bg-red-500' : comm.type === 'bulletin' ? 'bg-blue-500' : 'bg-gray-500'}`}>
                          {comm.type.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-slate-700">{comm.content}</p>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          Read Full
                        </Button>
                        <Button size="sm" variant="outline">
                          <Send className="h-3 w-3 mr-1" />
                          Reply
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-3 w-3 mr-1" />
                          Forward
                        </Button>
                        <Button size="sm" variant="outline">
                          <Archive className="h-3 w-3 mr-1" />
                          Archive
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cases" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Shared Investigation Cases</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter by Status
                </Button>
                <Button>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share New Case
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {sharedCases.map((case_) => (
                <Card key={case_.id} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{case_.title}</CardTitle>
                        <CardDescription>
                          {case_.id} • Origin: {case_.originAgency} • Last Update: {formatTimeAgo(case_.lastUpdate)}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(case_.priority)}>
                          {case_.priority.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(case_.status)}>
                          {case_.status.toUpperCase()}
                        </Badge>
                        <Badge className={getSecurityLevelColor(case_.securityLevel)}>
                          {case_.securityLevel.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-slate-700">{case_.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-slate-600">Case Type</div>
                          <div className="font-medium capitalize">{case_.type}</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Shared With</div>
                          <div className="font-medium">{case_.sharedWith.length} agencies</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Attachments</div>
                          <div className="font-medium">{case_.attachments} files</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Created</div>
                          <div className="font-medium">{formatTimeAgo(case_.createdAt)}</div>
                        </div>
                      </div>

                      <div className="border-t pt-3">
                        <div className="text-sm text-slate-600 mb-2">Collaborating Agencies:</div>
                        <div className="flex flex-wrap gap-2">
                          {case_.sharedWith.map((agencyId) => (
                            <Badge key={agencyId} variant="outline">
                              {agencies.find(a => a.id === agencyId)?.name || agencyId}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View Case File
                        </Button>
                        <Button size="sm" variant="outline">
                          <Upload className="h-3 w-3 mr-1" />
                          Add Evidence
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Case Discussion
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-3 w-3 mr-1" />
                          Expand Sharing
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Jurisdiction & Assistance Requests</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Incoming Requests</CardTitle>
                  <CardDescription>Requests from other agencies requiring your response</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {jurisdictionRequests.filter(req => req.targetAgency === "NYPD-001").map((request) => (
                      <div key={request.id} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{request.title}</h4>
                          <div className="flex items-center gap-2">
                            <Badge className={getPriorityColor(request.priority)}>
                              {request.priority.toUpperCase()}
                            </Badge>
                            <Badge className={getStatusColor(request.status)}>
                              {request.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{request.description}</p>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>From: {request.requestingAgency}</span>
                          <span>{formatTimeAgo(request.createdAt)}</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline">
                            <Info className="h-3 w-3 mr-1" />
                            More Info
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Outgoing Requests</CardTitle>
                  <CardDescription>Your requests to other agencies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {jurisdictionRequests.filter(req => req.requestingAgency === "NYPD-001").map((request) => (
                      <div key={request.id} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{request.title}</h4>
                          <div className="flex items-center gap-2">
                            <Badge className={getPriorityColor(request.priority)}>
                              {request.priority.toUpperCase()}
                            </Badge>
                            <Badge className={getStatusColor(request.status)}>
                              {request.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{request.description}</p>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>To: {request.targetAgency}</span>
                          <span>{formatTimeAgo(request.createdAt)}</span>
                        </div>
                        {request.deadline && (
                          <div className="text-xs text-orange-600 mt-1">
                            Deadline: {request.deadline.toLocaleDateString()}
                          </div>
                        )}
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            Track Status
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Follow Up
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="directory" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Global Law Enforcement Directory
                    </CardTitle>
                    <CardDescription>Search and connect with law enforcement agencies worldwide</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input placeholder="Search agencies, jurisdictions, or specialties..." className="flex-1" />
                        <Button variant="outline">
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>

                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Agency</TableHead>
                            <TableHead>Jurisdiction</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {agencies.map((agency) => (
                            <TableRow key={agency.id}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">{getAgencyTypeIcon(agency.type)}</span>
                                  <div>
                                    <div className="font-medium">{agency.name}</div>
                                    <div className="text-xs text-slate-500">{agency.id}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{agency.jurisdiction}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{agency.type}</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(agency.status)}>
                                  {agency.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  <Button size="sm" variant="outline">
                                    <MessageSquare className="h-3 w-3" />
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <UserCheck className="h-3 w-3" />
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <ExternalLink className="h-3 w-3" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Connect</CardTitle>
                    <CardDescription>Frequently contacted agencies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {agencies.slice(0, 3).map((agency) => (
                        <Button key={agency.id} variant="outline" size="sm" className="w-full justify-start">
                          <span className="mr-2">{getAgencyTypeIcon(agency.type)}</span>
                          {agency.name}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Network Statistics</CardTitle>
                    <CardDescription>Inter-agency collaboration metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Total Agencies:</span>
                        <span className="font-medium">{agencies.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Active Collaborations:</span>
                        <span className="font-medium">{sharedCases.filter(c => c.status === 'active').length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Messages Exchanged:</span>
                        <span className="font-medium">{communications.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Avg Response Time:</span>
                        <span className="font-medium">
                          {Math.round(agencies.reduce((acc, a) => acc + a.responseTime, 0) / agencies.length)}min
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
