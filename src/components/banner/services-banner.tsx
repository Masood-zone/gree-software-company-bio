import { services } from "@/assets/data";
import Link from "next/link";
import React from "react";

export default function ServicesBanner() {
  return (
    <section className="w-full">
      <div className="max-w-xl mb-10 md:mb-16 mx-auto place-items-center">
        <div>
          <p className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-primary uppercase rounded-full bg-primary/10">
            Services
          </p>
        </div>
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl sm:leading-none">
          Our Services
        </h2>
        <p className="text-base text-muted-foreground md:text-lg text-center">
          We offer a range of services to help your organization achieve its
          goals. From application delivery to system management, we provide
          flexible solutions that are tailored to your needs.
        </p>
      </div>
      <div className="grid gap-8 row-gap-5 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="relative p-px overflow-hidden transition duration-300 transform border rounded shadow-sm hover:scale-105 group hover:shadow-xl dark:border-gray-700"
          >
            <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0 bg-primary group-hover:scale-x-100" />
            <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0 bg-primary group-hover:scale-y-100" />
            <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0 bg-primary group-hover:scale-x-100" />
            <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0 bg-primary group-hover:scale-y-100" />
            <div className="relative p-5 bg-background rounded-sm">
              <div className="flex flex-col mb-2 lg:items-center lg:flex-row">
                <div className="flex items-center justify-center w-10 h-10 mb-4 mr-2 rounded-full bg-primary/10 lg:mb-0">
                  <service.icon className="w-6 h-6" />
                </div>
                <h6 className="font-semibold leading-5 text-foreground">
                  {service.title}
                </h6>
              </div>
              <p className="mb-2 text-sm text-muted-foreground">
                {service.overview}
              </p>
              <Link
                href={`/services/${service.id}`}
                className="inline-flex items-center text-sm font-semibold transition-colors duration-200 text-primary hover:text-primary/80"
              >
                Learn more
                <svg
                  className="inline-block w-3 ml-2"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
