"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  Home,
  FileText,
  Search,
  Users,
  AlertTriangle,
  Archive,
  Eye,
  Gavel,
  BarChart3,
  Settings,
  UserCog,
  Database,
  Globe,
  BookOpen,
  Phone,
  FileImage,
  ClipboardList,
  Brain,
  Smartphone,
  MessageSquare,
  Monitor,
  DollarSign,
  Target,
  GitBranch,
  Network,
  Activity,
  Zap,
  TrendingUp,
  Building,
  Calendar
} from "lucide-react";

interface NavigationItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  color?: string;
  description?: string;
}

interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

const navigationItems: NavigationSection[] = [
  {
    title: "ALEMS Command Center",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: Home,
        badge: "Live",
        description: "Real-time operations dashboard"
      },
      {
        title: "AI Fraud Detection",
        href: "/fraud-detection",
        icon: Brain,
        badge: "AI",
        color: "bg-purple-500",
        description: "ML-powered behavioral analysis"
      },
      {
        title: "Mobile Operations",
        href: "/mobile",
        icon: Smartphone,
        badge: "Field",
        description: "Field officer interface"
      },
      {
        title: "Inter-Agency Hub",
        href: "/inter-agency",
        icon: Users,
        badge: "Secure",
        description: "Regional collaboration platform"
      },
      {
        title: "Evidence Chain",
        href: "/evidence",
        icon: Database,
        badge: "Chain",
        color: "bg-green-500",
        description: "Tamper-proof evidence management"
      }
    ]
  },
  {
    title: "Specialized Operations",
    items: [
      {
        title: "Cybercrime Hub",
        href: "/cybercrime",
        icon: Monitor,
        badge: "Cyber",
        color: "bg-red-500",
        description: "Digital forensics and cyber investigations"
      },
      {
        title: "Financial Crime",
        href: "/financial-crime",
        icon: DollarSign,
        badge: "FinCrime",
        description: "Money laundering and sanctions screening"
      },
      {
        title: "Counter-Terrorism",
        href: "/counter-terrorism",
        icon: Target,
        badge: "ClassOps",
        color: "bg-red-600",
        description: "Threat assessment and classified operations"
      },
      {
        title: "Evidence Requests",
        href: "/evidence-requests",
        icon: Gavel,
        badge: "Legal",
        description: "Lawful digital evidence requests"
      }
    ]
  },
  {
    title: "Core Investigations",
    items: [
      {
        title: "Investigations",
        href: "/investigations",
        icon: Search,
        badge: "7",
        description: "Active investigations and case management"
      },
      {
        title: "Case Intake",
        href: "/cases/intake",
        icon: ClipboardList,
        description: "New case registration and intake"
      },
      {
        title: "Suspects",
        href: "/suspects",
        icon: Users,
        badge: "12",
        description: "Suspect profiles and tracking"
      },
      {
        title: "Victims",
        href: "/victims",
        icon: Users,
        description: "Victim management and support"
      },
      {
        title: "Digital Forensics",
        href: "/forensics",
        icon: FileImage,
        description: "Advanced digital forensics tools"
      }
    ]
  },
  {
    title: "Intelligence & Monitoring",
    items: [
      {
        title: "Social Monitoring",
        href: "/social-monitoring",
        icon: Eye,
        badge: "Live",
        description: "Social media surveillance"
      },
      {
        title: "Platform Liaison",
        href: "/platform-liaison",
        icon: MessageSquare,
        badge: "12",
        description: "External platform communications"
      },
      {
        title: "Legal Requests",
        href: "/legal-requests",
        icon: Gavel,
        description: "Legal compliance and requests"
      },
      {
        title: "Offense Categories",
        href: "/offenses",
        icon: ClipboardList,
        description: "Crime categorization and analysis"
      }
    ]
  },
  {
    title: "System Management",
    items: [
      {
        title: "Workflow Management",
        href: "/workflow",
        icon: GitBranch,
        badge: "Auto",
        description: "Automated case processing workflows"
      },
      {
        title: "System Integration",
        href: "/integration",
        icon: Network,
        badge: "6",
        description: "Centralized integration hub"
      },
      {
        title: "Audit Logs",
        href: "/audit",
        icon: Activity,
        badge: "Live",
        color: "bg-red-500",
        description: "Comprehensive system auditing"
      },
      {
        title: "User Management",
        href: "/users",
        icon: UserCog,
        description: "User roles and permissions"
      },
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
        description: "System configuration"
      }
    ]
  },
  {
    title: "Analytics & Reports",
    items: [
      {
        title: "Advanced Analytics",
        href: "/analytics",
        icon: TrendingUp,
        badge: "Insights",
        color: "bg-purple-500",
        description: "Cross-module insights dashboard"
      },
      {
        title: "Reports",
        href: "/reports",
        icon: FileText,
        description: "Investigation and compliance reports"
      },
      {
        title: "Knowledge Base",
        href: "/knowledge-base",
        icon: BookOpen,
        description: "Training and documentation"
      },
      {
        title: "Mobile App",
        href: "/mobile-app",
        icon: Smartphone,
        badge: "Enhanced",
        description: "Enhanced mobile capabilities"
      },
      {
        title: "Public Portal",
        href: "/public",
        icon: Globe,
        description: "Citizen engagement platform"
      }
    ]
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-slate-900 border-r border-slate-700">
      {/* Logo/Header */}
      <div className="flex items-center gap-2 p-6 border-b border-slate-700">
        <div className="relative">
          <Shield className="h-8 w-8 text-blue-400" />
          <div className="absolute top-0 right-0 h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <div>
          <h1 className="font-bold text-lg text-white">ALEMS</h1>
          <p className="text-xs text-slate-300">Advanced Law Enforcement Management</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {navigationItems.map((section, index) => (
          <div key={index}>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-3 h-10 text-slate-300 hover:bg-slate-800 hover:text-white",
                        isActive && "bg-blue-600 text-white hover:bg-blue-700"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="flex-1 text-left text-sm">{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className={cn(
                            "ml-auto text-xs px-1 py-0",
                            item.color || "bg-slate-700 text-slate-200",
                            isActive && "bg-blue-500 text-white"
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                );
              })}
            </div>
            {index < navigationItems.length - 1 && <Separator className="mt-4 bg-slate-700" />}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-slate-800">
        <div className="text-xs text-slate-400 text-center">
          <p>Royal PNG Police</p>
          <p>ALEMS v2.1 • Cybercrime Division</p>
          <div className="flex items-center justify-center gap-1 mt-1">
            <div className="h-1 w-1 bg-green-400 rounded-full"></div>
            <span className="text-green-400">Systems Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
}
