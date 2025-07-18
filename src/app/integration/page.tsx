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
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Network,
  Server,
  Database,
  Globe,
  Shield,
  Zap,
  Activity,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Plus,
  Search,
  Filter,
  Download,
  Settings,
  RefreshCw,
  Eye,
  Edit,
  Link2,
  Unlink,
  Bell,
  Clock,
  Building,
  Cloud,
  Smartphone,
  Monitor,
  Key,
  Lock,
  Wifi,
  Router,
  HardDrive,
  Cpu,
  MemoryStick
} from "lucide-react";

interface SystemIntegration {
  id: string;
  name: string;
  type: 'database' | 'api' | 'service' | 'platform' | 'hardware' | 'cloud';
  category: 'law_enforcement' | 'government' | 'financial' | 'telecom' | 'social_media' | 'forensic';
  status: 'connected' | 'connecting' | 'disconnected' | 'error' | 'maintenance';
  health: number; // 0-100
  description: string;
  endpoint: string;
  lastSync: Date;
  dataExchanged: number; // MB
  requestsPerDay: number;
  uptime: number; // percentage
  latency: number; // ms
  securityLevel: 'low' | 'medium' | 'high' | 'critical';
  protocol: 'REST' | 'SOAP' | 'GraphQL' | 'Webhook' | 'Database' | 'FTP';
  authentication: 'API_KEY' | 'OAuth2' | 'JWT' | 'Certificate' | 'Basic' | 'Custom';
}

interface IntegrationLog {
  id: string;
  integrationId: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error' | 'success';
  event: string;
  message: string;
  details?: any;
}

interface DataFlow {
  id: string;
  name: string;
  source: string;
  destination: string;
  dataType: string;
  frequency: 'real-time' | 'hourly' | 'daily' | 'weekly' | 'manual';
  status: 'active' | 'paused' | 'failed';
  recordsProcessed: number;
  lastRun: Date;
  nextRun?: Date;
}

export default function SystemIntegration() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [realTimeMonitoring, setRealTimeMonitoring] = useState(true);

  const integrations: SystemIntegration[] = [
    {
      id: "INT-001",
      name: "PNG Police PIMS",
      type: "database",
      category: "law_enforcement",
      status: "connected",
      health: 98.5,
      description: "Police Integrated Management System - Officer records, case assignments, and operational data",
      endpoint: "https://pims.pngpolice.gov.pg/api/v2",
      lastSync: new Date(Date.now() - 300000), // 5 min ago
      dataExchanged: 2847.5,
      requestsPerDay: 15420,
      uptime: 99.2,
      latency: 125,
      securityLevel: "critical",
      protocol: "REST",
      authentication: "JWT"
    },
    {
      id: "INT-002",
      name: "Central Bank AUSTRAC",
      type: "api",
      category: "financial",
      status: "connected",
      health: 94.2,
      description: "Australian Transaction Reports and Analysis Centre - Financial intelligence and AML compliance",
      endpoint: "https://api.austrac.gov.au/fintrac/v1",
      lastSync: new Date(Date.now() - 900000), // 15 min ago
      dataExchanged: 892.1,
      requestsPerDay: 4230,
      uptime: 97.8,
      latency: 245,
      securityLevel: "critical",
      protocol: "REST",
      authentication: "Certificate"
    },
    {
      id: "INT-003",
      name: "Meta Law Enforcement",
      type: "api",
      category: "social_media",
      status: "connected",
      health: 91.7,
      description: "Facebook/Instagram law enforcement portal for legal data requests and emergency disclosures",
      endpoint: "https://www.facebook.com/records/api/v3",
      lastSync: new Date(Date.now() - 1800000), // 30 min ago
      dataExchanged: 156.8,
      requestsPerDay: 890,
      uptime: 96.5,
      latency: 380,
      securityLevel: "high",
      protocol: "REST",
      authentication: "OAuth2"
    },
    {
      id: "INT-004",
      name: "Digicel Data Portal",
      type: "service",
      category: "telecom",
      status: "maintenance",
      health: 75.0,
      description: "Telecommunications data requests and lawful interception platform",
      endpoint: "https://lawfulaccess.digicel.com.pg/api",
      lastSync: new Date(Date.now() - 3600000), // 1 hour ago
      dataExchanged: 445.2,
      requestsPerDay: 1200,
      uptime: 94.1,
      latency: 520,
      securityLevel: "critical",
      protocol: "SOAP",
      authentication: "Certificate"
    },
    {
      id: "INT-005",
      name: "AFIS Fingerprint Database",
      type: "database",
      category: "forensic",
      status: "connected",
      health: 99.1,
      description: "Automated Fingerprint Identification System - Biometric matching and criminal records",
      endpoint: "afis.forensics.gov.pg:5432/biodb",
      lastSync: new Date(Date.now() - 600000), // 10 min ago
      dataExchanged: 1234.7,
      requestsPerDay: 2890,
      uptime: 99.8,
      latency: 89,
      securityLevel: "critical",
      protocol: "Database",
      authentication: "Custom"
    },
    {
      id: "INT-006",
      name: "Courts Management System",
      type: "service",
      category: "government",
      status: "error",
      health: 34.2,
      description: "Judicial case management and court scheduling system integration",
      endpoint: "https://courts.justice.gov.pg/cms/api",
      lastSync: new Date(Date.now() - 7200000), // 2 hours ago
      dataExchanged: 234.5,
      requestsPerDay: 560,
      uptime: 87.3,
      latency: 890,
      securityLevel: "high",
      protocol: "REST",
      authentication: "API_KEY"
    }
  ];

  const integrationLogs: IntegrationLog[] = [
    {
      id: "LOG-001",
      integrationId: "INT-001",
      timestamp: new Date(Date.now() - 300000),
      level: "success",
      event: "Data Sync Completed",
      message: "Successfully synchronized 1,247 officer records",
      details: { records: 1247, duration: "2.3s" }
    },
    {
      id: "LOG-002",
      integrationId: "INT-006",
      timestamp: new Date(Date.now() - 450000),
      level: "error",
      event: "Connection Failed",
      message: "Unable to establish connection to Courts Management System",
      details: { error: "SSL certificate expired", code: "SSL_CERT_EXPIRED" }
    },
    {
      id: "LOG-003",
      integrationId: "INT-003",
      timestamp: new Date(Date.now() - 600000),
      level: "warning",
      event: "Rate Limit Warning",
      message: "Approaching daily API rate limit for Meta platform",
      details: { current: 850, limit: 1000, remaining: 150 }
    },
    {
      id: "LOG-004",
      integrationId: "INT-002",
      timestamp: new Date(Date.now() - 900000),
      level: "info",
      event: "Compliance Check",
      message: "AUSTRAC compliance verification completed successfully",
      details: { compliance_score: 98.5, issues: 0 }
    }
  ];

  const dataFlows: DataFlow[] = [
    {
      id: "DF-001",
      name: "Officer Assignment Sync",
      source: "PNG Police PIMS",
      destination: "ALEMS Command Center",
      dataType: "Officer Records",
      frequency: "real-time",
      status: "active",
      recordsProcessed: 15420,
      lastRun: new Date(Date.now() - 300000),
    },
    {
      id: "DF-002",
      name: "Financial Intelligence Feed",
      source: "Central Bank AUSTRAC",
      destination: "Financial Crime Module",
      dataType: "Transaction Reports",
      frequency: "hourly",
      status: "active",
      recordsProcessed: 4230,
      lastRun: new Date(Date.now() - 900000),
      nextRun: new Date(Date.now() + 2700000)
    },
    {
      id: "DF-003",
      name: "Court Case Updates",
      source: "Courts Management System",
      destination: "Case Management",
      dataType: "Case Status",
      frequency: "daily",
      status: "failed",
      recordsProcessed: 0,
      lastRun: new Date(Date.now() - 7200000),
      nextRun: new Date(Date.now() + 79200000)
    }
  ];

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const formatDataSize = (mb: number) => {
    if (mb < 1024) return `${mb.toFixed(1)} MB`;
    const gb = mb / 1024;
    if (gb < 1024) return `${gb.toFixed(1)} GB`;
    const tb = gb / 1024;
    return `${tb.toFixed(1)} TB`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': case 'active': return 'bg-green-500';
      case 'connecting': case 'paused': return 'bg-yellow-500';
      case 'disconnected': case 'failed': return 'bg-red-500';
      case 'error': return 'bg-red-600';
      case 'maintenance': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-600';
    if (health >= 70) return 'text-yellow-600';
    if (health >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const getSecurityColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'success': return 'text-green-600 bg-green-50';
      case 'info': return 'text-blue-600 bg-blue-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'database': return <Database className="h-4 w-4" />;
      case 'api': return <Globe className="h-4 w-4" />;
      case 'service': return <Server className="h-4 w-4" />;
      case 'platform': return <Monitor className="h-4 w-4" />;
      case 'hardware': return <HardDrive className="h-4 w-4" />;
      case 'cloud': return <Cloud className="h-4 w-4" />;
      default: return <Network className="h-4 w-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'law_enforcement': return <Shield className="h-4 w-4" />;
      case 'government': return <Building className="h-4 w-4" />;
      case 'financial': return <Zap className="h-4 w-4" />;
      case 'telecom': return <Smartphone className="h-4 w-4" />;
      case 'social_media': return <Globe className="h-4 w-4" />;
      case 'forensic': return <Eye className="h-4 w-4" />;
      default: return <Network className="h-4 w-4" />;
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    if (!realTimeMonitoring) return;

    const interval = setInterval(() => {
      console.log("Real-time monitoring active - checking system integrations...");
    }, 10000);

    return () => clearInterval(interval);
  }, [realTimeMonitoring]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Network className="h-8 w-8 text-green-600" />
              System Integration Hub
            </h1>
            <p className="text-slate-600">Centralized integration management and monitoring dashboard</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Label htmlFor="realtime">Real-time Monitoring</Label>
              <Switch
                id="realtime"
                checked={realTimeMonitoring}
                onCheckedChange={setRealTimeMonitoring}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configure
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Integration
            </Button>
          </div>
        </div>

        {/* System Status */}
        <Alert className={`border-l-4 ${realTimeMonitoring ? 'border-l-green-500 bg-green-50' : 'border-l-orange-500 bg-orange-50'}`}>
          <Activity className="h-4 w-4" />
          <AlertTitle>Integration Hub Status</AlertTitle>
          <AlertDescription>
            {integrations.filter(i => i.status === 'connected').length} of {integrations.length} integrations active •
            Real-time monitoring: {realTimeMonitoring ? "ENABLED" : "DISABLED"} •
            System health: 94.2%
          </AlertDescription>
        </Alert>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {integrations.filter(i => i.status === 'connected').length}
              </div>
              <p className="text-xs text-slate-600">Live integrations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Exchanged</CardTitle>
              <Database className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatDataSize(integrations.reduce((sum, i) => sum + i.dataExchanged, 0))}
              </div>
              <p className="text-xs text-slate-600">Total transferred</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">API Requests</CardTitle>
              <Activity className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {integrations.reduce((sum, i) => sum + i.requestsPerDay, 0).toLocaleString()}
              </div>
              <p className="text-xs text-slate-600">Per day</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Latency</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(integrations.reduce((sum, i) => sum + i.latency, 0) / integrations.length)}ms
              </div>
              <p className="text-xs text-slate-600">Response time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
              <Server className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {(integrations.reduce((sum, i) => sum + i.uptime, 0) / integrations.length).toFixed(1)}%
              </div>
              <p className="text-xs text-slate-600">Availability</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {integrationLogs.filter(l => l.level === 'error').length}
              </div>
              <p className="text-xs text-slate-600">Last 24h</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="integrations" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="integrations">System Integrations</TabsTrigger>
            <TabsTrigger value="dataflows">Data Flows</TabsTrigger>
            <TabsTrigger value="monitoring">Health Monitoring</TabsTrigger>
            <TabsTrigger value="logs">System Logs</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="integrations" className="space-y-4">
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search integrations..."
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
                  <SelectItem value="connected">Connected</SelectItem>
                  <SelectItem value="disconnected">Disconnected</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="law_enforcement">Law Enforcement</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="telecom">Telecom</SelectItem>
                  <SelectItem value="social_media">Social Media</SelectItem>
                  <SelectItem value="forensic">Forensic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {integrations.map((integration) => (
                <Card key={integration.id} className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(integration.type)}
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                          <CardDescription>
                            {integration.id} • {integration.protocol} • Last sync: {formatTimeAgo(integration.lastSync)}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getSecurityColor(integration.securityLevel)}>
                          {integration.securityLevel.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(integration.status)}>
                          {integration.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-slate-700">{integration.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-slate-600">Health Score</div>
                          <div className={`font-medium ${getHealthColor(integration.health)}`}>
                            {integration.health.toFixed(1)}%
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-600">Uptime</div>
                          <div className="font-medium">{integration.uptime.toFixed(1)}%</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Latency</div>
                          <div className="font-medium">{integration.latency}ms</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Daily Requests</div>
                          <div className="font-medium">{integration.requestsPerDay.toLocaleString()}</div>
                        </div>
                      </div>

                      <div className="border-t pt-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-slate-600">Endpoint:</div>
                            <div className="font-mono text-xs bg-slate-100 p-2 rounded mt-1">
                              {integration.endpoint}
                            </div>
                          </div>
                          <div>
                            <div className="text-slate-600">Authentication:</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Key className="h-3 w-3" />
                              <span className="text-xs">{integration.authentication}</span>
                              <Badge variant="outline" className="text-xs">
                                {integration.category.replace('_', ' ')}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-3">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Data Transferred: {formatDataSize(integration.dataExchanged)}</span>
                            <span>Health: {integration.health.toFixed(1)}%</span>
                          </div>
                          <Progress value={integration.health} className="h-2" />
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm">
                          <Activity className="h-3 w-3 mr-1" />
                          Monitor
                        </Button>
                        <Button size="sm" variant="outline">
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Sync
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-3 w-3 mr-1" />
                          Configure
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          Test
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="dataflows" className="space-y-4">
            <div className="bg-white rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data Flow</TableHead>
                    <TableHead>Source → Destination</TableHead>
                    <TableHead>Type & Frequency</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataFlows.map((flow) => (
                    <TableRow key={flow.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{flow.name}</div>
                          <div className="text-xs text-slate-500">{flow.id}</div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <span>{flow.source}</span>
                          <Network className="h-3 w-3 text-slate-400" />
                          <span>{flow.destination}</span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-1">
                          <Badge variant="outline" className="text-xs">
                            {flow.dataType}
                          </Badge>
                          <div className="text-xs text-slate-500">
                            {flow.frequency.replace('_', ' ')}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="text-sm space-y-1">
                          <div>Records: {flow.recordsProcessed.toLocaleString()}</div>
                          <div>Last: {formatTimeAgo(flow.lastRun)}</div>
                          {flow.nextRun && (
                            <div className="text-green-600">
                              Next: {formatTimeAgo(flow.nextRun)}
                            </div>
                          )}
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge className={getStatusColor(flow.status)}>
                          {flow.status.toUpperCase()}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrations.slice(0, 6).map((integration) => (
                <Card key={integration.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        {getTypeIcon(integration.type)}
                        {integration.name}
                      </CardTitle>
                      <Badge className={getStatusColor(integration.status)}>
                        {integration.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Health Score</span>
                          <span className={getHealthColor(integration.health)}>
                            {integration.health.toFixed(1)}%
                          </span>
                        </div>
                        <Progress value={integration.health} className="h-2" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Uptime</span>
                          <span>{integration.uptime.toFixed(1)}%</span>
                        </div>
                        <Progress value={integration.uptime} className="h-2" />
                      </div>

                      <Separator />

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <div className="text-slate-500">Latency</div>
                          <div className="font-medium">{integration.latency}ms</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Requests/Day</div>
                          <div className="font-medium">{integration.requestsPerDay.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Data Transfer</div>
                          <div className="font-medium">{formatDataSize(integration.dataExchanged)}</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Last Sync</div>
                          <div className="font-medium">{formatTimeAgo(integration.lastSync)}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <div className="bg-white rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Integration</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {integrationLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-sm">
                        {formatTimeAgo(log.timestamp)}
                      </TableCell>

                      <TableCell>
                        <div className="text-sm">
                          {integrations.find(i => i.id === log.integrationId)?.name || "Unknown"}
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge className={getLogLevelColor(log.level)}>
                          {log.level.toUpperCase()}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-sm font-medium">
                        {log.event}
                      </TableCell>

                      <TableCell className="text-sm max-w-xs truncate">
                        {log.message}
                      </TableCell>

                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Alert className="border-l-4 border-l-red-500 bg-red-50">
              <Shield className="h-4 w-4" />
              <AlertTitle>Security Monitoring Active</AlertTitle>
              <AlertDescription>
                All integrations are secured with encryption, authentication, and continuous monitoring.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Security Overview
                  </CardTitle>
                  <CardDescription>System-wide security metrics and compliance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Encrypted Connections:</span>
                      <span className="font-medium text-green-600">100%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Certificate Validity:</span>
                      <span className="font-medium text-green-600">Valid</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Failed Auth Attempts:</span>
                      <span className="font-medium text-red-600">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Security Score:</span>
                      <span className="font-medium text-green-600">98.5/100</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Authentication Methods</CardTitle>
                  <CardDescription>Distribution of authentication protocols</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">JWT/OAuth2:</span>
                      <span className="font-medium">33%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Certificate:</span>
                      <span className="font-medium">33%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">API Key:</span>
                      <span className="font-medium">17%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Custom:</span>
                      <span className="font-medium">17%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Classifications</CardTitle>
                  <CardDescription>Integration security levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Critical:</span>
                      <span className="font-medium text-red-600">
                        {integrations.filter(i => i.securityLevel === 'critical').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">High:</span>
                      <span className="font-medium text-orange-600">
                        {integrations.filter(i => i.securityLevel === 'high').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Medium:</span>
                      <span className="font-medium text-yellow-600">
                        {integrations.filter(i => i.securityLevel === 'medium').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Low:</span>
                      <span className="font-medium text-green-600">
                        {integrations.filter(i => i.securityLevel === 'low').length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Compliance Status</CardTitle>
                  <CardDescription>Regulatory compliance monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">GDPR Compliance</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">SOC 2 Type II</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">ISO 27001</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">FISMA Moderate</span>
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
