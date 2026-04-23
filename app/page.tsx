'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Index() {
  const router = useRouter();
  
  useEffect(() => {
    let user: any = localStorage.getItem("user");
    user = user && JSON.parse(user);

    if (!!user) {
      router.replace("/view-insights");
      return;
    }

    router.replace("/auth");
  }, []);
}
