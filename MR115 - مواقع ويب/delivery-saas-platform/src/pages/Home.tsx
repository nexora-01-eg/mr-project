import { useEffect } from "react";

interface HomeProps {
  targetSection?: string;
}

export default function Home({ targetSection }: HomeProps) {
  // Scroll to target section when URL changes (e.g., /#/services → scroll to #services)
  useEffect(() => {
    if (targetSection) {
      document.getElementById(targetSection)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [targetSection]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">لوحة التحكم</h1>
      <p className="text-muted-foreground">ابدأ بناء النظام من خلال صفحات src/pages</p>
    </div>
  );
}
