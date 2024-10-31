"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface ItemProps {
  title: string;
  children: React.ReactNode;
}

const Item: React.FC<ItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <div className="border rounded-lg shadow-sm dark:border-gray-700">
      <button
        type="button"
        aria-expanded={isOpen}
        className="flex items-center justify-between w-full p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {title}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      <div
        ref={contentRef}
        style={{ maxHeight }}
        className="overflow-hidden transition-max-height duration-300 ease-in-out"
      >
        <div className="p-4 pt-0">
          <p className="text-gray-700 dark:text-gray-300">{children}</p>
        </div>
      </div>
    </div>
  );
};

export default function Faq() {
  const faqs = [
    {
      title: "What services do you offer?",
      content:
        "We offer a wide range of software development services including web development, mobile app development, cloud solutions, and custom software development tailored to your specific needs.",
    },
    {
      title: "How long does a typical project take?",
      content:
        "Project timelines vary depending on the scope and complexity. A simple website might take 4-6 weeks, while a complex custom software solution could take several months. We'll provide a detailed timeline during our initial consultation.",
    },
    {
      title: "Do you provide ongoing support after the project is completed?",
      content:
        "Yes, we offer various support and maintenance packages to ensure your software continues to run smoothly and stays up-to-date with the latest technologies and security standards.",
    },
    {
      title: "What technologies do you specialize in?",
      content:
        "Our team is proficient in a wide array of technologies including React, Node.js, Python, PHP and more. We choose the best technology stack based on your project requirements and goals.",
    },
  ];

  return (
    <section className="w-full py-6 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
            Frequently Asked Questions
          </h2>
          {faqs.map((faq, index) => (
            <Item key={index} title={faq.title}>
              {faq.content}
            </Item>
          ))}
        </div>
      </div>
    </section>
  );
}
