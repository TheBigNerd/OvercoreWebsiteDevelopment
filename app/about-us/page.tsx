
import Image from 'next/image';
import Navbar from '@/app/components/Navigation/Navbar';
import Logo from '@/public/images/Logo.png';
import missionImage from '@/public/images/Pawel.jpg';

const AboutUs = () => {
  return (
    <>
     <Navbar />
        <div className="text-light py-5">
          <div className="mb-5">
            <h1 className="text-center text-5xl ">About Us</h1>
            <p className="text-center text-xl text-gray-500">
              Discover our story and mission.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center pt-3">
            <div className="md:w-1/2 text-center">
              <h2 className="text-2xl mb-3">Our Story</h2>
              <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              </p>
            </div>
            <div className="md:w-1/3 flex items-center justify-center mt-4">
              <Image src={Logo} className="animate-bounce duration-20 w-40" alt="Logo" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center pt-3">
            <div className="md:w-1/3 flex items-center justify-center mt-4">
              <Image src={missionImage} className="w-3/4 rounded" alt="Mission Image" />
            </div>
            <div className="md:w-1/2 text-center">
              <h2 className="text-2xl mb-3 mt-8">Our Mission</h2>
              <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center pt-3">
            <div className="md:w-1/3">
              <h2 className="text-2xl mb-3 mt-8 text-center">Contact Details</h2>
              <ul className="list-disc list-inside ml-12 pl-5 space-y-1">
                <li>
                  Email: ethan@overcore.co.uk
                </li>
                <li>
                  Phone: 
                </li>
              </ul>
            </div>
          </div>
        </div>
    </>
  );
};

export default AboutUs;
