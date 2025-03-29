import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserProvider from "./context/userProvider";
import router from "./Routes/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
