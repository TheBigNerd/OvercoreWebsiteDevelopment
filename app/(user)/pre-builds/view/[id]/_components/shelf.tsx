"use client";
import { formatCurrency } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";

export default function Shelf({ id, name, priceInPence } : { id: string, name: string, priceInPence: number }) {
	const [show, setShow] = useState(false);
	
	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				console.log("Shelf is visible");
				setShow(false);
			} else {
				setShow(true);
			}
		}, { threshold: 0.5 });
		
		const card = document.getElementById("card");
		if (card) observer.observe(card);
		
		return () => observer.disconnect();
	});
	
    return (
	    <section className={`sticky bg-slate-300 flex py-2 px-32 shadow-[0_-10px_30px_rgba(0,0,0,0.3)] ${show ? "bottom-0" : "-bottom-32" } transition-all`}>
		    <div className="flex-1">
			    <h1 className="text-2xl font-bold">{ name }</h1>
			    <p>{ formatCurrency(priceInPence / 100) }</p>
		    </div>
		    <div className="flex-1 flex text-right justify-end items-center">
			    <Button>Add to Basket</Button>
		    </div>
	    </section>
    )
}