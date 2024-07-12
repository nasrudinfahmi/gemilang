import { useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";

function useToggleAside() {
  const { asideProfileActive, setAsideProfileActive } =
    useContext(ProfileContext);
  return { asideProfileActive, setAsideProfileActive };
}

export { useToggleAside };
