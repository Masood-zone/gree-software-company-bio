import React from "react";

const AboutSection: React.FC = () => {
  return (
    <div className="py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="rounded-lg bg-gray-100 dark:bg-gray-700 px-4 py-6 md:py-8 lg:py-12">
          <p className="mb-2 text-center font-semibold text-primary md:mb-3 lg:text-lg">
            Gree Software Company
          </p>

          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 dark:text-text-dark md:mb-6 lg:text-3xl">
            Our Vision
          </h2>

          <p className="mx-auto max-w-screen-md text-center text-gray-500 dark:text-text-dark md:text-lg">
            At our company, we are committed to revolutionizing the way
            businesses leverage technology. Our vision is to empower companies
            with innovative solutions that drive growth and efficiency, creating
            a seamless experience for users and a sustainable impact on the
            industry.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
