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
    const user = localStorage.getItem("user");
    console.log(user);

    if (user) {
      setisLoggedIn(true);
    } else setisLoggedIn(false);
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
