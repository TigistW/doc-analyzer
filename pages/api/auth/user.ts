export interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  profile_picture?: string;
  id: number;
  role: string;
  is_active: boolean;
  is_superuser: boolean;
}

export async function fetchUserProfile(token: string): Promise<UserProfile> {
  const res = await fetch("http://196.190.220.63:8000/auth/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch user profile");
  return res.json();
}
