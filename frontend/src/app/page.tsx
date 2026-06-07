"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);

        await supabase.from("users").upsert({
          id: user.id,
          email: user.email,
          name: user.user_metadata?.full_name || "",
        });
      }
    };

    getUser();
  }, []);

  return (
    <div className="p-10">
      {user ? (
        <>
          <h1 className="text-2xl font-bold">Logged In</h1>
          <p>{user.email}</p>
        </>
      ) : (
        <h1 className="text-2xl font-bold">Not Logged In</h1>
      )}
    </div>
  );
}