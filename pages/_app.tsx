import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "@/context/UserContext";
import { StatsProvider } from "@/context/StatsContext";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <UserProvider>
          <StatsProvider> 
            <main className={inter.className}>
              <Component {...pageProps} />
            </main>
          </StatsProvider>
        </UserProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}
