import CategoryCardContainer from './_components/categorycardcontainer';
import HeroBanner from './_components/herobanner';
import HomeCarousel from './_components/HomeCarousel/HomeCarousel';

export default function Home() {
  return (
    <>
      <HeroBanner />
      <div className="container mx-auto px-4 py-8">
        <CategoryCardContainer />
      </div>
      <div className="m-4">
        <h2 className="text-2xl font-bold text-left mb-4">Featured Products</h2>
        <HomeCarousel />
      </div>
    </>
  );
}