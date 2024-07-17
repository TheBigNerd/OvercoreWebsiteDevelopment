
import CategoryCard from './homecomponents/categorycards';
import HeroBanner from './homecomponents/herobanner'
import Navbar from './components/Navigation/Navbar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';


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
      <div className="m-4">
      <h2 className="text-2xl font-bold text-left mb-4">Featured Products</h2>
      <Carousel>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
      </div>
      
    </>
    
  );
}