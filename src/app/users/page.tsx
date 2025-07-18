"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  UserCog,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  User,
  Eye,
  UserCheck,
  AlertTriangle,
  Clock,
  Activity,
  Users,
  Settings,
  Lock,
  Unlock,
  Key,
  Mail,
  Phone,
  Calendar,
  Building,
  CheckCircle,
  XCircle,
  UserX,
  Award,
  TrendingUp,
  Info
} from "lucide-react";

// Enhanced mock user data
const users = [
  {
    id: 1,
    name: "Det. John Doe",
    email: "john.doe@pngpolice.gov.pg",
    role: "Senior Investigator",
    department: "Cyber Crime Unit",
    status: "Active",
    lastLogin: "2024-01-15T14:30:00Z",
    createdAt: "2023-06-15T09:00:00Z",
    permissions: ["READ_CASES", "WRITE_CASES", "MANAGE_EVIDENCE", "VIEW_REPORTS"],
    badgeNumber: "CYB001",
    phone: "+675 325 1234",
    supervisor: "Chief Inspector Wilson",
    clearanceLevel: "Level 3",
    profileImage: "/avatars/john-doe.jpg",
    stats: {
      casesWorked: 45,
      evidenceUploaded: 128,
      reportsGenerated: 23,
      loginCount: 342
    },
    securitySettings: {
      twoFactorEnabled: true,
      lastPasswordChange: "2024-01-01T10:00:00Z",
      failedLoginAttempts: 0,
      sessionTimeout: 30
    }
  },
  {
    id: 2,
    name: "Det. Sarah Wilson",
    email: "sarah.wilson@pngpolice.gov.pg",
    role: "Digital Forensics Expert",
    department: "Digital Forensics Unit",
    status: "Active",
    lastLogin: "2024-01-15T16:45:00Z",
    createdAt: "2023-03-22T08:30:00Z",
    permissions: ["READ_CASES", "WRITE_CASES", "MANAGE_EVIDENCE", "FORENSICS_TOOLS", "VIEW_REPORTS"],
    badgeNumber: "DFU002",
    phone: "+675 325 5678",
    supervisor: "Superintendent Johnson",
    clearanceLevel: "Level 4",
    profileImage: "/avatars/sarah-wilson.jpg",
    stats: {
      casesWorked: 67,
      evidenceUploaded: 245,
      reportsGenerated: 41,
      loginCount: 489
    },
    securitySettings: {
      twoFactorEnabled: true,
      lastPasswordChange: "2024-01-10T14:22:00Z",
      failedLoginAttempts: 0,
      sessionTimeout: 60
    }
  },
  {
    id: 3,
    name: "Sgt. Mike Johnson",
    email: "mike.johnson@pngpolice.gov.pg",
    role: "Case Coordinator",
    department: "Cyber Crime Unit",
    status: "Active",
    lastLogin: "2024-01-15T11:20:00Z",
    createdAt: "2023-08-10T10:15:00Z",
    permissions: ["READ_CASES", "WRITE_CASES", "VIEW_REPORTS"],
    badgeNumber: "CYB003",
    phone: "+675 325 9012",
    supervisor: "Chief Inspector Wilson",
    clearanceLevel: "Level 2",
    profileImage: "/avatars/mike-johnson.jpg",
    stats: {
      casesWorked: 32,
      evidenceUploaded: 89,
      reportsGenerated: 15,
      loginCount: 234
    },
    securitySettings: {
      twoFactorEnabled: false,
      lastPasswordChange: "2023-12-15T09:30:00Z",
      failedLoginAttempts: 1,
      sessionTimeout: 30
    }
  },
  {
    id: 4,
    name: "Chief Inspector Maria Santos",
    email: "maria.santos@pngpolice.gov.pg",
    role: "Unit Commander",
    department: "Cyber Crime Unit",
    status: "Active",
    lastLogin: "2024-01-15T08:15:00Z",
    createdAt: "2022-01-20T07:00:00Z",
    permissions: ["ADMIN", "READ_CASES", "WRITE_CASES", "MANAGE_EVIDENCE", "MANAGE_USERS", "VIEW_REPORTS", "SYSTEM_CONFIG"],
    badgeNumber: "CMD001",
    phone: "+675 325 0001",
    supervisor: "Commissioner Thompson",
    clearanceLevel: "Level 5",
    profileImage: "/avatars/maria-santos.jpg",
    stats: {
      casesWorked: 12,
      evidenceUploaded: 25,
      reportsGenerated: 58,
      loginCount: 567
    },
    securitySettings: {
      twoFactorEnabled: true,
      lastPasswordChange: "2024-01-08T16:00:00Z",
      failedLoginAttempts: 0,
      sessionTimeout: 120
    }
  },
  {
    id: 5,
    name: "Analyst David Chen",
    email: "david.chen@pngpolice.gov.pg",
    role: "Intelligence Analyst",
    department: "Intelligence & Analytics",
    status: "Suspended",
    lastLogin: "2024-01-10T13:40:00Z",
    createdAt: "2023-11-05T09:45:00Z",
    permissions: ["READ_CASES", "VIEW_REPORTS"],
    badgeNumber: "INT004",
    phone: "+675 325 3456",
    supervisor: "Inspector Lee",
    clearanceLevel: "Level 2",
    profileImage: "/avatars/david-chen.jpg",
    stats: {
      casesWorked: 18,
      evidenceUploaded: 42,
      reportsGenerated: 31,
      loginCount: 156
    },
    securitySettings: {
      twoFactorEnabled: false,
      lastPasswordChange: "2023-10-20T11:15:00Z",
      failedLoginAttempts: 3,
      sessionTimeout: 15
    }
  }
];

// Mock departments and roles
const departments = [
  "Cyber Crime Unit",
  "Digital Forensics Unit",
  "Intelligence & Analytics",
  "Financial Crime Task Force",
  "Counter-Terrorism Unit",
  "IT Support",
  "Administration"
];

const roles = [
  "Senior Investigator",
  "Digital Forensics Expert",
  "Case Coordinator",
  "Unit Commander",
  "Intelligence Analyst",
  "Systems Administrator",
  "Evidence Custodian"
];

const clearanceLevels = [
  "Level 1 - Basic",
  "Level 2 - Standard",
  "Level 3 - Elevated",
  "Level 4 - Confidential",
  "Level 5 - Top Secret"
];

const permissions = [
  { id: "READ_CASES", name: "Read Cases", description: "View case information" },
  { id: "WRITE_CASES", name: "Write Cases", description: "Create and edit cases" },
  { id: "MANAGE_EVIDENCE", name: "Manage Evidence", description: "Upload and manage evidence" },
  { id: "FORENSICS_TOOLS", name: "Forensics Tools", description: "Access forensic analysis tools" },
  { id: "VIEW_REPORTS", name: "View Reports", description: "Access system reports" },
  { id: "MANAGE_USERS", name: "Manage Users", description: "Create and manage user accounts" },
  { id: "SYSTEM_CONFIG", name: "System Configuration", description: "Configure system settings" },
  { id: "ADMIN", name: "Administrator", description: "Full system access" }
];

// Mock activity logs
const activityLogs = [
  {
    id: 1,
    userId: 1,
    userName: "Det. John Doe",
    action: "Login",
    details: "Successful login from IP 192.168.1.100",
    timestamp: "2024-01-15T14:30:00Z",
    severity: "Info"
  },
  {
    id: 2,
    userId: 2,
    userName: "Det. Sarah Wilson",
    action: "Evidence Upload",
    details: "Uploaded evidence file: bank_statements.pdf",
    timestamp: "2024-01-15T15:20:00Z",
    severity: "Info"
  },
  {
    id: 3,
    userId: 5,
    userName: "Analyst David Chen",
    action: "Failed Login",
    details: "Failed login attempt - incorrect password",
    timestamp: "2024-01-15T12:45:00Z",
    severity: "Warning"
  },
  {
    id: 4,
    userId: 4,
    userName: "Chief Inspector Maria Santos",
    action: "User Management",
    details: "Updated permissions for user mike.johnson@pngpolice.gov.pg",
    timestamp: "2024-01-15T09:15:00Z",
    severity: "Info"
  }
];

export default function UserManagementPage() {
  const [selectedTab, setSelectedTab] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRole, setFilterRole] = useState("all");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    badgeNumber: "",
    phone: "",
    supervisor: "",
    clearanceLevel: "Level 1 - Basic",
    permissions: [] as string[]
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.badgeNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === "all" || user.department === filterDepartment;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    const matchesRole = filterRole === "all" || user.role === filterRole;

    return matchesSearch && matchesDepartment && matchesStatus && matchesRole;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge variant="default" className="bg-green-600">Active</Badge>;
      case "Inactive":
        return <Badge variant="secondary" className="bg-gray-100 text-gray-700">Inactive</Badge>;
      case "Suspended":
        return <Badge variant="destructive">Suspended</Badge>;
      case "Pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getClearanceBadge = (level: string) => {
    const levelNumber = parseInt(level.split(" ")[1]);
    switch (levelNumber) {
      case 1:
      case 2:
        return <Badge variant="outline" className="border-blue-500 text-blue-700">{level}</Badge>;
      case 3:
        return <Badge variant="outline" className="border-orange-500 text-orange-700">{level}</Badge>;
      case 4:
      case 5:
        return <Badge variant="outline" className="border-red-500 text-red-700">{level}</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  const getSecurityScore = (user: any) => {
    let score = 0;
    if (user.securitySettings.twoFactorEnabled) score += 40;
    if (user.securitySettings.failedLoginAttempts === 0) score += 30;
    const daysSincePasswordChange = Math.floor(
      (Date.now() - new Date(user.securitySettings.lastPasswordChange).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSincePasswordChange < 90) score += 30;
    return score;
  };

  const addUser = () => {
    console.log("Adding new user:", newUser);
    setIsAddUserOpen(false);
    setNewUser({
      name: "",
      email: "",
      role: "",
      department: "",
      badgeNumber: "",
      phone: "",
      supervisor: "",
      clearanceLevel: "Level 1 - Basic",
      permissions: []
    });
  };

  const editUser = () => {
    console.log("Editing user:", selectedUser);
    setIsEditUserOpen(false);
    setSelectedUser(null);
  };

  const togglePermission = (permissionId: string) => {
    if (newUser.permissions.includes(permissionId)) {
      setNewUser({
        ...newUser,
        permissions: newUser.permissions.filter(p => p !== permissionId)
      });
    } else {
      setNewUser({
        ...newUser,
        permissions: [...newUser.permissions, permissionId]
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">User Management</h1>
            <p className="text-zinc-600 mt-2">Manage user accounts, permissions, and security settings</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setIsAddUserOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-blue-600">{users.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-3xl font-bold text-green-600">
                    {users.filter(u => u.status === "Active").length}
                  </p>
                </div>
                <UserCheck className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Suspended</p>
                  <p className="text-3xl font-bold text-red-600">
                    {users.filter(u => u.status === "Suspended").length}
                  </p>
                </div>
                <UserX className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Departments</p>
                  <p className="text-3xl font-bold text-purple-600">{departments.length}</p>
                </div>
                <Building className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">User Directory</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="activity">Activity Logs</TabsTrigger>
          </TabsList>

          {/* User Directory Tab */}
          <TabsContent value="users" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="search">Search Users</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="search"
                        placeholder="Search by name, email, or badge number..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="department-filter">Department</Label>
                    <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Departments" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status-filter">Status</Label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Suspended">Suspended</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="role-filter">Role</Label>
                    <Select value={filterRole} onValueChange={setFilterRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Roles" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        {roles.map((role) => (
                          <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Users Table */}
            <Card>
              <CardHeader>
                <CardTitle>Users ({filteredUsers.length})</CardTitle>
                <CardDescription>
                  Manage system users and their access permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role & Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Clearance</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Security Score</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {user.name.split(" ").map(n => n[0]).join("")}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-gray-600">{user.email}</div>
                              <div className="text-xs text-gray-500">Badge: {user.badgeNumber}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{user.role}</div>
                            <div className="text-sm text-gray-600">{user.department}</div>
                            <div className="text-xs text-gray-500">Reports to: {user.supervisor}</div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>{getClearanceBadge(user.clearanceLevel)}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {new Date(user.lastLogin).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(user.lastLogin).toLocaleTimeString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={getSecurityScore(user)} className="w-16" />
                            <span className="text-sm">{getSecurityScore(user)}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => {
                                setSelectedUser(user);
                                setIsEditUserOpen(true);
                              }}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Key className="h-4 w-4 mr-2" />
                                Reset Password
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                {user.status === "Active" ? <Lock className="h-4 w-4 mr-2" /> : <Unlock className="h-4 w-4 mr-2" />}
                                {user.status === "Active" ? "Suspend User" : "Activate User"}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Permissions Tab */}
          <TabsContent value="permissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Permissions</CardTitle>
                <CardDescription>
                  Manage role-based access control and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {permissions.map((permission) => (
                    <Card key={permission.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{permission.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{permission.description}</p>
                            <div className="text-xs text-gray-500 mt-2">
                              Users with permission: {users.filter(u => u.permissions.includes(permission.id)).length}
                            </div>
                          </div>
                          <Shield className="h-5 w-5 text-blue-600" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Overview</CardTitle>
                  <CardDescription>System security metrics and alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Users with 2FA Enabled</span>
                      <div className="flex items-center gap-2">
                        <Progress value={(users.filter(u => u.securitySettings.twoFactorEnabled).length / users.length) * 100} className="w-20" />
                        <span className="text-sm">{users.filter(u => u.securitySettings.twoFactorEnabled).length}/{users.length}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Failed Login Attempts</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-red-600">
                          {users.reduce((sum, u) => sum + u.securitySettings.failedLoginAttempts, 0)}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Password Updates (Last 90 days)</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-green-600">
                          {users.filter(u => {
                            const daysSince = Math.floor(
                              (Date.now() - new Date(u.securitySettings.lastPasswordChange).getTime()) / (1000 * 60 * 60 * 24)
                            );
                            return daysSince < 90;
                          }).length}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Alerts</CardTitle>
                  <CardDescription>Recent security events and warnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Warning:</strong> User David Chen has 3 failed login attempts
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Notice:</strong> 2 users have passwords older than 90 days
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Success:</strong> All administrators have 2FA enabled
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Logs Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  System activity logs and user actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Severity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activityLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          <div className="font-medium">{log.userName}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{log.action}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{log.details}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {new Date(log.timestamp).toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={log.severity === "Warning" ? "destructive" : "secondary"}
                            className={log.severity === "Info" ? "bg-blue-100 text-blue-700" : ""}
                          >
                            {log.severity}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add User Dialog */}
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account with appropriate permissions and access levels.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@pngpolice.gov.pg"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="badgeNumber">Badge Number *</Label>
                  <Input
                    id="badgeNumber"
                    placeholder="CYB001"
                    value={newUser.badgeNumber}
                    onChange={(e) => setNewUser({...newUser, badgeNumber: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+675 325 1234"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Department *</Label>
                  <Select
                    value={newUser.department}
                    onValueChange={(value) => setNewUser({...newUser, department: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="role">Role *</Label>
                  <Select
                    value={newUser.role}
                    onValueChange={(value) => setNewUser({...newUser, role: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="supervisor">Supervisor</Label>
                  <Input
                    id="supervisor"
                    placeholder="Chief Inspector Wilson"
                    value={newUser.supervisor}
                    onChange={(e) => setNewUser({...newUser, supervisor: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="clearanceLevel">Clearance Level *</Label>
                  <Select
                    value={newUser.clearanceLevel}
                    onValueChange={(value) => setNewUser({...newUser, clearanceLevel: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {clearanceLevels.map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Permissions */}
              <div>
                <Label className="text-base font-medium">Permissions</Label>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  {permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={permission.id}
                        checked={newUser.permissions.includes(permission.id)}
                        onChange={() => togglePermission(permission.id)}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor={permission.id} className="text-sm">
                        {permission.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  User will receive an email with login credentials and setup instructions. 2FA setup will be required on first login.
                </AlertDescription>
              </Alert>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={addUser}
                  disabled={!newUser.name || !newUser.email || !newUser.department || !newUser.role || !newUser.badgeNumber}
                >
                  <UserCog className="h-4 w-4 mr-2" />
                  Create User
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit User Dialog */}
        <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Update user information and permissions.
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <Input value={selectedUser.name} readOnly />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input value={selectedUser.email} readOnly />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Status</Label>
                    <Select defaultValue={selectedUser.status}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Role</Label>
                    <Select defaultValue={selectedUser.role}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={editUser}>
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
