import { Children, useContext, useState } from "react";
import AuthProvider, { AuthContext } from "./context/AuthProvider";
import {
  BrowserRouter,
  Link,
  Navigate,
  redirect,
  Route,
  RouteProps,
  Routes,
  useLocation,
} from "react-router-dom";
import SignInPage from "./router/SignIn";
import SignUp from "./router/SingUp";
import TodoContainer from "./router/todo/TodoContainer";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { token } = useContext(AuthContext);
  const location = useLocation();

  if (!token) return <Navigate to="/" state={{ from: location }} replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/todos"
            element={
              <RequireAuth>
                <TodoContainer />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
