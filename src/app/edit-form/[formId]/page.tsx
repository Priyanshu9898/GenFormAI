"use client";

import { showToast } from "@/utils/ToastMessage";
import axios from "axios";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { logout } from "@/action/Logout";
import FormUI from "../_components/FormUI";

const EditForm = ({ params }: { params: { formId: string } }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(null);

  const formID = params.formId;

  const fetchFormData = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/user/fetchFormData", {
        formId: params.formId,
      });

      console.log(response.data.formData, typeof response.data.formData);

      setFormData(response.data.formData);

      showToast(response.data.message, "success");
    } catch (error) {
      console.log(error);
      showToast("Fetching form data failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setUser(res.data.data);
  };

  const userLogout = async () => {
    await logout();
    router.push("/login");
    router.refresh();
  };

  useEffect(() => {
    fetchFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-2 lg:grid-cols-[350px_1fr]">
        <div className="hidden border-none md:block h-screen">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link
                className=" text-[#8a17ff] flex flex-row items-center justify-center"
                href="/"
              >
                <span className="sr-only">GenFormAI</span>
                <svg
                  className="h-8"
                  viewBox="0 0 28 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                    fill="currentColor"
                  />
                </svg>
                <h3 className="ml-4 font-bold text-xl">GenFormAI</h3>
              </Link>
            </div>
            <div className="flex-1 px-4 py-3">
              <div className="flex-1 w-full items-center justify-center px-4 py-4 bg-gray-50 h-full rounded-lg shadow-md border">
                <h2
                  className="flex gap-2 items-start hover:font-bold cursor-pointer"
                  onClick={() => router.back()}
                >
                  <ArrowLeft />
                  Back
                </h2>
              </div>
            </div>
            {/* <div className="mt-auto p-4"></div> */}
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Link
              className=" md:hidden text-[#8a17ff] flex flex-row items-center justify-center"
              href="/"
            >
              <span className="sr-only">GenFormAI</span>
              <svg
                className="h-8"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                  fill="currentColor"
                />
              </svg>
              <h3 className="ml-4 font-bold text-xl">GenFormAI</h3>
            </Link>
            <div className="ml-auto">
              <Button
                onClick={userLogout}
                className="block rounded-md bg-[#8a17ff] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-bg-purple-600"
              >
                Logout
              </Button>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                  <h2
                    className="flex gap-2 items-start hover:font-bold cursor-pointer"
                    onClick={() => router.back()}
                  >
                    <ArrowLeft />
                    Back
                  </h2>
                </nav>
              </SheetContent>
            </Sheet>
          </header>
          <div className="sidebar lg:hidden w-full ">
            <div className="flex-1 px-4 py-3 ">
              <div className="flex-1 w-full items-center justify-center px-4 py-4 bg-gray-50 h-full rounded-lg shadow-md border">
                <h2
                  className="flex gap-2 items-start hover:font-bold cursor-pointer"
                  onClick={() => router.back()}
                >
                  <ArrowLeft />
                  Back
                </h2>
              </div>
            </div>
          </div>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 w-full lg:py-4 h-screen items-center justify-center">
            {/* Main content goes here */}
            <div className="flex flex-col items-center justify-center w-full h-full px-4 py-4 bg-gray-50 rounded-lg shadow-md border">
              <FormUI
                jsonForm={formData}
                setFormData={setFormData}
                updateTrigger={updateTrigger}
                setUpdateTrigger={setUpdateTrigger}
                formId={formID}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default EditForm;
