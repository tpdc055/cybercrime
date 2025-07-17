"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Video,
  FileText,
  Users,
  Search,
  Download,
  Play,
  CheckCircle,
  Clock,
  Star,
  Brain,
  Smartphone,
  Database,
  Globe,
  Shield,
  AlertTriangle,
  Info,
  Bookmark,
  ExternalLink,
  Award,
  Target,
  Zap,
  Lock,
  Settings,
  HelpCircle,
  ChevronRight,
  ArrowRight,
  Eye
} from "lucide-react";

interface DocumentationSection {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  modules: DocumentationModule[];
}

interface DocumentationModule {
  id: string;
  title: string;
  type: 'guide' | 'video' | 'interactive' | 'best-practice';
  duration: string;
  completed?: boolean;
  description: string;
}

interface TrainingPath {
  id: string;
  title: string;
  description: string;
  role: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  estimatedHours: number;
}

export default function Documentation() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  const documentationSections: DocumentationSection[] = [
    {
      id: "fraud-detection",
      title: "AI Fraud Detection System",
      description: "Learn to use machine learning tools for behavioral analysis and fraud prevention",
      icon: Brain,
      difficulty: "advanced",
      estimatedTime: "2-3 hours",
      modules: [
        {
          id: "fd-01",
          title: "Understanding ML Fraud Detection",
          type: "guide",
          duration: "15 min",
          description: "Introduction to behavioral analysis and pattern recognition"
        },
        {
          id: "fd-02",
          title: "Setting Detection Thresholds",
          type: "interactive",
          duration: "20 min",
          description: "Hands-on training for configuring confidence levels and risk scores"
        },
        {
          id: "fd-03",
          title: "Investigating ML Alerts",
          type: "video",
          duration: "25 min",
          description: "Step-by-step process for handling fraud alerts and false positives"
        },
        {
          id: "fd-04",
          title: "Best Practices for Model Management",
          type: "best-practice",
          duration: "30 min",
          description: "Advanced techniques for model training and performance optimization"
        }
      ]
    },
    {
      id: "mobile-operations",
      title: "Mobile Field Operations",
      description: "Master mobile interfaces for field reporting, GPS tracking, and evidence collection",
      icon: Smartphone,
      difficulty: "beginner",
      estimatedTime: "1-2 hours",
      modules: [
        {
          id: "mo-01",
          title: "Field Reporting Basics",
          type: "guide",
          duration: "12 min",
          description: "Creating incident reports and updating case information in the field"
        },
        {
          id: "mo-02",
          title: "GPS and Location Services",
          type: "interactive",
          duration: "18 min",
          description: "Using GPS tracking, location sharing, and navigation features"
        },
        {
          id: "mo-03",
          title: "Evidence Capture and Upload",
          type: "video",
          duration: "22 min",
          description: "Recording photos, videos, and audio evidence with proper metadata"
        },
        {
          id: "mo-04",
          title: "Offline Operations and Sync",
          type: "guide",
          duration: "15 min",
          description: "Working without internet connection and data synchronization"
        }
      ]
    },
    {
      id: "blockchain-evidence",
      title: "Blockchain Evidence Management",
      description: "Secure evidence handling with cryptographic verification and chain of custody",
      icon: Database,
      difficulty: "intermediate",
      estimatedTime: "1.5-2 hours",
      modules: [
        {
          id: "be-01",
          title: "Blockchain Fundamentals for Law Enforcement",
          type: "guide",
          duration: "20 min",
          description: "Understanding immutable records and cryptographic signatures"
        },
        {
          id: "be-02",
          title: "Adding Evidence to the Chain",
          type: "interactive",
          duration: "25 min",
          description: "Step-by-step evidence submission and verification process"
        },
        {
          id: "be-03",
          title: "Verifying Evidence Integrity",
          type: "video",
          duration: "18 min",
          description: "Hash verification, digital signatures, and tamper detection"
        },
        {
          id: "be-04",
          title: "Legal Admissibility Standards",
          type: "best-practice",
          duration: "30 min",
          description: "Court requirements and best practices for blockchain evidence"
        }
      ]
    },
    {
      id: "inter-agency",
      title: "Inter-Agency Communication",
      description: "Secure collaboration tools for regional law enforcement coordination",
      icon: Users,
      difficulty: "intermediate",
      estimatedTime: "1-1.5 hours",
      modules: [
        {
          id: "ia-01",
          title: "Secure Messaging and Encryption",
          type: "guide",
          duration: "15 min",
          description: "End-to-end encrypted communications and classification levels"
        },
        {
          id: "ia-02",
          title: "Case Sharing Protocols",
          type: "interactive",
          duration: "20 min",
          description: "Sharing investigations across jurisdictions with proper authorization"
        },
        {
          id: "ia-03",
          title: "Jurisdiction Coordination",
          type: "video",
          duration: "25 min",
          description: "Request assistance, resources, and cross-border operations"
        },
        {
          id: "ia-04",
          title: "Emergency Response Coordination",
          type: "best-practice",
          duration: "20 min",
          description: "Multi-agency incident response and resource allocation"
        }
      ]
    },
    {
      id: "public-portal",
      title: "Public Engagement Portal",
      description: "Community interaction, crime reporting, and public safety communications",
      icon: Globe,
      difficulty: "beginner",
      estimatedTime: "45 min - 1 hour",
      modules: [
        {
          id: "pp-01",
          title: "Processing Citizen Reports",
          type: "guide",
          duration: "15 min",
          description: "Handling anonymous tips and public crime reports"
        },
        {
          id: "pp-02",
          title: "Community Engagement Best Practices",
          type: "video",
          duration: "20 min",
          description: "Building trust and transparency with the public"
        },
        {
          id: "pp-03",
          title: "Public Safety Communications",
          type: "interactive",
          duration: "18 min",
          description: "Creating and managing public alerts and notifications"
        }
      ]
    }
  ];

  const trainingPaths: TrainingPath[] = [
    {
      id: "patrol-officer",
      title: "Patrol Officer Certification",
      description: "Essential training for field officers using mobile operations and public interaction tools",
      role: "Patrol Officer",
      progress: 75,
      totalModules: 8,
      completedModules: 6,
      estimatedHours: 4
    },
    {
      id: "detective",
      title: "Detective Specialist Training",
      description: "Advanced fraud detection, evidence management, and inter-agency coordination",
      role: "Detective",
      progress: 45,
      totalModules: 12,
      completedModules: 5,
      estimatedHours: 8
    },
    {
      id: "supervisor",
      title: "Supervisory Leadership Program",
      description: "Management tools, analytics interpretation, and strategic decision making",
      role: "Supervisor",
      progress: 20,
      totalModules: 15,
      completedModules: 3,
      estimatedHours: 12
    },
    {
      id: "administrator",
      title: "System Administrator Certification",
      description: "Technical configuration, security management, and system maintenance",
      role: "Administrator",
      progress: 60,
      totalModules: 20,
      completedModules: 12,
      estimatedHours: 16
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'guide': return <FileText className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'interactive': return <Target className="h-4 w-4" />;
      case 'best-practice': return <Award className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const filteredSections = documentationSections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900 flex items-center justify-center gap-3">
            <BookOpen className="h-10 w-10 text-blue-600" />
            Training & Documentation Center
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Comprehensive training materials, user guides, and best practices for the Advanced Law Enforcement Management System
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Training Modules</CardTitle>
              <BookOpen className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {documentationSections.reduce((acc, section) => acc + section.modules.length, 0)}
              </div>
              <p className="text-xs text-slate-600">Interactive lessons available</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Video Tutorials</CardTitle>
              <Video className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {documentationSections.reduce((acc, section) =>
                  acc + section.modules.filter(m => m.type === 'video').length, 0
                )}
              </div>
              <p className="text-xs text-slate-600">Hours of video content</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certification Paths</CardTitle>
              <Award className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{trainingPaths.length}</div>
              <p className="text-xs text-slate-600">Role-based certifications</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quick Reference</CardTitle>
              <HelpCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24/7</div>
              <p className="text-xs text-slate-600">Support availability</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="modules" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="modules">Training Modules</TabsTrigger>
            <TabsTrigger value="paths">Certification Paths</TabsTrigger>
            <TabsTrigger value="guides">Quick Reference</TabsTrigger>
            <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
            <TabsTrigger value="support">Support & FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="modules" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Interactive Training Modules</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search training modules..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {filteredSections.map((section) => (
                <Card key={section.id} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <section.icon className="h-6 w-6 text-blue-600" />
                        <div>
                          <CardTitle className="text-xl">{section.title}</CardTitle>
                          <CardDescription>{section.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getDifficultyColor(section.difficulty)}>
                          {section.difficulty.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">
                          <Clock className="h-3 w-3 mr-1" />
                          {section.estimatedTime}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.modules.map((module) => (
                        <div key={module.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getTypeIcon(module.type)}
                              <h4 className="font-medium">{module.title}</h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {module.duration}
                              </Badge>
                              {module.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                            </div>
                          </div>
                          <p className="text-sm text-slate-600 mb-3">{module.description}</p>
                          <div className="flex gap-2">
                            <Button size="sm">
                              <Play className="h-3 w-3 mr-1" />
                              Start
                            </Button>
                            <Button size="sm" variant="outline">
                              <Bookmark className="h-3 w-3 mr-1" />
                              Save
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="paths" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Certification Training Paths</h3>
              <Button>
                <Award className="h-4 w-4 mr-2" />
                View Certificates
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trainingPaths.map((path) => (
                <Card key={path.id} className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{path.title}</CardTitle>
                        <CardDescription>{path.role}</CardDescription>
                      </div>
                      <Badge className="bg-green-500">
                        {Math.round(path.progress)}% Complete
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-slate-700">{path.description}</p>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{path.completedModules}/{path.totalModules} modules</span>
                        </div>
                        <Progress value={path.progress} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-slate-600">Estimated Time</div>
                          <div className="font-medium">{path.estimatedHours} hours</div>
                        </div>
                        <div>
                          <div className="text-slate-600">Difficulty</div>
                          <div className="font-medium">Intermediate</div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button className="flex-1">
                          <ArrowRight className="h-4 w-4 mr-2" />
                          Continue Training
                        </Button>
                        <Button variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guides" className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Reference Guides</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    Emergency Procedures
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-3 w-3" />
                      Critical alert response protocols
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-3 w-3" />
                      Emergency inter-agency coordination
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-3 w-3" />
                      System failure backup procedures
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-3 w-3" />
                      Evidence preservation in emergencies
                    </li>
                  </ul>
                  <Button size="sm" className="w-full mt-3">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View Guide
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-500" />
                    Security Protocols
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-3 w-3" />
                      Two-factor authentication setup
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-3 w-3" />
                      Data classification guidelines
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-3 w-3" />
                      Secure communication channels
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-3 w-3" />
                      Incident reporting procedures
                    </li>
                  </ul>
                  <Button size="sm" className="w-full mt-3">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View Guide
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-gray-500" />
                    System Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-3 w-3" />
                      User role management
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-3 w-3" />
                      Notification preferences
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-3 w-3" />
                      Dashboard customization
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-3 w-3" />
                      Integration settings
                    </li>
                  </ul>
                  <Button size="sm" className="w-full mt-3">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View Guide
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="best-practices" className="space-y-4">
            <h3 className="text-lg font-semibold">Best Practices & Standard Operating Procedures</h3>

            <div className="space-y-4">
              <Alert className="border-l-4 border-l-blue-500 bg-blue-50">
                <Info className="h-4 w-4" />
                <AlertTitle>Data Integrity and Chain of Custody</AlertTitle>
                <AlertDescription>
                  Always verify evidence integrity before submission to blockchain. Maintain detailed logs of all evidence handling activities and ensure proper authorization for access requests.
                </AlertDescription>
              </Alert>

              <Alert className="border-l-4 border-l-green-500 bg-green-50">
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Inter-Agency Communication Guidelines</AlertTitle>
                <AlertDescription>
                  Use appropriate classification levels for all communications. Verify recipient authorization before sharing sensitive case information. Follow proper escalation procedures for urgent requests.
                </AlertDescription>
              </Alert>

              <Alert className="border-l-4 border-l-yellow-500 bg-yellow-50">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Machine Learning Alert Management</AlertTitle>
                <AlertDescription>
                  Regularly review and adjust ML confidence thresholds based on false positive rates. Document all manual overrides and feed outcomes back into the system for improved accuracy.
                </AlertDescription>
              </Alert>

              <Card>
                <CardHeader>
                  <CardTitle>Standard Operating Procedures</CardTitle>
                  <CardDescription>Detailed procedures for common operational tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">Investigation Procedures</h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li>• Initial case assessment and classification</li>
                        <li>• Evidence collection and documentation</li>
                        <li>• Witness interview protocols</li>
                        <li>• Case closure and reporting requirements</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium">Technology Usage</h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li>• Mobile device security requirements</li>
                        <li>• Data backup and recovery procedures</li>
                        <li>• System maintenance schedules</li>
                        <li>• Software update protocols</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="support" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-b pb-3">
                      <h4 className="font-medium mb-2">How do I reset my password?</h4>
                      <p className="text-sm text-slate-600">Contact your system administrator or use the secure password reset link sent to your registered email address.</p>
                    </div>
                    <div className="border-b pb-3">
                      <h4 className="font-medium mb-2">Can I access the system from personal devices?</h4>
                      <p className="text-sm text-slate-600">Only department-approved devices with proper security configurations are permitted. Contact IT for device authorization.</p>
                    </div>
                    <div className="border-b pb-3">
                      <h4 className="font-medium mb-2">What happens if I lose network connectivity in the field?</h4>
                      <p className="text-sm text-slate-600">The mobile app supports offline operation. Data will automatically sync when connection is restored.</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">How often are ML models updated?</h4>
                      <p className="text-sm text-slate-600">Fraud detection models are retrained weekly with new data. Critical updates may be deployed more frequently.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Support Contacts</CardTitle>
                  <CardDescription>Get help when you need it</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-red-600 mb-1">Emergency Technical Support</h4>
                      <p className="text-sm text-slate-600">24/7 availability for critical system issues</p>
                      <p className="text-sm font-mono">Call: 1-800-TECH-911</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-blue-600 mb-1">General IT Help Desk</h4>
                      <p className="text-sm text-slate-600">Monday-Friday, 8 AM - 6 PM</p>
                      <p className="text-sm font-mono">Email: help@lawenforcement.gov</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-green-600 mb-1">Training Support</h4>
                      <p className="text-sm text-slate-600">Certification and learning assistance</p>
                      <p className="text-sm font-mono">training@lawenforcement.gov</p>
                    </div>
                    <Button className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Submit Support Ticket
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
