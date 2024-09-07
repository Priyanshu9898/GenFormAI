import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { themes } from "@/app/constants/controllerData";

const ThemeController = ({
  selectedTheme,
  setSelectedTheme,
}: {
  selectedTheme: string;
  setSelectedTheme: any;
}) => {
  const handleThemeChange = (value: string) => {
    setSelectedTheme(value);
    console.log(value);
    console.log(selectedTheme);
  };

  return (
    <>
      <div className="p-4">
        <label htmlFor="themeSelect" className="block text-lg font-medium mb-2">
          Select Theme:
        </label>
        <Select
          defaultValue={selectedTheme}
          onValueChange={(value) => handleThemeChange(value)}
        >
          <SelectTrigger className="w-[280px]" data-theme={selectedTheme}>
            <SelectValue placeholder={selectedTheme} className="" />
          </SelectTrigger>
          <SelectContent>
            {themes.map((theme, index) => {
              return (
                <SelectItem
                  value={theme.name}
                  key={index}
                  className="gap-y-3 my-2 py-3"
                  data-theme={theme.name}
                >
                  {theme.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default ThemeController;
