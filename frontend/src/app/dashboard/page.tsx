"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    fetchUser();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <p className="mt-4">
        Welcome {user?.email}
      </p>
    </div>
  );
}