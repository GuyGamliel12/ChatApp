import Swal from "sweetalert2";

const Popup = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const makePopup = (type, msg) => {
  Popup.fire({
    icon: type,
    title: msg,
  });
};

export default makePopup;
