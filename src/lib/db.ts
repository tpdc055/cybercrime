export const db = {
  user: {
    findUnique: async ({ where }) => {
      const mockUsers = [
        { id: "1", email: "admin@police.gov.pg", name: "Admin", password: "$2b$10$vXoOVHEIO/e9xQ7Cp08T7.Y6ELD8LyzUlplQFerwfxUJIYncwAWN6", role: "ADMIN", department: "IT", isActive: true },
        { id: "2", email: "investigator@police.gov.pg", name: "Detective", password: "$2b$10$vXoOVHEIO/e9xQ7Cp08T7.Y6ELD8LyzUlplQFerwfxUJIYncwAWN6", role: "INVESTIGATOR", department: "Cyber Crime", isActive: true }
      ];
      if (where.email) return mockUsers.find(u => u.email === where.email) || null;
      if (where.id) return mockUsers.find(u => u.id === where.id) || null;
      return null;
    },
    findMany: async () => [],
    create: async () => null,
    update: async ({ where, data }) => ({ id: where.id || "mock-id", ...data })
  }
} as any;
console.log("Using mock database - Login: admin@police.gov.pg / admin123");
