import { createFileRoute } from "@tanstack/react-router";
import TestManagementPage from "../../pages/TestMangementPage";

export const Route = createFileRoute("/tests")({
  component: TestManagementPage,
});
