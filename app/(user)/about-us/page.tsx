import React from 'react';
import Image, { StaticImageData } from 'next/image'; // Assuming you're using Next.js for images
import Ethan from '@/public/images/Ethan.jpg'; // Example imports for images
import Farhan from '@/public/images/Farhan.jpg';
import Sam from '@/public/images/Sam.jpg';
import Archie from '@/public/images/Archie.jpg';
import OrangeDesktop from '@/public/images/orange_desktop.jpg'; // Importing the new image

// A reusable component for circular images with text
interface TeamMemberProps {
  imageSrc: StaticImageData;
  altText: string;
  description: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ imageSrc, altText, description }) => (
  <div className="flex flex-col items-center">
    <div className="w-24 h-24 rounded-full overflow-hidden">
      <Image src={imageSrc} alt={altText} layout="intrinsic" objectFit="cover" width={96} height={96} />
    </div>
    <p className="text-center text-sm mt-2">{description}</p>
  </div>
);

const AboutUs = () => {
  return (
    <>
      <div className="text-light py-10">
        {/* About Us Title */}
        <div className="mb-10">
          <h1 className="text-center text-5xl font-bold">About Us</h1>
        </div>

        {/* Our Story Section */}
        <div className="flex justify-center mb-8">
          <div className="p-8 md:w-3/4 lg:w-1/2 text-center">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-lg text-gray-700">
            We&apos;re a group of four university friends who bonded over our passion for technology while studying computer science. After years of honing our skills and staying up-to-date with the latest innovations, we decided to turn our shared expertise into something more. Combining our technical knowledge with a commitment to quality, we&apos;ve built a company that delivers reliable, high-performance computers tailored to our customers&apos; needs. Based in the UK, we&apos;re proud to help people stay connected and achieve their tech goals.
            </p>
          </div>
        </div>

        {/* Horizontal Line Separator */}
        <div className="flex justify-center my-8">
          <hr className="border-t border-gray-300 w-1/2" style={{ height: '1px' }} />
        </div>

        {/* Our Mission Section with Image */}
        <div className="flex justify-center mb-8 text-center">
          <div className="flex p-8 md:w-3/4 lg:w-1/2 space-x-8 items-center">
            {/* Text Section */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-gray-700">
              Our mission is to provide affordable, top-quality computers to people across the UK. As a team of computer science graduates, we understand the importance of powerful, reliable systems, whether for gaming, work, or everyday use. We aim to make technology accessible to all, offering personalized service, expert advice, and products that meet the evolving needs of our customers in a fast-paced digital world.
              </p>
            </div>

            {/* Image Section */}
            <div className="flex-1">
              <Image src={OrangeDesktop} alt="Orange Desktop" layout="responsive" objectFit="cover" />
            </div>
          </div>
        </div>

        {/* Horizontal Line Separator */}
        <div className="flex justify-center my-8">
          <hr className="border-t border-gray-300 w-1/2" style={{ height: '1px' }} />
        </div>

        {/* Who are we? Section */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-6">Who Are We?</h2>
          <div className="flex justify-center space-x-8">
            <TeamMember imageSrc={Ethan} altText="Ethan" description="Ethan - Financial Operator" />
            <TeamMember imageSrc={Farhan} altText="Farhan" description="Farhan - HR Manager" />
            <TeamMember imageSrc={Sam} altText="Sam" description="Sam - Marketing Lead" />
            <TeamMember imageSrc={Archie} altText="Archie" description="Archie - Technical Consultant" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;