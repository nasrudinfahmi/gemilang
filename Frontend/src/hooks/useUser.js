import { useContext, useEffect, useState } from "react";
import { readData } from "../services/firestore";
import { auth } from "../lib/firebase/init";
import { UserContext } from "../context/UserContext";

function useUser() {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      (async function fetchUser() {
        try {
          setLoading(true);
          const response = await readData("user", auth.currentUser.uid);
          setUser(response);
        } catch (error) {
          throw new Error(error.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [setUser, user]);

  return { user, loading };
}

export { useUser };
