"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchJson } from "@/lib/api";
import { useAppDispatch } from "@/store/hooks";
import { setToken } from "@/store/slices/authSlice";

type LoginResponse = {
  token: string;
};

const HomePage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("derek");
  const [password, setPassword] = useState("jklg*_56");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.error("Please enter username and password.");
      return;
    }

    try {
      setIsSubmitting(true);
      const data = await fetchJson<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      dispatch(setToken(data.token));
      localStorage.setItem("auth-token", data.token);
      document.cookie = `auth_token=${data.token}; path=/; max-age=86400`;
      toast.success("Login successful.");
      router.push("/products");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="relative hidden md:block">
        <Image
          src="/loginProduct.jpg"
          alt="Product showcase"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-8 left-8 text-white space-y-2">
          <p className="text-3xl font-semibold">Welcome Back</p>
          <p className="text-white/80 max-w-sm">
            Sign in to manage your store, track sales, and explore insights.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <p className="text-3xl font-semibold">Login</p>
            <p className="text-sm text-muted-foreground">
              Use your Fake Store credentials to access the dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block space-y-1 text-sm font-medium">
              Username
              <Input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Enter username"
                autoComplete="username"
              />
            </label>

            <label className="block space-y-1 text-sm font-medium">
              Password
              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
              />
            </label>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;