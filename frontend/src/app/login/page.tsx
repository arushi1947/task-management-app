"use client";

import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        router.push("/dashboard");
      }
    };

  checkSession();
}, []);

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">

      <div className="border border-gray-700 rounded-xl p-10 w-full max-w-md text-center">

        <h1 className="text-4xl font-bold mb-4">
          Task Manager
        </h1>

        <p className="text-gray-400 mb-8">
          Manage tasks, assignments and team productivity efficiently.
        </p>

        <button
          onClick={loginWithGoogle}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg w-full"
        >
          Login with Google
        </button>

      </div>

    </div>
  )};