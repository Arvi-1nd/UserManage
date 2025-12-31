import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Navbar from "./components/Navbar";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
