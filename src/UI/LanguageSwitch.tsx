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
              : language === "fr"
                ? isMobile
                  ? "FR 🇫🇷"
                  : "Français 🇫🇷"
                : language === "es"
                  ? isMobile
                    ? "ES 🇪🇸"
                    : "Español 🇪🇸"
                  : "Select Language"
          }
        />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          <SelectItem value="rw" className="hover:!bg-[#ffcb05]">
            {isMobile ? "RW 🇷🇼" : "Kinyarwanda 🇷🇼"}
          </SelectItem>
          <SelectItem value="en" className="hover:!bg-[#ffcb05]">
            {isMobile ? "EN 🇺🇸" : "English 🇺🇸"}
          </SelectItem>
          <SelectItem className="hover:!bg-[#ffcb05]" value="fr">
            {isMobile ? "FR 🇫🇷" : "Français 🇫🇷"}
          </SelectItem>
          <SelectItem className="hover:!bg-[#ffcb05]" value="es">
            {isMobile ? "ES 🇪🇸" : "Español 🇪🇸"}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
