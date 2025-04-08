// STEP 1: Update your Navbar component

"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);

  // Simplified authentication handler with more logging
  const handleAuth = () => {
    console.log("Authentication attempt started");
    setIsLoading(true);
    
    if (session.data?.user) {
      console.log("Attempting to sign out");
      // Simple sign out without extra options
      signOut()
        .then(() => {
          console.log("Sign out successful");
        })
        .catch(error => {
          console.error("Sign out failed:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      console.log("Attempting to sign in");
      // Basic sign in without specifying provider
      signIn()
        .then(() => {
          console.log("Sign in initiated");
        })
        .catch(error => {
          console.error("Sign in failed:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full flex justify-center fixed top-6 z-50 mb-3"
    >
      <motion.div
        className="w-fit flex items-center bg-white gap-10 sm:gap-16 md:gap-32 lg:gap-56 border px-6 py-3 rounded-full shadow-lg"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="font-mono text-lg sm:text-xl">Please Sign In to continue to enjoy the time.</div>
        <motion.button
          className={`px-5 py-2 rounded-full text-white transition-all duration-300 ${isLoading ? 'cursor-wait' : 'cursor-pointer'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: isLoading ? 1 : 1.1 }}
          whileTap={{ scale: isLoading ? 1 : 0.9 }}
          transition={{ duration: 0.2 }}
          onClick={isLoading ? undefined : handleAuth}
          style={{
            backgroundColor: session.data?.user ? "black" : "#3b82f6",
            opacity: isLoading ? 0.7 : 1,
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            "Loading..."
          ) : (
            session.data?.user ? "Logout" : "Signin"
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// STEP 2: Check your NextAuth configuration file
// This would be in /pages/api/auth/[...nextauth].js or /app/api/auth/[...nextauth]/route.js

/*
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: true, // Enable debugging in development
};

export default NextAuth(authOptions);
*/

// STEP 3: Check your .env.local file structure
/*
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secure-random-string-here

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
*/

// STEP 4: Verify your Provider API Setup in Google Cloud Console
/*
1. Go to https://console.cloud.google.com/
2. Select your project
3. Go to APIs & Services > Credentials
4. Ensure your OAuth consent screen is properly configured
5. Check your OAuth client ID settings:
   - Authorized JavaScript origins should include: http://localhost:3000
   - Authorized redirect URIs should include: http://localhost:3000/api/auth/callback/google
6. Make sure the necessary APIs are enabled (Google+ API)
*/