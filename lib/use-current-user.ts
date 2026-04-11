"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, subscribeToProfileChanges, type StoredUser } from "@/lib/profile-storage";

export function useCurrentUser() {
  const [user, setUser] = useState<StoredUser | null>(() => getCurrentUser());

  useEffect(() => {
    return subscribeToProfileChanges(() => {
      setUser(getCurrentUser());
    });
  }, []);

  return user;
}
