"use client";

import React, { useState } from "react";
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

const DashboardPage = () => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const PROMPT =
    "On the basis of description please give form in json format with form title, form subheading, Form field, form name, placeholder name, and form label, in Json format.";

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
    console.log("handleSubmitForm", userInput);

    console.log("Description: " + userInput + PROMPT);
    const result = await AiChatSession.sendMessage(
      "Description: " + userInput + PROMPT
    );
    console.log(result.response.text());

    setUserInput("");
    setLoading(false);
  };

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
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default DashboardPage;
