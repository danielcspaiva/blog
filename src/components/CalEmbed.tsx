"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

// Initializes the Cal.com embed. Anchors with data-cal-link open the modal.
export function CalEmbed() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", { theme: "auto", hideEventTypeDetails: false });
    })();
  }, []);
  return null;
}
