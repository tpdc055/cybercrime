"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import {
  Shield,
  Brain,
  Smartphone,
  Users,
  Database,
  MessageSquare,
  FileCheck,
  MapPin,
  AlertTriangle,
  BarChart3,
  Settings,
  Bell,
  Menu,
  LogOut,
  User,
  Eye,
  Lock,
  Zap,
  Globe,
  Camera,
  Radio,
  TrendingUp,
  BookOpen,
  Monitor,
  DollarSign,
  Target
} from "lucide-react";

const navigationItems = [
  {
    title: "Command Center",
    href: "/",
    icon: BarChart3,
    description: "Real-time operations dashboard",
    badge: "Live"
  },
  {
    title: "AI Fraud Detection",
    href: "/fraud-detection",
    icon: Brain,
    description: "ML-powered behavioral analysis",
    badge: "AI",
    color: "bg-purple-500"
  },
  {
    title: "Mobile Operations",
    href: "/mobile",
    icon: Smartphone,
    description: "Field officer interface",
    badge: "Field"
  },
  {
    title: "Inter-Agency Hub",
    href: "/inter-agency",
    icon: Users,
    description: "Regional collaboration platform",
    badge: "Secure"
  },
  {
    title: "Blockchain Evidence",
    href: "/evidence",
    icon: Database,
    description: "Tamper-proof chain of custody",
    badge: "Chain",
    color: "bg-green-500"
  },
  {
    title: "Public Portal",
    href: "/public",
    icon: Globe,
    description: "Citizen engagement platform"
  },
  {
    title: "Advanced Analytics",
    href: "/analytics",
    icon: TrendingUp,
    description: "Cross-module insights dashboard",
    badge: "Insights",
    color: "bg-purple-500"
  },
  {
    title: "Mobile App Platform",
    href: "/mobile-app",
    icon: Zap,
    description: "Enhanced mobile capabilities",
    badge: "Enhanced"
  },
  {
    title: "Documentation Center",
    href: "/documentation",
    icon: BookOpen,
    description: "Training and user guides",
    badge: "Training"
  },
  {
    title: "Cybercrime Hub",
    href: "/cybercrime",
    icon: Monitor,
    description: "Digital forensics and cyber investigations",
    badge: "Cyber",
    color: "bg-red-500"
  },
  {
    title: "Financial Crime Task Force",
    href: "/financial-crime",
    icon: DollarSign,
    description: "Money laundering and sanctions screening",
    badge: "FinCrime"
  },
  {
    title: "Counter-Terrorism Ops",
    href: "/counter-terrorism",
    icon: Target,
    description: "Threat assessment and classified operations",
    badge: "ClassOps",
    color: "bg-red-600"
  },
  {
    title: "Digital Forensics",
    href: "/forensics",
    icon: Eye,
    description: "Advanced evidence analysis"
  }
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-16 items-center px-4 border-b bg-slate-900 text-white">
      {/* Logo and Brand */}
      <div className="flex items-center gap-3 mr-6">
        <div className="relative">
          <Shield className="h-8 w-8 text-blue-400" />
          <div className="absolute top-0 right-0 h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-white">ALEMS</span>
          <span className="text-xs text-slate-400">Advanced Law Enforcement Management</span>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-1 flex-1">
        {navigationItems.slice(0, 5).map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? "default" : "ghost"}
              size="sm"
              className={cn(
                "flex items-center gap-2 h-9 text-white hover:bg-slate-800",
                pathname === item.href && "bg-blue-600 hover:bg-blue-700"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="hidden lg:inline">{item.title}</span>
              {item.badge && (
                <Badge
                  variant="secondary"
                  className={cn(
                    "text-xs px-1 py-0",
                    item.color || "bg-slate-700 text-slate-200"
                  )}
                >
                  {item.badge}
                </Badge>
              )}
            </Button>
          </Link>
        ))}

        {/* Advanced Tools dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 text-white hover:bg-slate-800">
              <Zap className="h-4 w-4" />
              <span className="hidden lg:inline">Advanced</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64 bg-slate-800 border-slate-700">
            <DropdownMenuLabel className="text-slate-200">Advanced Tools</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-700" />
            {navigationItems.slice(5).map((item) => (
              <DropdownMenuItem key={item.href} asChild className="text-slate-200 hover:bg-slate-700">
                <Link href={item.href} className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-xs text-slate-400">{item.description}</span>
                  </div>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className={cn(
                        "ml-auto text-xs",
                        item.color || "bg-slate-600 text-slate-200"
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      {/* System Status */}
      <div className="hidden lg:flex items-center gap-2 mr-4">
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-slate-400">Systems Operational</span>
        </div>
      </div>

      {/* Right side - Notifications and User */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Critical Alerts */}
        <Button variant="ghost" size="sm" className="relative text-white hover:bg-slate-800">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500">
            2
          </Badge>
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative text-white hover:bg-slate-800">
          <Bell className="h-4 w-4" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-blue-500">
            7
          </Badge>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 h-9 text-white hover:bg-slate-800">
              <Avatar className="h-7 w-7">
                <AvatarImage src="/api/placeholder/32/32" alt="Officer" />
                <AvatarFallback className="bg-blue-600 text-white">JD</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium">Det. J. Doe</span>
                <span className="text-xs text-slate-400">Clearance Level 4</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 bg-slate-800 border-slate-700">
            <DropdownMenuLabel className="text-slate-200">
              <div className="flex flex-col gap-1">
                <span>Detective John Doe</span>
                <span className="text-xs text-slate-400">Badge #1234 • Clearance Level 4</span>
                <span className="text-xs text-green-400">✓ Active Duty</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem className="flex items-center gap-2 text-slate-200 hover:bg-slate-700">
              <User className="h-4 w-4" />
              Profile & Credentials
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 text-slate-200 hover:bg-slate-700">
              <Lock className="h-4 w-4" />
              Security Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 text-slate-200 hover:bg-slate-700">
              <Settings className="h-4 w-4" />
              System Preferences
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem className="flex items-center gap-2 text-red-400 hover:bg-slate-700">
              <LogOut className="h-4 w-4" />
              Secure Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="md:hidden text-white hover:bg-slate-800">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-slate-900 border-slate-700">
            <div className="flex flex-col gap-4 mt-8">
              <div className="text-lg font-semibold text-white">Command Navigation</div>
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg transition-colors",
                    pathname === item.href
                      ? "bg-blue-600 text-white"
                      : "hover:bg-slate-800 text-slate-200"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <div className="flex flex-col gap-1 flex-1">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-sm text-slate-400">{item.description}</span>
                  </div>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className={cn(
                        "ml-auto",
                        item.color || "bg-slate-700 text-slate-200"
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
