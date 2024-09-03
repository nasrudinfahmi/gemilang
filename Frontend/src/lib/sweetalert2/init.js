import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

const loadingToast = (icon, title, timer) => {
  const iconLoading = icon || "info";
  const titleLoading = title || "Loading";
  const timerLoading = timer || 3000;

  return Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: timerLoading,
    timerProgressBar: true,
    title: titleLoading,
    icon: iconLoading,
  });
};

const confirmToast = ({ title, text = "", confText, cancelText }) => {
  return {
    title: title,
    text: text,
    customClass: {
      container: "confirm-container-swap",
    },
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confText,
    cancelButtonText: cancelText,
    confirmButtonAriaLabel: confText,
    cancelButtonAriaLabel: cancelText,
  };
};

const inputToast = async ({
  title,
  label,
  type,
  confirmBtnText,
  cancelBtnText,
}) => {
  const { value } = await Swal.fire({
    title,
    input: type,
    inputLabel: label || "",
    showCancelButton: true,
    confirmButtonText: confirmBtnText,
    cancelButtonText: cancelBtnText,
    customClass: {
      container: "z-[999999]",
    },
  });
  if (value) return value;
  return null;
};

export { Toast, loadingToast, confirmToast, inputToast };
