import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import Navbar from "./components/feature/Navbar";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <BrowserRouter basename={__BASE_PATH__}>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <AppRoutes />
        <Toaster
          position="top-center"
          gutter={12}
          toastOptions={{
            duration: 2200,
            style: {
              padding: "12px 16px",
              borderRadius: "14px",
              background: "#0f172a",
              color: "#f8fafc",
              fontSize: "14px",
              fontWeight: 500,
              boxShadow:
                "0 10px 25px -5px rgba(0,0,0,0.15), 0 8px 10px -6px rgba(0,0,0,0.15)",
            },
            success: {
              iconTheme: { primary: "#22c55e", secondary: "#ecfdf5" },
            },
            error: {
              iconTheme: { primary: "#ef4444", secondary: "#fef2f2" },
            },
          }}
        />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
