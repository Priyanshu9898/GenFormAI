/* eslint-disable react/jsx-key */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
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

const FormUI = ({ jsonForm }: { jsonForm: any }) => {
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

        {jsonForm?.jsonForm?.map((field: any, index: number) => {
          return (
            <>
              {field?.fieldType === "select" ? (
                <>
                  <div className="my-4">
                    <Label className="">{field.label}</Label>
                    <Select>
                      <SelectTrigger className="w-full lg:w-[600px]">
                        <SelectValue placeholder={field?.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {field?.options.map((option: any, index: string) => (
                          <SelectItem value={option} key={index} id={index}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : null}

              {/* Default Input Field */}
              {field?.fieldType !== "select" &&
              field?.fieldType !== "multiSelect" &&
              field?.fieldType !== "radio" &&
              field?.fieldTyoe !== "checkboxGroup" &&
              field?.fieldType !== "textarea" ? (
                <>
                  <div className="flex flex-col gap-y-2 items-start justify-center my-4">
                    <Label className="">{field.label}</Label>
                    <Input
                      type={field?.fieldType}
                      name={field?.fieldName}
                      placeholder={field?.placeholder}
                    />
                  </div>
                </>
              ) : null}

              {field?.fieldType === "multiSelect" ||
              field?.fieldType === "checkboxGroup" ? (
                <>
                  <div className="flex flex-col gap-y-2 my-4">
                    <Label className="">{field.label}</Label>

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
                </>
              ) : null}

              {field?.fieldType === "radio" ? (
                <div className="flex flex-col gap-y-2 my-4">
                  <Label className="">{field.label}</Label>
                  <RadioGroup defaultValue={field?.options[0]?.value}>
                    {field.options.map((option: any, index: string) => (
                      <div key={index} className="flex items-center space-x-2">
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
                <div className="flex flex-col gap-y-2 items-start justify-center my-4">
                  <Label className="">{field.label}</Label>
                  <Textarea
                    name={field?.fieldName}
                    placeholder={field?.placeholder}
                    className="w-full lg:w-[600px] p-2 border rounded"
                    rows={5}
                  />
                </div>
              ) : null}
            </>
          );
        })}
      </div>
    </>
  );
};

export default FormUI;
