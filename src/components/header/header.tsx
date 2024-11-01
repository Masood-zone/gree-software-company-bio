import Image from "next/image";
import Link from "next/link";
import Button from "../button/button";
import ClientsLogoCloud from "../logo-cloud/clients-logo-cloud";

export const Header = () => {
  return (
    <div className="relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0 md:py-20 dark:bg-white">
      <div className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
        <svg
          className="absolute left-0 hidden h-full text-white transform -translate-x-1/2 lg:block"
          viewBox="0 0 100 100"
          fill="currentColor"
          preserveAspectRatio="none slice"
        >
          <path d="M50 0H100L50 100H0L50 0Z" />
        </svg>
        <Image
          className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
          src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
          alt=""
          width={1260}
          height={750}
        />
      </div>
      <div
        className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl"
        id="clients"
      >
        <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5 flex flex-col sm:items-start items-center">
          <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-700 sm:text-5xl sm:leading-none sm:text-left text-center">
            Launch an App
            <br className="block" />
            <span className="text-black ">Grow</span> Your{" "}
            <span className="inline-block text-black">Business</span>
          </h2>
          <p className="pr-5 mb-5 text-base text-gray-700 md:text-lg sm:text-left text-center">
            Embrace innovation and take your business to new heights. Start your
            app journey today and watch your business thrive
          </p>
          <div className="flex items-center ">
            <Button variant="default" size="large">
              <Link href="/contact-us">Get started</Link>
            </Button>
            <Button variant="empty">
              <Link href="/about">Learn more</Link>
            </Button>
          </div>
          <div className="mt-5">
            <ClientsLogoCloud />
          </div>
        </div>
      </div>
    </div>
  );
};
