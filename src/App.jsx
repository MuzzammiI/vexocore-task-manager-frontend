// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, AuthContext } from './contexts/AuthContext.jsx';
// import Navbar from './components/Navbar.jsx';
// import Home from './pages/Home.jsx';
// import LoginPage from './pages/LoginPage.jsx';
// import SignupPage from './pages/SignupPage.jsx';
// import { useContext } from 'react';

// function ProtectedRoute({ children }) {
//   const { user } = useContext(AuthContext);
//   console.log(user)
//   return user ? children : <Navigate to="/login" />;
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/signup" element={<SignupPage />} />
//           <Route
//             path="/home"
//             element={<ProtectedRoute><Home /></ProtectedRoute>}
//           />
//           <Route path="/" element={<Navigate to="/home" />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }



import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import { useContext } from 'react';

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useContext(AuthContext);

    // If still loading, you can show a loader or null to prevent content from flashing.

    return isAuthenticated  ? children : <Navigate to="/login" />;
}

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route
                        path="/home"
                        element={<ProtectedRoute><Home /></ProtectedRoute>}
                    />
                    <Route path="/" element={<Navigate to="/home" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}