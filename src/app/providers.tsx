"use client";

import { PostHogProvider } from "posthog-js/react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider
      apiKey="phc_Qlyul71IpsCeS4IHoakygf3qckEZd21S32rNT3Lv0D4"
      options={{
        api_host: "https://us.i.posthog.com",
        defaults: "2025-05-24",
      }}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </PostHogProvider>
  );
}
