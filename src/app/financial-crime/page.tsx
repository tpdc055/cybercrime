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
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Shield,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Eye,
  Target,
  Users,
  Globe,
  MapPin,
  Clock,
  Activity,
  BarChart3,
  PieChart,
  Network,
  Lock,
  Unlock,
  Key,
  Database,
  FileText,
  CreditCard,
  Building,
  Banknote,
  Coins,
  Landmark,
  Receipt,
  Calculator,
  Scale,
  Gavel,
  Flag,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  Zap,
  Brain,
  Settings,
  Share,
  Bell,
  Calendar,
  Plus
} from "lucide-react";

interface SuspiciousActivity {
  id: string;
  type: 'money_laundering' | 'sanctions_violation' | 'fraud' | 'terrorist_financing' | 'tax_evasion';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  amount: number;
  currency: string;
  entities: string[];
  countries: string[];
  detectedAt: Date;
  status: 'investigating' | 'confirmed' | 'false_positive' | 'escalated';
  riskScore: number;
  transactionCount: number;
  timeframe: string;
}

interface AssetForfeiture {
  id: string;
  type: 'real_estate' | 'vehicles' | 'cash' | 'cryptocurrency' | 'art_valuables' | 'business_assets';
  description: string;
  estimatedValue: number;
  currency: string;
  location: string;
  caseId: string;
  status: 'identified' | 'frozen' | 'seized' | 'forfeited' | 'returned';
  seizedDate?: Date;
  legalBasis: string;
  relatedEntities: string[];
}

interface SanctionsWatch {
  id: string;
  entityName: string;
  entityType: 'individual' | 'organization' | 'vessel' | 'aircraft';
  sanctionProgram: string;
  riskLevel: 'low' | 'medium' | 'high' | 'prohibited';
  matchScore: number;
  lastScreened: Date;
  jurisdiction: string;
  aliases: string[];
  identifiers: string[];
}

interface FinancialNetwork {
  id: string;
  centerEntity: string;
  networkSize: number;
  totalTransactions: number;
  totalAmount: number;
  suspiciousRatio: number;
  countries: string[];
  riskScore: number;
  detectionDate: Date;
  networkType: 'laundering_ring' | 'sanctions_evasion' | 'fraud_scheme' | 'terrorist_financing';
}

interface ComplianceMetric {
  category: string;
  score: number;
  target: number;
  trend: 'improving' | 'declining' | 'stable';
  lastAssessment: Date;
}

export default function FinancialCrimeTaskForce() {
  const [monitoringActive, setMonitoringActive] = useState(true);
  const [sanctionsScreening, setSanctionsScreening] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d");

  const suspiciousActivities: SuspiciousActivity[] = [
    {
      id: "SAR-2024-8901",
      type: "money_laundering",
      severity: "critical",
      title: "Structured Deposit Scheme - Shell Company Network",
      description: "Complex layered transactions through multiple shell companies to obscure source of $2.4M in illicit funds",
      amount: 2400000,
      currency: "USD",
      entities: ["Global Trade Solutions LLC", "International Consulting Group", "Pacific Holdings Inc"],
      countries: ["United States", "Cayman Islands", "Switzerland"],
      detectedAt: new Date(Date.now() - 3600000),
      status: "investigating",
      riskScore: 9.7,
      transactionCount: 247,
      timeframe: "Last 90 days"
    },
    {
      id: "SAR-2024-8902",
      type: "sanctions_violation",
      severity: "high",
      title: "Prohibited Entity Transaction Network",
      description: "Financial dealings with sanctioned entities through intermediary banks and front companies",
      amount: 850000,
      currency: "EUR",
      entities: ["Kremlin Industries", "Baltic Finance Corp", "Northern Trading Ltd"],
      countries: ["Russia", "Latvia", "Cyprus"],
      detectedAt: new Date(Date.now() - 7200000),
      status: "escalated",
      riskScore: 8.9,
      transactionCount: 89,
      timeframe: "Last 60 days"
    },
    {
      id: "SAR-2024-8903",
      type: "terrorist_financing",
      severity: "critical",
      title: "Hawala Network - Terror Funding",
      description: "Underground money transfer system identified funding terrorist organizations through charitable fronts",
      amount: 450000,
      currency: "USD",
      entities: ["Charity for Peace Foundation", "Brothers Relief Fund", "Unity Aid Society"],
      countries: ["United States", "Pakistan", "Somalia"],
      detectedAt: new Date(Date.now() - 1800000),
      status: "confirmed",
      riskScore: 9.9,
      transactionCount: 156,
      timeframe: "Last 120 days"
    }
  ];

  const assetForfeitures: AssetForfeiture[] = [
    {
      id: "AF-2024-3401",
      type: "real_estate",
      description: "Luxury Manhattan Penthouse - 5th Avenue",
      estimatedValue: 15000000,
      currency: "USD",
      location: "New York, NY",
      caseId: "SAR-2024-8901",
      status: "seized",
      seizedDate: new Date(Date.now() - 86400000),
      legalBasis: "21 USC 881(a)(6) - Proceeds of Money Laundering",
      relatedEntities: ["Global Trade Solutions LLC", "John Doe (CEO)"]
    },
    {
      id: "AF-2024-3402",
      type: "cryptocurrency",
      description: "Bitcoin Wallet Holdings - Mixed Coins",
      estimatedValue: 3200000,
      currency: "USD",
      location: "Digital Asset",
      caseId: "SAR-2024-8902",
      status: "frozen",
      legalBasis: "OFAC Sanctions Violation",
      relatedEntities: ["Kremlin Industries", "Baltic Finance Corp"]
    },
    {
      id: "AF-2024-3403",
      type: "vehicles",
      description: "Fleet of Luxury Vehicles (12 vehicles)",
      estimatedValue: 2800000,
      currency: "USD",
      location: "Miami, FL",
      caseId: "SAR-2024-8903",
      status: "identified",
      legalBasis: "18 USC 981 - Proceeds of Criminal Activity",
      relatedEntities: ["Brothers Relief Fund", "Ahmed Al-Hassan"]
    }
  ];

  const sanctionsWatchlist: SanctionsWatch[] = [
    {
      id: "SW-2024-7701",
      entityName: "Viktor Petrov",
      entityType: "individual",
      sanctionProgram: "OFAC SDN List",
      riskLevel: "prohibited",
      matchScore: 98.7,
      lastScreened: new Date(Date.now() - 900000),
      jurisdiction: "United States",
      aliases: ["Victor Petroff", "V. Petrov"],
      identifiers: ["DOB: 1965-03-15", "Passport: RF123456789"]
    },
    {
      id: "SW-2024-7702",
      entityName: "Global Mining Consortium",
      entityType: "organization",
      sanctionProgram: "EU Sanctions List",
      riskLevel: "high",
      matchScore: 94.2,
      lastScreened: new Date(Date.now() - 1800000),
      jurisdiction: "European Union",
      aliases: ["GMC International", "Global Mining Corp"],
      identifiers: ["Tax ID: GB123456789", "LEI: 123456789ABCDEFGHIJ12"]
    },
    {
      id: "SW-2024-7703",
      entityName: "Pacific Star Shipping",
      entityType: "vessel",
      sanctionProgram: "UN Security Council",
      riskLevel: "medium",
      matchScore: 87.5,
      lastScreened: new Date(Date.now() - 3600000),
      jurisdiction: "United Nations",
      aliases: ["Pacific Star", "PS Shipping"],
      identifiers: ["IMO: 1234567", "Flag: Panama"]
    }
  ];

  const financialNetworks: FinancialNetwork[] = [
    {
      id: "FN-2024-1201",
      centerEntity: "Global Trade Solutions LLC",
      networkSize: 47,
      totalTransactions: 2847,
      totalAmount: 12400000,
      suspiciousRatio: 0.73,
      countries: ["US", "KY", "CH", "LU"],
      riskScore: 9.2,
      detectionDate: new Date(Date.now() - 7200000),
      networkType: "laundering_ring"
    },
    {
      id: "FN-2024-1202",
      centerEntity: "Kremlin Industries",
      networkSize: 23,
      totalTransactions: 1456,
      totalAmount: 8900000,
      suspiciousRatio: 0.89,
      countries: ["RU", "LV", "CY", "DE"],
      riskScore: 8.7,
      detectionDate: new Date(Date.now() - 14400000),
      networkType: "sanctions_evasion"
    }
  ];

  const complianceMetrics: ComplianceMetric[] = [
    {
      category: "AML Program Effectiveness",
      score: 87.3,
      target: 90.0,
      trend: "improving",
      lastAssessment: new Date(Date.now() - 604800000)
    },
    {
      category: "Sanctions Screening Coverage",
      score: 94.7,
      target: 95.0,
      trend: "stable",
      lastAssessment: new Date(Date.now() - 259200000)
    },
    {
      category: "SAR Filing Timeliness",
      score: 91.2,
      target: 95.0,
      trend: "declining",
      lastAssessment: new Date(Date.now() - 432000000)
    },
    {
      category: "KYC Documentation",
      score: 89.8,
      target: 90.0,
      trend: "improving",
      lastAssessment: new Date(Date.now() - 172800000)
    }
  ];

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
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
      case 'investigating': case 'identified': case 'frozen': return 'bg-orange-500';
      case 'confirmed': case 'seized': case 'forfeited': return 'bg-green-500';
      case 'escalated': return 'bg-red-500';
      case 'false_positive': case 'returned': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'prohibited': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'money_laundering': return <DollarSign className="h-4 w-4" />;
      case 'sanctions_violation': return <Flag className="h-4 w-4" />;
      case 'fraud': return <AlertTriangle className="h-4 w-4" />;
      case 'terrorist_financing': return <Shield className="h-4 w-4" />;
      case 'tax_evasion': return <Calculator className="h-4 w-4" />;
      case 'real_estate': return <Building className="h-4 w-4" />;
      case 'vehicles': return <MapPin className="h-4 w-4" />;
      case 'cash': return <Banknote className="h-4 w-4" />;
      case 'cryptocurrency': return <CreditCard className="h-4 w-4" />;
      case 'art_valuables': return <Receipt className="h-4 w-4" />;
      case 'business_assets': return <Landmark className="h-4 w-4" />;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'declining': return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'stable': return <Activity className="h-4 w-4 text-blue-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    if (!monitoringActive) return;

    const interval = setInterval(() => {
      // Simulate new suspicious activities
      console.log("Monitoring active - checking for new financial crimes...");
    }, 15000);

    return () => clearInterval(interval);
  }, [monitoringActive]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-green-600" />
              Financial Crime Task Force
            </h1>
            <p className="text-slate-600">Advanced money laundering detection, sanctions screening, and financial intelligence analysis</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Label htmlFor="monitoring">Real-time Monitoring</Label>
              <Switch
                id="monitoring"
                checked={monitoringActive}
                onCheckedChange={setMonitoringActive}
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="sanctions">Sanctions Screening</Label>
              <Switch
                id="sanctions"
                checked={sanctionsScreening}
                onCheckedChange={setSanctionsScreening}
              />
            </div>
            <Button className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              New Investigation
            </Button>
          </div>
        </div>

        {/* System Status */}
        <Alert className={`border-l-4 ${monitoringActive ? 'border-l-green-500 bg-green-50' : 'border-l-orange-500 bg-orange-50'}`}>
          <Activity className="h-4 w-4" />
          <AlertTitle className="flex items-center justify-between">
            <span>Financial Crime Detection System</span>
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full animate-pulse ${monitoringActive ? 'bg-green-500' : 'bg-orange-500'}`}></div>
              <Badge className={monitoringActive ? "bg-green-500" : "bg-orange-500"}>
                {monitoringActive ? "Active Monitoring" : "Monitoring Paused"}
              </Badge>
            </div>
          </AlertTitle>
          <AlertDescription>
            Analyzing {monitoringActive ? "live" : "historical"} financial transactions across {suspiciousActivities.length} active investigations.
            Sanctions screening: {sanctionsScreening ? "ENABLED" : "DISABLED"} •
            Compliance score: 90.8%
          </AlertDescription>
        </Alert>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {suspiciousActivities.filter(s => s.status === 'investigating').length}
              </div>
              <p className="text-xs text-slate-600">Under investigation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assets Seized</CardTitle>
              <Landmark className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(
                  assetForfeitures.reduce((sum, asset) => sum + asset.estimatedValue, 0),
                  'USD'
                ).replace('$', '$')}
              </div>
              <p className="text-xs text-slate-600">Total value seized</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sanctions Matches</CardTitle>
              <Flag className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {sanctionsWatchlist.filter(s => s.riskLevel === 'prohibited').length}
              </div>
              <p className="text-xs text-slate-600">Prohibited entities</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Financial Networks</CardTitle>
              <Network className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{financialNetworks.length}</div>
              <p className="text-xs text-slate-600">Suspicious networks identified</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
              <CheckCircle className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {(complianceMetrics.reduce((sum, metric) => sum + metric.score, 0) / complianceMetrics.length).toFixed(1)}%
              </div>
              <p className="text-xs text-slate-600">Overall compliance</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="suspicious" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="suspicious">Suspicious Activity</TabsTrigger>
            <TabsTrigger value="sanctions">Sanctions Screening</TabsTrigger>
            <TabsTrigger value="assets">Asset Forfeiture</TabsTrigger>
            <TabsTrigger value="networks">Financial Networks</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
          </TabsList>

          <TabsContent value="suspicious" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Suspicious Activity Reports (SARs)</h3>
              <div className="flex items-center gap-2">
                <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Currencies</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Advanced Filter
                </Button>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Generate SAR
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {suspiciousActivities.map((activity) => (
                <Card key={activity.id} className="border-l-4 border-l-red-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(activity.type)}
                        <div>
                          <CardTitle className="text-lg">{activity.title}</CardTitle>
                          <CardDescription>
                            {activity.id} • {activity.type.replace('_', ' ').toUpperCase()} •
                            Risk Score: {activity.riskScore.toFixed(1)}/10
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(activity.severity)}>
                          {activity.severity.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(activity.status)}>
                          {activity.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-slate-700">{activity.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-slate-600">Total Amount</div>
                          <div className="font-medium text-green-600">
                            {formatCurrency(activity.amount, activity.currency)}
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-600">Transactions</div>
                          <div className="font-medium">{activity.transactionCount.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Timeframe</div>
                          <div className="font-medium">{activity.timeframe}</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Detected</div>
                          <div className="font-medium">{formatTimeAgo(activity.detectedAt)}</div>
                        </div>
                      </div>

                      <div className="border-t pt-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-slate-700 mb-2">Involved Entities:</p>
                            <div className="flex flex-wrap gap-1">
                              {activity.entities.map((entity, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {entity}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-700 mb-2">Countries:</p>
                            <div className="flex flex-wrap gap-1">
                              {activity.countries.map((country, index) => (
                                <Badge key={index} variant="outline" className="text-xs bg-blue-50">
                                  {country}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          <Target className="h-3 w-3 mr-1" />
                          Investigate
                        </Button>
                        <Button size="sm" variant="outline">
                          <Network className="h-3 w-3 mr-1" />
                          Map Network
                        </Button>
                        <Button size="sm" variant="outline">
                          <Gavel className="h-3 w-3 mr-1" />
                          Legal Action
                        </Button>
                        <Button size="sm" variant="outline">
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

          <TabsContent value="sanctions" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Sanctions Screening & Watchlists</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Update Lists
                </Button>
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Screen Entity
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>High-Risk Entities</CardTitle>
                    <CardDescription>Entities requiring immediate attention or prohibition</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {sanctionsWatchlist.map((entity) => (
                        <div key={entity.id} className={`p-4 border rounded-lg ${entity.riskLevel === 'prohibited' ? 'border-red-200 bg-red-50' : 'border-orange-200 bg-orange-50'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-medium">{entity.entityName}</h4>
                              <p className="text-sm text-slate-600 capitalize">
                                {entity.entityType} • {entity.sanctionProgram}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getRiskLevelColor(entity.riskLevel)}>
                                {entity.riskLevel.toUpperCase()}
                              </Badge>
                              <Badge variant="outline">
                                {entity.matchScore.toFixed(1)}% match
                              </Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="text-slate-600">Jurisdiction</div>
                              <div className="font-medium">{entity.jurisdiction}</div>
                            </div>
                            <div>
                              <div className="text-slate-600">Last Screened</div>
                              <div className="font-medium">{formatTimeAgo(entity.lastScreened)}</div>
                            </div>
                          </div>

                          {entity.aliases.length > 0 && (
                            <div className="mt-3">
                              <p className="text-sm font-medium text-slate-700 mb-1">Known Aliases:</p>
                              <div className="flex flex-wrap gap-1">
                                {entity.aliases.map((alias, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {alias}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex gap-2 mt-3">
                            <Button size="sm" className={entity.riskLevel === 'prohibited' ? "bg-red-600 hover:bg-red-700" : ""}>
                              <Eye className="h-3 w-3 mr-1" />
                              Review Details
                            </Button>
                            <Button size="sm" variant="outline">
                              <Lock className="h-3 w-3 mr-1" />
                              Block Transactions
                            </Button>
                            <Button size="sm" variant="outline">
                              <Bell className="h-3 w-3 mr-1" />
                              Set Alert
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Screening Statistics</CardTitle>
                    <CardDescription>Real-time sanctions screening metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Entities Screened Today</span>
                        <span className="font-medium">14,247</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Matches Identified</span>
                        <span className="font-medium text-red-600">23</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">False Positives</span>
                        <span className="font-medium text-yellow-600">156</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Review Queue</span>
                        <span className="font-medium text-blue-600">8</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Active Sanctions Programs</CardTitle>
                    <CardDescription>Currently monitored sanctions lists</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">OFAC SDN List</span>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">EU Sanctions</span>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">UN Security Council</span>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">UK HMT Sanctions</span>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="assets" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Asset Forfeiture & Recovery</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Calculator className="h-4 w-4 mr-1" />
                  Valuation Report
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Register Asset
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {assetForfeitures.map((asset) => (
                <Card key={asset.id} className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(asset.type)}
                        <div>
                          <CardTitle className="text-lg">{asset.description}</CardTitle>
                          <CardDescription>
                            {asset.id} • Case: {asset.caseId} • {asset.location}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-600">
                          {formatCurrency(asset.estimatedValue, asset.currency)}
                        </Badge>
                        <Badge className={getStatusColor(asset.status)}>
                          {asset.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-slate-600">Asset Type</div>
                          <div className="font-medium capitalize">{asset.type.replace('_', ' ')}</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Estimated Value</div>
                          <div className="font-medium text-green-600">
                            {formatCurrency(asset.estimatedValue, asset.currency)}
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-600">Status</div>
                          <div className="font-medium capitalize">{asset.status.replace('_', ' ')}</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Seized Date</div>
                          <div className="font-medium">
                            {asset.seizedDate ? formatTimeAgo(asset.seizedDate) : 'Not seized'}
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-3">
                        <p className="text-sm font-medium text-slate-700 mb-2">Legal Basis:</p>
                        <p className="text-sm text-slate-600 bg-slate-100 p-2 rounded">{asset.legalBasis}</p>
                      </div>

                      <div className="border-t pt-3">
                        <p className="text-sm font-medium text-slate-700 mb-2">Related Entities:</p>
                        <div className="flex flex-wrap gap-2">
                          {asset.relatedEntities.map((entity, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-50 border-blue-200">
                              {entity}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          Asset Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Calculator className="h-3 w-3 mr-1" />
                          Appraisal
                        </Button>
                        <Button size="sm" variant="outline">
                          <Gavel className="h-3 w-3 mr-1" />
                          Legal Status
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="h-3 w-3 mr-1" />
                          Documentation
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="networks" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Financial Network Analysis</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Visualization
                </Button>
                <Button>
                  <Network className="h-4 w-4 mr-2" />
                  Map Networks
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {financialNetworks.map((network) => (
                <Card key={network.id} className="border-l-4 border-l-purple-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Financial Network: {network.centerEntity}</CardTitle>
                        <CardDescription>
                          {network.id} • Network Type: {network.networkType.replace('_', ' ').toUpperCase()}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${network.riskScore > 8 ? 'bg-red-500' : network.riskScore > 6 ? 'bg-orange-500' : 'bg-yellow-500'}`}>
                          Risk: {network.riskScore.toFixed(1)}/10
                        </Badge>
                        <Badge variant="outline">
                          {network.networkSize} entities
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-slate-600">Network Size</div>
                          <div className="font-medium">{network.networkSize} entities</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Total Transactions</div>
                          <div className="font-medium">{network.totalTransactions.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Total Amount</div>
                          <div className="font-medium text-green-600">
                            {formatCurrency(network.totalAmount, 'USD')}
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-600">Suspicious Ratio</div>
                          <div className="font-medium text-red-600">
                            {(network.suspiciousRatio * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-3">
                        <p className="text-sm font-medium text-slate-700 mb-2">Countries Involved:</p>
                        <div className="flex flex-wrap gap-2">
                          {network.countries.map((country, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-50 border-blue-200">
                              {country}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="border-t pt-3">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Suspicious Activity Ratio</span>
                            <span className="text-red-600 font-medium">
                              {(network.suspiciousRatio * 100).toFixed(1)}%
                            </span>
                          </div>
                          <Progress value={network.suspiciousRatio * 100} className="h-2" />
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Network className="h-3 w-3 mr-1" />
                          Analyze Network
                        </Button>
                        <Button size="sm" variant="outline">
                          <BarChart3 className="h-3 w-3 mr-1" />
                          Flow Analysis
                        </Button>
                        <Button size="sm" variant="outline">
                          <Target className="h-3 w-3 mr-1" />
                          Investigate Center
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share className="h-3 w-3 mr-1" />
                          Share Intelligence
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Compliance Monitoring & Assessment</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  Schedule Assessment
                </Button>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Compliance Report
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {complianceMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{metric.category}</CardTitle>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(metric.trend)}
                        <Badge className={metric.score >= metric.target ? "bg-green-500" : "bg-orange-500"}>
                          {metric.score.toFixed(1)}%
                        </Badge>
                      </div>
                    </div>
                    <CardDescription>
                      Target: {metric.target}% • Last assessed: {formatTimeAgo(metric.lastAssessment)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Current Score</span>
                          <span className={metric.score >= metric.target ? "text-green-600" : "text-orange-600"}>
                            {metric.score.toFixed(1)}% / {metric.target}%
                          </span>
                        </div>
                        <Progress value={metric.score} className="h-2" />
                      </div>

                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          {getTrendIcon(metric.trend)}
                          <span className="capitalize">{metric.trend}</span>
                          <span className="text-slate-600">trend over last quarter</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="h-3 w-3 mr-1" />
                          Details
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Settings className="h-3 w-3 mr-1" />
                          Improve
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="intelligence" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Financial Intelligence Summary
                  </CardTitle>
                  <CardDescription>AI-powered insights and pattern analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border-l-4 border-l-red-500 bg-red-50">
                      <h4 className="font-medium text-red-700 mb-2">High-Priority Intelligence</h4>
                      <p className="text-sm text-red-600">
                        Emerging pattern detected: Shell company networks increasingly using cryptocurrency
                        mixing services to obscure fund sources. 73% increase in complexity over last quarter.
                      </p>
                    </div>

                    <div className="p-4 border-l-4 border-l-orange-500 bg-orange-50">
                      <h4 className="font-medium text-orange-700 mb-2">Regulatory Alert</h4>
                      <p className="text-sm text-orange-600">
                        New sanctions designations effective immediately. 15 additional entities added to
                        OFAC SDN list. Automated screening updated.
                      </p>
                    </div>

                    <div className="p-4 border-l-4 border-l-blue-500 bg-blue-50">
                      <h4 className="font-medium text-blue-700 mb-2">Trend Analysis</h4>
                      <p className="text-sm text-blue-600">
                        Cross-border wire transfer monitoring shows 34% increase in layering techniques
                        using legitimate business accounts as intermediaries.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    International Cooperation
                  </CardTitle>
                  <CardDescription>Cross-border intelligence sharing and coordination</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">FinCEN (United States)</div>
                        <div className="text-sm text-slate-600">Financial Crimes Enforcement Network</div>
                      </div>
                      <Badge className="bg-green-500">Connected</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">FIU-NL (Netherlands)</div>
                        <div className="text-sm text-slate-600">Financial Intelligence Unit</div>
                      </div>
                      <Badge className="bg-green-500">Connected</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">AUSTRAC (Australia)</div>
                        <div className="text-sm text-slate-600">Anti-Money Laundering Authority</div>
                      </div>
                      <Badge className="bg-blue-500">Pending</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">FATF</div>
                        <div className="text-sm text-slate-600">Financial Action Task Force</div>
                      </div>
                      <Badge className="bg-green-500">Connected</Badge>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Intelligence Requests Sent:</span>
                      <span className="font-medium">23</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Responses Received:</span>
                      <span className="font-medium">18</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Cross-Border Cases:</span>
                      <span className="font-medium">7</span>
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
