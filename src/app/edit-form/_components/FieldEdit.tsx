"use client";

import { Edit } from "lucide-react";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FieldEdit = ({
  defaultValues,
  handleUpdateField,
  index,
}: {
  defaultValues: any;
  handleUpdateField: any;
  index: number;
}) => {
  const [label, setLabel] = useState(defaultValues?.label);
  const [placeholder, setPlaceholder] = useState(defaultValues?.placeholder);

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Edit className="cursor-pointer hover:text-blue-700" />
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <h4 className="text-xl font-bold leading-none">Edit Fields</h4>
            <div className="flex-grow flex flex-col gap-y-2 items-start justify-center">
              <Label className="">Label Name</Label>
              <Input
                defaultValue={defaultValues?.label}
                onChange={(e: any) => setLabel(e.target.value)}
                value={label}
                className="w-full"
              />
            </div>

            <div className="flex-grow flex flex-col gap-y-2 items-start justify-center">
              <Label className="">Placeholder Name</Label>
              <Input
                defaultValue={defaultValues?.placeholder}
                onChange={(e: any) => setPlaceholder(e.target.value)}
                value={placeholder}
                className="w-full"
              />
            </div>

            <Button
              onClick={() => handleUpdateField({ label, placeholder, index })}
            >
              Update
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FieldEdit;
