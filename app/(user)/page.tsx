import CategoryCardContainer from './_components/categorycardcontainer';
import HeroBanner from './_components/herobanner';
import HomeCarousel from './_components/HomeCarousel/HomeCarousel';
import TopBanner from './_components/TopBanner';

export default function Home() {
  return (
    <>
      <div>
        <TopBanner />
      </div>
      <div className=''>
        <HeroBanner />
      </div>
      <div className="container mx-auto px-4 py-8">
        <CategoryCardContainer />
      </div>
      <div className="m-4">
        <div className='flex justify-center'>
          <h2 className="text-2xl font-bold mb-4 relative text-center md:text-left" style={{ right: '0' }}>Featured Products</h2>
        </div>
        <HomeCarousel />
      </div>
    </>
  );
}