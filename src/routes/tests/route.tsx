import { createFileRoute } from "@tanstack/react-router";
import TestManagementPage from "../../pages/TestManagementPage";

export const Route = createFileRoute("/tests")({
  component: TestManagementPage,
});
