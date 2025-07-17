"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Eye,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  ExternalLink,
  AlertTriangle,
  Clock,
  CheckCircle,
  Globe,
  Users,
  MessageSquare,
  Image,
  Video,
  Link,
  Calendar,
  TrendingUp,
  Shield,
  Target,
  Activity,
  Zap,
  UserCheck,
  UserX,
  Flag,
  Share,
  Info,
  Bell,
  FileText
} from "lucide-react";

// Enhanced mock data for social media monitoring
const monitoredProfiles = [
  {
    id: "profile-1",
    platform: "Facebook",
    username: "john.scammer.2024",
    displayName: "John Military Hero",
    profileUrl: "https://facebook.com/john.scammer.2024",
    avatar: "/avatars/scammer1.jpg",
    riskLevel: "High",
    status: "Active Monitoring",
    lastActivity: "2024-01-15T14:30:00Z",
    followers: 1250,
    following: 850,
    posts: 42,
    flags: ["Fake Military Profile", "Romance Scam", "Multiple Victims"],
    caseNumber: "CYBER-2024-001",
    investigator: "Det. Sarah Wilson",
    dateAdded: "2024-01-10T09:00:00Z",
    suspiciousActivity: 8,
    keywords: ["deployment", "emergency money", "gift cards", "true love"],
    recentPosts: [
      {
        id: "post-1",
        content: "Missing my beautiful angel back home. Can't wait to see you after this deployment ends...",
        timestamp: "2024-01-15T12:00:00Z",
        type: "text",
        engagement: { likes: 15, comments: 8, shares: 2 },
        flagged: true,
        reason: "Potential romance scam language"
      },
      {
        id: "post-2",
        content: "Emergency situation here. Need help with emergency leave funds.",
        timestamp: "2024-01-14T18:45:00Z",
        type: "text",
        engagement: { likes: 3, comments: 12, shares: 0 },
        flagged: true,
        reason: "Emergency money request"
      }
    ]
  },
  {
    id: "profile-2",
    platform: "Instagram",
    username: "crypto_wealth_2024",
    displayName: "Investment Expert Maria",
    profileUrl: "https://instagram.com/crypto_wealth_2024",
    avatar: "/avatars/scammer2.jpg",
    riskLevel: "Medium",
    status: "Under Review",
    lastActivity: "2024-01-15T16:20:00Z",
    followers: 8500,
    following: 1200,
    posts: 156,
    flags: ["Cryptocurrency Scam", "Fake Investment Scheme"],
    caseNumber: "CYBER-2024-005",
    investigator: "Det. Mike Johnson",
    dateAdded: "2024-01-12T11:30:00Z",
    suspiciousActivity: 5,
    keywords: ["guaranteed returns", "crypto investment", "quick money", "exclusive opportunity"],
    recentPosts: [
      {
        id: "post-3",
        content: "🚀 Made $50,000 in just 2 weeks! Join my exclusive crypto group for guaranteed returns! 💰",
        timestamp: "2024-01-15T15:30:00Z",
        type: "image",
        engagement: { likes: 245, comments: 67, shares: 89 },
        flagged: true,
        reason: "Unrealistic profit claims"
      }
    ]
  },
  {
    id: "profile-3",
    platform: "TikTok",
    username: "techsupport_help",
    displayName: "Microsoft Support Team",
    profileUrl: "https://tiktok.com/@techsupport_help",
    avatar: "/avatars/scammer3.jpg",
    riskLevel: "High",
    status: "Escalated",
    lastActivity: "2024-01-15T13:15:00Z",
    followers: 2850,
    following: 45,
    posts: 28,
    flags: ["Tech Support Scam", "Impersonation", "Malware Distribution"],
    caseNumber: "CYBER-2024-003",
    investigator: "Det. John Smith",
    dateAdded: "2024-01-08T14:20:00Z",
    suspiciousActivity: 12,
    keywords: ["microsoft support", "virus detected", "call immediately", "remote access"],
    recentPosts: [
      {
        id: "post-4",
        content: "🚨 VIRUS DETECTED! Call Microsoft Support immediately: +1-800-FAKE-NUM",
        timestamp: "2024-01-15T10:00:00Z",
        type: "video",
        engagement: { likes: 12, comments: 156, shares: 8 },
        flagged: true,
        reason: "Fake tech support scam"
      }
    ]
  }
];

// Mock monitoring alerts
const monitoringAlerts = [
  {
    id: "alert-1",
    type: "Keyword Match",
    severity: "High",
    message: "Profile 'john.scammer.2024' posted content containing flagged keywords: 'emergency money'",
    timestamp: "2024-01-15T14:35:00Z",
    profileId: "profile-1",
    status: "New",
    actionRequired: true
  },
  {
    id: "alert-2",
    type: "Suspicious Activity",
    severity: "Medium",
    message: "Unusual posting pattern detected for 'crypto_wealth_2024' - 15 posts in last 2 hours",
    timestamp: "2024-01-15T13:20:00Z",
    profileId: "profile-2",
    status: "Investigating",
    actionRequired: false
  },
  {
    id: "alert-3",
    type: "Report Received",
    severity: "High",
    message: "New victim report linked to monitored profile 'techsupport_help'",
    timestamp: "2024-01-15T11:45:00Z",
    profileId: "profile-3",
    status: "Escalated",
    actionRequired: true
  }
];

// Mock trend analysis data
const trendData = [
  { category: "Romance Scams", count: 45, change: +12, period: "This Week" },
  { category: "Investment Fraud", count: 28, change: +8, period: "This Week" },
  { category: "Tech Support Scams", count: 15, change: -3, period: "This Week" },
  { category: "Identity Theft", count: 22, change: +5, period: "This Week" },
];

export default function SocialMonitoringPage() {
  const [selectedTab, setSelectedTab] = useState("profiles");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlatform, setFilterPlatform] = useState("all");
  const [filterRisk, setFilterRisk] = useState("all");
  const [isAddProfileOpen, setIsAddProfileOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [newProfile, setNewProfile] = useState({
    platform: "",
    username: "",
    caseNumber: "",
    riskLevel: "Medium",
    keywords: "",
    notes: ""
  });

  const filteredProfiles = monitoredProfiles.filter((profile) => {
    const matchesSearch = profile.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         profile.displayName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = filterPlatform === "all" || profile.platform === filterPlatform;
    const matchesRisk = filterRisk === "all" || profile.riskLevel === filterRisk;

    return matchesSearch && matchesPlatform && matchesRisk;
  });

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "High":
        return <Badge variant="destructive">High Risk</Badge>;
      case "Medium":
        return <Badge variant="secondary" className="bg-orange-100 text-orange-700">Medium Risk</Badge>;
      case "Low":
        return <Badge variant="secondary" className="bg-green-100 text-green-700">Low Risk</Badge>;
      default:
        return <Badge variant="secondary">{risk}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active Monitoring":
        return <Badge variant="default" className="bg-blue-600">Active</Badge>;
      case "Under Review":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Under Review</Badge>;
      case "Escalated":
        return <Badge variant="destructive">Escalated</Badge>;
      case "Closed":
        return <Badge variant="secondary" className="bg-gray-100 text-gray-700">Closed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "High":
        return <Badge variant="destructive">High</Badge>;
      case "Medium":
        return <Badge variant="secondary" className="bg-orange-100 text-orange-700">Medium</Badge>;
      case "Low":
        return <Badge variant="secondary" className="bg-green-100 text-green-700">Low</Badge>;
      default:
        return <Badge variant="secondary">{severity}</Badge>;
    }
  };

  const addProfile = () => {
    console.log("Adding new profile for monitoring:", newProfile);
    setIsAddProfileOpen(false);
    setNewProfile({
      platform: "",
      username: "",
      caseNumber: "",
      riskLevel: "Medium",
      keywords: "",
      notes: ""
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Social Media Monitoring</h1>
            <p className="text-zinc-600 mt-2">Track suspicious social media activities and identify potential threats</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setIsAddProfileOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Profile
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Profiles</p>
                  <p className="text-3xl font-bold text-blue-600">{monitoredProfiles.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">High Risk</p>
                  <p className="text-3xl font-bold text-red-600">
                    {monitoredProfiles.filter(p => p.riskLevel === "High").length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">New Alerts</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {monitoringAlerts.filter(a => a.status === "New").length}
                  </p>
                </div>
                <Bell className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-3xl font-bold text-green-600">87%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profiles">Monitored Profiles</TabsTrigger>
            <TabsTrigger value="alerts">Real-time Alerts</TabsTrigger>
            <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Monitored Profiles Tab */}
          <TabsContent value="profiles" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="search">Search Profiles</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="search"
                        placeholder="Search by username or display name..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="platform-filter">Platform</Label>
                    <Select value={filterPlatform} onValueChange={setFilterPlatform}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Platforms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Platforms</SelectItem>
                        <SelectItem value="Facebook">Facebook</SelectItem>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="TikTok">TikTok</SelectItem>
                        <SelectItem value="Twitter">Twitter</SelectItem>
                        <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="risk-filter">Risk Level</Label>
                    <Select value={filterRisk} onValueChange={setFilterRisk}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Risk Levels" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Risk Levels</SelectItem>
                        <SelectItem value="High">High Risk</SelectItem>
                        <SelectItem value="Medium">Medium Risk</SelectItem>
                        <SelectItem value="Low">Low Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profiles Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProfiles.map((profile) => (
                <Card key={profile.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {profile.platform.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <CardTitle className="text-lg">{profile.displayName}</CardTitle>
                          <CardDescription>@{profile.username}</CardDescription>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {getRiskBadge(profile.riskLevel)}
                        {getStatusBadge(profile.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Profile Stats */}
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-semibold text-blue-600">{profile.followers.toLocaleString()}</div>
                          <div className="text-xs text-gray-600">Followers</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-green-600">{profile.posts}</div>
                          <div className="text-xs text-gray-600">Posts</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-red-600">{profile.suspiciousActivity}</div>
                          <div className="text-xs text-gray-600">Flags</div>
                        </div>
                      </div>

                      {/* Profile Details */}
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Platform:</span>
                          <span className="font-medium">{profile.platform}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Case:</span>
                          <Badge variant="outline">{profile.caseNumber}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Investigator:</span>
                          <span className="font-medium">{profile.investigator}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Activity:</span>
                          <span className="font-medium">
                            {new Date(profile.lastActivity).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Flags */}
                      <div>
                        <Label className="text-sm font-medium">Flags:</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {profile.flags.slice(0, 2).map((flag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {flag}
                            </Badge>
                          ))}
                          {profile.flags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{profile.flags.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => setSelectedProfile(profile)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Visit Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Real-time Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Real-time Monitoring Alerts
                </CardTitle>
                <CardDescription>
                  Automated alerts from social media monitoring systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monitoringAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0 mt-1">
                        {alert.severity === "High" && <AlertTriangle className="h-5 w-5 text-red-600" />}
                        {alert.severity === "Medium" && <Info className="h-5 w-5 text-orange-600" />}
                        {alert.severity === "Low" && <CheckCircle className="h-5 w-5 text-green-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{alert.type}</div>
                            <div className="text-sm text-gray-600 mt-1">{alert.message}</div>
                            <div className="text-xs text-gray-500 mt-2">
                              {new Date(alert.timestamp).toLocaleString()}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getSeverityBadge(alert.severity)}
                            <Badge
                              variant={alert.status === "New" ? "default" : "secondary"}
                              className={
                                alert.status === "Escalated" ? "bg-red-100 text-red-700" : ""
                              }
                            >
                              {alert.status}
                            </Badge>
                          </div>
                        </div>
                        {alert.actionRequired && (
                          <div className="mt-3 flex gap-2">
                            <Button size="sm" variant="outline">Investigate</Button>
                            <Button size="sm" variant="outline">Escalate</Button>
                            <Button size="sm" variant="ghost">Dismiss</Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trend Analysis Tab */}
          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Scam Type Trends</CardTitle>
                  <CardDescription>Weekly comparison of different scam categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trendData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{item.category}</div>
                          <div className="text-sm text-gray-600">{item.period}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold">{item.count}</span>
                          <div className={`flex items-center gap-1 ${item.change > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            <TrendingUp className={`h-4 w-4 ${item.change < 0 ? 'rotate-180' : ''}`} />
                            <span className="text-sm">
                              {item.change > 0 ? '+' : ''}{item.change}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Distribution</CardTitle>
                  <CardDescription>Active monitoring across platforms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Facebook</span>
                      <div className="flex items-center gap-2">
                        <Progress value={45} className="w-20" />
                        <span className="text-sm">45%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Instagram</span>
                      <div className="flex items-center gap-2">
                        <Progress value={30} className="w-20" />
                        <span className="text-sm">30%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>TikTok</span>
                      <div className="flex items-center gap-2">
                        <Progress value={15} className="w-20" />
                        <span className="text-sm">15%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Twitter</span>
                      <div className="flex items-center gap-2">
                        <Progress value={10} className="w-20" />
                        <span className="text-sm">10%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monitoring Reports</CardTitle>
                <CardDescription>Generate and export monitoring reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-32 flex flex-col items-center justify-center">
                    <FileText className="h-8 w-8 mb-2" />
                    <span>Weekly Summary</span>
                  </Button>
                  <Button variant="outline" className="h-32 flex flex-col items-center justify-center">
                    <TrendingUp className="h-8 w-8 mb-2" />
                    <span>Trend Analysis</span>
                  </Button>
                  <Button variant="outline" className="h-32 flex flex-col items-center justify-center">
                    <Shield className="h-8 w-8 mb-2" />
                    <span>Risk Assessment</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add Profile Dialog */}
        <Dialog open={isAddProfileOpen} onOpenChange={setIsAddProfileOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Profile to Monitoring</DialogTitle>
              <DialogDescription>
                Add a social media profile to the monitoring system for suspicious activity tracking.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="platform">Platform *</Label>
                  <Select
                    value={newProfile.platform}
                    onValueChange={(value) => setNewProfile({...newProfile, platform: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Facebook">Facebook</SelectItem>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="TikTok">TikTok</SelectItem>
                      <SelectItem value="Twitter">Twitter</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="username">Username/Handle *</Label>
                  <Input
                    id="username"
                    placeholder="@username or profile name"
                    value={newProfile.username}
                    onChange={(e) => setNewProfile({...newProfile, username: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="caseNumber">Case Number *</Label>
                  <Input
                    id="caseNumber"
                    placeholder="e.g., CYBER-2024-XXX"
                    value={newProfile.caseNumber}
                    onChange={(e) => setNewProfile({...newProfile, caseNumber: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="riskLevel">Risk Level</Label>
                  <Select
                    value={newProfile.riskLevel}
                    onValueChange={(value) => setNewProfile({...newProfile, riskLevel: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="keywords">Monitoring Keywords</Label>
                <Input
                  id="keywords"
                  placeholder="Enter keywords separated by commas (e.g., emergency, money, gift cards)"
                  value={newProfile.keywords}
                  onChange={(e) => setNewProfile({...newProfile, keywords: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional information about this profile or investigation..."
                  value={newProfile.notes}
                  onChange={(e) => setNewProfile({...newProfile, notes: e.target.value})}
                  rows={3}
                />
              </div>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  All monitoring activities are logged and must comply with privacy regulations and department policies.
                </AlertDescription>
              </Alert>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddProfileOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={addProfile}
                  disabled={!newProfile.platform || !newProfile.username || !newProfile.caseNumber}
                >
                  <Target className="h-4 w-4 mr-2" />
                  Start Monitoring
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Profile Details Dialog */}
        <Dialog open={!!selectedProfile} onOpenChange={() => setSelectedProfile(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Profile Details</DialogTitle>
              <DialogDescription>
                Detailed information and recent activity for monitored profile
              </DialogDescription>
            </DialogHeader>
            {selectedProfile && (
              <div className="space-y-6">
                {/* Profile Header */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-xl">
                      {selectedProfile.platform.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{selectedProfile.displayName}</h3>
                    <p className="text-gray-600">@{selectedProfile.username}</p>
                    <p className="text-sm text-gray-500">{selectedProfile.platform}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    {getRiskBadge(selectedProfile.riskLevel)}
                    {getStatusBadge(selectedProfile.status)}
                  </div>
                </div>

                {/* Recent Posts */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Recent Flagged Posts</h4>
                  <div className="space-y-4">
                    {selectedProfile.recentPosts?.map((post: any) => (
                      <Card key={post.id} className={`border-l-4 ${post.flagged ? 'border-l-red-500' : 'border-l-gray-300'}`}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <MessageSquare className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-500">
                                {new Date(post.timestamp).toLocaleString()}
                              </span>
                            </div>
                            {post.flagged && (
                              <Badge variant="destructive" className="text-xs">Flagged</Badge>
                            )}
                          </div>
                          <p className="mb-3">{post.content}</p>
                          {post.flagged && (
                            <Alert className="mb-3">
                              <Flag className="h-4 w-4" />
                              <AlertDescription>
                                <strong>Flag Reason:</strong> {post.reason}
                              </AlertDescription>
                            </Alert>
                          )}
                          <div className="flex gap-4 text-sm text-gray-600">
                            <span>👍 {post.engagement.likes}</span>
                            <span>💬 {post.engagement.comments}</span>
                            <span>🔄 {post.engagement.shares}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
