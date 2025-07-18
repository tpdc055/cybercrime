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
import {
  Zap,
  GitBranch,
  Play,
  Pause,
  Square,
  Settings,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Download,
  Activity,
  BarChart3,
  Users,
  FileText,
  Bell,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Copy,
  Calendar
} from "lucide-react";

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: 'investigation' | 'evidence' | 'compliance' | 'emergency' | 'routine';
  status: 'active' | 'draft' | 'archived';
  version: string;
  createdBy: string;
  createdAt: Date;
  lastModified: Date;
  steps: WorkflowStep[];
  usage: number;
  successRate: number;
  avgDuration: number; // hours
}

interface WorkflowStep {
  id: string;
  name: string;
  type: 'manual' | 'automated' | 'approval' | 'notification' | 'integration';
  description: string;
  estimatedTime: number; // minutes
  assigneeRole: string;
  conditions?: string[];
  automationConfig?: any;
}

interface WorkflowExecution {
  id: string;
  templateId: string;
  templateName: string;
  caseId: string;
  status: 'running' | 'paused' | 'completed' | 'failed' | 'cancelled';
  progress: number; // percentage
  currentStep: string;
  startedAt: Date;
  estimatedCompletion?: Date;
  completedAt?: Date;
  assignedTo: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  stepStatuses: StepStatus[];
}

interface StepStatus {
  stepId: string;
  stepName: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'skipped';
  startedAt?: Date;
  completedAt?: Date;
  assignedTo?: string;
  notes?: string;
}

export default function WorkflowManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [automationEnabled, setAutomationEnabled] = useState(true);

  const workflowTemplates: WorkflowTemplate[] = [
    {
      id: "WF-TEMP-001",
      name: "Cybercrime Investigation Standard",
      description: "Standard workflow for cybercrime investigation from intake to resolution",
      category: "investigation",
      status: "active",
      version: "2.1",
      createdBy: "Chief Inspector Rodriguez",
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      lastModified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      usage: 156,
      successRate: 94.2,
      avgDuration: 72,
      steps: [
        {
          id: "step-1",
          name: "Initial Assessment",
          type: "manual",
          description: "Review case details and assign priority level",
          estimatedTime: 30,
          assigneeRole: "Detective"
        },
        {
          id: "step-2",
          name: "Evidence Collection",
          type: "automated",
          description: "Automated evidence preservation and collection",
          estimatedTime: 60,
          assigneeRole: "System"
        },
        {
          id: "step-3",
          name: "Supervisor Approval",
          type: "approval",
          description: "Supervisor review and investigation approval",
          estimatedTime: 15,
          assigneeRole: "Supervisor"
        }
      ]
    },
    {
      id: "WF-TEMP-002",
      name: "Emergency Response Protocol",
      description: "Rapid response workflow for critical cybercrime incidents",
      category: "emergency",
      status: "active",
      version: "1.5",
      createdBy: "Emergency Response Team",
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      usage: 23,
      successRate: 98.7,
      avgDuration: 24,
      steps: [
        {
          id: "step-1",
          name: "Threat Assessment",
          type: "automated",
          description: "AI-powered threat level assessment",
          estimatedTime: 5,
          assigneeRole: "System"
        },
        {
          id: "step-2",
          name: "Resource Deployment",
          type: "manual",
          description: "Deploy emergency response resources",
          estimatedTime: 15,
          assigneeRole: "Operations Center"
        }
      ]
    },
    {
      id: "WF-TEMP-003",
      name: "Evidence Processing Chain",
      description: "Complete evidence processing from collection to court presentation",
      category: "evidence",
      status: "active",
      version: "3.0",
      createdBy: "Forensics Team Lead",
      createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
      lastModified: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      usage: 89,
      successRate: 96.8,
      avgDuration: 48,
      steps: [
        {
          id: "step-1",
          name: "Evidence Validation",
          type: "automated",
          description: "Cryptographic validation and integrity check",
          estimatedTime: 10,
          assigneeRole: "System"
        },
        {
          id: "step-2",
          name: "Forensic Analysis",
          type: "manual",
          description: "Technical analysis and examination",
          estimatedTime: 240,
          assigneeRole: "Forensic Analyst"
        }
      ]
    }
  ];

  const activeExecutions: WorkflowExecution[] = [
    {
      id: "WF-EXEC-8901",
      templateId: "WF-TEMP-001",
      templateName: "Cybercrime Investigation Standard",
      caseId: "CC-2024-0891",
      status: "running",
      progress: 65,
      currentStep: "Evidence Collection",
      startedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      estimatedCompletion: new Date(Date.now() + 18 * 60 * 60 * 1000),
      assignedTo: "Det. Sarah Connor",
      priority: "high",
      stepStatuses: [
        {
          stepId: "step-1",
          stepName: "Initial Assessment",
          status: "completed",
          startedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
          completedAt: new Date(Date.now() - 5.5 * 60 * 60 * 1000),
          assignedTo: "Det. Sarah Connor"
        },
        {
          stepId: "step-2",
          stepName: "Evidence Collection",
          status: "in_progress",
          startedAt: new Date(Date.now() - 5.5 * 60 * 60 * 1000),
          assignedTo: "System"
        },
        {
          stepId: "step-3",
          stepName: "Supervisor Approval",
          status: "pending",
          assignedTo: "Supervisor"
        }
      ]
    },
    {
      id: "WF-EXEC-8902",
      templateId: "WF-TEMP-002",
      templateName: "Emergency Response Protocol",
      caseId: "CC-2024-0892",
      status: "running",
      progress: 85,
      currentStep: "Resource Deployment",
      startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      estimatedCompletion: new Date(Date.now() + 30 * 60 * 1000),
      assignedTo: "Emergency Response Team",
      priority: "critical",
      stepStatuses: [
        {
          stepId: "step-1",
          stepName: "Threat Assessment",
          status: "completed",
          startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
          completedAt: new Date(Date.now() - 1.9 * 60 * 60 * 1000),
          assignedTo: "System"
        },
        {
          stepId: "step-2",
          stepName: "Resource Deployment",
          status: "in_progress",
          startedAt: new Date(Date.now() - 1.9 * 60 * 60 * 1000),
          assignedTo: "Operations Center"
        }
      ]
    }
  ];

  const formatTimeAgo = (date: Date) => {
    const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const formatDuration = (hours: number) => {
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return remainingHours > 0 ? `${days}d ${remainingHours}h` : `${days}d`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'running': case 'completed': return 'bg-green-500';
      case 'paused': case 'draft': return 'bg-yellow-500';
      case 'failed': case 'cancelled': return 'bg-red-500';
      case 'archived': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'investigation': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'evidence': return 'text-green-600 bg-green-50 border-green-200';
      case 'emergency': return 'text-red-600 bg-red-50 border-red-200';
      case 'compliance': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'routine': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStepTypeIcon = (type: string) => {
    switch (type) {
      case 'manual': return <Users className="h-4 w-4" />;
      case 'automated': return <Zap className="h-4 w-4" />;
      case 'approval': return <CheckCircle className="h-4 w-4" />;
      case 'notification': return <Bell className="h-4 w-4" />;
      case 'integration': return <GitBranch className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <GitBranch className="h-8 w-8 text-purple-600" />
              Workflow Management
            </h1>
            <p className="text-slate-600">Automated case processing workflows and orchestration</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Label htmlFor="automation">Automation Engine</Label>
              <Switch
                id="automation"
                checked={automationEnabled}
                onCheckedChange={setAutomationEnabled}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configure
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Workflow
            </Button>
          </div>
        </div>

        {/* System Status */}
        <Alert className={`border-l-4 ${automationEnabled ? 'border-l-green-500 bg-green-50' : 'border-l-orange-500 bg-orange-50'}`}>
          <Activity className="h-4 w-4" />
          <AlertTitle>Workflow Automation Engine</AlertTitle>
          <AlertDescription>
            {automationEnabled ? "Active" : "Manual Mode"} •
            {activeExecutions.filter(e => e.status === 'running').length} workflows running •
            System performance: 98.4% uptime
          </AlertDescription>
        </Alert>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
              <Play className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {activeExecutions.filter(e => e.status === 'running').length}
              </div>
              <p className="text-xs text-slate-600">Currently executing</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Templates</CardTitle>
              <FileText className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{workflowTemplates.length}</div>
              <p className="text-xs text-slate-600">Available templates</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">95.8%</div>
              <p className="text-xs text-slate-600">Overall completion</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
              <Clock className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">48h</div>
              <p className="text-xs text-slate-600">Process completion</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Automation %</CardTitle>
              <Zap className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">73%</div>
              <p className="text-xs text-slate-600">Automated steps</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="executions" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="executions">Active Executions</TabsTrigger>
            <TabsTrigger value="templates">Workflow Templates</TabsTrigger>
            <TabsTrigger value="designer">Workflow Designer</TabsTrigger>
            <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
            <TabsTrigger value="automation">Automation Rules</TabsTrigger>
          </TabsList>

          <TabsContent value="executions" className="space-y-4">
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search workflow executions..."
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
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {activeExecutions.map((execution) => (
                <Card key={execution.id} className="border-l-4 border-l-purple-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Play className="h-5 w-5 text-green-500" />
                        <div>
                          <CardTitle className="text-lg">{execution.templateName}</CardTitle>
                          <CardDescription>
                            {execution.id} • Case: {execution.caseId} • Assigned: {execution.assignedTo}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(execution.priority)}>
                          {execution.priority.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(execution.status)}>
                          {execution.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-slate-600">Progress</div>
                          <div className="font-medium">{execution.progress}% complete</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Current Step</div>
                          <div className="font-medium">{execution.currentStep}</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Started</div>
                          <div className="font-medium">{formatTimeAgo(execution.startedAt)}</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Est. Completion</div>
                          <div className="font-medium">
                            {execution.estimatedCompletion ? formatTimeAgo(execution.estimatedCompletion) : 'N/A'}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Workflow Progress</span>
                          <span>{execution.progress}%</span>
                        </div>
                        <Progress value={execution.progress} className="h-2" />
                      </div>

                      <div className="border-t pt-3">
                        <h4 className="font-medium mb-2">Step Status</h4>
                        <div className="space-y-2">
                          {execution.stepStatuses.map((step, index) => (
                            <div key={step.stepId} className="flex items-center gap-3 p-2 border rounded">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${
                                step.status === 'completed' ? 'bg-green-500' :
                                step.status === 'in_progress' ? 'bg-blue-500' :
                                step.status === 'failed' ? 'bg-red-500' :
                                'bg-gray-400'
                              }`}>
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-sm">{step.stepName}</div>
                                <div className="text-xs text-slate-600">
                                  Assigned: {step.assignedTo} • Status: {step.status}
                                </div>
                              </div>
                              <Badge className={getStatusColor(step.status)}>
                                {step.status.replace('_', ' ').toUpperCase()}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          Monitor
                        </Button>
                        <Button size="sm" variant="outline">
                          <Pause className="h-3 w-3 mr-1" />
                          Pause
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-3 w-3 mr-1" />
                          Configure
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="h-3 w-3 mr-1" />
                          Log
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search workflow templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="investigation">Investigation</SelectItem>
                  <SelectItem value="evidence">Evidence</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                  <SelectItem value="routine">Routine</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {workflowTemplates.map((template) => (
                <Card key={template.id} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <div>
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <CardDescription>
                            {template.id} • v{template.version} • Created by {template.createdBy}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getCategoryColor(template.category)}>
                          {template.category.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(template.status)}>
                          {template.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-slate-700">{template.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-slate-600">Usage Count</div>
                          <div className="font-medium">{template.usage} executions</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Success Rate</div>
                          <div className="font-medium text-green-600">{template.successRate}%</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Avg Duration</div>
                          <div className="font-medium">{formatDuration(template.avgDuration)}</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Steps</div>
                          <div className="font-medium">{template.steps.length} steps</div>
                        </div>
                      </div>

                      <div className="border-t pt-3">
                        <h4 className="font-medium mb-2">Workflow Steps</h4>
                        <div className="space-y-2">
                          {template.steps.slice(0, 3).map((step, index) => (
                            <div key={step.id} className="flex items-center gap-3 p-2 border rounded">
                              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                                {index + 1}
                              </div>
                              <div className="flex items-center gap-2 flex-1">
                                {getStepTypeIcon(step.type)}
                                <div>
                                  <div className="font-medium text-sm">{step.name}</div>
                                  <div className="text-xs text-slate-600">
                                    {step.type} • {step.estimatedTime}min • {step.assigneeRole}
                                  </div>
                                </div>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {step.type}
                              </Badge>
                            </div>
                          ))}
                          {template.steps.length > 3 && (
                            <div className="text-sm text-slate-500 text-center py-2">
                              +{template.steps.length - 3} more steps
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm">
                          <Play className="h-3 w-3 mr-1" />
                          Execute
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Copy className="h-3 w-3 mr-1" />
                          Clone
                        </Button>
                        <Button size="sm" variant="outline">
                          <BarChart3 className="h-3 w-3 mr-1" />
                          Analytics
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="designer" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Workflow Designer
                </CardTitle>
                <CardDescription>Visual workflow builder and editor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center">
                  <div className="text-center">
                    <GitBranch className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-600 mb-2">Visual Workflow Designer</h3>
                    <p className="text-slate-500 mb-4">Drag and drop workflow builder with step configuration</p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Workflow
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Workflow Performance Trends</CardTitle>
                  <CardDescription>Success rates and completion times over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-slate-100 rounded flex items-center justify-center text-slate-500">
                    [Chart: Performance metrics showing 95.8% success rate trend]
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Step Type Distribution</CardTitle>
                  <CardDescription>Breakdown of workflow step types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Automated:</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Manual:</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Approval:</span>
                      <span className="font-medium">15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Integration:</span>
                      <span className="font-medium">10%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Category Usage</CardTitle>
                  <CardDescription>Most used workflow categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Investigation:</span>
                      <span className="font-medium">156 executions</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Evidence:</span>
                      <span className="font-medium">89 executions</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Emergency:</span>
                      <span className="font-medium">23 executions</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Compliance:</span>
                      <span className="font-medium">12 executions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Automation Impact</CardTitle>
                  <CardDescription>Benefits of workflow automation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Time Saved:</span>
                      <span className="font-medium text-green-600">1,247 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Error Reduction:</span>
                      <span className="font-medium text-green-600">78%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Process Speed:</span>
                      <span className="font-medium text-green-600">+156%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Consistency:</span>
                      <span className="font-medium text-green-600">95.8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="automation" className="space-y-4">
            <Alert className="border-l-4 border-l-blue-500 bg-blue-50">
              <Zap className="h-4 w-4" />
              <AlertTitle>Automation Engine Configuration</AlertTitle>
              <AlertDescription>
                Configure automated triggers, conditions, and actions for intelligent workflow execution.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Automation Rules
                  </CardTitle>
                  <CardDescription>Active automation triggers and conditions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border border-green-200 rounded-lg bg-green-50">
                      <div className="font-medium text-green-700">Priority Escalation</div>
                      <div className="text-sm text-green-600">Auto-escalate high priority cases after 4 hours</div>
                      <Badge className="mt-1 bg-green-500">Active</Badge>
                    </div>
                    <div className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                      <div className="font-medium text-blue-700">Evidence Processing</div>
                      <div className="text-sm text-blue-600">Auto-trigger forensic analysis on evidence upload</div>
                      <Badge className="mt-1 bg-blue-500">Active</Badge>
                    </div>
                    <div className="p-3 border border-purple-200 rounded-lg bg-purple-50">
                      <div className="font-medium text-purple-700">Notification System</div>
                      <div className="text-sm text-purple-600">Auto-notify stakeholders on workflow completion</div>
                      <Badge className="mt-1 bg-purple-500">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Optimization</CardTitle>
                  <CardDescription>System performance and resource utilization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Automation Engine Load</span>
                        <span>67%</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Queue Processing Rate</span>
                        <span>94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Error Rate</span>
                        <span>2.4%</span>
                      </div>
                      <Progress value={2.4} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Resource Utilization</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
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
