import { createFileRoute } from "@tanstack/react-router";
import CustomerPage from "@/pages/CustomerPage";

export const Route = createFileRoute("/customers")({
  component: CustomerPage,
});
