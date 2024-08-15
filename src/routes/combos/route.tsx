import { createFileRoute } from "@tanstack/react-router";
import ComboManagementPage from "../../pages/ComboManagementPage";

export const Route = createFileRoute("/combos")({
  component: ComboManagementPage,
});
