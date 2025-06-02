// import { useState } from "react";
// import Image from "next/image";
// import { pricing_structure } from "@/assets/data";
// import StarterImage from "@/assets/svgs/pro.webp";
// import TeamImage from "@/assets/svgs/team.webp";
// import OrganizationImage from "@/assets/svgs/organization.webp";
import { Button } from "@/components/ui/button";

// const plans = [
//   {
//     name: "Starter",
//     description: "Perfect for small projects and individuals",
//     price: 15,
//     icon: StarterImage,
//     features: [
//       "Favorite profile",
//       "Questions & Answers (soon)",
//       "UI templates, icons, illustrations (Limited to 5)",
//     ],
//   },
//   {
//     name: "Team",
//     description: "Ideal for growing businesses and teams",
//     price: 189,
//     icon: TeamImage,
//     features: [
//       "All Starter features",
//       "Source files, ePub",
//       "Premium tutorials",
//       "UI templates, icons, illustrations (Unlimited)",
//     ],
//   },
//   {
//     name: "Organization",
//     description: "For large enterprises and organizations",
//     price: 379,
//     icon: OrganizationImage,
//     features: [
//       "All Team features",
//       "All courses and videos",
//       "Commercial use",
//       "Manage team and see progress",
//     ],
//   },
// ];

export default function PricingPage() {
  // const [selectedService, setSelectedService] = useState(pricing_structure[0]);

  return (
    <div className="xl:container m-auto px-6 py-20 md:px-12 lg:px-20 xl:px-0">
      <div className="m-auto text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white md:text-4xl">
          Our Services & Pricing
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Explore our tailored web development services to boost your online
          presence, enhance operations, and increase engagement. From management
          systems to advertisement sites, portfolios, e-commerce platforms, and
          custom solutions, we deliver exactly what you need.
        </p>
      </div>
      <div className="m-auto mt-12">
        {/* Under development section */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            Our pricing structure is currently under development. Please check
            back later.
          </h3>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            In the meantime, feel free to contact us for a custom quote or
            consultation.
          </p>
          <div className="w-56 m-auto mt-8">
            <Button href="/contact-us" size="medium" variant="outline">
              <span className="relative text-base font-semibold text-sky-600 dark:text-white">
                Contact us
              </span>
            </Button>
          </div>
        </div>
      </div>
      {/* <div className="m-auto mt-12">
        <div className="relative z-10">
          <div className="relative overflow-auto p-6">
            <table className="w-full border-t border-gray-100 dark:border-gray-700">
              <thead>
                <tr>
                  <td className="p-4 sm:sticky">
                    <div className="mb-4">
                      <label
                        htmlFor="service-select"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Select a service
                      </label>
                      <select
                        id="service-select"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border dark:border-gray-700 dark:text-gray-200 dark:bg-gray-800"
                        value={selectedService.category}
                        onChange={(e) =>
                          setSelectedService(
                            pricing_structure.find(
                              (s) => s.category === e.target.value
                            ) || pricing_structure[0]
                          )
                        }
                      >
                        {pricing_structure.map((service) => (
                          <option
                            key={service.category}
                            value={service.category}
                          >
                            {service.category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedService.description}
                    </p>
                  </td>
                  {plans.map((plan) => (
                    <td key={plan.name} className="p-8 space-y-8">
                      <Image
                        src={plan.icon}
                        alt={`${plan.name} icon`}
                        width={48}
                        height={48}
                        className="h-12 w-auto"
                      />
                      <div className="space-y-4">
                        <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                          {plan.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {plan.description}
                        </p>
                      </div>
                      <h3 className="text-4xl text-gray-900 dark:text-white font-bold flex">
                        <span className="text-lg text-gray-500">$</span>
                        {plan.price}
                        <span className="ml-4 h-max mt-auto text-lg text-gray-500 font-light">
                          / Month
                        </span>
                      </h3>
                      <Button href="/contact-us" size="large" variant="outline">
                        <span className="relative text-base font-semibold text-sky-600 dark:text-white">
                          Contact us
                        </span>
                      </Button>
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedService.features.map((feature) => (
                  <tr key={feature.name}>
                    <td className="left-0 border border-sky-100 dark:border-gray-700 bg-sky-50 dark:bg-gray-800 p-4 font-medium text-sky-900 dark:text-gray-200 sm:sticky">
                      <span className="block w-max">{feature.name}</span>
                    </td>
                    {plans.map((plan) => (
                      <td
                        key={`${plan.name}-${feature.name}`}
                        className="border border-gray-100 dark:border-gray-700 p-4 text-center"
                      >
                        {plan.features.includes(feature.name) ? (
                          <span className="text-green-500">&check;</span>
                        ) : (
                          <span className="text-red-500 text-2xl">&times;</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div> */}
    </div>
  );
}
