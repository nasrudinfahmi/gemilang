import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
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

export { Toast, loadingToast };
