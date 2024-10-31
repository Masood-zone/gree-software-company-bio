"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { services } from "@/assets/data";

export default function Service({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const resolvedParams = use(params);
  const service = services.find((s) => s.id === parseInt(resolvedParams.uid));

  if (!service) return notFound();

  const otherServices = services.filter((s) => s.id !== service.id);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const staggerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 py-16 max-w-4xl"
      >
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {service.title}
          </h1>
          <p className="text-xl text-muted-foreground">{service.overview}</p>
        </div>

        {/* Main Image */}
        <motion.div
          variants={containerVariants}
          className="relative w-full h-[400px] rounded-xl overflow-hidden mb-12"
        >
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Content */}
        <motion.div
          variants={containerVariants}
          className="prose prose-lg dark:prose-invert mx-auto mb-16"
          dangerouslySetInnerHTML={{ __html: service.content }}
        />

        {/* More Services */}
        <motion.div
          variants={containerVariants}
          className="border-t dark:border-gray-800 pt-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            More Services
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {otherServices.map((otherService, index) => (
              <motion.div
                key={otherService.id}
                custom={index}
                variants={staggerVariants}
                className="group relative overflow-hidden rounded-lg border dark:border-gray-800 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <otherService.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {otherService.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {otherService.overview}
                    </p>
                    <Link
                      href={`/services/${otherService.id}`}
                      className="inline-flex items-center text-primary hover:text-primary/80"
                    >
                      Learn more
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
