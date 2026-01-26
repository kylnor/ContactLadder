import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ejuodzmxtgujvovykpjf.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqdW9kem14dGd1anZvdnlrcGpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1ODk0NzMsImV4cCI6MjA4NDE2NTQ3M30.YYpzpYO-5GIRi1AxA7Fjv9lY23SnNS9Y2yCSJ2_QEXU',
  },
};

export default nextConfig;
