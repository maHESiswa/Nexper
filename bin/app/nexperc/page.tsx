// src/app/login/page.tsx
"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Login with Google</h1>
            <Button onClick={() => signIn("google", { callbackUrl: "/nexperca" })}>
                Sign in with Google
            </Button>
        </div>
    );
}