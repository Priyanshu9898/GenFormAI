"use client";

import { showToast } from "@/utils/ToastMessage";
import axios from "axios";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditForm = ({ params }: { params: { formId: string } }) => {
  const [loading, setLoading] = useState(false);

  const fetchFormData = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/user/fetchFormData", {
        formId: params.formId,
      });

      console.log(response.data);

      showToast(response.data.message, "success");
    } catch (error) {
      console.log(error);
      showToast("Fetching form data failed", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>{params.formId}</div>;
};

export default EditForm;
