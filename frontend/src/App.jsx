
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import CustomerBooking from './pages/CustomerBooking';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ServiceCategories from './pages/ServiceCategories';

// Simple Auth Guard
// Fixed: Using React.PropsWithChildren to ensure children are correctly typed and recognized by the JSX parser
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('fuchsius_admin_token');
  return token ? <>{children}</> : <Navigate to="/admin/login" />;
};

const App = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<CustomerBooking />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/services"
            element={
              <PrivateRoute>
                <ServiceCategories />
              </PrivateRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
