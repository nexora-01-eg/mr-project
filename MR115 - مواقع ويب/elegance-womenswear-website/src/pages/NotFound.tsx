import SiteShell from "@/components/SiteShell";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <SiteShell>
      <main className="grain">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
            <div className="font-display text-4xl">الصفحة غير موجودة</div>
            <p className="mt-3 text-sm text-white/70">اللينك ده مش موجود… ارجعي للرئيسية.</p>
            <div className="mt-6 flex justify-center">
              <Link href="/">
                <Button className="rose-shimmer text-primary-foreground">العودة للرئيسية</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
