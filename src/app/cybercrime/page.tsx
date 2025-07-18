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
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Shield,
  Cpu,
  Network,
  Search,
  Eye,
  AlertTriangle,
  Lock,
  Unlock,
  Key,
  Database,
  Globe,
  Activity,
  TrendingUp,
  BarChart3,
  FileText,
  Image,
  Video,
  HardDrive,
  Smartphone,
  Monitor,
  Router,
  Server,
  Cloud,
  Brain,
  Target,
  Zap,
  Clock,
  MapPin,
  Users,
  MessageSquare,
  Download,
  Upload,
  RefreshCw,
  Filter,
  Settings,
  Play,
  Pause,
  Square,
  Scan,
  Binary,
  Hash,
  Fingerprint,
  Bug,
  ShieldAlert,
  Wifi,
  Bluetooth,
  CreditCard,
  DollarSign,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info
} from "lucide-react";

interface CyberThreat {
  id: string;
  type: 'malware' | 'phishing' | 'ransomware' | 'ddos' | 'data_breach' | 'cryptocurrency' | 'dark_web';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  targetType: string;
  firstDetected: Date;
  lastActivity: Date;
  status: 'active' | 'investigating' | 'contained' | 'resolved';
  ips: string[];
  domains: string[];
  indicators: number;
  confidence: number;
}

interface DigitalEvidence {
  id: string;
  type: 'hard_drive' | 'mobile_device' | 'network_capture' | 'memory_dump' | 'cloud_data' | 'cryptocurrency';
  name: string;
  source: string;
  size: number;
  collected: Date;
  hash: string;
  status: 'processing' | 'analyzed' | 'verified' | 'corrupted';
  findings: number;
  timeline: Array<{event: string, timestamp: Date}>;
}

interface NetworkAnalysis {
  id: string;
  sessionName: string;
  startTime: Date;
  duration: number;
  packetsAnalyzed: number;
  suspiciousConnections: number;
  maliciousIPs: number;
  dataExfiltration: boolean;
  status: 'running' | 'completed' | 'error';
}

interface CryptocurrencyTrace {
  id: string;
  blockchain: 'bitcoin' | 'ethereum' | 'monero' | 'other';
  address: string;
  totalAmount: number;
  transactions: number;
  riskScore: number;
  associatedEntities: string[];
  status: 'traced' | 'analyzing' | 'lost_trail';
  lastUpdate: Date;
}

export default function CybercrimeHub() {
  const [activeScans, setActiveScans] = useState(3);
  const [threatLevel, setThreatLevel] = useState("elevated");
  const [networkMonitoring, setNetworkMonitoring] = useState(true);
  const [darkWebMonitoring, setDarkWebMonitoring] = useState(true);

  const cyberThreats: CyberThreat[] = [
    {
      id: "CT-2024-8901",
      type: "ransomware",
      severity: "critical",
      title: "Advanced Persistent Threat - Financial Sector",
      description: "Sophisticated ransomware campaign targeting financial institutions with custom encryption",
      targetType: "Financial Services",
      firstDetected: new Date(Date.now() - 7200000),
      lastActivity: new Date(Date.now() - 1800000),
      status: "investigating",
      ips: ["192.168.45.77", "10.0.0.23", "172.16.8.99"],
      domains: ["finance-secure[.]org", "bank-verify[.]com"],
      indicators: 47,
      confidence: 94.7
    },
    {
      id: "CT-2024-8902",
      type: "cryptocurrency",
      severity: "high",
      title: "Cryptocurrency Money Laundering Operation",
      description: "Large-scale Bitcoin mixing service facilitating money laundering for criminal organizations",
      targetType: "Cryptocurrency Exchanges",
      firstDetected: new Date(Date.now() - 14400000),
      lastActivity: new Date(Date.now() - 3600000),
      status: "active",
      ips: ["203.45.67.12", "178.99.44.88"],
      domains: ["crypto-mix[.]onion", "btc-clean[.]org"],
      indicators: 23,
      confidence: 87.3
    },
    {
      id: "CT-2024-8903",
      type: "dark_web",
      severity: "medium",
      title: "Stolen Identity Documents Marketplace",
      description: "Dark web marketplace selling stolen government IDs and financial documents",
      targetType: "Identity Documents",
      firstDetected: new Date(Date.now() - 21600000),
      lastActivity: new Date(Date.now() - 7200000),
      status: "contained",
      ips: ["tor-relay-1", "tor-relay-2"],
      domains: ["id-market[.]onion"],
      indicators: 12,
      confidence: 78.9
    }
  ];

  const digitalEvidence: DigitalEvidence[] = [
    {
      id: "DE-2024-3401",
      type: "hard_drive",
      name: "Suspect Workstation - Primary Drive",
      source: "Search Warrant - 123 Main St",
      size: 2000000000, // 2TB
      collected: new Date(Date.now() - 86400000),
      hash: "SHA256: a1b2c3d4e5f6789012345678901234567890abcdef",
      status: "analyzed",
      findings: 847,
      timeline: [
        {event: "Evidence collected on-site", timestamp: new Date(Date.now() - 86400000)},
        {event: "Chain of custody verified", timestamp: new Date(Date.now() - 82800000)},
        {event: "Forensic imaging completed", timestamp: new Date(Date.now() - 79200000)},
        {event: "Analysis phase started", timestamp: new Date(Date.now() - 75600000)},
        {event: "Suspicious files identified", timestamp: new Date(Date.now() - 21600000)}
      ]
    },
    {
      id: "DE-2024-3402",
      type: "mobile_device",
      name: "iPhone 14 Pro - Encrypted",
      source: "Arrest - Subject Alpha",
      size: 256000000, // 256GB
      collected: new Date(Date.now() - 43200000),
      hash: "SHA256: f6e5d4c3b2a19876543210987654321fedcba0987654321",
      status: "processing",
      findings: 23,
      timeline: [
        {event: "Device seized during arrest", timestamp: new Date(Date.now() - 43200000)},
        {event: "Faraday cage isolation", timestamp: new Date(Date.now() - 39600000)},
        {event: "Cellebrite extraction initiated", timestamp: new Date(Date.now() - 36000000)}
      ]
    },
    {
      id: "DE-2024-3403",
      type: "network_capture",
      name: "Network Traffic - Malware C&C",
      source: "Wireshark Capture - Operation Darknet",
      size: 45000000, // 45GB
      collected: new Date(Date.now() - 7200000),
      hash: "SHA256: 9876543210abcdef0123456789abcdef0123456789",
      status: "verified",
      findings: 156,
      timeline: [
        {event: "Live capture initiated", timestamp: new Date(Date.now() - 7200000)},
        {event: "Malicious traffic detected", timestamp: new Date(Date.now() - 5400000)},
        {event: "C&C communications identified", timestamp: new Date(Date.now() - 3600000)}
      ]
    }
  ];

  const networkAnalyses: NetworkAnalysis[] = [
    {
      id: "NA-2024-1201",
      sessionName: "Corporate Network Intrusion Analysis",
      startTime: new Date(Date.now() - 14400000),
      duration: 240, // minutes
      packetsAnalyzed: 2847392,
      suspiciousConnections: 47,
      maliciousIPs: 8,
      dataExfiltration: true,
      status: "completed"
    },
    {
      id: "NA-2024-1202",
      sessionName: "Real-time Threat Hunting",
      startTime: new Date(Date.now() - 3600000),
      duration: 60,
      packetsAnalyzed: 892847,
      suspiciousConnections: 12,
      maliciousIPs: 3,
      dataExfiltration: false,
      status: "running"
    }
  ];

  const cryptocurrencyTraces: CryptocurrencyTrace[] = [
    {
      id: "BTC-TR-8901",
      blockchain: "bitcoin",
      address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      totalAmount: 247.83,
      transactions: 1247,
      riskScore: 8.7,
      associatedEntities: ["Ransomware Group Alpha", "Dark Market Beta"],
      status: "traced",
      lastUpdate: new Date(Date.now() - 1800000)
    },
    {
      id: "ETH-TR-8902",
      blockchain: "ethereum",
      address: "0x742d35Cc6634C0532925a3b8D4C7FBD4a56B",
      totalAmount: 1847.92,
      transactions: 489,
      riskScore: 9.2,
      associatedEntities: ["Money Laundering Network", "Crypto Mixer Service"],
      status: "analyzing",
      lastUpdate: new Date(Date.now() - 900000)
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

  const formatFileSize = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'running': case 'processing': case 'analyzing': return 'bg-orange-500';
      case 'investigating': case 'traced': return 'bg-blue-500';
      case 'contained': case 'completed': case 'analyzed': case 'verified': return 'bg-green-500';
      case 'resolved': return 'bg-gray-500';
      case 'error': case 'corrupted': case 'lost_trail': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getThreatTypeIcon = (type: string) => {
    switch (type) {
      case 'malware': return <Bug className="h-4 w-4" />;
      case 'phishing': return <MessageSquare className="h-4 w-4" />;
      case 'ransomware': return <Lock className="h-4 w-4" />;
      case 'ddos': return <Network className="h-4 w-4" />;
      case 'data_breach': return <Database className="h-4 w-4" />;
      case 'cryptocurrency': return <CreditCard className="h-4 w-4" />;
      case 'dark_web': return <Globe className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getEvidenceTypeIcon = (type: string) => {
    switch (type) {
      case 'hard_drive': return <HardDrive className="h-4 w-4" />;
      case 'mobile_device': return <Smartphone className="h-4 w-4" />;
      case 'network_capture': return <Network className="h-4 w-4" />;
      case 'memory_dump': return <Cpu className="h-4 w-4" />;
      case 'cloud_data': return <Cloud className="h-4 w-4" />;
      case 'cryptocurrency': return <CreditCard className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScans(prev => Math.max(1, prev + Math.floor(Math.random() * 3) - 1));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Shield className="h-8 w-8 text-red-600" />
              Cybercrime Investigation Hub
            </h1>
            <p className="text-slate-600">Advanced digital forensics, threat intelligence, and cybercrime investigation platform</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Label htmlFor="network-monitoring">Network Monitoring</Label>
              <Switch
                id="network-monitoring"
                checked={networkMonitoring}
                onCheckedChange={setNetworkMonitoring}
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="darkweb-monitoring">Dark Web Intel</Label>
              <Switch
                id="darkweb-monitoring"
                checked={darkWebMonitoring}
                onCheckedChange={setDarkWebMonitoring}
              />
            </div>
            <Button className="flex items-center gap-2">
              <Scan className="h-4 w-4" />
              Start Investigation
            </Button>
          </div>
        </div>

        {/* Threat Level Status */}
        <Alert className={`border-l-4 ${threatLevel === 'critical' ? 'border-l-red-500 bg-red-50' : threatLevel === 'elevated' ? 'border-l-orange-500 bg-orange-50' : 'border-l-yellow-500 bg-yellow-50'}`}>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className="flex items-center justify-between">
            <span>Current Cyber Threat Level: {threatLevel.toUpperCase()}</span>
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full animate-pulse ${threatLevel === 'critical' ? 'bg-red-500' : threatLevel === 'elevated' ? 'bg-orange-500' : 'bg-yellow-500'}`}></div>
              <Badge className={threatLevel === 'critical' ? "bg-red-500" : threatLevel === 'elevated' ? "bg-orange-500" : "bg-yellow-500"}>
                {activeScans} Active Investigations
              </Badge>
            </div>
          </AlertTitle>
          <AlertDescription>
            {cyberThreats.filter(t => t.status === 'active').length} active threats detected.
            Network monitoring: {networkMonitoring ? 'ACTIVE' : 'DISABLED'} •
            Dark web intelligence: {darkWebMonitoring ? 'ACTIVE' : 'DISABLED'}
          </AlertDescription>
        </Alert>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
              <Bug className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {cyberThreats.filter(t => t.status === 'active').length}
              </div>
              <p className="text-xs text-slate-600">Requiring immediate attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Digital Evidence</CardTitle>
              <HardDrive className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{digitalEvidence.length}</div>
              <p className="text-xs text-slate-600">Items under analysis</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Crypto Traces</CardTitle>
              <CreditCard className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cryptocurrencyTraces.length}</div>
              <p className="text-xs text-slate-600">Blockchain investigations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Network Sessions</CardTitle>
              <Activity className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{networkAnalyses.length}</div>
              <p className="text-xs text-slate-600">Traffic analysis active</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="threats" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="threats">Threat Intelligence</TabsTrigger>
            <TabsTrigger value="forensics">Digital Forensics</TabsTrigger>
            <TabsTrigger value="network">Network Analysis</TabsTrigger>
            <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
            <TabsTrigger value="darkweb">Dark Web Intel</TabsTrigger>
            <TabsTrigger value="operations">Operations Center</TabsTrigger>
          </TabsList>

          <TabsContent value="threats" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Cyber Threat Intelligence</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter Threats
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Export IOCs
                </Button>
                <Button>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Update Feeds
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {cyberThreats.map((threat) => (
                <Card key={threat.id} className="border-l-4 border-l-red-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getThreatTypeIcon(threat.type)}
                        <div>
                          <CardTitle className="text-lg">{threat.title}</CardTitle>
                          <CardDescription>
                            {threat.id} • {threat.type.replace('_', ' ').toUpperCase()} • Target: {threat.targetType}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(threat.severity)}>
                          {threat.severity.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(threat.status)}>
                          {threat.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <Badge variant="outline">
                          {threat.confidence.toFixed(1)}% confidence
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-slate-700">{threat.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-slate-600">First Detected</div>
                          <div className="font-medium">{formatTimeAgo(threat.firstDetected)}</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Last Activity</div>
                          <div className="font-medium">{formatTimeAgo(threat.lastActivity)}</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Indicators</div>
                          <div className="font-medium">{threat.indicators} IOCs</div>
                        </div>
                        <div>
                          <div className="text-slate-600">IP Addresses</div>
                          <div className="font-medium">{threat.ips.length} identified</div>
                        </div>
                      </div>

                      <div className="border-t pt-3">
                        <p className="text-sm font-medium text-slate-700 mb-2">Malicious Infrastructure:</p>
                        <div className="space-y-1 text-xs font-mono">
                          {threat.ips.slice(0, 2).map((ip, index) => (
                            <div key={index} className="flex justify-between">
                              <span className="text-slate-600">IP:</span>
                              <span className="text-slate-800">{ip}</span>
                            </div>
                          ))}
                          {threat.domains.slice(0, 2).map((domain, index) => (
                            <div key={index} className="flex justify-between">
                              <span className="text-slate-600">Domain:</span>
                              <span className="text-slate-800">{domain}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          <Target className="h-3 w-3 mr-1" />
                          Investigate
                        </Button>
                        <Button size="sm" variant="outline">
                          <Network className="h-3 w-3 mr-1" />
                          Track IOCs
                        </Button>
                        <Button size="sm" variant="outline">
                          <Shield className="h-3 w-3 mr-1" />
                          Block Threat
                        </Button>
                        <Button size="sm" variant="outline">
                          <Users className="h-3 w-3 mr-1" />
                          Share Intel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="forensics" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Digital Forensics Laboratory</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-1" />
                  Add Evidence
                </Button>
                <Button>
                  <Scan className="h-4 w-4 mr-2" />
                  Start Analysis
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {digitalEvidence.map((evidence) => (
                <Card key={evidence.id} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getEvidenceTypeIcon(evidence.type)}
                        <div>
                          <CardTitle className="text-lg">{evidence.name}</CardTitle>
                          <CardDescription>
                            {evidence.id} • Source: {evidence.source}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(evidence.status)}>
                          {evidence.status.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">
                          {evidence.findings} findings
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-slate-600">Size</div>
                          <div className="font-medium">{formatFileSize(evidence.size)}</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Collected</div>
                          <div className="font-medium">{formatTimeAgo(evidence.collected)}</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Type</div>
                          <div className="font-medium capitalize">{evidence.type.replace('_', ' ')}</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Integrity</div>
                          <div className="font-medium text-green-600">Verified</div>
                        </div>
                      </div>

                      <div className="border-t pt-3">
                        <p className="text-sm font-medium text-slate-700 mb-2">Cryptographic Hash:</p>
                        <p className="text-xs font-mono bg-slate-100 p-2 rounded">{evidence.hash}</p>
                      </div>

                      <div className="border-t pt-3">
                        <p className="text-sm font-medium text-slate-700 mb-2">Chain of Custody Timeline:</p>
                        <div className="space-y-1">
                          {evidence.timeline.slice(-3).map((event, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                              <span className="text-slate-600">{formatTimeAgo(event.timestamp)}</span>
                              <span>{event.event}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View Analysis
                        </Button>
                        <Button size="sm" variant="outline">
                          <Fingerprint className="h-3 w-3 mr-1" />
                          Verify Hash
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          Export Report
                        </Button>
                        <Button size="sm" variant="outline">
                          <Clock className="h-3 w-3 mr-1" />
                          Timeline
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="network" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Network Traffic Analysis</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Apply Filters
                </Button>
                <Button>
                  <Play className="h-4 w-4 mr-2" />
                  Start Capture
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Live Network Monitoring
                  </CardTitle>
                  <CardDescription>Real-time packet analysis and threat detection</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Status:</span>
                      <Badge className="bg-green-500">MONITORING</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-slate-600">Packets/sec</div>
                        <div className="text-xl font-bold">14,247</div>
                      </div>
                      <div>
                        <div className="text-slate-600">Threats Blocked</div>
                        <div className="text-xl font-bold text-red-600">23</div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Network Load</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Threat Detection Summary
                  </CardTitle>
                  <CardDescription>Malicious activity identified in network traffic</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">C&C Communications</span>
                      <Badge className="bg-red-500">12 detected</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">Data Exfiltration</span>
                      <Badge className="bg-orange-500">3 blocked</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">Malware Downloads</span>
                      <Badge className="bg-yellow-500">7 prevented</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">Port Scans</span>
                      <Badge className="bg-blue-500">45 logged</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Analysis Sessions</CardTitle>
                <CardDescription>Historical and ongoing network analysis sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Session</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Packets</TableHead>
                      <TableHead>Threats</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {networkAnalyses.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{session.sessionName}</div>
                            <div className="text-xs text-slate-600">{session.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>{session.duration} min</TableCell>
                        <TableCell>{session.packetsAnalyzed.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{session.suspiciousConnections} suspicious</div>
                            <div className="text-red-600">{session.maliciousIPs} malicious IPs</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(session.status)}>
                            {session.status.toUpperCase()}
                          </Badge>
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="crypto" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Cryptocurrency Investigation</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-1" />
                  Address Lookup
                </Button>
                <Button>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Start Trace
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {cryptocurrencyTraces.map((trace) => (
                <Card key={trace.id} className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-green-600" />
                        <div>
                          <CardTitle className="text-lg">{trace.blockchain.toUpperCase()} Investigation</CardTitle>
                          <CardDescription>
                            {trace.id} • Address: {trace.address.substring(0, 20)}...
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${trace.riskScore > 8 ? 'bg-red-500' : trace.riskScore > 6 ? 'bg-orange-500' : 'bg-yellow-500'}`}>
                          Risk: {trace.riskScore.toFixed(1)}/10
                        </Badge>
                        <Badge className={getStatusColor(trace.status)}>
                          {trace.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-slate-600">Total Amount</div>
                          <div className="font-medium text-green-600">
                            {trace.totalAmount.toFixed(2)} {trace.blockchain === 'bitcoin' ? 'BTC' : 'ETH'}
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-600">Transactions</div>
                          <div className="font-medium">{trace.transactions.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Last Update</div>
                          <div className="font-medium">{formatTimeAgo(trace.lastUpdate)}</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Entities</div>
                          <div className="font-medium">{trace.associatedEntities.length} linked</div>
                        </div>
                      </div>

                      <div className="border-t pt-3">
                        <p className="text-sm font-medium text-slate-700 mb-2">Associated Criminal Entities:</p>
                        <div className="flex flex-wrap gap-2">
                          {trace.associatedEntities.map((entity, index) => (
                            <Badge key={index} variant="outline" className="bg-red-50 border-red-200 text-red-700">
                              {entity}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="border-t pt-3">
                        <p className="text-sm font-medium text-slate-700 mb-2">Wallet Address:</p>
                        <p className="text-xs font-mono bg-slate-100 p-2 rounded break-all">{trace.address}</p>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Expand Trace
                        </Button>
                        <Button size="sm" variant="outline">
                          <BarChart3 className="h-3 w-3 mr-1" />
                          Flow Analysis
                        </Button>
                        <Button size="sm" variant="outline">
                          <Users className="h-3 w-3 mr-1" />
                          Share Intelligence
                        </Button>
                        <Button size="sm" variant="outline">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Flag Suspicious
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="darkweb" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Dark Web Intelligence</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-1" />
                  Search Markets
                </Button>
                <Button>
                  <Globe className="h-4 w-4 mr-2" />
                  Monitor Sources
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Active Monitoring
                  </CardTitle>
                  <CardDescription>Real-time dark web marketplace surveillance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Silk Road 3.0</div>
                        <div className="text-sm text-slate-600">Drug marketplace</div>
                      </div>
                      <Badge className="bg-green-500">Monitoring</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Identity Bazaar</div>
                        <div className="text-sm text-slate-600">Stolen documents</div>
                      </div>
                      <Badge className="bg-red-500">High Activity</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">CryptoLaunder</div>
                        <div className="text-sm text-slate-600">Money laundering</div>
                      </div>
                      <Badge className="bg-orange-500">Investigating</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Intelligence Alerts
                  </CardTitle>
                  <CardDescription>Recent findings from dark web monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border-l-4 border-l-red-500 bg-red-50">
                      <div className="font-medium text-red-700">New Ransomware-as-a-Service</div>
                      <p className="text-sm text-red-600 mt-1">
                        "CryptoLocker Pro" advertised on multiple forums. Targeting financial institutions.
                      </p>
                      <div className="text-xs text-slate-500 mt-2">2 hours ago</div>
                    </div>
                    <div className="p-3 border-l-4 border-l-orange-500 bg-orange-50">
                      <div className="font-medium text-orange-700">Stolen Database Sale</div>
                      <p className="text-sm text-orange-600 mt-1">
                        Major healthcare provider database for sale. 2.3M patient records.
                      </p>
                      <div className="text-xs text-slate-500 mt-2">6 hours ago</div>
                    </div>
                    <div className="p-3 border-l-4 border-l-blue-500 bg-blue-50">
                      <div className="font-medium text-blue-700">Forum Intelligence</div>
                      <p className="text-sm text-blue-600 mt-1">
                        Increased chatter about targeting government infrastructure.
                      </p>
                      <div className="text-xs text-slate-500 mt-2">12 hours ago</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="operations" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Cybercrime Operations Dashboard
                    </CardTitle>
                    <CardDescription>Coordinated investigation management and resource allocation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 border rounded-lg">
                          <div className="text-2xl font-bold text-red-600">3</div>
                          <div className="text-xs text-slate-600">Critical Operations</div>
                        </div>
                        <div className="text-center p-3 border rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">12</div>
                          <div className="text-xs text-slate-600">Active Investigators</div>
                        </div>
                        <div className="text-center p-3 border rounded-lg">
                          <div className="text-2xl font-bold text-green-600">247</div>
                          <div className="text-xs text-slate-600">Evidence Items</div>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-3">Active Operations</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="font-medium">Operation Dark Storm</div>
                              <div className="text-sm text-slate-600">Ransomware investigation</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-red-500">Critical</Badge>
                              <Button size="sm">Manage</Button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="font-medium">Operation Crypto Trail</div>
                              <div className="text-sm text-slate-600">Money laundering task force</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-orange-500">High</Badge>
                              <Button size="sm">Manage</Button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="font-medium">Operation Identity Shield</div>
                              <div className="text-sm text-slate-600">Dark web marketplace takedown</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-blue-500">Medium</Badge>
                              <Button size="sm">Manage</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>System Health</CardTitle>
                    <CardDescription>Infrastructure monitoring</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Threat Detection</span>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Forensics Tools</span>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Network Monitoring</span>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Dark Web Intel</span>
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Emergency response tools</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
                        <AlertTriangle className="h-3 w-3 mr-2" />
                        Emergency Response
                      </Button>
                      <Button size="sm" variant="outline" className="w-full">
                        <Shield className="h-3 w-3 mr-2" />
                        Block Threat IOCs
                      </Button>
                      <Button size="sm" variant="outline" className="w-full">
                        <Users className="h-3 w-3 mr-2" />
                        Request Assistance
                      </Button>
                      <Button size="sm" variant="outline" className="w-full">
                        <Download className="h-3 w-3 mr-2" />
                        Generate Report
                      </Button>
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
