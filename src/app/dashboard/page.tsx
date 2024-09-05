"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { AiChatSession } from "@/config/AiModel";
import axios from "axios";
import { showToast } from "@/utils/ToastMessage";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import FormCard from "./_components/FormCard";
import { Skeleton } from "@/components/ui/skeleton";
import FormSkeletonCard from "./_components/FormSkeletonCard";

const DashboardPage = () => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [forms, setForms] = useState([]);
  const [fetchFormsTrigger, setFetchFormsTrigger] = useState();
  const [formLoading, setFormLoading] = useState(false);

  const PROMPT =
    "On the basis of description please give form in json format with form title, form subheading, Form field, field name, field Title, field type, placeholder, and label, required in Json format.";

  const handleUserInputValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmitForm = async () => {
    setLoading(true);
    if (!userInput) {
      console.log("Please enter some text");
      setLoading(false);
      return;
    }
    console.log("Description: " + userInput + PROMPT);
    try {
      const result = await AiChatSession.sendMessage(
        "Description: " + userInput + PROMPT
      );
      console.log(result.response.text());

      if (result.response.text()) {
        const response = await axios.post("/api/user/createForm", {
          jsonForm: result.response.text(),
        });

        // console.log(response.data);
        showToast(response.data.message, "success");

        const formId = response.data.form._id;

        router.push(`/edit-form/${formId}`);

        setLoading(false);
      }
    } catch (error: any) {
      console.log(error.message);
      showToast("Error Creating a form", "error");
    } finally {
      setUserInput("");
      setLoading(false);
    }
  };

  const fetchForms = async () => {
    try {
      setFormLoading(true);
      const response = await axios.get("/api/user/fetchForms");
      // console.log(response.data);
      setForms(response.data.forms);
    } catch (error) {
      setFormLoading(false);
    } finally {
      setFormLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, [fetchFormsTrigger]);

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="grid gap-2">
          <h1 className=" text-4xl font-bold">Dashboard</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="">+ Create Form</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Form</DialogTitle>
              <DialogDescription>
                Enter Your prompt to Create a new form using AI.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <textarea
                id="message"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your prompt here..."
                value={userInput}
                onChange={handleUserInputValue}
              ></textarea>
            </div>
            <DialogFooter>
              <DialogClose>
                <Button className="bg-red-500 hover:bg-red-400 w-full md:w-auto">
                  cancel
                </Button>
              </DialogClose>

              <Button
                className="mb-2 md:mb-0 disabled:opacity-50"
                disabled={loading}
                onClick={handleSubmitForm}
              >
                {loading ? (
                  <>
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Submitting...</span>
                    </div>
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {/* <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card> */}

        {formLoading ? (
          <>
            <FormSkeletonCard />
          </>
        ) : forms && forms.length > 0 ? (
          forms.map((form: any, index: number) => (
            <FormCard
              key={index}
              formData={form}
              setFetchFormsTrigger={setFetchFormsTrigger}
            />
          ))
        ) : (
          <h1>No Forms Found</h1>
        )}
      </div>
    </>
  );
};

export default DashboardPage;
