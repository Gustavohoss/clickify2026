import { cn } from '@/lib/utils';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image
        src="https://s3.typebot.io/public/workspaces/cmj62bxvv000fju04wwudfwgk/typebots/cmjclddjn000kl204sjzbusjb/blocks/mf560fis7x50yzybc9ibhlkz?v=1766131998215"
        alt="Clickify Logo"
        width={24}
        height={24}
        className="h-6 w-6"
      />
      <span className="text-xl font-bold tracking-tight text-white">
        CLICKIFY
      </span>
    </div>
  );
}
