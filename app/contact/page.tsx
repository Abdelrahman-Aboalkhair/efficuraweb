import type { Metadata } from "next";
import { BookingContent } from "@/components/BookingContent";

export const metadata: Metadata = {
  title: "Book a Demo",
  description: "Book a Demo or send the efficura team a message.",
};

export default function Page() {
  return <BookingContent />;
}
