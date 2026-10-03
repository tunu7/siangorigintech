"use client";

import { useEffect } from "react";
import { markEnquiryRead } from "../actions";

// Marks the enquiry as read once it's actually opened in the browser.
export default function MarkRead({ id }: { id: string }) {
  useEffect(() => {
    void markEnquiryRead(id);
  }, [id]);

  return null;
}
