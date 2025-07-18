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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  FileText,
  Shield,
  Eye,
  Search,
  Filter,
  Download,
  Calendar as CalendarIcon,
  Clock,
  User,
  Database,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Lock,
  Unlock,
  Settings,
  RefreshCw,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Plus,
  Edit,
  Trash2,
  Archive,
  Bell,
  Flag,
  MapPin,
  Monitor,
  Smartphone,
  Globe,
  Server,
  Key,
  Users,
  Building
} from "lucide-react";

interface AuditLog {
  id: string;
  timestamp: Date;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  resource: string;
  resourceId: string;
  outcome: 'success' | 'failure' | 'warning' | 'info';
  severity: 'low' | 'medium' | 'high' | 'critical';
  ipAddress: string;
  userAgent: string;
  location?: string;
  sessionId: string;
  description: string;
  oldValues?: any;
  newValues?: any;
  metadata?: any;
}

interface SecurityEvent {
  id: string;
  timestamp: Date;
  eventType: 'login_attempt' | 'privilege_escalation' | 'data_access' | 'system_change' | 'policy_violation' | 'suspicious_activity';
  severity: 'low' | 'medium' | 'high' | 'critical';
  userId?: string;
  userName?: string;
  sourceIP: string;
  description: string;
  riskScore: number;
  status: 'open' | 'investigating' | 'resolved' | 'false_positive';
  assignedTo?: string;
  resolution?: string;
}

interface ComplianceAudit {
  id: string;
  auditType: 'access_review' | 'data_retention' | 'security_assessment' | 'policy_compliance' | 'system_configuration';
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  status: 'planned' | 'in_progress' | 'completed' | 'failed';
  auditor: string;
  scope: string[];
  findings: number;
  recommendations: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  complianceScore: number;
}

export default function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [dateRange, setDateRange] = useState("7d");
  const [realTimeAlerts, setRealTimeAlerts] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const auditLogs: AuditLog[] = [
    {
      id: "AUDIT-2024-67891",
      timestamp: new Date(Date.now() - 300000), // 5 min ago
      userId: "usr-001",
      userName: "Det. Sarah Connor",
      userRole: "Detective",
      action: "VIEW_EVIDENCE",
      resource: "Evidence",
      resourceId: "EVD-2024-4501",
      outcome: "success",
      severity: "medium",
      ipAddress: "192.168.1.45",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      location: "Port Moresby, PNG",
      sessionId: "sess_8a7b9c2d",
      description: "Accessed digital evidence file for case CC-2024-0891",
      metadata: { caseId: "CC-2024-0891", evidenceType: "digital_image", fileSize: "2.4MB" }
    },
    {
      id: "AUDIT-2024-67892",
      timestamp: new Date(Date.now() - 900000), // 15 min ago
      userId: "usr-002",
      userName: "Admin Rodriguez",
      userRole: "System Administrator",
      action: "UPDATE_USER_PERMISSIONS",
      resource: "User",
      resourceId: "usr-005",
      outcome: "success",
      severity: "high",
      ipAddress: "10.0.0.12",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      location: "Port Moresby, PNG",
      sessionId: "sess_9f8e7d6c",
      description: "Updated user permissions for Officer Johnson - added Evidence Management role",
      oldValues: { roles: ["Basic_User"] },
      newValues: { roles: ["Basic_User", "Evidence_Manager"] },
      metadata: { changeReason: "Promoted to Evidence Management Unit" }
    },
    {
      id: "AUDIT-2024-67893",
      timestamp: new Date(Date.now() - 1800000), // 30 min ago
      userId: "usr-003",
      userName: "Forensic Analyst Kim",
      userRole: "Forensic Analyst",
      action: "EXPORT_DATA",
      resource: "Investigation",
      resourceId: "INV-2024-2234",
      outcome: "success",
      severity: "high",
      ipAddress: "172.16.0.89",
      userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
      location: "Port Moresby, PNG",
      sessionId: "sess_5e4d3c2b",
      description: "Exported investigation report for court proceedings",
      metadata: { exportFormat: "PDF", recordCount: 247, courtCase: "CR-2024-0156" }
    },
    {
      id: "AUDIT-2024-67894",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      userId: "system",
      userName: "ALEMS System",
      userRole: "System",
      action: "AUTOMATED_BACKUP",
      resource: "Database",
      resourceId: "db_primary",
      outcome: "success",
      severity: "low",
      ipAddress: "127.0.0.1",
      userAgent: "ALEMS/2.1 (System Process)",
      sessionId: "sys_backup_001",
      description: "Automated database backup completed successfully",
      metadata: { backupSize: "15.7GB", duration: "12m 34s", backupType: "incremental" }
    },
    {
      id: "AUDIT-2024-67895",
      timestamp: new Date(Date.now() - 5400000), // 1.5 hours ago
      userId: "usr-004",
      userName: "Supervisor Martinez",
      userRole: "Supervisor",
      action: "APPROVE_CASE_ESCALATION",
      resource: "Case",
      resourceId: "CC-2024-0892",
      outcome: "success",
      severity: "medium",
      ipAddress: "192.168.1.78",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edge/91.0.864.59",
      location: "Port Moresby, PNG",
      sessionId: "sess_1a2b3c4d",
      description: "Approved case escalation to high priority level",
      oldValues: { priority: "medium", escalationLevel: 1 },
      newValues: { priority: "high", escalationLevel: 2 },
      metadata: { escalationReason: "New critical evidence discovered" }
    }
  ];

  const securityEvents: SecurityEvent[] = [
    {
      id: "SEC-2024-3401",
      timestamp: new Date(Date.now() - 1200000), // 20 min ago
      eventType: "suspicious_activity",
      severity: "high",
      userId: "usr-006",
      userName: "Unknown User",
      sourceIP: "203.45.67.89",
      description: "Multiple failed login attempts from unusual location",
      riskScore: 8.7,
      status: "investigating",
      assignedTo: "Security Team"
    },
    {
      id: "SEC-2024-3402",
      timestamp: new Date(Date.now() - 2700000), // 45 min ago
      eventType: "privilege_escalation",
      severity: "critical",
      userId: "usr-007",
      userName: "Contract Worker Alpha",
      sourceIP: "10.0.0.45",
      description: "Attempted to access restricted evidence database",
      riskScore: 9.5,
      status: "resolved",
      assignedTo: "Security Team",
      resolution: "Access denied. Account temporarily suspended pending review."
    },
    {
      id: "SEC-2024-3403",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      eventType: "data_access",
      severity: "medium",
      sourceIP: "192.168.1.156",
      description: "Bulk data export during non-business hours",
      riskScore: 6.2,
      status: "resolved",
      assignedTo: "Compliance Team",
      resolution: "Verified as legitimate backup operation"
    },
    {
      id: "SEC-2024-3404",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      eventType: "system_change",
      severity: "high",
      userId: "usr-002",
      userName: "Admin Rodriguez",
      sourceIP: "10.0.0.12",
      description: "Critical system configuration modified",
      riskScore: 7.8,
      status: "resolved",
      assignedTo: "IT Security",
      resolution: "Authorized change for security patch deployment"
    }
  ];

  const complianceAudits: ComplianceAudit[] = [
    {
      id: "COMP-2024-1201",
      auditType: "access_review",
      title: "Quarterly User Access Review",
      description: "Comprehensive review of user access rights and permissions across all ALEMS modules",
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: "completed",
      auditor: "Compliance Officer Chen",
      scope: ["User Management", "Evidence Access", "Case Management", "Administrative Functions"],
      findings: 3,
      recommendations: 7,
      riskLevel: "medium",
      complianceScore: 87.5
    },
    {
      id: "COMP-2024-1202",
      auditType: "data_retention",
      title: "Evidence Data Retention Compliance",
      description: "Audit of evidence data retention policies and automated cleanup procedures",
      startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: "in_progress",
      auditor: "Legal Compliance Team",
      scope: ["Evidence Storage", "Data Archival", "Retention Policies"],
      findings: 1,
      recommendations: 2,
      riskLevel: "low",
      complianceScore: 94.2
    },
    {
      id: "COMP-2024-1203",
      auditType: "security_assessment",
      title: "Annual Security Assessment",
      description: "Comprehensive security audit including penetration testing and vulnerability assessment",
      startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      status: "completed",
      auditor: "External Security Firm",
      scope: ["Network Security", "Application Security", "Access Controls", "Data Protection"],
      findings: 5,
      recommendations: 12,
      riskLevel: "medium",
      complianceScore: 92.1
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

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'success': return 'bg-green-500';
      case 'failure': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      case 'info': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': case 'resolved': return 'bg-green-500';
      case 'in_progress': case 'investigating': return 'bg-blue-500';
      case 'open': case 'planned': return 'bg-yellow-500';
      case 'failed': return 'bg-red-500';
      case 'false_positive': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action.toLowerCase()) {
      case 'view_evidence': case 'view': return <Eye className="h-4 w-4" />;
      case 'update_user_permissions': case 'edit': return <Edit className="h-4 w-4" />;
      case 'export_data': case 'download': return <Download className="h-4 w-4" />;
      case 'automated_backup': case 'backup': return <Archive className="h-4 w-4" />;
      case 'approve_case_escalation': case 'approve': return <CheckCircle className="h-4 w-4" />;
      case 'login': return <User className="h-4 w-4" />;
      case 'logout': return <Unlock className="h-4 w-4" />;
      case 'create': case 'add': return <Plus className="h-4 w-4" />;
      case 'delete': case 'remove': return <Trash2 className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'login_attempt': return <User className="h-4 w-4" />;
      case 'privilege_escalation': return <TrendingUp className="h-4 w-4" />;
      case 'data_access': return <Database className="h-4 w-4" />;
      case 'system_change': return <Settings className="h-4 w-4" />;
      case 'policy_violation': return <Flag className="h-4 w-4" />;
      case 'suspicious_activity': return <AlertTriangle className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 8) return 'text-red-600';
    if (score >= 6) return 'text-orange-600';
    if (score >= 4) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getComplianceScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    if (score >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  // Simulate real-time updates
  useEffect(() => {
    if (!realTimeAlerts) return;

    const interval = setInterval(() => {
      console.log("Real-time audit monitoring active...");
    }, 5000);

    return () => clearInterval(interval);
  }, [realTimeAlerts]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Shield className="h-8 w-8 text-red-600" />
              Audit & Compliance Center
            </h1>
            <p className="text-slate-600">Comprehensive system auditing, security monitoring, and compliance tracking</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Label htmlFor="realtime">Real-time Alerts</Label>
              <Switch
                id="realtime"
                checked={realTimeAlerts}
                onCheckedChange={setRealTimeAlerts}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
            <Button className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Generate Audit
            </Button>
          </div>
        </div>

        {/* System Status */}
        <Alert className={`border-l-4 ${realTimeAlerts ? 'border-l-green-500 bg-green-50' : 'border-l-orange-500 bg-orange-50'}`}>
          <Shield className="h-4 w-4" />
          <AlertTitle>Audit System Status</AlertTitle>
          <AlertDescription>
            Audit logging: ACTIVE • Real-time monitoring: {realTimeAlerts ? "ENABLED" : "DISABLED"} •
            {auditLogs.length} events logged today •
            {securityEvents.filter(e => e.status === 'open' || e.status === 'investigating').length} security events under investigation
          </AlertDescription>
        </Alert>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Audit Events</CardTitle>
              <FileText className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{auditLogs.length}</div>
              <p className="text-xs text-slate-600">Last 24 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Events</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{securityEvents.length}</div>
              <p className="text-xs text-slate-600">Requiring attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Events</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {auditLogs.filter(log => log.severity === 'critical').length}
              </div>
              <p className="text-xs text-slate-600">High priority</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {new Set(auditLogs.map(log => log.userId)).size}
              </div>
              <p className="text-xs text-slate-600">Unique today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
              <CheckCircle className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {(complianceAudits.reduce((sum, audit) => sum + audit.complianceScore, 0) / complianceAudits.length).toFixed(1)}%
              </div>
              <p className="text-xs text-slate-600">Overall rating</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Failed Actions</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {auditLogs.filter(log => log.outcome === 'failure').length}
              </div>
              <p className="text-xs text-slate-600">Today</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="audit-logs" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="audit-logs">Audit Logs</TabsTrigger>
            <TabsTrigger value="security">Security Events</TabsTrigger>
            <TabsTrigger value="compliance">Compliance Audits</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="audit-logs" className="space-y-4">
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search audit logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="VIEW_EVIDENCE">View Evidence</SelectItem>
                  <SelectItem value="UPDATE_USER_PERMISSIONS">Update Permissions</SelectItem>
                  <SelectItem value="EXPORT_DATA">Export Data</SelectItem>
                  <SelectItem value="APPROVE_CASE_ESCALATION">Approve Escalation</SelectItem>
                </SelectContent>
              </Select>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-40">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {selectedDate ? selectedDate.toLocaleDateString() : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="bg-white rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User & Action</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>Location & Session</TableHead>
                    <TableHead>Outcome</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-sm">
                        <div className="space-y-1">
                          <div>{formatTimeAgo(log.timestamp)}</div>
                          <div className="text-xs text-slate-500">{log.id}</div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {getActionIcon(log.action)}
                            <span className="font-medium text-sm">{log.action.replace('_', ' ')}</span>
                          </div>
                          <div className="text-xs text-slate-600">
                            {log.userName} ({log.userRole})
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">{log.resource}</div>
                          <div className="text-xs text-slate-500">{log.resourceId}</div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {log.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            {log.ipAddress}
                          </div>
                          <div className="text-slate-500">{log.sessionId}</div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-1">
                          <Badge className={getOutcomeColor(log.outcome)}>
                            {log.outcome.toUpperCase()}
                          </Badge>
                          <Badge className={getSeverityColor(log.severity)}>
                            {log.severity.toUpperCase()}
                          </Badge>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
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

          <TabsContent value="security" className="space-y-4">
            <div className="space-y-4">
              {securityEvents.map((event) => (
                <Card key={event.id} className="border-l-4 border-l-red-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getEventTypeIcon(event.eventType)}
                        <div>
                          <CardTitle className="text-lg capitalize">
                            {event.eventType.replace('_', ' ')}
                          </CardTitle>
                          <CardDescription>
                            {event.id} • {formatTimeAgo(event.timestamp)} • Source: {event.sourceIP}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(event.severity)}>
                          {event.severity.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(event.status)}>
                          {event.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-slate-700">{event.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-slate-600">Risk Score</div>
                          <div className={`font-medium ${getRiskScoreColor(event.riskScore)}`}>
                            {event.riskScore.toFixed(1)}/10
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-600">User</div>
                          <div className="font-medium">{event.userName || 'Unknown'}</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Source IP</div>
                          <div className="font-medium">{event.sourceIP}</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Assigned To</div>
                          <div className="font-medium">{event.assignedTo || 'Unassigned'}</div>
                        </div>
                      </div>

                      {event.resolution && (
                        <div className="border-t pt-3">
                          <p className="text-sm font-medium text-slate-700 mb-1">Resolution:</p>
                          <p className="text-sm text-slate-600 bg-slate-100 p-2 rounded">{event.resolution}</p>
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Investigate
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Users className="h-3 w-3 mr-1" />
                          Assign
                        </Button>
                        <Button size="sm" variant="outline">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Resolve
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-4">
            <div className="space-y-4">
              {complianceAudits.map((audit) => (
                <Card key={audit.id} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <BarChart3 className="h-5 w-5 text-blue-500" />
                        <div>
                          <CardTitle className="text-lg">{audit.title}</CardTitle>
                          <CardDescription>
                            {audit.id} • Auditor: {audit.auditor} • {audit.auditType.replace('_', ' ')}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(audit.riskLevel)}>
                          {audit.riskLevel.toUpperCase()} RISK
                        </Badge>
                        <Badge className={getStatusColor(audit.status)}>
                          {audit.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-slate-700">{audit.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-slate-600">Compliance Score</div>
                          <div className={`font-medium ${getComplianceScoreColor(audit.complianceScore)}`}>
                            {audit.complianceScore.toFixed(1)}%
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-600">Findings</div>
                          <div className="font-medium text-red-600">{audit.findings}</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Recommendations</div>
                          <div className="font-medium text-blue-600">{audit.recommendations}</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Duration</div>
                          <div className="font-medium">
                            {audit.endDate ?
                              `${Math.floor((audit.endDate.getTime() - audit.startDate.getTime()) / (1000 * 60 * 60 * 24))} days` :
                              "In progress"
                            }
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-3">
                        <p className="text-sm font-medium text-slate-700 mb-2">Audit Scope:</p>
                        <div className="flex flex-wrap gap-2">
                          {audit.scope.map((item, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="border-t pt-3">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Compliance Score</span>
                            <span className={getComplianceScoreColor(audit.complianceScore)}>
                              {audit.complianceScore.toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                audit.complianceScore >= 90 ? 'bg-green-500' :
                                audit.complianceScore >= 80 ? 'bg-yellow-500' :
                                audit.complianceScore >= 70 ? 'bg-orange-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${audit.complianceScore}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View Report
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          Export
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-3 w-3 mr-1" />
                          Remediate
                        </Button>
                        <Button size="sm" variant="outline">
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Re-audit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Audit Activity Trends</CardTitle>
                  <CardDescription>System activity patterns over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-slate-100 rounded flex items-center justify-center text-slate-500">
                    [Chart: Shows increasing audit activity with peak during business hours]
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Event Distribution</CardTitle>
                  <CardDescription>Types of security events by frequency</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Login Attempts:</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Data Access:</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">System Changes:</span>
                      <span className="font-medium">15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Privilege Escalation:</span>
                      <span className="font-medium">10%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Other:</span>
                      <span className="font-medium">5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Activity Analysis</CardTitle>
                  <CardDescription>Most active users and operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Det. Sarah Connor:</span>
                      <span className="font-medium">247 actions</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Admin Rodriguez:</span>
                      <span className="font-medium">156 actions</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Analyst Kim:</span>
                      <span className="font-medium">89 actions</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Supervisor Martinez:</span>
                      <span className="font-medium">67 actions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Compliance Metrics</CardTitle>
                  <CardDescription>Overall compliance status and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Overall Score:</span>
                      <span className="font-medium text-green-600">91.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Open Findings:</span>
                      <span className="font-medium text-orange-600">9</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Remediation Rate:</span>
                      <span className="font-medium text-green-600">87%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Audit Frequency:</span>
                      <span className="font-medium">Monthly</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Daily Audit Report
                  </CardTitle>
                  <CardDescription>Comprehensive daily activity summary</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-slate-600">
                      Generate detailed daily audit report including all user activities,
                      security events, and system changes.
                    </p>
                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Summary
                  </CardTitle>
                  <CardDescription>Security events and risk assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-slate-600">
                      Security incidents report with risk analysis,
                      threat patterns, and recommended actions.
                    </p>
                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Compliance Report
                  </CardTitle>
                  <CardDescription>Regulatory compliance status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-slate-600">
                      Comprehensive compliance audit report for regulatory
                      review and certification purposes.
                    </p>
                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Activity Report
                  </CardTitle>
                  <CardDescription>Individual user audit trails</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-slate-600">
                      Detailed user activity reports for performance
                      review and access certification.
                    </p>
                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    System Performance
                  </CardTitle>
                  <CardDescription>System usage and performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-slate-600">
                      System performance analysis including usage patterns,
                      resource utilization, and optimization recommendations.
                    </p>
                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Custom Report
                  </CardTitle>
                  <CardDescription>Build your own audit report</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-slate-600">
                      Create custom audit reports with specific criteria,
                      date ranges, and user selections.
                    </p>
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Build Report
                    </Button>
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
