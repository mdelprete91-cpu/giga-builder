"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GigaLogo } from "@/components/giga-logo";
import { GIGA_PROMPT, GREETING, TOOLS, type ToolItem } from "@/lib/giga-prompt";
import { toast } from "sonner";
function ToolCard({
  tool,
  onSelect,
  isLaunching,
}: {
  tool: ToolItem;
  onSelect: () => void;
  isLaunching: boolean;
}) {
  return (
    <Card
      className="w-full cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30 data-[active=true]:border-primary/40 data-[active=true]:shadow-md data-[active=true]:bg-accent/50"
      data-active={isLaunching}
      onClick={onSelect}
    >
      <CardContent className="p-6 flex flex-col items-start justify-start gap-4 h-full">
        <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tool.logoUrl}
            alt=""
            width={28}
            height={28}
            className="object-contain w-7 h-7"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap font-['Manrope']">
            <span className="font-semibold text-lg text-foreground truncate font-['Manrope']">
              {tool.name}
            </span>
            {tool.badge && (
              <Badge variant="secondary" className="text-[11px] font-semibold py-px px-2 tracking-[0.2px] bg-primary/10 text-primary border-0">
                {tool.badge}
              </Badge>
            )}
          </div>
          <p className="text-base text-muted-foreground mt-0.5 line-clamp-2">
            {tool.desc}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function GigaLauncherPage() {
  const [launching, setLaunching] = useState<string | null>(null);

  const handleSelect = useCallback(
    async (tool: ToolItem) => {
      setLaunching(tool.id);

      if (tool.action === "clipboard") {
        try {
          await navigator.clipboard.writeText(GIGA_PROMPT + "\n\n" + GREETING);
          toast.success("Giga prompt copied — paste it in a new Cursor chat to start");
        } catch {
          toast.error("Could not copy — check clipboard permissions");
        }
        setLaunching(null);
        return;
      }

      const url = tool.getUrl();
      if (url) {
        window.open(url, "_blank");
      }
      setLaunching(null);
    },
    []
  );

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex flex-col items-center justify-start py-12 px-6 text-left">
      <header className="text-center mb-4 w-full max-w-[460px]">
        <div className="flex justify-center mb-6">
          <GigaLogo width={140} height={66} />
        </div>
        <p className="text-[16px] leading-[24px] text-muted-foreground m-0 w-full max-w-[560px]">
          Select your vibecoding tool and start developing your app using the Giga Design System
        </p>
      </header>

      <main className="w-full max-w-[720px] grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        {TOOLS.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            onSelect={() => handleSelect(tool)}
            isLaunching={launching === tool.id}
          />
        ))}
      </main>

      <footer className="mt-auto flex flex-col items-center gap-2 text-center">
        <div className="flex flex-wrap justify-center gap-2">
          {["Colors", "Typography", "Shadows", "Radius", "Motion", "Dark mode"].map((t) => (
            <span
              key={t}
              className="inline-block px-2.5 py-1 rounded-md bg-secondary text-muted-foreground text-xs font-medium"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground/80 m-0">
          Giga Product Design System · shadcn/ui · Next.js
        </p>
      </footer>
    </div>
  );
}
