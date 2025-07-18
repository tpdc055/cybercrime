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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Globe,
  MapPin,
  AlertTriangle,
  Send,
  Eye,
  Shield,
  Users,
  Bell,
  MessageSquare,
  FileText,
  Camera,
  Clock,
  TrendingUp,
  TrendingDown,
  Activity,
  Search,
  Filter,
  Download,
  Upload,
  Phone,
  Mail,
  ExternalLink,
  Info,
  CheckCircle,
  XCircle,
  Star,
  Heart,
  Share,
  UserPlus,
  Calendar,
  BarChart3,
  PieChart,
  Target
} from "lucide-react";

interface CrimeReport {
  id: string;
  type: 'theft' | 'fraud' | 'assault' | 'vandalism' | 'suspicious' | 'drug' | 'traffic' | 'other';
  title: string;
  description: string;
  location: string;
  coordinates: {lat: number, lng: number};
  reportedAt: Date;
  status: 'submitted' | 'under_review' | 'investigating' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  anonymous: boolean;
  verified: boolean;
}

interface PublicAlert {
  id: string;
  type: 'emergency' | 'warning' | 'info' | 'traffic' | 'weather';
  title: string;
  message: string;
  location?: string;
  issuedAt: Date;
  expiresAt: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
  active: boolean;
}

interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  date: Date;
  type: 'meeting' | 'safety' | 'education' | 'outreach';
  organizer: string;
  attendees: number;
  maxAttendees: number;
}

interface CrimeStatistic {
  type: string;
  count: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

export default function PublicPortal() {
  const [reportType, setReportType] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [selectedArea, setSelectedArea] = useState("all");
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const [crimeReports] = useState<CrimeReport[]>([
    {
      id: "PR-2024-4891",
      type: "suspicious",
      title: "Suspicious individuals near ATM",
      description: "Multiple people loitering around bank ATM, approaching customers",
      location: "Main Street Bank, Downtown",
      coordinates: {lat: 40.7128, lng: -74.0060},
      reportedAt: new Date(Date.now() - 1800000),
      status: "investigating",
      priority: "medium",
      anonymous: true,
      verified: true
    },
    {
      id: "PR-2024-4892",
      type: "theft",
      title: "Bicycle theft from apartment complex",
      description: "Multiple bicycles stolen from secure bike storage area",
      location: "Sunset Apartments, Oak Street",
      coordinates: {lat: 40.7580, lng: -73.9855},
      reportedAt: new Date(Date.now() - 3600000),
      status: "under_review",
      priority: "low",
      anonymous: false,
      verified: false
    },
    {
      id: "PR-2024-4893",
      type: "fraud",
      title: "Phone scam targeting elderly residents",
      description: "Reports of fraudulent calls claiming to be from utility company",
      location: "Seniors Community Center area",
      coordinates: {lat: 40.6892, lng: -74.0445},
      reportedAt: new Date(Date.now() - 7200000),
      status: "resolved",
      priority: "high",
      anonymous: true,
      verified: true
    }
  ]);

  const [publicAlerts] = useState<PublicAlert[]>([
    {
      id: "PA-2024-0156",
      type: "warning",
      title: "Increased Fraud Activity Alert",
      message: "Citizens advised to be cautious of phone scams targeting banking information. Verify caller identity before sharing personal details.",
      location: "City-wide",
      issuedAt: new Date(Date.now() - 7200000),
      expiresAt: new Date(Date.now() + 86400000),
      severity: "high",
      active: true
    },
    {
      id: "PA-2024-0157",
      type: "traffic",
      title: "Road Closure - Construction",
      message: "Main Street between 1st and 3rd Avenue closed for emergency repairs. Use alternate routes.",
      location: "Downtown District",
      issuedAt: new Date(Date.now() - 10800000),
      expiresAt: new Date(Date.now() + 172800000),
      severity: "medium",
      active: true
    },
    {
      id: "PA-2024-0158",
      type: "info",
      title: "Community Safety Meeting",
      message: "Join us for a neighborhood safety discussion. Light refreshments provided.",
      location: "Community Center",
      issuedAt: new Date(Date.now() - 14400000),
      expiresAt: new Date(Date.now() + 259200000),
      severity: "low",
      active: true
    }
  ]);

  const [communityEvents] = useState<CommunityEvent[]>([
    {
      id: "CE-2024-0089",
      title: "Neighborhood Watch Training",
      description: "Learn how to keep your community safe with proper observation and reporting techniques",
      location: "Community Center Hall A",
      date: new Date(Date.now() + 604800000),
      type: "safety",
      organizer: "Community Safety Division",
      attendees: 23,
      maxAttendees: 50
    },
    {
      id: "CE-2024-0090",
      title: "Cybersecurity for Seniors",
      description: "Educational workshop on protecting yourself from online scams and fraud",
      location: "Senior Center",
      date: new Date(Date.now() + 1209600000),
      type: "education",
      organizer: "Digital Safety Team",
      attendees: 15,
      maxAttendees: 30
    },
    {
      id: "CE-2024-0091",
      title: "Coffee with Cops",
      description: "Informal meet and greet with local officers. Discuss community concerns over coffee",
      location: "Central Park Pavilion",
      date: new Date(Date.now() + 432000000),
      type: "outreach",
      organizer: "Community Relations",
      attendees: 8,
      maxAttendees: 25
    }
  ]);

  const [crimeStats] = useState<CrimeStatistic[]>([
    {type: "Property Crime", count: 247, change: -12.3, trend: "down"},
    {type: "Fraud & Scams", count: 89, change: 8.7, trend: "up"},
    {type: "Traffic Violations", count: 156, change: -3.2, trend: "down"},
    {type: "Public Safety", count: 67, change: 1.4, trend: "stable"},
    {type: "Drug-related", count: 34, change: -18.9, trend: "down"}
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
      case 'submitted': return 'bg-blue-500';
      case 'under_review': return 'bg-yellow-500';
      case 'investigating': return 'bg-orange-500';
      case 'resolved': return 'bg-green-500';
      case 'closed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-l-red-500 bg-red-50';
      case 'high': return 'border-l-orange-500 bg-orange-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
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

  const handleSubmitReport = () => {
    setReportSubmitted(true);
    setTimeout(() => setReportSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900 flex items-center justify-center gap-3">
            <Globe className="h-10 w-10 text-blue-600" />
            Community Safety Portal
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Your voice matters in keeping our community safe. Report incidents, stay informed with safety alerts,
            and engage with local law enforcement.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Shield className="h-3 w-3 mr-1" />
              Anonymous Reporting Available
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <Clock className="h-3 w-3 mr-1" />
              24/7 Monitoring
            </Badge>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="h-5 w-5" />
                Report Emergency
              </CardTitle>
              <CardDescription>Immediate assistance required</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-3">For life-threatening emergencies</p>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                <Phone className="h-4 w-4 mr-2" />
                Call 911
              </Button>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <FileText className="h-5 w-5" />
                Submit Crime Report
              </CardTitle>
              <CardDescription>Report non-emergency incidents</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-3">Anonymous reporting available</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    File Report
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Submit Crime Report</DialogTitle>
                    <DialogDescription>
                      Help keep your community safe by reporting incidents. All reports are taken seriously.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    {reportSubmitted && (
                      <Alert className="border-l-4 border-l-green-500 bg-green-50">
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>Report Submitted Successfully</AlertTitle>
                        <AlertDescription>
                          Thank you for your report. You will receive updates via email if contact information was provided.
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Incident Type</Label>
                        <Select value={reportType} onValueChange={setReportType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="theft">Theft/Burglary</SelectItem>
                            <SelectItem value="fraud">Fraud/Scam</SelectItem>
                            <SelectItem value="assault">Assault</SelectItem>
                            <SelectItem value="vandalism">Vandalism</SelectItem>
                            <SelectItem value="suspicious">Suspicious Activity</SelectItem>
                            <SelectItem value="drug">Drug Activity</SelectItem>
                            <SelectItem value="traffic">Traffic Violation</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Location</Label>
                        <Input placeholder="Address or landmark..." />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        placeholder="Please provide detailed information about the incident..."
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>When did this occur?</Label>
                      <Input type="datetime-local" />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="anonymous"
                        checked={isAnonymous}
                        onCheckedChange={(checked) => setIsAnonymous(checked === true)}
                      />
                      <Label htmlFor="anonymous">Submit anonymously</Label>
                    </div>

                    {!isAnonymous && (
                      <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
                        <div className="space-y-2">
                          <Label>Your Name (Optional)</Label>
                          <Input placeholder="Full name..." />
                        </div>
                        <div className="space-y-2">
                          <Label>Contact Email (Optional)</Label>
                          <Input type="email" placeholder="email@example.com" />
                        </div>
                      </div>
                    )}

                    <Button onClick={handleSubmitReport} className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Submit Report
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <MessageSquare className="h-5 w-5" />
                Anonymous Tip
              </CardTitle>
              <CardDescription>Share information safely</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-3">100% anonymous and secure</p>
              <Button variant="outline" className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                Submit Tip
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="reports" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="reports">Recent Reports</TabsTrigger>
            <TabsTrigger value="alerts">Safety Alerts</TabsTrigger>
            <TabsTrigger value="statistics">Crime Statistics</TabsTrigger>
            <TabsTrigger value="events">Community Events</TabsTrigger>
            <TabsTrigger value="resources">Safety Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Recent Community Reports</h3>
              <div className="flex items-center gap-2">
                <Select value={selectedArea} onValueChange={setSelectedArea}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Areas</SelectItem>
                    <SelectItem value="downtown">Downtown</SelectItem>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  View Map
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {crimeReports.map((report) => (
                <Card key={report.id} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                        <CardDescription>
                          {report.type.toUpperCase()} • {report.location} • {formatTimeAgo(report.reportedAt)}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(report.priority)}>
                          {report.priority.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        {report.verified && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        {report.anonymous && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            Anonymous
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-slate-700">{report.description}</p>

                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {report.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Reported {formatTimeAgo(report.reportedAt)}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <MapPin className="h-3 w-3 mr-1" />
                          Show on Map
                        </Button>
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

          <TabsContent value="alerts" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Public Safety Alerts</h3>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-1" />
                Subscribe to Alerts
              </Button>
            </div>

            <div className="space-y-4">
              {publicAlerts.filter(alert => alert.active).map((alert) => (
                <Alert key={alert.id} className={`border-l-4 ${getSeverityColor(alert.severity)}`}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle className="flex items-center justify-between">
                    <span>{alert.title}</span>
                    <div className="flex items-center gap-2">
                      <Badge className={`${alert.type === 'emergency' ? 'bg-red-500' : alert.type === 'warning' ? 'bg-orange-500' : alert.type === 'traffic' ? 'bg-blue-500' : 'bg-gray-500'}`}>
                        {alert.type.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-slate-500">{formatTimeAgo(alert.issuedAt)}</span>
                    </div>
                  </AlertTitle>
                  <AlertDescription className="mt-2">
                    {alert.message}
                    {alert.location && (
                      <div className="flex items-center gap-1 mt-2 text-sm">
                        <MapPin className="h-3 w-3" />
                        <span className="font-medium">Location: {alert.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 mt-1 text-sm">
                      <Clock className="h-3 w-3" />
                      <span>Expires: {alert.expiresAt.toLocaleDateString()} {alert.expiresAt.toLocaleTimeString()}</span>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Crime Statistics & Trends</h3>
              <div className="flex items-center gap-2">
                <Select defaultValue="30days">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 Days</SelectItem>
                    <SelectItem value="30days">Last 30 Days</SelectItem>
                    <SelectItem value="90days">Last 90 Days</SelectItem>
                    <SelectItem value="1year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download Report
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {crimeStats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{stat.type}</CardTitle>
                      {getTrendIcon(stat.trend)}
                    </div>
                    <CardDescription>Last 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold">{stat.count}</div>
                      <div className={`text-sm flex items-center gap-1 ${stat.change > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        <span>{stat.change > 0 ? '+' : ''}{stat.change.toFixed(1)}%</span>
                        <span className="text-slate-500">vs previous period</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Crime Trends
                  </CardTitle>
                  <CardDescription>Monthly comparison over the last year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-slate-100 rounded flex items-center justify-center text-slate-500">
                    [Crime Trends Chart]
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Crime Distribution
                  </CardTitle>
                  <CardDescription>Breakdown by crime type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-slate-100 rounded flex items-center justify-center text-slate-500">
                    [Crime Distribution Chart]
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Community Safety Events</h3>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Register for Event
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {communityEvents.map((event) => (
                <Card key={event.id} className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <Badge className={`${event.type === 'safety' ? 'bg-red-500' : event.type === 'education' ? 'bg-blue-500' : event.type === 'outreach' ? 'bg-green-500' : 'bg-purple-500'}`}>
                        {event.type.toUpperCase()}
                      </Badge>
                    </div>
                    <CardDescription>{event.organizer}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-slate-700">{event.description}</p>

                      <div className="space-y-2 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {event.date.toLocaleDateString()} at {event.date.toLocaleTimeString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {event.attendees}/{event.maxAttendees} registered
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{width: `${(event.attendees / event.maxAttendees) * 100}%`}}
                          />
                        </div>
                        <Button size="sm" className="w-full" disabled={event.attendees >= event.maxAttendees}>
                          {event.attendees >= event.maxAttendees ? 'Event Full' : 'Register'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <h3 className="text-lg font-semibold">Safety Resources & Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Emergency Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Emergency:</span>
                      <span className="text-red-600 font-bold">911</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Non-Emergency:</span>
                      <span>(555) 123-4567</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Crime Tips:</span>
                      <span>(555) 123-TIPS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Victim Services:</span>
                      <span>(555) 123-7890</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-green-600" />
                    Safety Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Always verify caller identity before sharing personal information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Report suspicious activity immediately</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Keep valuables out of sight in vehicles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Use well-lit paths when walking at night</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ExternalLink className="h-5 w-5 text-purple-600" />
                    Useful Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Crime Prevention Guide
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Neighborhood Watch
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Mail className="h-4 w-4 mr-2" />
                      Newsletter Signup
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Community Forum
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Fraud Prevention Center</CardTitle>
                <CardDescription>Protect yourself from common scams and fraud attempts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Common Scam Types:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Phone calls requesting banking information
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Fake utility company threats
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Prize or lottery notifications
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Romance scams on social media
                      </li>
                      <li className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Tech support imposters
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Protect Yourself:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Never give personal info over the phone
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Verify caller identity independently
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Be skeptical of urgent requests
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Report suspicious calls immediately
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Trust your instincts
                      </li>
                    </ul>
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
