"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        router.push("/dashboard");
      }
    };

    getUser();
  }, [router]);

  return <div>Logging in...</div>;
}