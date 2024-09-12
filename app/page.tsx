import CategoryCardContainer from './homecomponents/categorycardcontainer';
import HeroBanner from './homecomponents/herobanner';
import Navbar from './components/Navigation/Navbar';
import HomepageCarosel from './caroselComponents/homepageCarosel';
export default function Home() {
  return (
    <>
      <Navbar />
      <HeroBanner />
      <div className="container mx-auto px-4 py-8">
        <CategoryCardContainer />
      </div>
      <div className="m-4">
        <h2 className="text-2xl font-bold text-left mb-4">Featured Products</h2>
        <HomepageCarosel />
      </div>
    </>
  );
}