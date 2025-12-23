import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
