"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  LogIn,
  LogOut,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearToken } from "@/store/slices/authSlice";

const SiteHeader = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname()
  const token = useAppSelector((state) => state.auth.token);
  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  if (pathname === '/') return null

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-6">
        <Link href="/products" className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-xl overflow-hidden bg-muted/40">
            <Image
              src="/shop.png"
              alt="Shop"
              fill
              className="object-contain p-1.5 dark:brightness-0 dark:invert"
              priority
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Dashboard</p>
            <p className="font-semibold leading-tight">Fake Store</p>
          </div>
        </Link>

        <nav className="flex items-center gap-5 text-sm text-muted-foreground">
          <Link href="/products" className="flex items-center gap-2 hover:text-foreground">
            <LayoutGrid className="h-4 w-4" />
            Products
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center gap-2 hover:text-foreground"
          >
            <ShoppingCart className="h-4 w-4" />
            Cart
            {cartCount > 0 ? (
              <span className="absolute -top-2 -right-3 h-5 min-w-5 rounded-full bg-primary px-1 text-xs text-primary-foreground flex items-center justify-center">
                {cartCount}
              </span>
            ) : null}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {token ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                dispatch(clearToken());
                localStorage.removeItem("auth-token");
                document.cookie = "auth_token=; path=/; max-age=0";
                router.push("/");
              }}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Button size="sm" asChild className="gap-2">
              <Link href="/">
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;