/*
About Page — Luxe Retail / Egyptian Glam
*/

import SiteShell from "@/components/SiteShell";
import { aboutCopy, brand } from "@/lib/content";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Store } from "lucide-react";

export default function About() {
  return (
    <SiteShell>
      <main className="grain">
        <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
            <Sparkles className="h-4 w-4 text-[oklch(0.83_0.13_85)]" />
            <span>حكاية مسايا</span>
          </div>

          <h1 className="mt-4 font-display text-4xl md:text-5xl">{aboutCopy.title}</h1>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card className="border-white/10 bg-white/5 p-6 md:col-span-2">
              {aboutCopy.body.map((p) => (
                <p key={p} className="mt-3 text-sm leading-7 text-white/75 first:mt-0">
                  {p}
                </p>
              ))}
            </Card>

            <Card className="border-white/10 bg-white/5 p-6">
              <Badge className="gold-shimmer text-primary-foreground">{brand.locationAr}</Badge>
              <div className="mt-4 flex items-center gap-2 text-white/80">
                <Store className="h-4 w-4 text-[oklch(0.83_0.13_85)]" />
                <span className="text-sm">موقعنا في قلب شبين الكوم</span>
              </div>
              <div className="mt-4 grid gap-2">
                {aboutCopy.highlights.map((h) => (
                  <div key={h} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75">
                    {h}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
