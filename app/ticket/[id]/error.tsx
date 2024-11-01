"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen container mx-auto flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">
          Something went wrong loading your ticket
        </h2>
        <Button onClick={reset} variant="outline" className="mx-auto">
          Try again
        </Button>
      </div>
    </div>
  );
}
