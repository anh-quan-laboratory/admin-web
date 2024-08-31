import { createFileRoute } from "@tanstack/react-router";
import CustomerManagementPage from "../../pages/CustomerPage";

export const Route = createFileRoute("/customers")({
  component: CustomerManagementPage,
});
