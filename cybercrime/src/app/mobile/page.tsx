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
import {
  Smartphone,
  MapPin,
  Camera,
  Mic,
  Radio,
  Shield,
  Users,
  Navigation as NavigationIcon,
  Clock,
  Battery,
  Wifi,
  WifiOff,
  Upload,
  Download,
  FileText,
  Image,
  Video,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Send,
  MessageSquare,
  Phone,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Share,
  Lock,
  Unlock,
  Compass,
  Target,
  Activity,
  Signal,
  SatelliteIcon
} from "lucide-react";

interface FieldOfficer {
  id: string;
  name: string;
  badge: string;
  unit: string;
  location: {lat: number, lng: number};
  address: string;
  status: 'active' | 'patrol' | 'responding' | 'offline';
  lastUpdate: Date;
  battery: number;
  connectivity: 'online' | 'offline' | 'limited';
}

interface FieldReport {
  id: string;
  type: 'incident' | 'patrol' | 'investigation' | 'evidence';
  title: string;
  description: string;
  location: {lat: number, lng: number};
  address: string;
  officerId: string;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'draft' | 'submitted' | 'synced' | 'reviewed';
  attachments: Array<{type: 'photo' | 'video' | 'audio' | 'document'; name: string; size: number}>;
}

interface Evidence {
  id: string;
  type: 'photo' | 'video' | 'audio' | 'document';
  description: string;
  location: {lat: number, lng: number};
  timestamp: Date;
  officerId: string;
  caseId?: string;
  status: 'captured' | 'uploading' | 'synced' | 'verified';
  size: number;
  gpsAccuracy: number;
}

export default function MobileOperations() {
  const [selectedOfficer, setSelectedOfficer] = useState<string>("");
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline' | 'limited'>('online');
  const [gpsEnabled, setGpsEnabled] = useState(true);
  const [autoSync, setAutoSync] = useState(true);

  const [fieldOfficers] = useState<FieldOfficer[]>([
    {
      id: "OFF-1234",
      name: "Det. John Doe",
      badge: "1234",
      unit: "Unit Alpha-7",
      location: {lat: 40.7128, lng: -74.0060},
      address: "Financial District, Manhattan",
      status: "active",
      lastUpdate: new Date(Date.now() - 180000),
      battery: 87,
      connectivity: "online"
    },
    {
      id: "OFF-2567",
      name: "Sgt. Sarah Connor",
      badge: "2567",
      unit: "Unit Beta-3",
      location: {lat: 40.7580, lng: -73.9855},
      address: "Times Square, Manhattan",
      status: "patrol",
      lastUpdate: new Date(Date.now() - 300000),
      battery: 62,
      connectivity: "limited"
    },
    {
      id: "OFF-3891",
      name: "Off. Mike Johnson",
      badge: "3891",
      unit: "Unit Gamma-1",
      location: {lat: 40.6892, lng: -74.0445},
      address: "Brooklyn Heights",
      status: "responding",
      lastUpdate: new Date(Date.now() - 120000),
      battery: 45,
      connectivity: "online"
    },
    {
      id: "OFF-4672",
      name: "Det. Emma Wilson",
      badge: "4672",
      unit: "Unit Delta-5",
      location: {lat: 40.7831, lng: -73.9712},
      address: "Upper East Side",
      status: "offline",
      lastUpdate: new Date(Date.now() - 1800000),
      battery: 23,
      connectivity: "offline"
    }
  ]);

  const [fieldReports] = useState<FieldReport[]>([
    {
      id: "FR-2024-1847",
      type: "incident",
      title: "Suspicious Activity Report",
      description: "Multiple individuals observed conducting financial transactions outside normal business hours",
      location: {lat: 40.7128, lng: -74.0060},
      address: "125 Wall Street, Manhattan",
      officerId: "OFF-1234",
      timestamp: new Date(Date.now() - 3600000),
      priority: "high",
      status: "synced",
      attachments: [
        {type: "photo", name: "suspect_vehicle.jpg", size: 2450000},
        {type: "video", name: "activity_recording.mp4", size: 45670000}
      ]
    },
    {
      id: "FR-2024-1848",
      type: "patrol",
      title: "Routine Patrol Log",
      description: "Standard patrol of assigned sector, no incidents reported",
      location: {lat: 40.7580, lng: -73.9855},
      address: "Times Square Area",
      officerId: "OFF-2567",
      timestamp: new Date(Date.now() - 7200000),
      priority: "low",
      status: "reviewed",
      attachments: []
    },
    {
      id: "FR-2024-1849",
      type: "investigation",
      title: "Follow-up Investigation",
      description: "Investigating leads from previous fraud case, collecting additional evidence",
      location: {lat: 40.6892, lng: -74.0445},
      address: "Corporate Building, Brooklyn",
      officerId: "OFF-3891",
      timestamp: new Date(Date.now() - 1800000),
      priority: "medium",
      status: "submitted",
      attachments: [
        {type: "document", name: "interview_notes.pdf", size: 1250000},
        {type: "audio", name: "statement_recording.mp3", size: 8900000}
      ]
    }
  ]);

  const [evidenceItems] = useState<Evidence[]>([
    {
      id: "EV-M-2024-0341",
      type: "photo",
      description: "Surveillance camera location showing clear view of incident",
      location: {lat: 40.7128, lng: -74.0060},
      timestamp: new Date(Date.now() - 900000),
      officerId: "OFF-1234",
      caseId: "FR-2024-0891",
      status: "synced",
      size: 3450000,
      gpsAccuracy: 3.2
    },
    {
      id: "EV-M-2024-0342",
      type: "video",
      description: "Mobile recording of suspect behavior and vehicle identification",
      location: {lat: 40.7128, lng: -74.0060},
      timestamp: new Date(Date.now() - 1200000),
      officerId: "OFF-1234",
      caseId: "FR-2024-0891",
      status: "uploading",
      size: 67890000,
      gpsAccuracy: 2.8
    },
    {
      id: "EV-M-2024-0343",
      type: "audio",
      description: "Witness statement recorded on-scene",
      location: {lat: 40.6892, lng: -74.0445},
      timestamp: new Date(Date.now() - 1800000),
      officerId: "OFF-3891",
      status: "captured",
      size: 12450000,
      gpsAccuracy: 4.1
    }
  ]);

  // Simulate connection status changes
  useEffect(() => {
    const interval = setInterval(() => {
      const statuses: Array<'online' | 'offline' | 'limited'> = ['online', 'online', 'online', 'limited', 'offline'];
      setConnectionStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'online': case 'synced': case 'verified': return 'bg-green-500';
      case 'patrol': case 'limited': case 'uploading': case 'submitted': return 'bg-blue-500';
      case 'responding': case 'captured': case 'draft': return 'bg-yellow-500';
      case 'offline': case 'tampered': return 'bg-red-500';
      case 'reviewed': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getConnectivityIcon = (connectivity: string) => {
    switch (connectivity) {
      case 'online': return <Wifi className="h-4 w-4 text-green-500" />;
      case 'limited': return <Signal className="h-4 w-4 text-yellow-500" />;
      case 'offline': return <WifiOff className="h-4 w-4 text-red-500" />;
      default: return <WifiOff className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Smartphone className="h-8 w-8 text-blue-600" />
              Mobile Field Operations
            </h1>
            <p className="text-slate-600">Real-time field data collection, GPS tracking, and officer coordination</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Label htmlFor="gps">GPS Tracking</Label>
              <Switch
                id="gps"
                checked={gpsEnabled}
                onCheckedChange={setGpsEnabled}
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="sync">Auto Sync</Label>
              <Switch
                id="sync"
                checked={autoSync}
                onCheckedChange={setAutoSync}
              />
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Report
            </Button>
          </div>
        </div>

        {/* Connection Status */}
        <Alert className={`border-l-4 ${connectionStatus === 'online' ? 'border-l-green-500 bg-green-50' : connectionStatus === 'limited' ? 'border-l-yellow-500 bg-yellow-50' : 'border-l-red-500 bg-red-50'}`}>
          {getConnectivityIcon(connectionStatus)}
          <AlertTitle className="flex items-center justify-between">
            <span>Network Status: {connectionStatus.toUpperCase()}</span>
            <div className="flex items-center gap-2">
              {gpsEnabled && <MapPin className="h-4 w-4 text-green-500" />}
              <Badge className={getStatusColor(connectionStatus)}>
                {connectionStatus === 'online' ? 'Real-time Sync' : connectionStatus === 'limited' ? 'Limited Connectivity' : 'Offline Mode'}
              </Badge>
            </div>
          </AlertTitle>
          <AlertDescription>
            {connectionStatus === 'online' && "All systems operational. Real-time data synchronization active."}
            {connectionStatus === 'limited' && "Limited connectivity detected. Some features may be delayed."}
            {connectionStatus === 'offline' && "Operating in offline mode. Data will sync when connection is restored."}
          </AlertDescription>
        </Alert>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Officers</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {fieldOfficers.filter(o => o.status !== 'offline').length}
              </div>
              <p className="text-xs text-slate-600">Currently deployed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
              <FileText className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {fieldReports.filter(r => r.status === 'draft' || r.status === 'submitted').length}
              </div>
              <p className="text-xs text-slate-600">Awaiting sync/review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Evidence Captured</CardTitle>
              <Camera className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{evidenceItems.length}</div>
              <p className="text-xs text-slate-600">Photos, videos, audio</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">GPS Accuracy</CardTitle>
              <NavigationIcon className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {gpsEnabled ? '2.8m' : 'OFF'}
              </div>
              <p className="text-xs text-slate-600">Average precision</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="officers" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="officers">Field Officers</TabsTrigger>
            <TabsTrigger value="reports">Field Reports</TabsTrigger>
            <TabsTrigger value="evidence">Evidence Collection</TabsTrigger>
            <TabsTrigger value="communication">Communications</TabsTrigger>
            <TabsTrigger value="mapping">Live Mapping</TabsTrigger>
          </TabsList>

          <TabsContent value="officers" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Active Field Officers</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter by Status
                </Button>
                <Button variant="outline" size="sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  View on Map
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fieldOfficers.map((officer) => (
                <Card key={officer.id} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{officer.name}</CardTitle>
                        <CardDescription>
                          Badge #{officer.badge} • {officer.unit}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(officer.status)}>
                          {officer.status.toUpperCase()}
                        </Badge>
                        {getConnectivityIcon(officer.connectivity)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-3 w-3 text-slate-500" />
                        <span className="text-slate-600">{officer.address}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-3 w-3 text-slate-500" />
                        <span className="text-slate-600">Last update: {formatTimeAgo(officer.lastUpdate)}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Battery className="h-4 w-4 text-slate-500" />
                          <span className="text-sm">{officer.battery}%</span>
                        </div>
                        <div className={`h-2 w-16 rounded-full ${officer.battery > 50 ? 'bg-green-200' : officer.battery > 20 ? 'bg-yellow-200' : 'bg-red-200'}`}>
                          <div
                            className={`h-full rounded-full ${officer.battery > 50 ? 'bg-green-500' : officer.battery > 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{width: `${officer.battery}%`}}
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline">
                          <Target className="h-3 w-3 mr-1" />
                          Track
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Field Reports</h3>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Reports</SelectItem>
                    <SelectItem value="incident">Incidents</SelectItem>
                    <SelectItem value="patrol">Patrol Logs</SelectItem>
                    <SelectItem value="investigation">Investigations</SelectItem>
                  </SelectContent>
                </Select>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Report
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {fieldReports.map((report) => (
                <Card key={report.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                        <CardDescription>
                          {report.id} • {report.type.toUpperCase()} • Officer {report.officerId}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(report.priority)}>
                          {report.priority.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-slate-700">{report.description}</p>

                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {report.address}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTimeAgo(report.timestamp)}
                        </div>
                      </div>

                      {report.attachments.length > 0 && (
                        <div className="border-t pt-3">
                          <p className="text-sm font-medium text-slate-700 mb-2">Attachments ({report.attachments.length}):</p>
                          <div className="flex flex-wrap gap-2">
                            {report.attachments.map((attachment, index) => (
                              <div key={index} className="flex items-center gap-1 text-xs bg-slate-100 px-2 py-1 rounded">
                                {attachment.type === 'photo' && <Image className="h-3 w-3" />}
                                {attachment.type === 'video' && <Video className="h-3 w-3" />}
                                {attachment.type === 'audio' && <Mic className="h-3 w-3" />}
                                {attachment.type === 'document' && <FileText className="h-3 w-3" />}
                                <span>{attachment.name}</span>
                                <span className="text-slate-500">({formatFileSize(attachment.size)})</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        <Button size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        {report.status === 'draft' && (
                          <Button size="sm" variant="outline">
                            <Send className="h-3 w-3 mr-1" />
                            Submit
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Share className="h-3 w-3 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="evidence" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Evidence Collection</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-1" />
                  Sync All
                </Button>
                <Button>
                  <Camera className="h-4 w-4 mr-2" />
                  Capture Evidence
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {evidenceItems.map((evidence) => (
                <Card key={evidence.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {evidence.type === 'photo' && <Image className="h-4 w-4" />}
                        {evidence.type === 'video' && <Video className="h-4 w-4" />}
                        {evidence.type === 'audio' && <Mic className="h-4 w-4" />}
                        {evidence.type === 'document' && <FileText className="h-4 w-4" />}
                        <CardTitle className="text-base">{evidence.id}</CardTitle>
                      </div>
                      <Badge className={getStatusColor(evidence.status)}>
                        {evidence.status.toUpperCase()}
                      </Badge>
                    </div>
                    <CardDescription>
                      Officer {evidence.officerId} • {evidence.caseId || 'Unassigned'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-slate-700">{evidence.description}</p>

                      <div className="text-xs text-slate-600 space-y-1">
                        <div className="flex justify-between">
                          <span>Size:</span>
                          <span>{formatFileSize(evidence.size)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>GPS Accuracy:</span>
                          <span>{evidence.gpsAccuracy.toFixed(1)}m</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Captured:</span>
                          <span>{formatTimeAgo(evidence.timestamp)}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                        {evidence.status === 'captured' && (
                          <Button size="sm" variant="outline">
                            <Upload className="h-3 w-3 mr-1" />
                            Upload
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Lock className="h-3 w-3 mr-1" />
                          Secure
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="communication" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Radio className="h-5 w-5" />
                    Tactical Communications
                  </CardTitle>
                  <CardDescription>Secure channel management and dispatch coordination</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Channel Alpha</div>
                        <div className="text-sm text-slate-600">Primary Dispatch</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-500">Active</Badge>
                        <Button size="sm" variant="outline">Join</Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Channel Bravo</div>
                        <div className="text-sm text-slate-600">Investigation Team</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-500">Standby</Badge>
                        <Button size="sm" variant="outline">Join</Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Channel Charlie</div>
                        <div className="text-sm text-slate-600">Emergency Response</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-red-500">Emergency</Badge>
                        <Button size="sm" variant="outline">Join</Button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Quick Actions</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Emergency Alert
                      </Button>
                      <Button variant="outline" size="sm">
                        <Users className="h-3 w-3 mr-1" />
                        Request Backup
                      </Button>
                      <Button variant="outline" size="sm">
                        <Send className="h-3 w-3 mr-1" />
                        Status Update
                      </Button>
                      <Button variant="outline" size="sm">
                        <MapPin className="h-3 w-3 mr-1" />
                        Share Location
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Recent Messages
                  </CardTitle>
                  <CardDescription>Inter-officer communications and dispatch updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    <div className="border-l-4 border-l-red-500 pl-3 py-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">Emergency Dispatch</span>
                        <span className="text-xs text-slate-500">2m ago</span>
                      </div>
                      <p className="text-sm text-slate-600">All units, be advised: BOLO for suspect vehicle, license plate ABC-1234</p>
                    </div>

                    <div className="border-l-4 border-l-blue-500 pl-3 py-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">Sgt. Connor (Unit Beta-3)</span>
                        <span className="text-xs text-slate-500">5m ago</span>
                      </div>
                      <p className="text-sm text-slate-600">Requesting backup at Times Square location, suspicious activity confirmed</p>
                    </div>

                    <div className="border-l-4 border-l-green-500 pl-3 py-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">Off. Johnson (Unit Gamma-1)</span>
                        <span className="text-xs text-slate-500">8m ago</span>
                      </div>
                      <p className="text-sm text-slate-600">En route to assist, ETA 3 minutes</p>
                    </div>

                    <div className="border-l-4 border-l-purple-500 pl-3 py-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">Detective Doe (Unit Alpha-7)</span>
                        <span className="text-xs text-slate-500">12m ago</span>
                      </div>
                      <p className="text-sm text-slate-600">Evidence collection complete, proceeding to next location</p>
                    </div>
                  </div>

                  <div className="border-t mt-4 pt-4">
                    <div className="flex gap-2">
                      <Input placeholder="Type message..." className="flex-1" />
                      <Button size="sm">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mapping" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Live Tactical Map
                    </CardTitle>
                    <CardDescription>Real-time officer positions and incident locations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96 bg-slate-100 rounded flex items-center justify-center text-slate-500">
                      [Interactive Map View]
                      <div className="text-center">
                        <MapPin className="h-12 w-12 mx-auto mb-2 text-slate-400" />
                        <p>Live GPS tracking of field officers</p>
                        <p className="text-sm">Incident markers and evidence locations</p>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Compass className="h-3 w-3 mr-1" />
                        Center Map
                      </Button>
                      <Button variant="outline" size="sm">
                        <SatelliteIcon className="h-3 w-3 mr-1" />
                        Satellite View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Target className="h-3 w-3 mr-1" />
                        Track All Units
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>GPS Status</CardTitle>
                    <CardDescription>Location accuracy and satellite connectivity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">GPS Signal:</span>
                        <span className="text-sm font-medium text-green-600">Strong</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Satellites:</span>
                        <span className="text-sm font-medium">12/12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Accuracy:</span>
                        <span className="text-sm font-medium">2.8m</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Last Update:</span>
                        <span className="text-sm font-medium">Just now</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Active Incidents</CardTitle>
                    <CardDescription>Current incidents on the map</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2 border rounded">
                        <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">Fraud Investigation</div>
                          <div className="text-xs text-slate-600">Wall Street</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 border rounded">
                        <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">Suspicious Activity</div>
                          <div className="text-xs text-slate-600">Times Square</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 border rounded">
                        <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">Routine Patrol</div>
                          <div className="text-xs text-slate-600">Brooklyn Heights</div>
                        </div>
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
