import { useContext } from "react";
import { AsideContext } from "../context/AsideContext";

function useToggleAside() {
  const { asideProfileActive, setAsideProfileActive } =
    useContext(AsideContext);
  return { asideProfileActive, setAsideProfileActive };
}

export { useToggleAside };
