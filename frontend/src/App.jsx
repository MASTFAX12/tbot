import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Trash2, Settings, Menu } from 'lucide-react';
import { clsx } from 'clsx';

// Placeholder Pages (will be replaced by actual components)
import Dashboard from './pages/Dashboard';
import UsersPage from './pages/UsersPage';
import DeletedMessages from './pages/DeletedMessages';
import SettingsPage from './pages/SettingsPage';

const NavItem = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={clsx(
        "flex flex-col items-center justify-center w-full h-full py-2 text-xs font-medium transition-colors",
        isActive ? "text-primary" : "text-gray-400 hover:text-gray-200"
      )}
    >
      <Icon size={24} className="mb-1" />
      <span>{label}</span>
    </Link>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-darker text-white overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-surface shadow-md z-10">
        <h1 className="text-lg font-bold text-white">مراقب تليجرام</h1>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold">
          A
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>

      {/* Bottom Navigation (Mobile First) */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-gray-800 flex items-center justify-around z-20 safe-area-pb">
        <NavItem to="/" icon={LayoutDashboard} label="مباشر" />
        <NavItem to="/users" icon={Users} label="الأعضاء" />
        <NavItem to="/deleted" icon={Trash2} label="المحذوف" />
        <NavItem to="/settings" icon={Settings} label="الإعدادات" />
      </nav>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/deleted" element={<DeletedMessages />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
