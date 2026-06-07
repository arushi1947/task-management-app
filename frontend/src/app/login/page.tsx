"use client";

import { supabase } from "@/lib/supabase";

export default function LoginPage() {

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <button
        onClick={loginWithGoogle}
        className="bg-blue-500 text-white px-6 py-3 rounded"
      >
        Login with Google
      </button>
    </div>
  );
}