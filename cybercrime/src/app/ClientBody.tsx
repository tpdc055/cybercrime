"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { AuthProvider } from "@/components/providers/session-provider";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="antialiased">
      <AuthProvider>
        <ClientContent>{children}</ClientContent>
      </AuthProvider>
    </div>
  );
}

function ClientContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render anything until client hydration is complete
  if (!isClient) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-zinc-300 border-t-zinc-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show loading state while session is being determined
  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-zinc-300 border-t-zinc-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't wrap auth pages with MainLayout
  if (pathname?.startsWith("/auth/")) {
    return <>{children}</>;
  }

  // DEVELOPMENT MODE: Bypass authentication check
  // if (!session) {
  //   return null;
  // }

  return <MainLayout>{children}</MainLayout>;
}
