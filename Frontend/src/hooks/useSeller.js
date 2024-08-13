import { useEffect, useState } from "react";
import { readData } from "../services/firestore";
import { auth } from "../lib/firebase/init";
import { useUser } from "./useUser";

function useSeller() {
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (auth.currentUser) {
      setLoading(true);

      const fetchSeller = async () => {
        try {
          const response = await readData("seller", user.idSeller);
          setSeller(response);
        } catch (error) {
          setSeller(null);
        }
      };

      fetchSeller();
    } else {
      setSeller(null);
    }
    setLoading(false);
  }, [user]);

  return { seller, loading };
}

export { useSeller };
