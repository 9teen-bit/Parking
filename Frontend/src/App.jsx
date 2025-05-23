import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import RegisterForm from "./components/RegisterForm";
import CarsPage from "./pages/CarsPage";
import ServicesPage from "./pages/ServicesPage";
import PackagePage from "./pages/PackagePage";
import PaymentsPage from "./pages/PaymentsPage";
import ReportsPage from "./pages/ReportsPage";

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen w-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/parking" element={<ServicesPage />} />
              <Route path="/packages" element={<PackagePage />} />
              <Route path="/payments" element={<PaymentsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;