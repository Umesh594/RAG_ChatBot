import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import '@/styles/index.scss';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="notfound-page">
      <h1>404</h1>
      <p>Oops! Page not found</p>
      <a href="/">Return to Home</a>
    </div>
  );
};

export default NotFound;
