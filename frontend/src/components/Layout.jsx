import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Icons';



const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';

  const handleLogout = () => {
    localStorage.removeItem('fuchsius_admin_token');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-fuchsia-100">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <Logo className="w-10 h-10 transition-transform group-hover:scale-105" />
              <span className="text-xl font-bold tracking-tight text-gray-900">AutoCare</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {isAdmin ? (
                <>
                  <Link to="/admin/dashboard" className={`text-sm font-medium transition-colors ${location.pathname === '/admin/dashboard' ? 'text-fuchsia-600' : 'text-gray-500 hover:text-gray-900'}`}>Dashboard</Link>
                  <Link to="/admin/services" className={`text-sm font-medium transition-colors ${location.pathname === '/admin/services' ? 'text-fuchsia-600' : 'text-gray-500 hover:text-gray-900'}`}>Services</Link>
                  <button onClick={handleLogout} className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Book Service</Link>
                  <Link to="/admin/login" className="px-4 py-2 text-sm font-medium text-white bg-fuchsia-600 rounded-lg hover:bg-fuchsia-700 transition-all shadow-sm shadow-fuchsia-200">Admin Portal</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="border-t border-gray-50 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} AutoCare Vehicle Service Booking. Professional Care for Your Drive.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
