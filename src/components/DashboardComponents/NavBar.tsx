/** @format */
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PanelLeft } from "lucide-react";
import { useDashboardSidebar } from "./DashboardSidebarProvider";

export default function NavBar() {
  const { toggleSidebar } = useDashboardSidebar();

  return (
    <nav className="bg-card border-b border-border px-6 lg:px-8 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleSidebar}
          className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-accent"
          aria-label="Toggle sidebar"
        >
          <PanelLeft size={18} />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" asChild className="rounded-lg h-9">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </nav>
  );
}
