import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CircleQuestionMark } from "lucide-react";

export default function FAQSection() {
  const faqs = [
    {
      question: "What is Blogify?",
      answer:
        "Blogify is a clean, backend-powered blogging platform that makes it easy to create and share blogs.",
    },
    {
      question: "Is it free to use?",
      answer:
        "Yes, Blogify is completely free with no tiers or hidden charges. All features are available to every user without any cost.",
    },
    {
      question: "Can I insert videos and images in my Blogs?",
      answer:
        "Yes. Our TinyMCE editor supports images, videos, GIFs, links, and other embedded content formats.",
    },
    {
      question: "Can I edit or delete my blogs later?",
      answer:
        "Yes, you can update or delete any of your published blogs anytime. Full control stays with you.",
    },
  ];

  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-6 max-w-4xl lg:mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-primary mb-4 flex items-center justify-center text-2xl font-semibold lg:text-4xl">
            <CircleQuestionMark className="mr-2 scale-110" strokeWidth={1.5} />
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left leading-relaxed lg:text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pl-4 leading-relaxed lg:text-lg">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
