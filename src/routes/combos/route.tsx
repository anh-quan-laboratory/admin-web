import { createFileRoute } from "@tanstack/react-router";
import ComboPage from "../../pages/ComboPage";

export const Route = createFileRoute("/combos")({
  component: ComboPage,
});
