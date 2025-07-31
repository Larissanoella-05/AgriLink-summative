import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
export function LanguageSwitch() {
  const [isMobile, setIsMobile] = useState(false);
  const { language, setLanguage } = useContext(LanguageContext);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Select onValueChange={(value) => setLanguage(value)}>
      <SelectTrigger className="w-fit bg-black text-white focus:border-transparent focus:ring focus:ring-white focus-visible:outline-none sm:w-[120px]">
        <SelectValue
          placeholder={
            language === "en"
              ? isMobile
                ? "EN 🇺🇸"
                : "English 🇺🇸"
              : language === "rw"
                ? isMobile
                  ? "RW 🇷🇼"
                  : "Kinyarwanda 🇷🇼"
                : "Select Language"
          }
        />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-800 border dark:border-gray-700">
        <SelectGroup>
          <SelectItem value="en" className="hover:!bg-[#ffcb05] text-black dark:text-white">
            {isMobile ? "EN 🇺🇸" : "English 🇺🇸"}
          </SelectItem>
          <SelectItem value="rw" className="hover:!bg-[#ffcb05] text-black dark:text-white">
            {isMobile ? "RW 🇷🇼" : "Kinyarwanda 🇷🇼"}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
