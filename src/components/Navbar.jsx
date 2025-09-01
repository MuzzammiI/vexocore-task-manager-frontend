
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useState } from 'react';
import NotificationMessage from '../utils/NotificationMessage.jsx';

export default function Navbar() {
  const {token, logout} = useAuth();
  const [isLogout, setIsLogout] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setTimeout(() => {
      setIsLogout(true);
      navigate('/login');
    },[]);

  };

  return (
    <nav className="bg-gray-800 top-0 fixed w-full text-white p-4">
      <div className="max-w-4xl mx-auto flex justify-between">
        {
          isLogout && (
            <NotificationMessage message="Logout successful" type="warning" onDismiss={() => setIsLogout(false)} />
          )
        }
        <Link to="/" className="text-xl">Task Manager</Link>
        <div>
          {token ? (
            <>
              <Link to="/home" className="mr-4">Home</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}