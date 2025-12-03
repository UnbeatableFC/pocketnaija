"use client";
"use client";
import { useState } from "react";
import { useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as z from "zod"; // Schema validation
import { useForm } from "react-hook-form"; // Form management
import { zodResolver } from "@hookform/resolvers/zod"; // Zod integration
import { toast } from "sonner"; // Modern notifications

import { authClient } from "@/lib/auth-client";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Assuming these Form components exist

// --- Zod Validation Schema ---
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(
      /[A-Z]/,
      "Password must contain at least one uppercase letter."
    )
    .regex(
      /[a-z]/,
      "Password must contain at least one lowercase letter."
    )
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character."
    ),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

// Reusing the ErrorAlert component from the Login page
// Imports from above section...

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // 1. Initialize React Hook Form
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Derive password value for real-time complexity indicator
  const passwordValue = useWatch({
  control: form.control,
  name: "password"
});

  // --- Password Strength Indicator Logic ---
  const getPasswordStrength = (password: string): number => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  };

  const strength = getPasswordStrength(passwordValue);

  // --- Better Auth Submission Handler ---
  async function onSubmit(values: RegisterFormValues) {
    setLoading(true);

     await authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.name,
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {
          toast.loading("Creating your account...", {
            id: "signup-toast",
          });
        },

        onSuccess: () => {
          toast.success("Account created successfully!", {
            id: "signup-toast",
          });

          router.push("/dashboard");
        },

        onError: (ctx) => {
          toast.error(ctx.error.message, {
            id: "signup-toast",
          });
        },
      }
    );

    setLoading(false);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <Card className="p-8 w-full max-w-md space-y-6 shadow-2xl animate-in fade-in zoom-in duration-500">
        <CardHeader className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Get Started with PocketNaija ✨
          </h1>
          <p className="text-sm text-muted-foreground">
            Create your account to secure your valuable links.
          </p>
        </CardHeader>

        {/* 3. Use the Form component from shadcn/ui/Radix */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <CardContent className="space-y-5 p-0">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        disabled={loading}
                        {...field}
                        className="transition-all focus:ring-2 focus:ring-primary/50 duration-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        disabled={loading}
                        {...field}
                        className="transition-all focus:ring-2 focus:ring-primary/50 duration-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        disabled={loading}
                        {...field}
                        className="transition-all focus:ring-2 focus:ring-primary/50 duration-200"
                      />
                    </FormControl>
                    {/* Password Strength Indicator */}
                    <div className="mt-1">
                      <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300`}
                          style={{
                            width: `${strength * 20}%`,
                            backgroundColor:
                              strength < 3
                                ? "red"
                                : strength < 5
                                ? "orange"
                                : "green",
                          }}
                        />
                      </div>
                      {passwordValue.length > 0 && (
                        <p
                          className={`text-xs mt-1 ${
                            strength < 3
                              ? "text-red-500"
                              : strength < 5
                              ? "text-orange-500"
                              : "text-green-500"
                          }`}
                        >
                          {strength < 3
                            ? "Weak"
                            : strength < 5
                            ? "Medium"
                            : "Strong"}
                        </p>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex flex-col gap-3 p-0 pt-4">
              <Button
                type="submit"
                className="w-full text-base py-6 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                disabled={loading || !form.formState.isValid} // Disable if loading or form is invalid
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-semibold text-primary hover:underline transition-colors"
                >
                  Log In
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
