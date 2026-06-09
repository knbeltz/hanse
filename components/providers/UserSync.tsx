"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function UserSync() {
  const { user, isLoaded } = useUser();
  const createOrUpdateUser = useMutation(api.users.createOrUpdateUser);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const primaryEmail = user.primaryEmailAddress?.emailAddress ?? "";
    const fullName = user.fullName ?? user.username ?? "User";

    createOrUpdateUser({
      clerkUserId: user.id,
      email: primaryEmail,
      name: fullName,
    }).catch(console.error);
  }, [isLoaded, user, createOrUpdateUser]);

  return null;
}
