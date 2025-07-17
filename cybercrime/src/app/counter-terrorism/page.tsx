"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  AlertTriangle,
  Target,
  Eye,
  Search,
  Filter,
  RefreshCw,
  Download,
  Upload,
  Users,
  Globe,
  MapPin,
  Clock,
  Activity,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Network,
  Lock,
  Key,
  Database,
  FileText,
  Radio,
  Satellite,
  Camera,
  Mic,
  Phone,
  Monitor,
  Radar,
  Crosshair,
  Zap,
  Bell,
  Settings,
  Share,
  Flag,
  Calendar,
  Brain,
  Cpu,
  Server,
  Wifi,
  WifiOff,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  Play,
  Pause,
  Square,
  Fingerprint,
  Scan,
  Binary,
  Hash,
  CreditCard,
  Building,
  Car,
  Plane,
  Ship
} from "lucide-react";

interface ThreatAssessment {
  id: string;
  threatLevel: 'low' | 'elevated' | 'high' | 'severe' | 'critical';
  type: 'domestic' | 'international' | 'cyber' | 'biological' | 'chemical' | 'nuclear';
  title: string;
  description: string;
  location: string;
  coordinates?: {lat: number, lng: number};
  firstDetected: Date;
  lastUpdate: Date;
  confidence: number;
  sources: string[];
  targetType: string;
  potentialCasualties: string;
  status: 'monitoring' | 'investigating' | 'active_response' | 'neutralized' | 'false_alarm';
}

interface IntelligenceSource {
  id: string;
  sourceType: 'humint' | 'sigint' | 'geoint' | 'osint' | 'techint' | 'finint';
  classification: 'unclassified' | 'confidential' | 'secret' | 'top_secret';
  reliability: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  credibility: number;
  lastReport: Date;
  activeOperations: number;
  region: string;
  status: 'active' | 'compromised' | 'dormant' | 'terminated';
}

interface SurveillanceOperation {
  id: string;
  operationName: string;
  targetEntity: string;
  operationType: 'physical' | 'electronic' | 'cyber' | 'financial' | 'communications';
  startDate: Date;
  duration: number; // days
  status: 'planning' | 'active' | 'paused' | 'completed' | 'compromised';
  classification: 'confidential' | 'secret' | 'top_secret';
  assetsDeployed: number;
  dataCollected: number; // GB
  keyFindings: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

interface EmergencyResponse {
  id: string;
  incidentType: 'bomb_threat' | 'active_shooter' | 'hostage' | 'chemical_attack' | 'cyber_attack' | 'infrastructure';
  location: string;
  severity: 'minor' | 'major' | 'critical' | 'catastrophic';
  status: 'reported' | 'responding' | 'contained' | 'resolved';
  unitsDeployed: string[];
  civilianEvacuation: boolean;
  estimatedAffected: number;
  responseTime: number; // minutes
  commandCenter: string;
  lastUpdate: Date;
}

interface OperationalMetric {
  category: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  target?: number;
  classification: 'unclassified' | 'restricted';
}

export default function CounterTerrorismOpsCenter() {
  const [threatLevel, setThreatLevel] = useState<'low' | 'elevated' | 'high' | 'severe' | 'critical'>('elevated');
  const [intelligenceFusion, setIntelligenceFusion] = useState(true);
  const [surveillanceActive, setSurveillanceActive] = useState(true);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [classificationLevel, setClassificationLevel] = useState('secret');

  const threatAssessments: ThreatAssessment[] = [
    {
      id: "TA-2024-9901",
      threatLevel: "critical",
      type: "domestic",
      title: "Coordinated Infrastructure Attack Plot",
      description: "Intelligence indicates organized terrorist cell planning simultaneous attacks on power grid and transportation hubs",
      location: "Metropolitan Area - Multiple Targets",
      coordinates: {lat: 40.7128, lng: -74.0060},
      firstDetected: new Date(Date.now() - 7200000),
      lastUpdate: new Date(Date.now() - 1800000),
      confidence: 87.3,
      sources: ["HUMINT", "SIGINT", "FININT"],
      targetType: "Critical Infrastructure",
      potentialCasualties: "1000+ civilians",
      status: "active_response"
    },
    {
      id: "TA-2024-9902",
      threatLevel: "high",
      type: "international",
      title: "Foreign Operative Infiltration",
      description: "Suspected state-sponsored operatives identified entering country with falsified documents",
      location: "Major International Airport",
      coordinates: {lat: 40.6413, lng: -73.7781},
      firstDetected: new Date(Date.now() - 14400000),
      lastUpdate: new Date(Date.now() - 3600000),
      confidence: 94.7,
      sources: ["GEOINT", "TECHINT", "OSINT"],
      targetType: "Government Facilities",
      potentialCasualties: "50-200 officials",
      status: "investigating"
    },
    {
      id: "TA-2024-9903",
      threatLevel: "severe",
      type: "cyber",
      title: "State-Sponsored Cyber Warfare Campaign",
      description: "Advanced persistent threat targeting critical national security systems and defense networks",
      location: "Nationwide - Digital Infrastructure",
      firstDetected: new Date(Date.now() - 21600000),
      lastUpdate: new Date(Date.now() - 900000),
      confidence: 96.2,
      sources: ["SIGINT", "TECHINT"],
      targetType: "Defense Networks",
      potentialCasualties: "National Security Impact",
      status: "monitoring"
    }
  ];

  const intelligenceSources: IntelligenceSource[] = [
    {
      id: "IS-HUMINT-001",
      sourceType: "humint",
      classification: "top_secret",
      reliability: "A",
      credibility: 95.7,
      lastReport: new Date(Date.now() - 3600000),
      activeOperations: 12,
      region: "Middle East",
      status: "active"
    },
    {
      id: "IS-SIGINT-002",
      sourceType: "sigint",
      classification: "secret",
      reliability: "B",
      credibility: 89.3,
      lastReport: new Date(Date.now() - 1800000),
      activeOperations: 8,
      region: "Eastern Europe",
      status: "active"
    },
    {
      id: "IS-GEOINT-003",
      sourceType: "geoint",
      classification: "secret",
      reliability: "A",
      credibility: 92.1,
      lastReport: new Date(Date.now() - 900000),
      activeOperations: 15,
      region: "Global",
      status: "active"
    },
    {
      id: "IS-OSINT-004",
      sourceType: "osint",
      classification: "confidential",
      reliability: "C",
      credibility: 76.8,
      lastReport: new Date(Date.now() - 600000),
      activeOperations: 24,
      region: "Global",
      status: "active"
    }
  ];

  const surveillanceOperations: SurveillanceOperation[] = [
    {
      id: "SO-2024-7701",
      operationName: "OPERATION NIGHTWATCH",
      targetEntity: "Suspected Terrorist Cell - Alpha Group",
      operationType: "physical",
      startDate: new Date(Date.now() - 2592000000), // 30 days ago
      duration: 90,
      status: "active",
      classification: "top_secret",
      assetsDeployed: 47,
      dataCollected: 2847.5,
      keyFindings: 156,
      riskLevel: "critical"
    },
    {
      id: "SO-2024-7702",
      operationName: "OPERATION DIGITAL SHADOW",
      targetEntity: "Foreign Intelligence Network",
      operationType: "cyber",
      startDate: new Date(Date.now() - 1728000000), // 20 days ago
      duration: 60,
      status: "active",
      classification: "secret",
      assetsDeployed: 23,
      dataCollected: 1456.2,
      keyFindings: 89,
      riskLevel: "high"
    },
    {
      id: "SO-2024-7703",
      operationName: "OPERATION FINANCIAL TRACE",
      targetEntity: "Terror Financing Network",
      operationType: "financial",
      startDate: new Date(Date.now() - 1296000000), // 15 days ago
      duration: 45,
      status: "active",
      classification: "secret",
      assetsDeployed: 12,
      dataCollected: 892.1,
      keyFindings: 67,
      riskLevel: "medium"
    }
  ];

  const emergencyResponses: EmergencyResponse[] = [
    {
      id: "ER-2024-5501",
      incidentType: "bomb_threat",
      location: "Federal Building - Downtown",
      severity: "critical",
      status: "responding",
      unitsDeployed: ["SWAT Team Alpha", "Bomb Squad", "EOD Unit", "Tactical Response"],
      civilianEvacuation: true,
      estimatedAffected: 2500,
      responseTime: 8,
      commandCenter: "Joint Operations Center",
      lastUpdate: new Date(Date.now() - 900000)
    },
    {
      id: "ER-2024-5502",
      incidentType: "cyber_attack",
      location: "Regional Power Grid",
      severity: "major",
      status: "contained",
      unitsDeployed: ["Cyber Response Team", "Infrastructure Security"],
      civilianEvacuation: false,
      estimatedAffected: 150000,
      responseTime: 15,
      commandCenter: "Cyber Operations Center",
      lastUpdate: new Date(Date.now() - 1800000)
    }
  ];

  const operationalMetrics: OperationalMetric[] = [
    {category: "Active Surveillance Operations", value: 47, unit: "ops", trend: "up", classification: "restricted"},
    {category: "Intelligence Reports (24h)", value: 156, unit: "reports", trend: "stable", classification: "restricted"},
    {category: "Threat Level Assessment", value: 3, unit: "level", trend: "up", target: 2, classification: "restricted"},
    {category: "Response Time Average", value: 12, unit: "minutes", trend: "down", target: 15, classification: "unclassified"},
    {category: "Interagency Coordination", value: 94, unit: "percent", trend: "up", target: 90, classification: "unclassified"},
    {category: "Cyber Threat Detection", value: 234, unit: "incidents", trend: "up", classification: "restricted"}
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

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-600 text-white';
      case 'severe': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'elevated': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'top_secret': return 'bg-red-500 text-white';
      case 'secret': return 'bg-orange-500 text-white';
      case 'confidential': return 'bg-yellow-500 text-black';
      case 'restricted': return 'bg-blue-500 text-white';
      case 'unclassified': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'responding': case 'active_response': return 'bg-red-500';
      case 'investigating': case 'monitoring': case 'planning': return 'bg-orange-500';
      case 'contained': case 'paused': return 'bg-yellow-500';
      case 'resolved': case 'completed': case 'neutralized': return 'bg-green-500';
      case 'compromised': case 'false_alarm': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const getSourceTypeIcon = (type: string) => {
    switch (type) {
      case 'humint': return <Users className="h-4 w-4" />;
      case 'sigint': return <Radio className="h-4 w-4" />;
      case 'geoint': return <Satellite className="h-4 w-4" />;
      case 'osint': return <Globe className="h-4 w-4" />;
      case 'techint': return <Cpu className="h-4 w-4" />;
      case 'finint': return <CreditCard className="h-4 w-4" />;
      default: return <Database className="h-4 w-4" />;
    }
  };

  const getThreatTypeIcon = (type: string) => {
    switch (type) {
      case 'domestic': return <Flag className="h-4 w-4" />;
      case 'international': return <Globe className="h-4 w-4" />;
      case 'cyber': return <Monitor className="h-4 w-4" />;
      case 'biological': return <Fingerprint className="h-4 w-4" />;
      case 'chemical': return <Zap className="h-4 w-4" />;
      case 'nuclear': return <Radar className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case 'bomb_threat': return <Target className="h-4 w-4" />;
      case 'active_shooter': return <Crosshair className="h-4 w-4" />;
      case 'hostage': return <Users className="h-4 w-4" />;
      case 'chemical_attack': return <Zap className="h-4 w-4" />;
      case 'cyber_attack': return <Monitor className="h-4 w-4" />;
      case 'infrastructure': return <Building className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-green-500" />;
      case 'stable': return <Activity className="h-4 w-4 text-blue-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    if (!intelligenceFusion) return;

    const interval = setInterval(() => {
      // Simulate threat level changes
      const levels: Array<'low' | 'elevated' | 'high' | 'severe' | 'critical'> = ['low', 'elevated', 'high', 'severe', 'critical'];
      if (Math.random() < 0.1) {
        setThreatLevel(levels[Math.floor(Math.random() * levels.length)]);
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [intelligenceFusion]);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navigation />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Shield className="h-8 w-8 text-red-500" />
              Counter-Terrorism Operations Center
            </h1>
            <p className="text-slate-300">Classified threat assessment, intelligence fusion, and emergency response coordination</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Label htmlFor="intel-fusion" className="text-white">Intelligence Fusion</Label>
              <Switch
                id="intel-fusion"
                checked={intelligenceFusion}
                onCheckedChange={setIntelligenceFusion}
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="surveillance" className="text-white">Surveillance Active</Label>
              <Switch
                id="surveillance"
                checked={surveillanceActive}
                onCheckedChange={setSurveillanceActive}
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="emergency" className="text-white">Emergency Mode</Label>
              <Switch
                id="emergency"
                checked={emergencyMode}
                onCheckedChange={setEmergencyMode}
              />
            </div>
            <Button className="flex items-center gap-2 bg-red-600 hover:bg-red-700">
              <AlertTriangle className="h-4 w-4" />
              Escalate Threat
            </Button>
          </div>
        </div>

        {/* Threat Level Status */}
        <Alert className={`border-l-4 ${emergencyMode ? 'border-l-red-600 bg-red-900/20' : threatLevel === 'critical' ? 'border-l-red-500 bg-red-900/20' : threatLevel === 'severe' ? 'border-l-orange-500 bg-orange-900/20' : 'border-l-yellow-500 bg-yellow-900/20'}`}>
          <Shield className="h-4 w-4" />
          <AlertTitle className="flex items-center justify-between text-white">
            <span>NATIONAL THREAT LEVEL: {threatLevel.toUpperCase()}</span>
            <div className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full animate-pulse ${threatLevel === 'critical' ? 'bg-red-500' : threatLevel === 'severe' ? 'bg-orange-500' : 'bg-yellow-500'}`}></div>
              <Badge className={getThreatLevelColor(threatLevel)}>
                {emergencyMode ? "EMERGENCY PROTOCOL ACTIVE" : "MONITORING"}
              </Badge>
              <Badge className={getClassificationColor(classificationLevel)}>
                {classificationLevel.toUpperCase()}
              </Badge>
            </div>
          </AlertTitle>
          <AlertDescription className="text-slate-300">
            {threatAssessments.filter(t => t.status === 'active_response').length} active threats under response •
            {intelligenceSources.filter(s => s.status === 'active').length} intelligence sources operational •
            {surveillanceOperations.filter(o => o.status === 'active').length} surveillance operations running
          </AlertDescription>
        </Alert>

        {/* Critical Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {operationalMetrics.map((metric, index) => (
            <Card key={index} className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">{metric.category}</CardTitle>
                <div className="flex items-center gap-1">
                  {getTrendIcon(metric.trend)}
                  <Badge className={getClassificationColor(metric.classification)}>
                    {metric.classification.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {metric.value}
                  <span className="text-sm text-slate-400 ml-1">{metric.unit}</span>
                </div>
                {metric.target && (
                  <p className={`text-xs ${metric.value <= metric.target ? 'text-green-400' : 'text-red-400'}`}>
                    Target: {metric.target} {metric.unit}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="threats" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800">
            <TabsTrigger value="threats" className="data-[state=active]:bg-slate-700">Threat Assessment</TabsTrigger>
            <TabsTrigger value="intelligence" className="data-[state=active]:bg-slate-700">Intelligence Fusion</TabsTrigger>
            <TabsTrigger value="surveillance" className="data-[state=active]:bg-slate-700">Surveillance Ops</TabsTrigger>
            <TabsTrigger value="emergency" className="data-[state=active]:bg-slate-700">Emergency Response</TabsTrigger>
            <TabsTrigger value="command" className="data-[state=active]:bg-slate-700">Command Center</TabsTrigger>
            <TabsTrigger value="classified" className="data-[state=active]:bg-slate-700">Classified Ops</TabsTrigger>
          </TabsList>

          <TabsContent value="threats" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Active Threat Assessments</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-slate-600 text-white">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter by Level
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600 text-white">
                  <Download className="h-4 w-4 mr-1" />
                  Generate Brief
                </Button>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Target className="h-4 w-4 mr-2" />
                  New Assessment
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {threatAssessments.map((threat) => (
                <Card key={threat.id} className="bg-slate-800 border-slate-700 border-l-4 border-l-red-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getThreatTypeIcon(threat.type)}
                        <div>
                          <CardTitle className="text-lg text-white">{threat.title}</CardTitle>
                          <CardDescription className="text-slate-400">
                            {threat.id} • {threat.type.toUpperCase()} • Confidence: {threat.confidence.toFixed(1)}%
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getThreatLevelColor(threat.threatLevel)}>
                          {threat.threatLevel.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(threat.status)}>
                          {threat.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-slate-300">{threat.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-slate-500">Location</div>
                          <div className="font-medium text-white">{threat.location}</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Target Type</div>
                          <div className="font-medium text-white">{threat.targetType}</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Potential Impact</div>
                          <div className="font-medium text-red-400">{threat.potentialCasualties}</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Last Update</div>
                          <div className="font-medium text-white">{formatTimeAgo(threat.lastUpdate)}</div>
                        </div>
                      </div>

                      <div className="border-t border-slate-700 pt-3">
                        <p className="text-sm font-medium text-slate-400 mb-2">Intelligence Sources:</p>
                        <div className="flex flex-wrap gap-2">
                          {threat.sources.map((source, index) => (
                            <Badge key={index} variant="outline" className="border-slate-600 text-slate-300">
                              {source}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          <Target className="h-3 w-3 mr-1" />
                          Escalate Response
                        </Button>
                        <Button size="sm" variant="outline" className="border-slate-600 text-white">
                          <Eye className="h-3 w-3 mr-1" />
                          Intelligence Brief
                        </Button>
                        <Button size="sm" variant="outline" className="border-slate-600 text-white">
                          <Users className="h-3 w-3 mr-1" />
                          Deploy Assets
                        </Button>
                        <Button size="sm" variant="outline" className="border-slate-600 text-white">
                          <Share className="h-3 w-3 mr-1" />
                          Share Intel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="intelligence" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Intelligence Fusion Center</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-slate-600 text-white">
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Update Sources
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Database className="h-4 w-4 mr-2" />
                  Intelligence Brief
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Active Intelligence Sources</CardTitle>
                  <CardDescription className="text-slate-400">Multi-source intelligence collection and analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {intelligenceSources.map((source) => (
                      <div key={source.id} className="p-3 border border-slate-700 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getSourceTypeIcon(source.sourceType)}
                            <span className="font-medium text-white">{source.sourceType.toUpperCase()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getClassificationColor(source.classification)}>
                              {source.classification.toUpperCase()}
                            </Badge>
                            <Badge className={getStatusColor(source.status)}>
                              {source.status.toUpperCase()}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-slate-500">Reliability</div>
                            <div className="font-medium text-white">Grade {source.reliability}</div>
                          </div>
                          <div>
                            <div className="text-slate-500">Credibility</div>
                            <div className="font-medium text-green-400">{source.credibility.toFixed(1)}%</div>
                          </div>
                          <div>
                            <div className="text-slate-500">Active Ops</div>
                            <div className="font-medium text-white">{source.activeOperations}</div>
                          </div>
                          <div>
                            <div className="text-slate-500">Region</div>
                            <div className="font-medium text-white">{source.region}</div>
                          </div>
                        </div>

                        <div className="text-xs text-slate-500 mt-2">
                          Last report: {formatTimeAgo(source.lastReport)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Intelligence Summary</CardTitle>
                  <CardDescription className="text-slate-400">Fusion analysis and key findings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border-l-4 border-l-red-500 bg-red-900/20">
                      <h4 className="font-medium text-red-400 mb-2">PRIORITY INTELLIGENCE</h4>
                      <p className="text-sm text-slate-300">
                        HUMINT sources confirm coordinated planning for infrastructure attacks.
                        Multiple cell communications intercepted via SIGINT indicating imminent timeline.
                      </p>
                      <div className="text-xs text-slate-500 mt-2">Classification: TOP SECRET</div>
                    </div>

                    <div className="p-4 border-l-4 border-l-orange-500 bg-orange-900/20">
                      <h4 className="font-medium text-orange-400 mb-2">GEOSPATIAL INTELLIGENCE</h4>
                      <p className="text-sm text-slate-300">
                        Satellite imagery analysis reveals unusual activity at suspected training facilities.
                        Pattern-of-life analysis indicates increased operational tempo.
                      </p>
                      <div className="text-xs text-slate-500 mt-2">Classification: SECRET</div>
                    </div>

                    <div className="p-4 border-l-4 border-l-blue-500 bg-blue-900/20">
                      <h4 className="font-medium text-blue-400 mb-2">CYBER INTELLIGENCE</h4>
                      <p className="text-sm text-slate-300">
                        Increased chatter on encrypted channels suggesting cyber component to planned operations.
                        TECHINT analysis indicates targeting of critical control systems.
                      </p>
                      <div className="text-xs text-slate-500 mt-2">Classification: SECRET</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="surveillance" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Surveillance Operations</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-slate-600 text-white">
                  <Eye className="h-4 w-4 mr-1" />
                  Asset Deployment
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Camera className="h-4 w-4 mr-2" />
                  New Operation
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {surveillanceOperations.map((operation) => (
                <Card key={operation.id} className="bg-slate-800 border-slate-700 border-l-4 border-l-purple-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg text-white">{operation.operationName}</CardTitle>
                        <CardDescription className="text-slate-400">
                          {operation.id} • Target: {operation.targetEntity}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getClassificationColor(operation.classification)}>
                          {operation.classification.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(operation.status)}>
                          {operation.status.toUpperCase()}
                        </Badge>
                        <Badge className={getThreatLevelColor(operation.riskLevel)}>
                          {operation.riskLevel.toUpperCase()} RISK
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-slate-500">Operation Type</div>
                          <div className="font-medium text-white capitalize">{operation.operationType}</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Duration</div>
                          <div className="font-medium text-white">{operation.duration} days</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Assets Deployed</div>
                          <div className="font-medium text-white">{operation.assetsDeployed}</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Data Collected</div>
                          <div className="font-medium text-green-400">{operation.dataCollected.toFixed(1)} GB</div>
                        </div>
                      </div>

                      <div className="border-t border-slate-700 pt-3">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-slate-500">Start Date</div>
                            <div className="font-medium text-white">{formatTimeAgo(operation.startDate)}</div>
                          </div>
                          <div>
                            <div className="text-slate-500">Key Findings</div>
                            <div className="font-medium text-yellow-400">{operation.keyFindings}</div>
                          </div>
                          <div>
                            <div className="text-slate-500">Progress</div>
                            <div className="font-medium text-white">
                              {Math.round((Date.now() - operation.startDate.getTime()) / (1000 * 60 * 60 * 24))} / {operation.duration} days
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-slate-700 pt-3">
                        <Progress
                          value={Math.min(100, (Date.now() - operation.startDate.getTime()) / (1000 * 60 * 60 * 24 * operation.duration) * 100)}
                          className="h-2 mb-3"
                        />
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Eye className="h-3 w-3 mr-1" />
                          Monitor Live
                        </Button>
                        <Button size="sm" variant="outline" className="border-slate-600 text-white">
                          <Camera className="h-3 w-3 mr-1" />
                          View Assets
                        </Button>
                        <Button size="sm" variant="outline" className="border-slate-600 text-white">
                          <Download className="h-3 w-3 mr-1" />
                          Intel Report
                        </Button>
                        <Button size="sm" variant="outline" className="border-slate-600 text-white">
                          <Settings className="h-3 w-3 mr-1" />
                          Adjust Parameters
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="emergency" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Emergency Response Operations</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-slate-600 text-white">
                  <Users className="h-4 w-4 mr-1" />
                  Unit Status
                </Button>
                <Button className="bg-red-600 hover:bg-red-700">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Emergency Protocol
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {emergencyResponses.map((response) => (
                <Card key={response.id} className="bg-slate-800 border-slate-700 border-l-4 border-l-red-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getIncidentIcon(response.incidentType)}
                        <div>
                          <CardTitle className="text-lg text-white capitalize">
                            {response.incidentType.replace('_', ' ')} - {response.location}
                          </CardTitle>
                          <CardDescription className="text-slate-400">
                            {response.id} • Response time: {response.responseTime} minutes
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getThreatLevelColor(response.severity)}>
                          {response.severity.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(response.status)}>
                          {response.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-slate-500">Command Center</div>
                          <div className="font-medium text-white">{response.commandCenter}</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Estimated Affected</div>
                          <div className="font-medium text-red-400">{response.estimatedAffected.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Civilian Evacuation</div>
                          <div className="font-medium text-white">
                            {response.civilianEvacuation ? 'IN PROGRESS' : 'NOT REQUIRED'}
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-500">Last Update</div>
                          <div className="font-medium text-white">{formatTimeAgo(response.lastUpdate)}</div>
                        </div>
                      </div>

                      <div className="border-t border-slate-700 pt-3">
                        <p className="text-sm font-medium text-slate-400 mb-2">Deployed Units:</p>
                        <div className="flex flex-wrap gap-2">
                          {response.unitsDeployed.map((unit, index) => (
                            <Badge key={index} variant="outline" className="border-slate-600 text-slate-300">
                              {unit}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          <Target className="h-3 w-3 mr-1" />
                          Command & Control
                        </Button>
                        <Button size="sm" variant="outline" className="border-slate-600 text-white">
                          <Users className="h-3 w-3 mr-1" />
                          Deploy Additional
                        </Button>
                        <Button size="sm" variant="outline" className="border-slate-600 text-white">
                          <Radio className="h-3 w-3 mr-1" />
                          Communications
                        </Button>
                        <Button size="sm" variant="outline" className="border-slate-600 text-white">
                          <MapPin className="h-3 w-3 mr-1" />
                          Tactical Map
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="command" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Joint Operations Command Center</CardTitle>
                    <CardDescription className="text-slate-400">Real-time operational coordination and control</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 border border-slate-700 rounded-lg">
                          <div className="text-2xl font-bold text-red-400">{threatAssessments.filter(t => t.threatLevel === 'critical').length}</div>
                          <div className="text-xs text-slate-500">Critical Threats</div>
                        </div>
                        <div className="text-center p-3 border border-slate-700 rounded-lg">
                          <div className="text-2xl font-bold text-orange-400">{surveillanceOperations.filter(o => o.status === 'active').length}</div>
                          <div className="text-xs text-slate-500">Active Operations</div>
                        </div>
                        <div className="text-center p-3 border border-slate-700 rounded-lg">
                          <div className="text-2xl font-bold text-blue-400">{intelligenceSources.filter(s => s.status === 'active').length}</div>
                          <div className="text-xs text-slate-500">Intel Sources</div>
                        </div>
                      </div>

                      <Separator className="bg-slate-700" />

                      <div>
                        <h4 className="font-medium mb-3 text-white">Command Structure Status</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 border border-slate-700 rounded-lg">
                            <div>
                              <div className="font-medium text-white">Joint Terrorism Task Force</div>
                              <div className="text-sm text-slate-400">Primary command authority</div>
                            </div>
                            <Badge className="bg-green-500">Operational</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 border border-slate-700 rounded-lg">
                            <div>
                              <div className="font-medium text-white">FBI Counter-Terrorism Division</div>
                              <div className="text-sm text-slate-400">Federal coordination</div>
                            </div>
                            <Badge className="bg-green-500">Operational</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 border border-slate-700 rounded-lg">
                            <div>
                              <div className="font-medium text-white">DHS Threat Assessment</div>
                              <div className="text-sm text-slate-400">Intelligence fusion</div>
                            </div>
                            <Badge className="bg-green-500">Operational</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 border border-slate-700 rounded-lg">
                            <div>
                              <div className="font-medium text-white">NSA Cyber Command</div>
                              <div className="text-sm text-slate-400">Cyber threat monitoring</div>
                            </div>
                            <Badge className="bg-yellow-500">Limited</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">System Status</CardTitle>
                    <CardDescription className="text-slate-400">Critical infrastructure monitoring</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white">Secure Communications</span>
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white">Satellite Network</span>
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white">Intelligence Database</span>
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white">Threat Detection AI</span>
                        <AlertCircle className="h-4 w-4 text-yellow-400" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white">Emergency Protocols</span>
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Emergency Actions</CardTitle>
                    <CardDescription className="text-slate-400">Critical response protocols</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
                        <AlertTriangle className="h-3 w-3 mr-2" />
                        Activate DEFCON Protocols
                      </Button>
                      <Button size="sm" variant="outline" className="w-full border-slate-600 text-white">
                        <Users className="h-3 w-3 mr-2" />
                        Deploy Crisis Team
                      </Button>
                      <Button size="sm" variant="outline" className="w-full border-slate-600 text-white">
                        <Radio className="h-3 w-3 mr-2" />
                        Emergency Broadcast
                      </Button>
                      <Button size="sm" variant="outline" className="w-full border-slate-600 text-white">
                        <Share className="h-3 w-3 mr-2" />
                        Inter-Agency Alert
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="classified" className="space-y-4">
            <div className="text-center py-8">
              <Lock className="h-16 w-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">CLASSIFIED OPERATIONS</h3>
              <p className="text-slate-400 mb-4">
                Access to classified operations requires additional authentication and clearance verification.
              </p>
              <div className="space-y-2">
                <Badge className="bg-red-500 text-white">TOP SECRET CLEARANCE REQUIRED</Badge>
                <div className="text-sm text-slate-500">
                  Contact your security officer to request access to classified operational data.
                </div>
              </div>
              <Button className="mt-4 bg-red-600 hover:bg-red-700">
                <Key className="h-4 w-4 mr-2" />
                Request Classified Access
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
