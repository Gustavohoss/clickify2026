'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  User,
  LogIn,
  UserPlus,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  Hourglass,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFirebase } from '@/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { setDoc, doc, serverTimestamp, getDoc } from 'firebase/firestore';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from '@/components/ui/alert-dialog';


const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5.27,16.18 5.27,12.35C5.27,8.52 8.36,5.43 12.19,5.43C15.19,5.43 17.5,6.72 17.5,6.72L19.3,4.92C19.3,4.92 16.58,2.73 12.19,2.73C6.42,2.73 2.18,7.17 2.18,12.35C2.18,17.53 6.42,21.97 12.19,21.97C17.96,21.97 21.82,17.82 21.82,12.6C21.82,12.06 21.64,11.52 21.35,11.1Z"
      />
    </svg>
  );

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const { auth, firestore } = useFirebase();
  const router = useRouter();

  const checkUserPlanAndRedirect = async (user: FirebaseUser) => {
      const userDocRef = doc(firestore, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists() && userDocSnap.data().plan === 'Pendente') {
          setShowVerificationPopup(true);
      } else {
          router.push('/painel');
      }
  };

  const handleAuth = async () => {
    setLoading(true);
    setError(null);

    if (isSignUp && !displayName) {
        setError('Por favor, preencha seu nome.');
        setLoading(false);
        return;
    }
    if (!email || !password) {
        setError('Por favor, preencha o e-mail e a senha.');
        setLoading(false);
        return;
    }

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, { displayName });
        await setDoc(doc(firestore, 'users', user.uid), {
            id: user.uid,
            email: user.email,
            displayName: displayName,
            createdAt: serverTimestamp(),
            plan: 'Pendente',
        });
        // After sign up, show verification popup
        setShowVerificationPopup(true);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await checkUserPlanAndRedirect(userCredential.user);
      }
    } catch (err: any) {
      setError(getFriendlyErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const userDocRef = doc(firestore, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // New user signing in with Google, set plan to Pendente
        await setDoc(userDocRef, {
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
            createdAt: serverTimestamp(),
            plan: 'Pendente',
        });
      }
      // For both new and existing users, check their plan
      await checkUserPlanAndRedirect(user);
    } catch (err: any) {
      setError(getFriendlyErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const getFriendlyErrorMessage = (code: string) => {
    switch (code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'E-mail ou senha inválidos.';
      case 'auth/invalid-email':
        return 'O formato do e-mail é inválido.';
      case 'auth/email-already-in-use':
        return 'Este e-mail já está em uso por outra conta.';
      case 'auth/weak-password':
        return 'A senha é muito fraca. Tente uma mais forte.';
      case 'auth/popup-closed-by-user':
        return 'A janela de login foi fechada. Tente novamente.';
      default:
        return 'Ocorreu um erro. Tente novamente mais tarde.';
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError(null);
    setEmail('');
    setPassword('');
    setDisplayName('');
  }

  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
        </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md p-8 space-y-8 bg-white/[0.02] backdrop-blur-2xl rounded-2xl border border-white/[0.05] shadow-2xl relative z-10"
      >
        <AnimatePresence mode="wait">
            <motion.div
                key={isSignUp ? 'signup' : 'login'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
            >
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/60">
                        {isSignUp ? 'Crie sua Conta' : 'Acesse sua Conta'}
                    </h1>
                    <p className="mt-2 text-white/50">
                        {isSignUp ? 'Comece sua jornada conosco.' : 'Entre para começar a criar.'}
                    </p>
                </div>
            </motion.div>
        </AnimatePresence>

        {error && (
          <Alert variant="destructive" className="bg-red-900/20 border-red-800 text-red-300">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro de Autenticação</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
        <AnimatePresence>
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
                  <Input
                    type="text"
                    placeholder="Nome"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    className="pl-10 bg-black/50 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500 focus-visible:border-purple-500"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
            <Input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="pl-10 bg-black/50 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500 focus-visible:border-purple-500"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="pl-10 pr-10 bg-black/50 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500 focus-visible:border-purple-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30 hover:text-white/50"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleAuth}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold"
          >
            {loading ? (isSignUp ? 'Criando...' : 'Entrando...') : (isSignUp ? 'Criar Conta' : 'Entrar')}
            {isSignUp ? <UserPlus className="ml-2 h-4 w-4" /> : <LogIn className="ml-2 h-4 w-4" />}
          </Button>

            <p className="text-center text-sm text-white/40">
                {isSignUp ? 'Já tem uma conta?' : 'Não tem uma conta?'}
                <button onClick={toggleForm} className="font-semibold text-purple-400 hover:text-purple-300 ml-1">
                    {isSignUp ? 'Faça login' : 'Crie uma'}
                </button>
            </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-black/80 px-2 text-white/40">Ou continue com</span>
          </div>
        </div>

        <Button
            onClick={handleGoogleSignIn}
            disabled={loading}
            variant="outline"
            className="w-full bg-white/90 text-black hover:bg-white"
        >
            <GoogleIcon />
            <span className="ml-2 font-semibold">Entrar com Google</span>
        </Button>

      </motion.div>
    </div>

    <AlertDialog open={showVerificationPopup} onOpenChange={setShowVerificationPopup}>
      <AlertDialogContent className="bg-white/[0.02] backdrop-blur-2xl border-purple-500/20 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-2xl flex flex-col items-center gap-4">
             <Hourglass className="h-12 w-12 text-blue-400" />
            Conta em Verificação
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-sm text-gray-400 !mt-4 space-y-2">
            <span>Sua conta está sendo verificada para garantir a segurança e evitar robôs. Este processo pode levar até 1 hora. Agradecemos a sua paciência!</span>
            <span>Caso demore mais que o esperado, entre em contato com a nossa equipe.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col gap-2 sm:flex-col sm:space-x-0">
          <Button
            variant="outline"
            className="w-full border-gray-600 hover:bg-gray-800 text-white"
            onClick={() => setShowVerificationPopup(false)}
          >
            Entendi
          </Button>
          <a
            href="https://wa.me/55DDYYYYYXXXX" // Substitua pelo seu número do WhatsApp
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
              <MessageCircle className="mr-2 h-4 w-4" />
              Entrar em contato
            </Button>
          </a>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>
  );
}

function Alert({
    variant,
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement> & { variant?: "destructive" | "default" }) {
    return (
      <div
        role="alert"
        className={`relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground ${
          variant === 'destructive'
            ? 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive'
            : 'bg-background text-foreground'
        } ${className}`}
        {...props}
      />
    );
  }
  
  function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
      <h5
        className={`mb-1 font-medium leading-none tracking-tight ${className}`}
        {...props}
      />
    );
  }
  
  function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
      <div
        className={`text-sm [&_p]:leading-relaxed ${className}`}
        {...props}
      />
    );
  }

    