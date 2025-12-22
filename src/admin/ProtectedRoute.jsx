import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!isMounted) return;

      setSession(data?.session ?? null);
      setLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Checking authentication...</p>;
  }

  if (!session) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
