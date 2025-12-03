'use client'
import { useState, FormEvent } from 'react'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card' // Assuming Card components are from shadcn/ui or similar
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

// You might need a simple Alert component for the error message
// If you don't have one, this is a basic placeholder:
const ErrorAlert: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex items-center space-x-2 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg" role="alert">
    <AlertCircle className="h-4 w-4 shrink-0" />
    <span className="font-medium">{message}</span>
  </div>
)

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  /**
   * Handles form submission and Better Auth signIn logic.
   * Uses try/finally to ensure loading state is always reset.
   */
 async function handleSignIn(e: FormEvent) {
  e.preventDefault();

  if (!email || !password) {
    setError("Please enter both email and password.");
    toast.error("Please enter both email and password.");
    return;
  }

  setLoading(true);
  setError(null);

  try {
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: () => {
          // Toast enters loading state
          toast.loading("Signing you in...", {
            id: "signin-toast",
          });
        },

        onSuccess: () => {
          toast.success("Login successful! Redirecting...", {
            id: "signin-toast",
          });

          router.push("/dashboard");
        },

        onError: (ctx) => {
          const message =
            ctx.error?.message || "Login failed. Please try again.";

          setError(message);

          toast.error(message, {
            id: "signin-toast",
          });
        },
      }
    );
  } catch (err) {
    const message = "A network error occurred. Please try again.";

    setError(message);

    toast.error(message, {
      id: "signin-toast",
    });
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="p-8 w-full max-w-md space-y-6 shadow-xl transition-all duration-300">
        
        <CardHeader className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Welcome Back 👋
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to continue to your PocketNaija dashboard.
          </p>
        </CardHeader>
        
        <form onSubmit={handleSignIn} className="space-y-6">
          <CardContent className="space-y-4 p-0">
            {error && <ErrorAlert message={error} />}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-medium leading-none">Password</label>
                <Link href="/auth/forgot-password" className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                  Forgot?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 p-0 pt-4">
            <Button 
              type="submit" 
              className="w-full text-base py-6 transition-all duration-200"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Authenticating...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/auth/register" className="font-semibold text-primary hover:underline">
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}