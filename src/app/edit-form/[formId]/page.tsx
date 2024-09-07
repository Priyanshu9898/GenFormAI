"use client";

import { showToast } from "@/utils/ToastMessage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import FormUI from "../_components/FormUI";
import Navbar from "../_components/Header";
import ThemeController from "../_components/ThemeController";

const EditForm = ({ params }: { params: { formId: string } }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);
  const router = useRouter();
  const [updateTrigger, setUpdateTrigger] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState("light");

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTheme(e.target.value);
  };

  const formID = params.formId;

  const fetchFormData = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/user/fetchFormData", {
        formId: params.formId,
      });

      setFormData(response.data.formData);
      showToast(response.data.message, "success");
    } catch (error) {
      showToast("Fetching form data failed", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full p-4">
        {/* Back Button */}
        <div className="mb-4">
          <h2
            className="flex gap-2 items-center hover:font-bold cursor-pointer text-xl"
            onClick={() => router.back()}
          >
            <ArrowLeft />
            Back
          </h2>
        </div>

        {/* Responsive Grid for the two sections */}
        <div className="grid min-h-screen w-full gap-6 md:grid-cols-2 lg:grid-cols-[400px_1fr]">
          {/* Section 1 */}
          <div className="flex flex-col gap-2 border-none h-screen">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex-1 w-full items-center justify-center px-4 py-4 bg-gray-50 h-full rounded-lg shadow-md border">
                {/* <h3 className="text-lg font-semibold">Section 1 Content</h3> */}
                {/* You can add your Section 1 content here */}
                <ThemeController
                  selectedTheme={selectedTheme}
                  setSelectedTheme={setSelectedTheme}
                />
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="flex flex-col">
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 w-full lg:py-4 h-screen items-center justify-center  bg-gray-50 rounded-lg shadow-md border">
              {/* FormUI Section */}
              <div className="flex flex-col items-center justify-center w-full h-full px-4 py-4">
                <FormUI
                  jsonForm={formData}
                  setFormData={setFormData}
                  updateTrigger={updateTrigger}
                  setUpdateTrigger={setUpdateTrigger}
                  formId={formID}
                  selectedTheme={selectedTheme}
                />
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditForm;
