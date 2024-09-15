import DoctorPage from "@/pages/DoctorPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/doctors")({
  component: DoctorPage,
});
