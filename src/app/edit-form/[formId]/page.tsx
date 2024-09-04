"use client";

import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

const EditForm = ({ params }: { params: { formId: string } }) => {
  return <div>{params.formId}</div>;
};

export default EditForm;
