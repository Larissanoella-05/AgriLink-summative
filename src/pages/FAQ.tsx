import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-[90px] min-h-screen bg-white p-8">
      <div className="mx-auto max-w-4xl">
        {}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-black">
            {t("faq.title")}
          </h1>
          <p className="text-gray-600">{t("faq.subtitle")}</p>
        </div>

        {}
        <div className="mb-16 flex justify-center">
          <div className="relative">
            <img
              src="/Images/faq/faq-hero.svg"
              alt={t("faq.illustration_alt")}
              className="w-full max-w-lg rounded-lg transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 transform">
              <div className="h-2 w-32 rounded-full bg-[#ffcb05] opacity-50 blur-sm"></div>
            </div>
          </div>
        </div>

        {}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-black hover:font-extrabold hover:text-[#ffcb05]">
              {t("faq.q1")}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              {t("faq.a1")}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-black hover:font-extrabold hover:text-[#ffcb05]">
              {t("faq.q2")}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              {t("faq.a2")}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-black hover:font-extrabold hover:text-[#ffcb05]">
              {t("faq.q3")}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              {t("faq.a3")}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-black hover:font-extrabold hover:text-[#ffcb05]">
              {t("faq.q4")}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              {t("faq.a4")}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-black hover:font-extrabold hover:text-[#ffcb05]">
              {t("faq.q5")}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              {t("faq.a5")}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-black hover:font-extrabold hover:text-[#ffcb05]">
              {t("faq.q6")}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              {t("faq.a6")}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger className="text-black hover:font-extrabold hover:text-[#ffcb05]">
              {t("faq.q7")}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              {t("faq.a7")}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger className="text-black hover:font-extrabold hover:text-[#ffcb05]">
              {t("faq.q8")}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              {t("faq.a8")}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-9">
            <AccordionTrigger className="text-black hover:font-extrabold hover:text-[#ffcb05]">
              {t("faq.q9")}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              {t("faq.a9")}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-10">
            <AccordionTrigger className="text-black hover:font-extrabold hover:text-[#ffcb05]">
              {t("faq.q10")}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              {t("faq.a10")}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
