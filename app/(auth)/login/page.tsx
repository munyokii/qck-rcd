"use client"

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Mail, Lock, Home, Loader2 } from "lucide-react";

import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { LoginSchema, LoginFormValues } from "@/app/lib/schemas";


export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
  });

  async function onSubmit(data: LoginFormValues) {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid email or password");
        return;
      }

      toast.success("Welcome back!");
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      toast.error(`Login failed. Please try again. ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-base-200 p-4">
        <Link
          href="/"
          className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 hover:text-primary transition-all duration-200"
        >
        <Home className="w-5 h-5" /> Back Home
        </Link>
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-primary">Welcome Back</h2>
            <p className="text-base-content/60">Login to manage your records</p>
          </div>

          <div className="flex gap-2 mb-4">
            <button className="btn btn-outline flex-1 gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
                />
              </svg>
              Google
            </button>
            <button className="btn btn-outline flex-1 gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.597 1.028 2.688 0 3.848-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </button>
          </div>

          <div className="divider">OR</div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            
            <Input
              label="Email"
              type="email"
              placeholder="name@example.com"
              icon={<Mail className="w-4 h-4" />}
              error={errors.email}
              {...register("email")}
            />

            <div>
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4" />}
                error={errors.password}
                {...register("password")}
              />
              <label className="label justify-end">
                <Link
                  href="/forgot-password"
                  className="label-text-alt link link-hover text-primary"
                >
                  Forgot password?
                </Link>
              </label>
            </div>

            <Button 
              variant="primary"
              className="w-full mt-4"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Signing In...
                </>
              ): (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="link link-primary font-bold">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}