import { useEffect, useState } from "react";
import { Spinner } from "../components/common/Spinner";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/static/Navbar";
import { Siderbar } from "../components/static/Siderbar";

// import { useEffect } from "react";

// useEffect(() => {
//   // Code to run after render

//   return () => {
//     // Cleanup code (runs before component unmount or before next effect)
//   };
// }, [dependencies]);

const useLoading = (delay = 2000) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return loading;
};

export const SellerLayout = () => {
  const [sidebarOpen, setSiderbarOpen] = useState(false);
  const loading = useLoading();
  return loading ? (
    <Spinner />
  ) : (
    <div className="flex h-screen bg-gray-400">
      <Siderbar sidebarOpen={sidebarOpen} setSiderbarOpen={setSiderbarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar sidebarOpen={sidebarOpen} setSiderbarOpen={setSiderbarOpen} />
        <main className="flex-1 p-4 overflow-y-auto md:p-6 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
