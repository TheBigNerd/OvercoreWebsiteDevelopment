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
            <h1 className="text-left text-5xl ">Favourites</h1>
          </div>
          
        </div>
    </>
  );
};

export default AboutUs;