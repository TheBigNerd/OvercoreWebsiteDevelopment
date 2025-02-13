import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const slides = [
	{
		id: 1,
		content: (
			<div className="flex flex-col items-center justify-center">
				<div className="flex items-center justify-center">
					<ul className="list-disc mr-32 text-2xl">
						<li>Dummy text 1</li>
						<li>Dummy text 2</li>
						<li>Dummy text 3</li>
					</ul>
					<img src="https://via.placeholder.com/200" alt="Placeholder" className="w-32 h-32" />
				</div>
				<p className="mt-4 text-center text-lg">This is a placeholder paragraph below the bullet points and image.</p>
			</div>
		)
	},
	{
		id: 2,
		content: (
			<div className="flex flex-col items-center justify-center">
				<div className="flex items-center justify-center">
					<ul className="list-disc mr-32 text-xl">
						<li>Dummy text 1</li>
						<li>Dummy text 2</li>
						<li>Dummy text 3</li>
					</ul>
					<img src="https://via.placeholder.com/200" alt="Placeholder" className="w-32 h-32" />
				</div>
				<p className="mt-4 text-center text-lg">This is a placeholder paragraph below the bullet points and image.</p>
			</div>
		)
	},
	{
		id: 3,
		content: (
			<div className="flex flex-col items-center justify-center">
				<div className="flex items-center justify-center">
					<ul className="list-disc mr-32 text-lg">
						<li>Dummy text 1</li>
						<li>Dummy text 2</li>
						<li>Dummy text 3</li>
					</ul>
					<img src="https://via.placeholder.com/200" alt="Placeholder" className="w-32 h-32" />
				</div>
				<p className="mt-4 text-center text-lg">This is a placeholder paragraph below the bullet points and image.</p>
			</div>
		)
	}
];

export default function SlideComponent() {
	const [currentSlide, setCurrentSlide] = useState(0);

	const handlePrevious = () => {
		setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
	};

	const handleNext = () => {
		setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
	};

	return (
		<div className="relative w-3/4 h-auto bg-white rounded-lg shadow-lg p-6 mx-auto">
			<h2 className="text-center text-xl font-bold mb-6">Carousel Heading</h2>
			<div className="flex items-center justify-between">
				<button onClick={handlePrevious} className="p-2 self-center">
					<ChevronLeft size={24} />
				</button>
				<div className="flex-1 flex justify-center">
					{slides[currentSlide].content}
				</div>
				<button onClick={handleNext} className="p-2 self-center">
					<ChevronRight size={24} />
				</button>
			</div>
			<div className="flex justify-center mt-4">
				{slides.map((slide, index) => (
					<span
						key={slide.id}
						className={`h-2 w-2 mx-1 rounded-full ${index === currentSlide ? 'bg-gray-800' : 'bg-gray-400'}`}
					></span>
				))}
			</div>
		</div>
	);
}

