'use client';

import { useUser, useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { doc } from 'firebase/firestore';

type UserProfile = {
    plan: 'Pendente' | 'Mensal' | 'Trimestral' | 'Anual' | 'Vitalicio';
}

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const { firestore } = useFirebase();
  const router = useRouter();

  const userProfileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

  useEffect(() => {
    const isAuthenticating = isUserLoading || isProfileLoading;

    if (!isAuthenticating) {
      if (!user) {
        // Not logged in, redirect to login
        router.push('/login');
      } else if (userProfile?.plan === 'Pendente') {
        // User's plan is pending, redirect to verification page
        router.push('/verificacao');
      }
    }
  }, [isUserLoading, isProfileLoading, user, userProfile, router]);
  
  const isAuthenticating = isUserLoading || (user && isProfileLoading);
  const isAccessDenied = !user || userProfile?.plan === 'Pendente';

  if (isAuthenticating || isAccessDenied) {
     return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
      </div>
    );
  }

  // User is authenticated and plan is not pending
  return <>{children}</>;
}
