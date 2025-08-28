// "use client";
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// interface User {
//   id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   profile_picture?: string;
//   role: string;
//   is_active: boolean;
//   is_superuser: boolean;
// }

// interface UserContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   logout: () => void;
// }

// const UserContext = createContext<UserContextType | undefined>(undefined);

// export function UserProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("access_token");

//     if (!token) {
//       router.push("/signin");
//       return;
//     }

//     setIsAuthenticated(true);

//     // Fetch user profile
//     fetch("/api/auth/user", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch user");
//         return res.json();
//       })
//       .then((data) => {
//         setUser(data);
//       })
//       .catch((err) => {
//         console.error("Profile fetch error:", err);
//         setUser(null);
//         setIsAuthenticated(false);
//         localStorage.removeItem("access_token");
//         router.push("/signin");
//       });
//   }, [router]);

//   const logout = () => {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     setUser(null);
//     setIsAuthenticated(false);
//     router.push("/signin");
//   };

//   return (
//     <UserContext.Provider value={{ user, isAuthenticated, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// export function useUser() {
//   const context = useContext(UserContext);
//   if (!context) throw new Error("useUser must be used within a UserProvider");
//   return context;
// }


"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile_picture?: string;
  role: string;
  is_active: boolean;
  is_superuser: boolean;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    // ✅ Public pages
    const publicPaths = ["/", "/signin", "/signup", "/auth/google/callback"];

    if (!token) {
      // Only redirect if trying to access a protected page
      if (!publicPaths.includes(pathname)) {
        if (!pathname.startsWith("/auth/google")) {
        router.push("/");
      }
      }
      return;
    }

    setIsAuthenticated(true);

    fetch("/api/auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error("Profile fetch error:", err);
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("access_token");
        if (!publicPaths.includes(pathname)) {
          router.push("/");
        }
      });
  }, [router, pathname]);

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    setIsAuthenticated(false);
    router.push("/signin");
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
}
