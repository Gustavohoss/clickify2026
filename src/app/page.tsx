'use client';

import { Logo } from '@/components/landing/logo';
import { BGPattern } from '@/components/ui/bg-pattern';

export default function BlankPage() {
  return (
    <div className="text-white flex items-center justify-center min-h-screen relative">
      <BGPattern variant="grid" fill="hsl(var(--border))" />
      <Logo />
    </div>
  );
}
