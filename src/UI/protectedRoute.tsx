import { useEffect } from "react";
import useUser from "../features/Authentication/useUser";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isLoading && !isAuthenticated) navigate("/home");
    },
    [isLoading, isAuthenticated, navigate],
  );
  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--color-bg-main)]">
        <div className="loader"></div>;
      </div>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
