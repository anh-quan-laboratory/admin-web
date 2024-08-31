import { createFileRoute } from "@tanstack/react-router";
import TestPage from "../../pages/TestPage";

export const Route = createFileRoute("/tests")({
  component: TestPage,
});
