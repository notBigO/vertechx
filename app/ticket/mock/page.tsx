// pages/mock-ticket.tsx
import Ticket from "@/components/Ticket";

const mockRegistration = {
  id: "mock-id",
  event: {
    title: "Cyberbug - Decode the code challenge",
    date: new Date().toISOString(),
    venue: "Thikkesh Paalya",
  },
  participants: [
    { id: "1", name: "Alice", phone: "1234567890" },
    { id: "2", name: "Bob", phone: "0987654321" },
  ],
  paymentVerification: true,
  userId: "mock-user-id",
};

export default function MockTicketPage() {
  return (
    <div className="min-h-screen container mx-auto flex items-center justify-center relative px-3 md:px-0">
      <Ticket registration={mockRegistration} />
    </div>
  );
}
