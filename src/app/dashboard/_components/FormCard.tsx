import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { showToast } from "@/utils/ToastMessage";
import axios from "axios";
import { Delete, DollarSign, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const FormCard = ({ formData }: { formData: any }) => {
  const router = useRouter();

  const editFormHandler = (id: any) => {
    router.push(`edit-form/${id}`);
  };

  const deleteFormHandler = async (id: any) => {
    try {
      const response = await axios.delete(`/api/user/deleteForm`, {
        params: { formId: id }, // pass formId as query parameter
      });

      console.log(response.data);
    } catch (error) {
      showToast("Error deleting form", "error");
    }
  };
  return (
    <>
      <Card className="flex flex-col h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">{formData?.title}</CardTitle>
          <Trash
            onClick={() => deleteFormHandler(formData?._id)}
            className="h-6 w-6 text-muted-foreground hover:text-red-900 text-red-500 cursor-pointer"
          />
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="text-lg font-normal">{formData?.description}</div>
        </CardContent>
        <hr />
        <CardFooter className=" mt-5 flex justify-between">
          <Button>Share</Button>
          <Button onClick={() => editFormHandler(formData?._id)}>Edit</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default FormCard;
