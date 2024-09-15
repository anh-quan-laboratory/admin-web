import { RouterProvider, createRouter, createHashHistory } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";

// Import the generated route tree
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import { DialogContextProvider } from "@/components/CustomDialog";

// Create a new router instance
const hashHistory = createHashHistory();

const router = createRouter({ routeTree, history: hashHistory });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const queryClient = new QueryClient();
const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <DialogContextProvider>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </DialogContextProvider>
  );
}
