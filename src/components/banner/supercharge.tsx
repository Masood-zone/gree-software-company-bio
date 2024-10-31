import React from "react";
import Profits from "@/assets/svgs/profits.png";
import Digital from "@/assets/svgs/digital.png";
import Community from "@/assets/svgs/community.png";
import Image from "next/image";

export default function Supercharge() {
  const tips = [
    {
      id: 1,
      title: "Maximize Profits with Precision",
      description:
        "Streamline operations to reduce costs and enhance your app’s revenue potential.",
      icon: Profits,
    },
    {
      id: 2,
      title: "Embrace Digital Transformation",
      description:
        "Adopt digital tools to expand your reach, streamline operations, and create new revenue streams.",
      icon: Digital,
    },
    {
      id: 1,
      title: "Build a Strong Brand Community",
      description:
        "Foster trust and loyalty by engaging your audience, turning them into advocates for your brand.",
      icon: Community,
    },
  ];
  return (
    <section className="w-full flex items-center flex-col sm:py-12 py-6 lg:py-12">
      <h1 className="text-3xl text-center sm:text-5xl font-bold lg:text-6xl py-5">
        Supercharge your business
      </h1>
      <p className="text-xl text-center">
        Achieve the best of business output and effiency by letting us work with
        you.
        <br />
        <span className="italic py-2">A Foundation for long-term success.</span>
      </p>
      <div className="grid gap-8 sm:grid-cols-2 md:gap-12 xl:grid-cols-3 xl:gap-16 py-10">
        {tips.map((tip) => (
          <div key={tip.id} className="flex gap-4 md:gap-6">
            {/* Icon */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-white shadow-lg md:h-14 md:w-14 md:rounded-xl">
              <Image src={tip.icon} alt="" />
            </div>
            {/* Text */}
            <div>
              <h3 className="mb-2 text-lg font-semibold md:text-xl">
                {tip.title}
              </h3>
              <p className="mb-2 text-gray-500 dark:text-gray-300">
                {tip.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
