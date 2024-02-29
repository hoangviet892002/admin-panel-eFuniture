import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthService } from "../../../service";

interface ProtectedProps {
  children: ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(true);
  async function fetchUser() {
    const user = await AuthService.getCurrentUser();
    if (user === null) {
      setisLoggedIn(false);
    } else setisLoggedIn(true);
  }

  useEffect(() => {
    fetchUser();
  }, []);
  if (isLoggedIn === false) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default Protected;
