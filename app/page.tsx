
import CategoryCard from './homecomponents/categorycards';
import HeroBanner from './homecomponents/herobanner'
import Navbar from './components/Navigation/Navbar';

export default function Home() {
  return (
    <>
    <Navbar/>
      <HeroBanner/>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-evenly space-x-4">
          <CategoryCard src="/images/Pawel.jpg" alt="Overcore Lite" text="Overcore Lite"/>
          <CategoryCard src="/images/Pawel.jpg" alt="Browse Workstation" text="Browse Workstation"/>
          <CategoryCard src="/images/Pawel.jpg" alt="Overcore Business" text="Overcore Business"/>
        </div>
      </div>
    </>
  );
}