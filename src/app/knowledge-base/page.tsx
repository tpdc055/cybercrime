"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  BookOpen,
  Search,
  Filter,
  AlertTriangle,
  Info,
  Shield,
  TrendingUp,
  Users,
  Globe,
  FileText,
  Download,
  Plus,
  Star,
  Calendar,
  Eye,
  Play,
  Award,
  Target,
  Lightbulb,
  Zap,
  Clock,
  CheckCircle,
  ThumbsUp,
  Share,
  BookmarkPlus,
  Video,
  Image,
  Link,
  ExternalLink
} from "lucide-react";

// Enhanced mock knowledge base data
const scamLibrary = [
  {
    id: 1,
    title: "Romance Scam - Military Personnel Impersonation",
    category: "Romance Scams",
    severity: "High",
    lastUpdated: "2024-01-15",
    views: 1245,
    rating: 4.8,
    author: "Det. Sarah Wilson",
    description: "Comprehensive guide on romance scams involving fake military personnel deployed overseas.",
    content: "Scammers pose as military personnel deployed overseas to build emotional relationships and extract money from victims.",
    commonSigns: [
      "Claims to be deployed military personnel in conflict zones",
      "Requests money for emergency leave or communication fees",
      "Uses stolen military photos from social media",
      "Avoids video calls or phone calls with various excuses",
      "Stories about being unable to access personal funds or bank accounts"
    ],
    redFlags: [
      "Immediate declarations of love within days/weeks",
      "Requests for money transfers or gift cards",
      "Inconsistent stories about military deployment details",
      "Professional quality photos that seem too good to be true",
      "Grammar and spelling mistakes inconsistent with claimed education"
    ],
    preventionTips: [
      "Never send money to someone you've only met online",
      "Verify military service through official channels",
      "Be suspicious of urgent financial requests",
      "Use reverse image searches on profile photos",
      "Insist on video calls at random times"
    ],
    caseStudies: [
      {
        title: "Maria Santos Case - $15,000 Loss",
        outcome: "Funds recovered through international cooperation",
        lessons: "Victim education prevented further targeting"
      }
    ],
    resources: [
      { title: "Military Verification Guide", type: "PDF", url: "#" },
      { title: "Romance Scam Indicators Checklist", type: "Checklist", url: "#" }
    ]
  },
  {
    id: 2,
    title: "Cryptocurrency Investment Fraud",
    category: "Investment Scams",
    severity: "High",
    lastUpdated: "2024-01-12",
    views: 892,
    rating: 4.6,
    author: "Analyst David Chen",
    description: "Guide to identifying and investigating cryptocurrency-related investment fraud schemes.",
    content: "Fraudulent investment schemes promising unrealistic returns through cryptocurrency trading.",
    commonSigns: [
      "Guaranteed high returns with no risk",
      "Pressure to invest quickly",
      "Requests for personal wallet access",
      "Unregistered investment platforms",
      "Celebrity endorsements or testimonials"
    ],
    redFlags: [
      "Promises of 100%+ returns in short timeframes",
      "Lack of clear business model or strategy",
      "Pressure to recruit friends and family",
      "No verifiable company information",
      "Withdrawal restrictions or delays"
    ],
    preventionTips: [
      "Research investment platforms thoroughly",
      "Verify company registrations and licenses",
      "Never share private keys or seed phrases",
      "Be wary of social media investment advice",
      "Start with small amounts if investing"
    ],
    caseStudies: [
      {
        title: "Crypto Trading Bot Scam - Multiple Victims",
        outcome: "Platform shut down, partial recovery achieved",
        lessons: "Importance of platform verification"
      }
    ],
    resources: [
      { title: "Crypto Scam Detection Guide", type: "Guide", url: "#" },
      { title: "Investment Verification Tools", type: "Tools", url: "#" }
    ]
  },
  {
    id: 3,
    title: "Tech Support Phone Scams",
    category: "Tech Support Scams",
    severity: "Medium",
    lastUpdated: "2024-01-10",
    views: 567,
    rating: 4.4,
    author: "Det. Mike Johnson",
    description: "Comprehensive guide on phone-based tech support scams targeting computer users.",
    content: "Scammers impersonate legitimate tech support to gain computer access and steal information.",
    commonSigns: [
      "Unsolicited calls claiming computer problems",
      "Requests for remote computer access",
      "Demands for immediate payment",
      "Claims of virus infections or security breaches",
      "Impersonation of major tech companies"
    ],
    redFlags: [
      "Urgent warnings about computer security",
      "Requests to download remote access software",
      "Demands for payment via gift cards",
      "Refusal to provide written information",
      "High-pressure sales tactics"
    ],
    preventionTips: [
      "Never give remote access to unsolicited callers",
      "Hang up and call official support numbers",
      "Keep software and antivirus updated",
      "Educate elderly family members",
      "Report suspicious calls to authorities"
    ],
    caseStudies: [
      {
        title: "Elderly Targeting Ring - 50+ Victims",
        outcome: "International arrest coordination successful",
        lessons: "Community education programs effective"
      }
    ],
    resources: [
      { title: "Tech Support Scam Response Protocol", type: "Protocol", url: "#" },
      { title: "Public Awareness Materials", type: "Materials", url: "#" }
    ]
  }
];

// Mock training materials
const trainingMaterials = [
  {
    id: 1,
    title: "Digital Evidence Collection Fundamentals",
    type: "Video Course",
    duration: "2 hours 30 minutes",
    level: "Beginner",
    rating: 4.9,
    enrolled: 45,
    author: "Det. Sarah Wilson",
    description: "Comprehensive course on proper digital evidence collection and preservation techniques.",
    modules: [
      "Introduction to Digital Evidence",
      "Evidence Preservation Best Practices",
      "Chain of Custody Requirements",
      "Common Collection Mistakes",
      "Legal Considerations"
    ],
    completionRate: 87,
    certified: true
  },
  {
    id: 2,
    title: "Social Engineering Investigation Techniques",
    type: "Interactive Workshop",
    duration: "4 hours",
    level: "Intermediate",
    rating: 4.7,
    enrolled: 32,
    author: "Det. John Doe",
    description: "Advanced techniques for investigating social engineering attacks and manipulation tactics.",
    modules: [
      "Psychology of Social Engineering",
      "Investigation Methodologies",
      "Interview Techniques",
      "Digital Footprint Analysis",
      "Case Documentation"
    ],
    completionRate: 91,
    certified: true
  },
  {
    id: 3,
    title: "Cryptocurrency Crime Investigation",
    type: "Self-Paced Course",
    duration: "6 hours",
    level: "Advanced",
    rating: 4.8,
    enrolled: 28,
    author: "Analyst David Chen",
    description: "Specialized training on investigating cryptocurrency-related crimes and blockchain analysis.",
    modules: [
      "Blockchain Fundamentals",
      "Transaction Tracing Techniques",
      "Exchange Investigations",
      "Privacy Coins and Mixers",
      "Legal Framework and Seizures"
    ],
    completionRate: 78,
    certified: true
  }
];

// Mock threat intelligence
const threatIntelligence = [
  {
    id: 1,
    title: "Emerging Romance Scam Tactics - Q1 2024",
    type: "Threat Report",
    severity: "High",
    publishDate: "2024-01-15",
    source: "PNG Cyber Intelligence Unit",
    summary: "New tactics observed in romance scams including AI-generated photos and voice deepfakes.",
    indicators: [
      "Use of AI-generated profile photos",
      "Voice deepfake technology in calls",
      "Coordinated multi-platform approaches",
      "Cryptocurrency payment requests"
    ],
    recommendations: [
      "Enhanced photo verification procedures",
      "Voice analysis capabilities needed",
      "Cross-platform monitoring increased",
      "Crypto transaction tracking improved"
    ],
    affectedRegions: ["Papua New Guinea", "Australia", "Philippines"],
    confidence: "High"
  },
  {
    id: 2,
    title: "Business Email Compromise Trends",
    type: "Intelligence Brief",
    severity: "Medium",
    publishDate: "2024-01-12",
    source: "Regional Cyber Threat Center",
    summary: "Increase in BEC attacks targeting government and NGO organizations in the Pacific region.",
    indicators: [
      "Spoofed executive email addresses",
      "Urgent wire transfer requests",
      "Compromised vendor communications",
      "Social engineering reconnaissance"
    ],
    recommendations: [
      "Email authentication protocols",
      "Staff awareness training",
      "Verification procedures for transfers",
      "Incident response planning"
    ],
    affectedRegions: ["Papua New Guinea", "Solomon Islands", "Fiji"],
    confidence: "Medium"
  }
];

// Mock prevention guides
const preventionGuides = [
  {
    id: 1,
    title: "Protecting Yourself from Online Romance Scams",
    category: "Public Education",
    audience: "General Public",
    language: "English/Tok Pisin",
    format: "Infographic",
    downloads: 2341,
    rating: 4.9,
    lastUpdated: "2024-01-10",
    keyPoints: [
      "Never send money to someone you haven't met in person",
      "Be suspicious of urgent requests for financial help",
      "Verify photos using reverse image search",
      "Trust your instincts if something feels wrong"
    ]
  },
  {
    id: 2,
    title: "Small Business Cybersecurity Checklist",
    category: "Business Security",
    audience: "Small Business Owners",
    language: "English",
    format: "Checklist",
    downloads: 1567,
    rating: 4.7,
    lastUpdated: "2024-01-08",
    keyPoints: [
      "Use strong, unique passwords for all accounts",
      "Enable two-factor authentication",
      "Keep software and systems updated",
      "Train employees on phishing recognition"
    ]
  }
];

export default function KnowledgeBasePage() {
  const [selectedTab, setSelectedTab] = useState("library");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [isArticleOpen, setIsArticleOpen] = useState(false);

  const filteredScams = scamLibrary.filter((scam) => {
    const matchesSearch = scam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scam.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scam.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || scam.category === filterCategory;
    const matchesSeverity = filterSeverity === "all" || scam.severity === filterSeverity;

    return matchesSearch && matchesCategory && matchesSeverity;
  });

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

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "Beginner":
        return <Badge variant="secondary" className="bg-green-100 text-green-700">Beginner</Badge>;
      case "Intermediate":
        return <Badge variant="secondary" className="bg-orange-100 text-orange-700">Intermediate</Badge>;
      case "Advanced":
        return <Badge variant="destructive">Advanced</Badge>;
      default:
        return <Badge variant="secondary">{level}</Badge>;
    }
  };

  const openArticle = (article: any) => {
    setSelectedArticle(article);
    setIsArticleOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Knowledge Base</h1>
            <p className="text-zinc-600 mt-2">Comprehensive resources for cybercrime investigation and prevention</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Resources
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Article
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Articles</p>
                  <p className="text-3xl font-bold text-blue-600">{scamLibrary.length}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Training Courses</p>
                  <p className="text-3xl font-bold text-green-600">{trainingMaterials.length}</p>
                </div>
                <Award className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Threat Reports</p>
                  <p className="text-3xl font-bold text-red-600">{threatIntelligence.length}</p>
                </div>
                <Shield className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Views</p>
                  <p className="text-3xl font-bold text-purple-600">15.2K</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="library">Scam Library</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="prevention">Prevention Guides</TabsTrigger>
            <TabsTrigger value="intelligence">Threat Intel</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Scam Library Tab */}
          <TabsContent value="library" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="search">Search Knowledge Base</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="search"
                        placeholder="Search articles, guides, and resources..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="category-filter">Category</Label>
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Romance Scams">Romance Scams</SelectItem>
                        <SelectItem value="Investment Scams">Investment Scams</SelectItem>
                        <SelectItem value="Tech Support Scams">Tech Support Scams</SelectItem>
                        <SelectItem value="Identity Theft">Identity Theft</SelectItem>
                        <SelectItem value="Business Email Compromise">BEC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="severity-filter">Severity</Label>
                    <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Severity</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredScams.map((scam) => (
                <Card key={scam.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => openArticle(scam)}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">{scam.title}</CardTitle>
                        <CardDescription className="mt-2 line-clamp-2">
                          {scam.description}
                        </CardDescription>
                      </div>
                      {getSeverityBadge(scam.severity)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <Badge variant="outline">{scam.category}</Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{scam.rating}</span>
                        </div>
                      </div>

                      <div className="text-sm text-gray-600">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{scam.views} views</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(scam.lastUpdated).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="mt-2 text-xs">
                          By {scam.author}
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="text-xs font-medium text-gray-700 mb-2">Common Signs:</div>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {scam.commonSigns.slice(0, 2).map((sign, index) => (
                            <li key={index} className="flex items-start gap-1">
                              <span className="text-red-500 mt-1">•</span>
                              <span className="line-clamp-2">{sign}</span>
                            </li>
                          ))}
                          {scam.commonSigns.length > 2 && (
                            <li className="text-blue-600 font-medium">+{scam.commonSigns.length - 2} more indicators</li>
                          )}
                        </ul>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          Read
                        </Button>
                        <Button variant="outline" size="sm">
                          <BookmarkPlus className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Training Tab */}
          <TabsContent value="training" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {trainingMaterials.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription className="mt-2">{course.description}</CardDescription>
                      </div>
                      {getLevelBadge(course.level)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <Badge variant="outline">{course.type}</Badge>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{course.duration}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{course.rating}</span>
                        </div>
                      </div>

                      <div className="text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Enrolled: {course.enrolled} officers</span>
                          <span>Completion: {course.completionRate}%</span>
                        </div>
                        <div className="mt-1">
                          Instructor: {course.author}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium mb-2">Course Modules:</div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {course.modules.slice(0, 3).map((module, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span>{module}</span>
                            </li>
                          ))}
                          {course.modules.length > 3 && (
                            <li className="text-blue-600 text-xs">+{course.modules.length - 3} more modules</li>
                          )}
                        </ul>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Play className="h-4 w-4 mr-2" />
                          Start Course
                        </Button>
                        <Button variant="outline" size="sm">
                          <Info className="h-4 w-4" />
                        </Button>
                        {course.certified && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                            <Award className="h-3 w-3 mr-1" />
                            Certified
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Prevention Guides Tab */}
          <TabsContent value="prevention" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {preventionGuides.map((guide) => (
                <Card key={guide.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                    <CardDescription>
                      Target Audience: {guide.audience}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <Badge variant="outline">{guide.category}</Badge>
                        <div className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          <span>{guide.downloads}</span>
                        </div>
                      </div>

                      <div className="text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Format: {guide.format}</span>
                          <span>Language: {guide.language}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{guide.rating} rating</span>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium mb-2">Key Points:</div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {guide.keyPoints.slice(0, 2).map((point, index) => (
                            <li key={index} className="flex items-start gap-1">
                              <span className="text-blue-500 mt-1">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                          {guide.keyPoints.length > 2 && (
                            <li className="text-blue-600 text-xs">+{guide.keyPoints.length - 2} more points</li>
                          )}
                        </ul>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Threat Intelligence Tab */}
          <TabsContent value="intelligence" className="space-y-6">
            <div className="space-y-6">
              {threatIntelligence.map((threat) => (
                <Card key={threat.id} className="border-l-4 border-l-red-500">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{threat.title}</CardTitle>
                        <CardDescription className="mt-2">{threat.summary}</CardDescription>
                      </div>
                      <div className="flex flex-col gap-2">
                        {getSeverityBadge(threat.severity)}
                        <Badge variant="outline">{threat.type}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Threat Indicators:</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {threat.indicators.map((indicator, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                              <span>{indicator}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Recommendations:</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {threat.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Shield className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Source:</span> {threat.source}
                        </div>
                        <div>
                          <span className="font-medium">Published:</span> {new Date(threat.publishDate).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Confidence:</span>
                          <Badge variant="secondary" className="ml-1">{threat.confidence}</Badge>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="font-medium text-sm">Affected Regions:</span>
                        <div className="flex gap-1 mt-1">
                          {threat.affectedRegions.map((region, index) => (
                            <Badge key={index} variant="outline" className="text-xs">{region}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Investigation Templates</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Standardized forms and checklists for cybercrime investigations
                    </p>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Templates
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Link className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">External Resources</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Links to international cybercrime databases and tools
                    </p>
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Resources
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Community Forum</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Connect with other investigators and share knowledge
                    </p>
                    <Button variant="outline" className="w-full">
                      <Users className="h-4 w-4 mr-2" />
                      Join Forum
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Article Detail Dialog */}
        <Dialog open={isArticleOpen} onOpenChange={setIsArticleOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedArticle?.title}</DialogTitle>
              <DialogDescription>
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant="outline">{selectedArticle?.category}</Badge>
                  {selectedArticle && getSeverityBadge(selectedArticle.severity)}
                  <span>By {selectedArticle?.author}</span>
                  <span>•</span>
                  <span>{selectedArticle && new Date(selectedArticle.lastUpdated).toLocaleDateString()}</span>
                </div>
              </DialogDescription>
            </DialogHeader>
            {selectedArticle && (
              <div className="space-y-6">
                <p className="text-gray-700">{selectedArticle.description}</p>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Common Signs</h3>
                  <ul className="space-y-2">
                    {selectedArticle.commonSigns?.map((sign: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-orange-500 mt-1 flex-shrink-0" />
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Red Flags</h3>
                  <ul className="space-y-2">
                    {selectedArticle.redFlags?.map((flag: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                        <span>{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Prevention Tips</h3>
                  <ul className="space-y-2">
                    {selectedArticle.preventionTips?.map((tip: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedArticle.caseStudies && selectedArticle.caseStudies.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Case Studies</h3>
                    {selectedArticle.caseStudies.map((study: any, index: number) => (
                      <Card key={index} className="mb-3">
                        <CardContent className="p-4">
                          <h4 className="font-medium">{study.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            <strong>Outcome:</strong> {study.outcome}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            <strong>Lessons Learned:</strong> {study.lessons}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {selectedArticle.resources && selectedArticle.resources.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Additional Resources</h3>
                    <div className="space-y-2">
                      {selectedArticle.resources.map((resource: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-500" />
                            <span>{resource.title}</span>
                            <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{selectedArticle.views} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{selectedArticle.rating} rating</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful
                    </Button>
                    <Button variant="outline" size="sm">
                      <BookmarkPlus className="h-4 w-4 mr-1" />
                      Bookmark
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share className="h-4 w-4 mr-1" />
                      Share
                    </Button>
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
