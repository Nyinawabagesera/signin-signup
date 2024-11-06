
import "./App.css";
import AuthProvider from "./contexts/AuthContext.js";
import Login from "./Login/Login.jsx";
import Signup from "./signUp/SignUp";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Logout from './logOut/Logout.js';
import Forgotpassword from './Forgotpassword/ForgotPassword.js';
import Updateprofile from './Updateprofile/UpdateProfile.js';
import { ThemeProvider, useTheme } from "./contexts/ThemeContext.js";
import ThemeToggle from './contexts/ThemeToggle.js';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}

const AppContent = () => {
  const { theme } = useTheme();

  const route = createBrowserRouter([
    {
      path: "/",
      element: <Signup />,
    },
    {
      path: "/Login",
      element: <Login />,
    },
    {
      path: '/Logout',
      element: <Logout />
    },
    {
      path: '/UpdateProfile',
      element: <Updateprofile />
    },
    {
      path: '/ForgotPassword',
      element: <Forgotpassword />
    },
  ]);

  return (
    <div className={theme}>
      <ThemeToggle />
      <RouterProvider router={route} />
    </div>
  );
};

export default App;