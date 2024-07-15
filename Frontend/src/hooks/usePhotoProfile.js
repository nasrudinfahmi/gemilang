import { useContext } from "react";
import { PhotoProfileContext } from "../context/PhotoProfileContext";

const usePhotoProfile = () => {
  const { photoPofileUrl, setPhotoProfileUrl } =
    useContext(PhotoProfileContext);
  return { photoPofileUrl, setPhotoProfileUrl };
};

export { usePhotoProfile };
