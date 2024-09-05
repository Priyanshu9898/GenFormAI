/* eslint-disable react/jsx-key */

"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import FieldEdit from "./FieldEdit";
import { Delete, Trash } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { showToast } from "@/utils/ToastMessage";
import axios from "axios";

const FormUI = ({
  jsonForm,
  updateTrigger,
  setUpdateTrigger,
  setFormData,
  formId,
}: {
  jsonForm: any;
  updateTrigger: any;
  setUpdateTrigger: any;
  setFormData: any;
  formId: string;
}) => {
  console.log(formId);
  const updateForm = async () => {
    try {
      const response = await axios.put("/api/user/updateForm", {
        formId: formId,
        jsonFormData: jsonForm,
      });

      console.log(response.data);

      showToast("Form Updated Successfully", "success");
    } catch (error: any) {
      console.error(error);
      showToast(error.message, "error");
    }
  };
  const deleteField = async (index: number) => {
    if (jsonForm && jsonForm.jsonForm && jsonForm.jsonForm[index]) {
      const updatedJsonForm = jsonForm.jsonForm.filter(
        (item: any, i: number) => i !== index
      );

      const updatedFormData = { ...FormData, jsonForm: updatedJsonForm };

      console.log(updatedFormData);

      setFormData(updatedFormData);
      setUpdateTrigger(Date.now());

      await updateForm();
    } else {
      console.error("jsonForm or jsonForm[index] is undefined");
    }
  };
  const handleUpdateField = async ({
    label,
    placeholder,
    index,
  }: {
    label: any;
    placeholder: any;
    index: number;
  }) => {
    // console.log(label, placeholder, index);
    if (jsonForm && jsonForm.jsonForm && jsonForm.jsonForm[index]) {
      jsonForm.jsonForm[index].label = label;
      jsonForm.jsonForm[index].placeholder = placeholder;

      setFormData(jsonForm);
      setUpdateTrigger(Date.now());

      await updateForm();
    } else {
      console.error("jsonForm or jsonForm[index] is undefined");
    }
  };

  useEffect(() => {
    setFormData(jsonForm);
  }, [jsonForm, setFormData, updateTrigger]);
  return (
    <>
      <div
        className="flex-1 border p-5 w-full lg:w-[600px]"
        key={jsonForm?.title}
      >
        <h1 className="text-center font-bold text-2xl">{jsonForm?.title}</h1>

        <h2 className="text-center text-sm text-gray-400">
          {jsonForm?.description}
        </h2>

        {jsonForm?.jsonForm.map((field: any, index: number) => {
          return (
            <>
              <div
                key={index}
                className="flex flex-row items-center justify-between gap-3 my-4"
              >
                {field?.fieldType === "select" ? (
                  <div className="flex-grow">
                    <Label className="">{field.label}</Label>
                    <Select>
                      <SelectTrigger className="w-full lg:w-[480px]">
                        <SelectValue placeholder={field?.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {field?.options.map((option: any, index: string) => (
                          <SelectItem
                            value={option.value}
                            key={index}
                            id={index}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : null}

                {field?.fieldType === "checkbox" ? (
                  <div className="flex-grow flex items-center space-x-2">
                    <Checkbox id={field?.fieldTitle} />
                    <label
                      htmlFor={field?.fieldTitle}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {field?.label}
                    </label>
                  </div>
                ) : null}

                {/* Default Input Field */}
                {field?.fieldType !== "select" &&
                field?.fieldType !== "multiSelect" &&
                field?.fieldType !== "radio" &&
                field?.fieldType !== "checkboxGroup" &&
                field?.fieldType !== "textarea" &&
                field?.fieldType !== "checkbox" ? (
                  <div className="flex-grow flex flex-col gap-y-2 items-start justify-center">
                    <Label className="">{field.label}</Label>
                    <Input
                      type={field?.fieldType}
                      name={field?.fieldName}
                      placeholder={field?.placeholder}
                      className="w-full"
                    />
                  </div>
                ) : null}

                {field?.fieldType === "multiSelect" ||
                field?.fieldType === "checkboxGroup" ? (
                  <div className="flex-grow flex flex-col gap-y-2">
                    <Label className="">{field?.label}</Label>

                    {field?.options.map((option: any, index: string) => (
                      <div className="flex items-center space-x-2" key={index}>
                        <Checkbox id={index} />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : null}

                {field?.fieldType === "radio" ? (
                  <div className="flex-grow flex flex-col gap-y-2">
                    <Label className="">{field.label}</Label>
                    <RadioGroup defaultValue={field?.options[0]?.value}>
                      {field.options.map((option: any, index: string) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={option?.value}
                            id={`option-${index}`}
                          />
                          <Label htmlFor={`option-${index}`}>
                            {option?.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ) : null}

                {field?.fieldType === "textarea" ? (
                  <div className="flex-grow flex flex-col gap-y-2">
                    <Label className="">{field.label}</Label>
                    <Textarea
                      name={field?.fieldName}
                      placeholder={field?.placeholder}
                      className="w-full lg:w-[480px] p-2 border rounded"
                      rows={5}
                    />
                  </div>
                ) : null}

                {/* Edit and Delete buttons */}
                <div className="flex flex-row items-center justify-center gap-x-3  flex-shrink-0">
                  <FieldEdit
                    defaultValues={field}
                    handleUpdateField={handleUpdateField}
                    index={index}
                  />

                  <Dialog>
                    <DialogTrigger>
                      <Trash
                        className="cursor-pointer hover:text-red-600"
                        key={index}
                      />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose>
                          <Button className="bg-red-500 hover:bg-red-400 w-full md:w-auto">
                            cancel
                          </Button>
                        </DialogClose>
                        <Button onClick={() => deleteField(index)}>
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default FormUI;
