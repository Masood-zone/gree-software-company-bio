import Image from "next/image";
import React from "react";
import SeanNationTVLogo from "@/assets/images/sean-nation-logo.jpg";
import RamothServicesLogo from "@/assets/images/ramoth-official-logo.png";

export default function ClientsLogoCloud() {
  return (
    <>
      <div className="items-center gap-5 lg:flex">
        <div className="lg:w-full">
          <h2 className="text-2xl text-center sm:text-left font-bold text-gray-800 dark:text-black">
            Our clients
          </h2>
          <p className="text-gray-600 dark:text-black sm:text-left text-center">
            We have already worked for +2 clients
          </p>
        </div>
        <div className="mt-8 lg:mt-0 lg:w-full">
          <div className="-mx-6 flex flex-wrap gap-6 px-6 md:justify-start lg:gap-2 justify-center">
            <div className="flex items-center rounded-xl lg:p-4 lg:hover:bg-white w-12 h-12 lg:w-20 overflow-hidden lg:h-20">
              <Image
                src={SeanNationTVLogo}
                className="w-full h-full"
                alt="Sean Nation TV Logo"
              />
            </div>

            <div className="flex items-center rounded-xl lg:p-4 lg:hover:bg-white w-12 h-12 lg:w-20 lg:h-20">
              <Image
                src={RamothServicesLogo}
                className="w-full h-full"
                alt="Ramoth Services Limited Logo"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
