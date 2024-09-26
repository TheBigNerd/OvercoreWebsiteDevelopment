import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import CarouselLook from './CarouselLook';
import fetchFeaturedProducts from './fetchFeaturedProducts';

export default async function HomeCarousel() {
	let featuredProducts = await fetchFeaturedProducts();
	featuredProducts = Array.from({ length: 20 }, () => featuredProducts).flat();
	return (
		<Carousel className='relative mx-auto' style={{ width: '70%' }}>
			<CarouselContent className="flex pb-4 mx-16">
				{ featuredProducts.map(product => (
					<CarouselItem key={ product.id } className="flex-none w-1/1">
						<CarouselLook product={ product }/>
					</CarouselItem>
				)) }
			</CarouselContent>
			<CarouselPrevious
				className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"/>
			<CarouselNext
				className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"/>
		</Carousel>
	);
}