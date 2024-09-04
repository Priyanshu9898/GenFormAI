"use client";

import toast from "react-hot-toast";

// Utility function to display a toast message
export const showToast = (
  message: string,
  type: "success" | "error" | "loading" | "custom" = "success"
) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "loading":
      toast.loading(message);
      break;
    default:
      toast(message);
      break;
  }
};
