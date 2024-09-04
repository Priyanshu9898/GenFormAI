import axios from "axios";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export const logout = async () => {
  try {
    await axios.get("/api/auth/logout");
    toast.success("Logout successful");
  } catch (error: any) {
    console.log(error.message);
    toast.error(error.message);
  }
};
