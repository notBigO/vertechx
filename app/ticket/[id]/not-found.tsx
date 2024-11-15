import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen container mx-auto flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">Ticket not found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          The ticket you're looking for doesn't exist or you don't have
          permission to view it.
        </p>
        <Button asChild>
          <Link href="/events">Browse Events</Link>
        </Button>
      </div>
    </div>
  );
}
