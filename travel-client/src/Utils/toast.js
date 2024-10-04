import { toast, Zoom } from "react-toastify";

export default function displayToast(
  type = "error",
  message = "Oops, Something went wrong"
) {
  const toastOptions = {
    position: "bottom-left",
    autoClose: 1300,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "dark",
    transition: Zoom,
  };

  switch (type) {
    case "success":
      toast.success(message, toastOptions);
      break;
    case "error":
      toast.error(message, toastOptions);
      break;
    case "warn":
      toast.warn(message, toastOptions);
      break;
    case "info":
      toast.info(message, toastOptions);
      break;
    default:
      toast.error(message, toastOptions);
      break;
  }
}
