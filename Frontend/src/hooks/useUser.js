import { useEffect, useState } from "react";
import { readData } from "../services/firestore";
import { auth } from "../lib/firebase/init";

function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth.currentUser) {
      setLoading(true);
      const idUser = auth.currentUser.uid;

      const fetchUser = async () => {
        try {
          const response = await readData("user", idUser);
          setUser(response);
        } catch (error) {
          setUser(null);
        }
      };

      fetchUser();
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  return { user, loading };
}

export { useUser };
