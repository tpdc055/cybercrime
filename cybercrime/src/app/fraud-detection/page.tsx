"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Brain,
  AlertTriangle,
  TrendingUp,
  Eye,
  Target,
  Zap,
  Activity,
  BarChart3,
  Search,
  Filter,
  Download,
  RefreshCw,
  Settings,
  Play,
  Pause,
  Clock,
  MapPin,
  User,
  DollarSign,
  CreditCard,
  Shield,
  Network,
  Database,
  Cpu,
  Monitor,
  Smartphone
} from "lucide-react";

interface FraudAlert {
  id: string;
  type: 'financial' | 'identity' | 'behavioral' | 'network';
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  description: string;
  location: string;
  timestamp: Date;
  involvedEntities: string[];
  riskScore: number;
  mlModel: string;
}

interface BehavioralPattern {
  id: string;
  pattern: string;
  frequency: number;
  anomalyScore: number;
  lastDetected: Date;
  trend: 'increasing' | 'decreasing' | 'stable';
}

interface MLModel {
  name: string;
  type: string;
  accuracy: number;
  lastTrained: Date;
  status: 'active' | 'training' | 'offline';
  processedCases: number;
}

export default function FraudDetection() {
  const [isRealTimeActive, setIsRealTimeActive] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h");
  const [confidenceThreshold, setConfidenceThreshold] = useState([75]);

  const [fraudAlerts, setFraudAlerts] = useState<FraudAlert[]>([
    {
      id: "FR-2024-0891",
      type: "financial",
      severity: "critical",
      confidence: 94.7,
      description: "Unusual transaction pattern detected: Multiple high-value transfers to offshore accounts within 24-hour window",
      location: "Downtown Financial District",
      timestamp: new Date(Date.now() - 300000),
      involvedEntities: ["Account #****1234", "IP: 192.168.1.45", "Device: Mobile-iOS"],
      riskScore: 9.2,
      mlModel: "TransactionFlow-Neural-v3.2"
    },
    {
      id: "FR-2024-0892",
      type: "identity",
      severity: "high",
      confidence: 87.3,
      description: "Identity verification anomaly: Document inconsistencies detected through OCR analysis",
      location: "Central Processing Center",
      timestamp: new Date(Date.now() - 600000),
      involvedEntities: ["Document #DOC-8829", "Facial Match: 67%", "Device: Desktop-Windows"],
      riskScore: 7.8,
      mlModel: "IdentityVerification-CNN-v2.1"
    },
    {
      id: "FR-2024-0893",
      type: "behavioral",
      severity: "medium",
      confidence: 79.2,
      description: "Behavioral pattern deviation: Login times and frequency significantly outside normal baseline",
      location: "Regional Office North",
      timestamp: new Date(Date.now() - 900000),
      involvedEntities: ["User ID: USR-5447", "Session: SES-9921", "Geographic: Outside typical range"],
      riskScore: 6.4,
      mlModel: "BehaviorAnalysis-LSTM-v4.0"
    }
  ]);

  const [behavioralPatterns] = useState<BehavioralPattern[]>([
    {
      id: "BP-001",
      pattern: "Off-hours financial activity",
      frequency: 47,
      anomalyScore: 8.7,
      lastDetected: new Date(Date.now() - 180000),
      trend: "increasing"
    },
    {
      id: "BP-002",
      pattern: "Rapid successive login attempts",
      frequency: 23,
      anomalyScore: 7.2,
      lastDetected: new Date(Date.now() - 420000),
      trend: "stable"
    },
    {
      id: "BP-003",
      pattern: "Geographic location inconsistency",
      frequency: 15,
      anomalyScore: 9.1,
      lastDetected: new Date(Date.now() - 720000),
      trend: "decreasing"
    }
  ]);

  const [mlModels] = useState<MLModel[]>([
    {
      name: "TransactionFlow-Neural",
      type: "Deep Neural Network",
      accuracy: 96.7,
      lastTrained: new Date(Date.now() - 86400000),
      status: "active",
      processedCases: 12847
    },
    {
      name: "BehaviorAnalysis-LSTM",
      type: "Long Short-Term Memory",
      accuracy: 94.2,
      lastTrained: new Date(Date.now() - 172800000),
      status: "active",
      processedCases: 8923
    },
    {
      name: "IdentityVerification-CNN",
      type: "Convolutional Neural Network",
      accuracy: 91.8,
      lastTrained: new Date(Date.now() - 259200000),
      status: "training",
      processedCases: 6742
    },
    {
      name: "NetworkAnomaly-GAN",
      type: "Generative Adversarial Network",
      accuracy: 89.4,
      lastTrained: new Date(Date.now() - 345600000),
      status: "active",
      processedCases: 4556
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    if (!isRealTimeActive) return;

    const interval = setInterval(() => {
      // Simulate new fraud alerts
      if (Math.random() > 0.85) {
        const newAlert: FraudAlert = {
          id: `FR-2024-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`,
          type: (['financial', 'identity', 'behavioral', 'network'] as const)[Math.floor(Math.random() * 4)] as FraudAlert['type'],
          severity: (['low', 'medium', 'high', 'critical'] as const)[Math.floor(Math.random() * 4)] as FraudAlert['severity'],
          confidence: 70 + Math.random() * 30,
          description: "Real-time anomaly detected by ML surveillance system",
          location: ["Downtown", "North District", "East Zone", "Central Hub"][Math.floor(Math.random() * 4)],
          timestamp: new Date(),
          involvedEntities: [`Entity-${Math.floor(Math.random() * 1000)}`],
          riskScore: 5 + Math.random() * 5,
          mlModel: "Real-time-Detection-v1.0"
        };

        setFraudAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [isRealTimeActive]);

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'financial': return <DollarSign className="h-4 w-4" />;
      case 'identity': return <User className="h-4 w-4" />;
      case 'behavioral': return <Brain className="h-4 w-4" />;
      case 'network': return <Network className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-3 w-3 text-red-500" />;
      case 'decreasing': return <TrendingUp className="h-3 w-3 text-green-500 rotate-180" />;
      case 'stable': return <Activity className="h-3 w-3 text-blue-500" />;
      default: return <Activity className="h-3 w-3 text-gray-500" />;
    }
  };

  const getModelStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'training': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
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
              <Brain className="h-8 w-8 text-purple-600" />
              AI Fraud Detection
            </h1>
            <p className="text-slate-600">Advanced Machine Learning for Behavioral Analysis & Fraud Prevention</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Label htmlFor="realtime">Real-time Analysis</Label>
              <Switch
                id="realtime"
                checked={isRealTimeActive}
                onCheckedChange={setIsRealTimeActive}
              />
            </div>

            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>

            <Button className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh Models
            </Button>
          </div>
        </div>

        {/* Real-time Status */}
        <Alert className="border-l-4 border-l-purple-500 bg-purple-50">
          <Brain className="h-4 w-4" />
          <AlertTitle className="flex items-center justify-between">
            <span>ML System Status</span>
            <div className="flex items-center gap-2">
              {isRealTimeActive && <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>}
              <Badge className={isRealTimeActive ? "bg-green-500" : "bg-gray-500"}>
                {isRealTimeActive ? "Live Analysis" : "Paused"}
              </Badge>
            </div>
          </AlertTitle>
          <AlertDescription>
            {mlModels.filter(m => m.status === 'active').length} active models processing data streams.
            Processing {isRealTimeActive ? "ongoing" : "suspended"}.
          </AlertDescription>
        </Alert>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{fraudAlerts.length}</div>
              <p className="text-xs text-slate-600">Requiring investigation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ML Accuracy</CardTitle>
              <Target className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {(mlModels.reduce((acc, model) => acc + model.accuracy, 0) / mlModels.length).toFixed(1)}%
              </div>
              <p className="text-xs text-slate-600">Average model performance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processed Cases</CardTitle>
              <Database className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mlModels.reduce((acc, model) => acc + model.processedCases, 0).toLocaleString()}
              </div>
              <p className="text-xs text-slate-600">Total analyzed this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Detection Rate</CardTitle>
              <Eye className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">97.3%</div>
              <p className="text-xs text-slate-600">Early fraud detection</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="alerts" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
            <TabsTrigger value="patterns">Behavioral Patterns</TabsTrigger>
            <TabsTrigger value="models">ML Models</TabsTrigger>
            <TabsTrigger value="analytics">Real-time Analytics</TabsTrigger>
            <TabsTrigger value="settings">Model Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Critical Fraud Alerts</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="confidence">Min Confidence:</Label>
                  <div className="w-32">
                    <Slider
                      value={confidenceThreshold}
                      onValueChange={setConfidenceThreshold}
                      max={100}
                      min={50}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  <span className="text-sm text-slate-600">{confidenceThreshold[0]}%</span>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {fraudAlerts
                .filter(alert => alert.confidence >= confidenceThreshold[0])
                .map((alert) => (
                <Card key={alert.id} className="border-l-4 border-l-red-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(alert.type)}
                        <div>
                          <CardTitle className="text-lg">{alert.id}</CardTitle>
                          <CardDescription>{alert.mlModel}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">
                          {alert.confidence.toFixed(1)}% confidence
                        </Badge>
                        <Badge variant="outline">
                          Risk: {alert.riskScore.toFixed(1)}/10
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-slate-700">{alert.description}</p>

                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {alert.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTimeAgo(alert.timestamp)}
                        </div>
                      </div>

                      <div className="border-t pt-3">
                        <p className="text-sm font-medium text-slate-700 mb-2">Involved Entities:</p>
                        <div className="flex flex-wrap gap-2">
                          {alert.involvedEntities.map((entity, index) => (
                            <Badge key={index} variant="secondary">
                              {entity}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="destructive">
                          Investigate
                        </Button>
                        <Button size="sm" variant="outline">
                          Mark Reviewed
                        </Button>
                        <Button size="sm" variant="outline">
                          False Positive
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Behavioral Pattern Analysis</h3>
              <Button>
                <Brain className="h-4 w-4 mr-2" />
                Run Pattern Analysis
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {behavioralPatterns.map((pattern) => (
                <Card key={pattern.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{pattern.pattern}</CardTitle>
                      {getTrendIcon(pattern.trend)}
                    </div>
                    <CardDescription>Pattern ID: {pattern.id}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Frequency (24h):</span>
                        <span className="font-medium">{pattern.frequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Anomaly Score:</span>
                        <span className={`font-medium ${pattern.anomalyScore > 8 ? 'text-red-600' : pattern.anomalyScore > 6 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {pattern.anomalyScore.toFixed(1)}/10
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Last Detected:</span>
                        <span className="text-xs text-slate-600">
                          {formatTimeAgo(pattern.lastDetected)}
                        </span>
                      </div>
                      <Progress
                        value={pattern.anomalyScore * 10}
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="models" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Machine Learning Models</h3>
              <Button>
                <Settings className="h-4 w-4 mr-2" />
                Model Configuration
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mlModels.map((model, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Cpu className="h-5 w-5" />
                          {model.name}
                        </CardTitle>
                        <CardDescription>{model.type}</CardDescription>
                      </div>
                      <Badge className={getModelStatusColor(model.status)}>
                        {model.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Accuracy:</span>
                        <span className="font-medium text-green-600">{model.accuracy}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Processed Cases:</span>
                        <span className="font-medium">{model.processedCases.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Last Trained:</span>
                        <span className="text-xs text-slate-600">
                          {formatTimeAgo(model.lastTrained)}
                        </span>
                      </div>

                      <Progress value={model.accuracy} className="h-2" />

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline">
                          {model.status === 'active' ? <Pause className="h-3 w-3 mr-1" /> : <Play className="h-3 w-3 mr-1" />}
                          {model.status === 'active' ? 'Pause' : 'Activate'}
                        </Button>
                        <Button size="sm" variant="outline">
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Retrain
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Detection Performance
                  </CardTitle>
                  <CardDescription>Real-time fraud detection metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-32 bg-slate-100 rounded flex items-center justify-center text-slate-500">
                      [Real-time Detection Chart]
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">97.3%</div>
                        <div className="text-xs text-slate-600">Detection Rate</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">2.1%</div>
                        <div className="text-xs text-slate-600">False Positives</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">4.2s</div>
                        <div className="text-xs text-slate-600">Avg Response</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Risk Distribution
                  </CardTitle>
                  <CardDescription>Current threat landscape analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Financial Fraud</span>
                        <span>34%</span>
                      </div>
                      <Progress value={34} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Identity Theft</span>
                        <span>28%</span>
                      </div>
                      <Progress value={28} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Behavioral Anomalies</span>
                        <span>23%</span>
                      </div>
                      <Progress value={23} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Network Intrusions</span>
                        <span>15%</span>
                      </div>
                      <Progress value={15} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Detection Thresholds</CardTitle>
                  <CardDescription>Configure ML model sensitivity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Fraud Confidence Threshold</Label>
                    <Slider defaultValue={[75]} max={100} min={50} step={5} />
                    <p className="text-xs text-slate-600">Minimum confidence score to trigger alerts</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Risk Score Threshold</Label>
                    <Slider defaultValue={[7]} max={10} min={1} step={0.5} />
                    <p className="text-xs text-slate-600">Minimum risk score for investigation</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Pattern Anomaly Sensitivity</Label>
                    <Slider defaultValue={[8]} max={10} min={1} step={0.5} />
                    <p className="text-xs text-slate-600">Behavioral pattern detection sensitivity</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Model Training</CardTitle>
                  <CardDescription>Configure automated retraining</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Auto-Retraining</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label>Training Frequency</Label>
                    <Select defaultValue="weekly">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Real-time Learning</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Cross-validation</Label>
                    <Switch defaultChecked />
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
