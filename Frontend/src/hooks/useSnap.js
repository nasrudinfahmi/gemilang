import { useEffect, useState } from "react";

function useSnap() {
  const [snap, setSnap] = useState();

  useEffect(() => {
    const midtransScriptUrl = import.meta.env.VITE_MIDTRANS_URL_DEV;
    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    const myMidtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);

    scriptTag.onload = () => {
      if (window.snap) {
        setSnap(window.snap);
      } else {
        console.error(
          "Midtrans script loaded, but window.snap is not available"
        );
      }
    };

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return { snap };
}

export default useSnap;
