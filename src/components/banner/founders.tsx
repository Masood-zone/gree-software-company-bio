import Image from "next/image";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import MasoodImage from "@/assets/images/founder-1.png";
import YeboahImage from "@/assets/images/yeboah.png";

export default function Founders() {
  const teamMembers = [
    {
      name: "MrYEBOAH",
      title: "Founder & CEO",
      imgSrc: YeboahImage,
      socialLinks: [
        {
          href: "https://www.linkedin.com/in/dickson-osei-yeboah-56884728b/",
          icon: <FaLinkedin size={28} />,
          label: "LinkedIn",
        },
        { href: "#", icon: <FaInstagram size={28} />, label: "Instagram" },
        {
          href: "https://github.com/MrYEBOAH",
          icon: <FaGithub size={28} />,
          label: "Github",
        },
      ],
    },
    {
      name: "Masood Acheampong",
      title: "Co-Founder/Managing Director",
      imgSrc: MasoodImage,
      socialLinks: [
        {
          href: "https://www.linkedin.com/in/masood-acheampong-3793b4239",
          icon: <FaLinkedin size={28} />,
          label: "LinkedIn",
        },
        {
          href: "https://www.facebook.com/profile.php?id=100080657544884",
          icon: <FaFacebook size={28} />,
          label: "Facebook",
        },
        {
          href: "https://github.com/masood-zone",
          icon: <FaGithub size={28} />,
          label: "Github",
        },
      ],
    },
  ];

  return (
    <section className="w-full container  mx-auto">
      {/* Text */}
      <div className="h-80 bg-gray-100 dark:bg-gray-800  rounded-xl">
        <div className="container px-6 py-10 mx-auto  ">
          <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
            The Founders of Gree
          </h1>
          <div className="flex justify-center mx-auto mt-6">
            <span className="inline-block w-40 h-1 bg-primary rounded-full"></span>
            <span className="inline-block w-3 h-1 mx-1 bg-primary rounded-full"></span>
            <span className="inline-block w-1 h-1 bg-primary rounded-full"></span>
          </div>
          <p className="max-w-2xl mx-auto mt-6 text-center text-gray-500 dark:text-gray-300">
            Meet the founders of Gree, the people who started it all. They are
            the driving force behind our success and the reason we are where we
            are today.
          </p>
        </div>
      </div>
      {/* Images */}
      <div className="container px-6 py-10 mx-auto -mt-36 sm:-mt-40 md:-mt-52">
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-2">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 border sm:p-6 rounded-xl dark:border-gray-700"
            >
              <Image
                className="object-cover w-full rounded-xl aspect-square"
                src={member.imgSrc}
                alt={`${member.name}'s photo`}
                width={1000}
                height={1000}
              />
              <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white">
                {member.name}
              </h1>
              <p className="mt-2 text-gray-500 capitalize dark:text-gray-300">
                {member.title}
              </p>
              <div className="flex mt-3 -mx-2">
                {member.socialLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    target="_blank"
                    className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
