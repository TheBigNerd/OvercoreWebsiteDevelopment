"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function Images({ images } : { images: string[] }) {
	const [currentImage, setCurrentImage] = useState(0);
	
	return (
		<div className="sticky top-32">
			<Image src={ images[currentImage] } alt="Product Image" width={ 500 } height={ 500 }
			       className="rounded-lg aspect-square object-contain"/>
			<div className="flex gap-4 mt-4">
				{ images.map((image, index) => (
					<Image key={index} src={ image } alt={ `Product Image ${index}` } width={ 100 } height={ 100 } onClick={() => setCurrentImage(index)}
					       className="rounded-lg aspect-square object-contain hover:cursor-pointer hover:brightness-75 transition-all " />
				)) }
			</div>
		</div>
	)
}