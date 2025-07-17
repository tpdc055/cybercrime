"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Smartphone,
  Wifi,
  WifiOff,
  Bell,
  Mic,
  Camera,
  MapPin,
  Battery,
  Download,
  Upload,
  Shield,
  Lock,
  Fingerprint,
  Activity,
  Signal,
  Bluetooth,
  Settings,
  RefreshCw,
  Play,
  Pause,
  Search,
  Target,
  Navigation as NavigationIcon,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users,
  Radio,
  Phone,
  MessageSquare,
  Eye,
  FileText,
  Database,
  CloudOff,
  Cloud,
  Zap,
  Globe,
  SatelliteIcon,
  Volume2,
  VolumeX,
  Headphones,
  QrCode,
  Flashlight,
  Compass,
  Brain
} from "lucide-react";

interface MobileFeature {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  status: 'enabled' | 'disabled' | 'configuring';
  batteryImpact: 'low' | 'medium' | 'high';
  offlineCapable: boolean;
}

interface NotificationChannel {
  id: string;
  name: string;
  type: 'emergency' | 'operational' | 'administrative' | 'system';
  enabled: boolean;
  priority: 'low' | 'normal' | 'high' | 'critical';
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

interface OfflineCapability {
  id: string;
  feature: string;
  storageUsed: number;
  maxStorage: number;
  lastSync: Date;
  pendingActions: number;
}

interface VoiceCommand {
  id: string;
  phrase: string;
  action: string;
  module: string;
  enabled: boolean;
}

export default function MobileAppEnhanced() {
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [batteryOptimization, setBatteryOptimization] = useState(true);
  const [voiceControlEnabled, setVoiceControlEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [backgroundSync, setBackgroundSync] = useState(true);

  const mobileFeatures: MobileFeature[] = [
    {
      id: "gps-tracking",
      name: "Advanced GPS Tracking",
      description: "High-precision location services with background tracking",
      icon: MapPin,
      status: "enabled",
      batteryImpact: "high",
      offlineCapable: true
    },
    {
      id: "voice-control",
      name: "Voice Commands",
      description: "Hands-free operation with natural language processing",
      icon: Mic,
      status: voiceControlEnabled ? "enabled" : "disabled",
      batteryImpact: "medium",
      offlineCapable: true
    },
    {
      id: "offline-evidence",
      name: "Offline Evidence Capture",
      description: "Record photos, videos, and audio without internet connection",
      icon: Camera,
      status: "enabled",
      batteryImpact: "low",
      offlineCapable: true
    },
    {
      id: "push-notifications",
      name: "Critical Alert System",
      description: "Instant notifications for emergency situations and updates",
      icon: Bell,
      status: "enabled",
      batteryImpact: "low",
      offlineCapable: false
    },
    {
      id: "biometric-auth",
      name: "Biometric Security",
      description: "Fingerprint and face recognition for secure access",
      icon: Fingerprint,
      status: biometricEnabled ? "enabled" : "disabled",
      batteryImpact: "low",
      offlineCapable: true
    },
    {
      id: "tactical-radio",
      name: "Digital Radio Integration",
      description: "Seamless integration with tactical radio communications",
      icon: Radio,
      status: "enabled",
      batteryImpact: "medium",
      offlineCapable: true
    },
    {
      id: "ar-overlay",
      name: "Augmented Reality",
      description: "Real-time information overlay for field investigations",
      icon: Eye,
      status: "configuring",
      batteryImpact: "high",
      offlineCapable: false
    },
    {
      id: "emergency-beacon",
      name: "Emergency Beacon",
      description: "One-touch emergency alert with precise location broadcasting",
      icon: AlertTriangle,
      status: "enabled",
      batteryImpact: "low",
      offlineCapable: true
    }
  ];

  const notificationChannels: NotificationChannel[] = [
    {
      id: "emergency-alerts",
      name: "Emergency Alerts",
      type: "emergency",
      enabled: true,
      priority: "critical",
      soundEnabled: true,
      vibrationEnabled: true
    },
    {
      id: "fraud-alerts",
      name: "Fraud Detection Alerts",
      type: "operational",
      enabled: true,
      priority: "high",
      soundEnabled: true,
      vibrationEnabled: false
    },
    {
      id: "case-updates",
      name: "Case Updates",
      type: "operational",
      enabled: true,
      priority: "normal",
      soundEnabled: false,
      vibrationEnabled: true
    },
    {
      id: "inter-agency",
      name: "Inter-Agency Communications",
      type: "operational",
      enabled: true,
      priority: "high",
      soundEnabled: true,
      vibrationEnabled: true
    },
    {
      id: "system-maintenance",
      name: "System Maintenance",
      type: "system",
      enabled: false,
      priority: "low",
      soundEnabled: false,
      vibrationEnabled: false
    },
    {
      id: "training-reminders",
      name: "Training Reminders",
      type: "administrative",
      enabled: true,
      priority: "normal",
      soundEnabled: false,
      vibrationEnabled: false
    }
  ];

  const offlineCapabilities: OfflineCapability[] = [
    {
      id: "evidence-storage",
      feature: "Evidence Files",
      storageUsed: 245,
      maxStorage: 500,
      lastSync: new Date(Date.now() - 1800000),
      pendingActions: 3
    },
    {
      id: "case-data",
      feature: "Case Information",
      storageUsed: 67,
      maxStorage: 100,
      lastSync: new Date(Date.now() - 900000),
      pendingActions: 1
    },
    {
      id: "maps-offline",
      feature: "Offline Maps",
      storageUsed: 1200,
      maxStorage: 2000,
      lastSync: new Date(Date.now() - 86400000),
      pendingActions: 0
    },
    {
      id: "forms-templates",
      feature: "Report Templates",
      storageUsed: 12,
      maxStorage: 50,
      lastSync: new Date(Date.now() - 3600000),
      pendingActions: 0
    }
  ];

  const voiceCommands: VoiceCommand[] = [
    {
      id: "start-report",
      phrase: "Start incident report",
      action: "Create new incident report",
      module: "Field Operations",
      enabled: true
    },
    {
      id: "take-photo",
      phrase: "Take evidence photo",
      action: "Open camera for evidence capture",
      module: "Evidence Management",
      enabled: true
    },
    {
      id: "request-backup",
      phrase: "Request backup",
      action: "Send emergency backup request",
      module: "Communications",
      enabled: true
    },
    {
      id: "check-alerts",
      phrase: "Check my alerts",
      action: "Read unread notifications",
      module: "Notifications",
      enabled: true
    },
    {
      id: "share-location",
      phrase: "Share my location",
      action: "Broadcast current GPS coordinates",
      module: "GPS Tracking",
      enabled: true
    },
    {
      id: "voice-note",
      phrase: "Add voice note",
      action: "Record audio note for current case",
      module: "Evidence Management",
      enabled: true
    }
  ];

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enabled': return 'bg-green-500';
      case 'disabled': return 'bg-red-500';
      case 'configuring': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getBatteryImpactColor = (impact: string) => {
    switch (impact) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'normal': return 'bg-blue-500';
      case 'low': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  // Simulate offline mode toggle
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) {
        setIsOfflineMode(prev => !prev);
      }
    }, 30000);
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
              <Smartphone className="h-8 w-8 text-blue-600" />
              Enhanced Mobile App Platform
            </h1>
            <p className="text-slate-600">Advanced mobile capabilities with offline support, voice control, and enhanced security</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Label htmlFor="offline">Offline Mode</Label>
              <Switch
                id="offline"
                checked={isOfflineMode}
                onCheckedChange={setIsOfflineMode}
              />
            </div>
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Install Mobile App
            </Button>
          </div>
        </div>

        {/* Connection Status */}
        <Alert className={`border-l-4 ${isOfflineMode ? 'border-l-orange-500 bg-orange-50' : 'border-l-green-500 bg-green-50'}`}>
          {isOfflineMode ? <CloudOff className="h-4 w-4" /> : <Cloud className="h-4 w-4" />}
          <AlertTitle className="flex items-center justify-between">
            <span>Mobile Connectivity Status</span>
            <div className="flex items-center gap-2">
              {isOfflineMode ? <WifiOff className="h-4 w-4 text-orange-500" /> : <Wifi className="h-4 w-4 text-green-500" />}
              <Badge className={isOfflineMode ? "bg-orange-500" : "bg-green-500"}>
                {isOfflineMode ? "Offline Mode Active" : "Connected"}
              </Badge>
            </div>
          </AlertTitle>
          <AlertDescription>
            {isOfflineMode ?
              "Operating in offline mode. Data will sync automatically when connection is restored." :
              "Full connectivity active. All features available with real-time synchronization."
            }
          </AlertDescription>
        </Alert>

        {/* Mobile Device Simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Mobile App Interface Simulation
                </CardTitle>
                <CardDescription>Live preview of the enhanced mobile application</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mx-auto max-w-sm">
                  {/* Phone Frame */}
                  <div className="bg-gray-900 rounded-3xl p-4 shadow-2xl">
                    <div className="bg-white rounded-2xl overflow-hidden">
                      {/* Status Bar */}
                      <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1">
                          <Signal className="h-3 w-3" />
                          <Wifi className="h-3 w-3" />
                          <span>LEA Secure</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>09:42</span>
                          <Battery className="h-3 w-3" />
                          <span>87%</span>
                        </div>
                      </div>

                      {/* App Content */}
                      <div className="p-4 space-y-4 h-96 overflow-y-auto">
                        <div className="text-center">
                          <h3 className="font-bold text-lg">LEA Mobile Command</h3>
                          <p className="text-xs text-slate-600">Officer J. Doe • Badge #1234</p>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-2 gap-2">
                          <Button size="sm" className="h-12 flex flex-col gap-1">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-xs">Emergency</span>
                          </Button>
                          <Button size="sm" variant="outline" className="h-12 flex flex-col gap-1">
                            <Camera className="h-4 w-4" />
                            <span className="text-xs">Evidence</span>
                          </Button>
                          <Button size="sm" variant="outline" className="h-12 flex flex-col gap-1">
                            <FileText className="h-4 w-4" />
                            <span className="text-xs">Report</span>
                          </Button>
                          <Button size="sm" variant="outline" className="h-12 flex flex-col gap-1">
                            <Radio className="h-4 w-4" />
                            <span className="text-xs">Radio</span>
                          </Button>
                        </div>

                        {/* Current Status */}
                        <Card>
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Current Status</span>
                              <Badge className="bg-green-500 text-xs">On Patrol</Badge>
                            </div>
                            <div className="space-y-1 text-xs text-slate-600">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>Downtown District • Sector 7</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>On duty: 3h 42m</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Recent Alerts */}
                        <div>
                          <h4 className="font-medium text-sm mb-2">Recent Alerts</h4>
                          <div className="space-y-2">
                            <div className="p-2 border border-red-200 rounded bg-red-50">
                              <div className="flex items-center gap-2 text-xs">
                                <AlertTriangle className="h-3 w-3 text-red-500" />
                                <span className="font-medium">Fraud Alert - High Priority</span>
                              </div>
                              <p className="text-xs text-slate-600 mt-1">Suspicious activity detected • 5m ago</p>
                            </div>
                            <div className="p-2 border border-blue-200 rounded bg-blue-50">
                              <div className="flex items-center gap-2 text-xs">
                                <Users className="h-3 w-3 text-blue-500" />
                                <span className="font-medium">Inter-Agency Request</span>
                              </div>
                              <p className="text-xs text-slate-600 mt-1">FBI requires assistance • 15m ago</p>
                            </div>
                          </div>
                        </div>

                        {/* Voice Control Indicator */}
                        {voiceControlEnabled && (
                          <div className="flex items-center justify-center p-3 bg-purple-50 border border-purple-200 rounded">
                            <div className="flex items-center gap-2">
                              <Mic className="h-4 w-4 text-purple-600 animate-pulse" />
                              <span className="text-sm text-purple-700">Voice commands active</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Navigation Bar */}
                      <div className="bg-slate-100 px-4 py-2 flex justify-around">
                        <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-12">
                          <Activity className="h-4 w-4" />
                          <span className="text-xs">Dashboard</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-12">
                          <Database className="h-4 w-4" />
                          <span className="text-xs">Evidence</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-12">
                          <MessageSquare className="h-4 w-4" />
                          <span className="text-xs">Comms</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-12">
                          <Settings className="h-4 w-4" />
                          <span className="text-xs">Settings</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mobile System Status */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Device Status</CardTitle>
                <CardDescription>Current mobile device metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Battery className="h-4 w-4" />
                      <span className="text-sm">Battery</span>
                    </div>
                    <span className="font-medium">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      <span className="text-sm">Storage</span>
                    </div>
                    <span className="font-medium">67%</span>
                  </div>
                  <Progress value={67} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Signal className="h-4 w-4" />
                      <span className="text-sm">Signal</span>
                    </div>
                    <span className="font-medium">Strong</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Status</CardTitle>
                <CardDescription>Device security configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Biometric Lock</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Device Encryption</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Secure Boot</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Remote Wipe</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Feature Configuration Tabs */}
        <Tabs defaultValue="features" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="features">Mobile Features</TabsTrigger>
            <TabsTrigger value="notifications">Push Notifications</TabsTrigger>
            <TabsTrigger value="offline">Offline Capabilities</TabsTrigger>
            <TabsTrigger value="voice">Voice Controls</TabsTrigger>
            <TabsTrigger value="deployment">App Deployment</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Enhanced Mobile Features</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="battery-opt">Battery Optimization</Label>
                  <Switch
                    id="battery-opt"
                    checked={batteryOptimization}
                    onCheckedChange={setBatteryOptimization}
                  />
                </div>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure All
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mobileFeatures.map((feature) => (
                <Card key={feature.id} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <feature.icon className="h-5 w-5 text-blue-600" />
                        <div>
                          <CardTitle className="text-base">{feature.name}</CardTitle>
                          <CardDescription className="text-sm">{feature.description}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getStatusColor(feature.status)}>
                        {feature.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Battery Impact:</span>
                        <span className={`font-medium ${getBatteryImpactColor(feature.batteryImpact)}`}>
                          {feature.batteryImpact.toUpperCase()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span>Offline Support:</span>
                        <div className="flex items-center gap-1">
                          {feature.offlineCapable ? (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          ) : (
                            <CloudOff className="h-3 w-3 text-red-500" />
                          )}
                          <span>{feature.offlineCapable ? 'Available' : 'Requires Connection'}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1">
                          {feature.status === 'enabled' ? 'Configure' : 'Enable'}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Push Notification Configuration</h3>
              <Button>
                <Bell className="h-4 w-4 mr-2" />
                Test Notifications
              </Button>
            </div>

            <div className="space-y-4">
              {notificationChannels.map((channel) => (
                <Card key={channel.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">{channel.name}</CardTitle>
                        <CardDescription className="capitalize">{channel.type} notifications</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(channel.priority)}>
                          {channel.priority.toUpperCase()}
                        </Badge>
                        <Switch checked={channel.enabled} onCheckedChange={() => {}} />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Volume2 className="h-4 w-4" />
                          <span className="text-sm">Sound</span>
                        </div>
                        <Switch checked={channel.soundEnabled} onCheckedChange={() => {}} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          <span className="text-sm">Vibration</span>
                        </div>
                        <Switch checked={channel.vibrationEnabled} onCheckedChange={() => {}} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="offline" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Offline Data Management</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync All
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Maps
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {offlineCapabilities.map((capability) => (
                <Card key={capability.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{capability.feature}</CardTitle>
                      <Badge variant="outline">
                        {capability.pendingActions > 0 ? `${capability.pendingActions} pending` : 'Synced'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Storage Used</span>
                          <span>{capability.storageUsed}MB / {capability.maxStorage}MB</span>
                        </div>
                        <Progress value={(capability.storageUsed / capability.maxStorage) * 100} className="h-2" />
                      </div>

                      <div className="text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Last sync: {formatTimeAgo(capability.lastSync)}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Upload className="h-3 w-3 mr-1" />
                          Sync Now
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="voice" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Voice Control System</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="voice-control">Voice Commands</Label>
                  <Switch
                    id="voice-control"
                    checked={voiceControlEnabled}
                    onCheckedChange={setVoiceControlEnabled}
                  />
                </div>
                <Button>
                  <Mic className="h-4 w-4 mr-2" />
                  Train Voice Model
                </Button>
              </div>
            </div>

            {voiceControlEnabled && (
              <Alert className="border-l-4 border-l-purple-500 bg-purple-50">
                <Mic className="h-4 w-4" />
                <AlertTitle>Voice Control Active</AlertTitle>
                <AlertDescription>
                  Hands-free operation enabled. Say "Hey LEA" followed by any command below to activate.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              {voiceCommands.map((command) => (
                <Card key={command.id} className={`${voiceControlEnabled ? 'border-purple-200' : 'opacity-50'}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">"{command.phrase}"</CardTitle>
                        <CardDescription>{command.action}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{command.module}</Badge>
                        <Switch
                          checked={command.enabled && voiceControlEnabled}
                          disabled={!voiceControlEnabled}
                          onCheckedChange={() => {}}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" disabled={!voiceControlEnabled}>
                        <Play className="h-3 w-3 mr-1" />
                        Test Command
                      </Button>
                      <Button size="sm" variant="outline" disabled={!voiceControlEnabled}>
                        <Mic className="h-3 w-3 mr-1" />
                        Record Sample
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="deployment" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Mobile App Deployment
                  </CardTitle>
                  <CardDescription>Deploy the mobile app to officer devices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button className="h-16 flex flex-col gap-2">
                        <Smartphone className="h-6 w-6" />
                        <span>Android APK</span>
                        <span className="text-xs">v2.1.4</span>
                      </Button>
                      <Button className="h-16 flex flex-col gap-2">
                        <Smartphone className="h-6 w-6" />
                        <span>iOS App</span>
                        <span className="text-xs">v2.1.4</span>
                      </Button>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h4 className="font-medium">Device Management</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Button size="sm" variant="outline">
                          <QrCode className="h-3 w-3 mr-1" />
                          Generate QR
                        </Button>
                        <Button size="sm" variant="outline">
                          <Shield className="h-3 w-3 mr-1" />
                          Device Profiles
                        </Button>
                        <Button size="sm" variant="outline">
                          <Lock className="h-3 w-3 mr-1" />
                          Remote Lock
                        </Button>
                        <Button size="sm" variant="outline">
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Push Update
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Deployment Statistics</CardTitle>
                  <CardDescription>Current mobile app adoption metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Total Devices</span>
                        <span>87 / 100</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Latest Version</span>
                        <span>78 / 87</span>
                      </div>
                      <Progress value={89.7} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Active Users (24h)</span>
                        <span>82 / 87</span>
                      </div>
                      <Progress value={94.3} className="h-2" />
                    </div>

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Android Devices:</span>
                        <span className="font-medium">52</span>
                      </div>
                      <div className="flex justify-between">
                        <span>iOS Devices:</span>
                        <span className="font-medium">35</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg Battery Life:</span>
                        <span className="font-medium">14.2 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Data Usage (monthly):</span>
                        <span className="font-medium">2.8 GB avg</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Mobile Features Roadmap</CardTitle>
                <CardDescription>Upcoming enhancements and capabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Eye className="h-4 w-4 text-blue-500" />
                      Augmented Reality
                    </h4>
                    <p className="text-sm text-slate-600 mb-2">
                      Real-time information overlay for crime scene investigation
                    </p>
                    <Badge className="bg-yellow-500">In Development</Badge>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Brain className="h-4 w-4 text-purple-500" />
                      AI Assistant
                    </h4>
                    <p className="text-sm text-slate-600 mb-2">
                      Intelligent case recommendations and automated reporting
                    </p>
                    <Badge className="bg-blue-500">Planned Q2</Badge>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <SatelliteIcon className="h-4 w-4 text-green-500" />
                      Satellite Connectivity
                    </h4>
                    <p className="text-sm text-slate-600 mb-2">
                      Emergency communication via satellite in remote areas
                    </p>
                    <Badge className="bg-green-500">Q3 2024</Badge>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Headphones className="h-4 w-4 text-orange-500" />
                      Real-time Translation
                    </h4>
                    <p className="text-sm text-slate-600 mb-2">
                      Instant language translation for international cooperation
                    </p>
                    <Badge className="bg-orange-500">Q4 2024</Badge>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Compass className="h-4 w-4 text-red-500" />
                      Indoor Navigation
                    </h4>
                    <p className="text-sm text-slate-600 mb-2">
                      Precise indoor positioning for complex building operations
                    </p>
                    <Badge className="bg-red-500">Research Phase</Badge>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Flashlight className="h-4 w-4 text-gray-500" />
                      Smart Accessories
                    </h4>
                    <p className="text-sm text-slate-600 mb-2">
                      Integration with body cameras, smart badges, and wearables
                    </p>
                    <Badge className="bg-gray-500">Evaluation</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
