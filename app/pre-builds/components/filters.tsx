import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import type { Product } from "@prisma/client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

const fieldsToFilter = [
	{ name: 'CPU Model', field: 'cpuModel' },
	{ name: 'GPU Model', field: 'gpuModel' },
	{ name: 'Colour', field: 'colour' },
	{ name: 'Case Size', field: 'caseSize' },
	{ name: 'Memory Size', field: 'memorySize' },
	{ name: 'Memory Type', field: 'memoryType' },
	{ name: 'Storage Type', field: 'storageType' },
	{ name: 'Total Storage', field: 'totalStorage' },
	{ name: 'Connectivity', field: 'connectivity' },
	{ name: 'Cooling Method', field: 'coolingMethod' }
];

export default function FiltersMenu({ products } : { products: Product[] }) {
	const router = useRouter();
	const pn = usePathname();
	
	const filters: { [key: string] : Set<string> } = {};
	products.forEach(product => {
		fieldsToFilter.forEach(field => {
			if (!filters[field.name]) {
				filters[field.name] = new Set();
			}
			
			filters[field.name].add(product[field.field as keyof Product] as string); // :(
		})
	})
	
	const updateFilters = (ev: React.ChangeEvent) => {
		const checked = document.querySelectorAll<HTMLInputElement>('input:checked');
		let newSearchParams = "";
		
		Array.from(checked).map(checkbox => {
			const [filterName, filterValue] = checkbox.value.split("-");
			const filterField = fieldsToFilter.find(field => field.name === filterName)?.field;
			newSearchParams += `&${filterField}=${filterValue}`;
		});
		
		router.push(pn + newSearchParams.replace("&", "?"));
	}
	
	return (
		<>
			<h2 className="text-2xl text-center">Filters</h2>
			<Accordion type="multiple" className="mt-2">
			{
				Object.entries(filters).map(([filterName, filterValues]) => (
					<AccordionItem value={filterName} key={filterName} className="bg-gray-300 rounded px-4">
						<AccordionTrigger>{filterName}</AccordionTrigger>
						<AccordionContent className="flex flex-col">
							{
								Array.from(filterValues).map(value => (
									<div key={filterName + "-" + value}>
										<input type="checkbox" id={value} value={filterName + "-" + value} onChange={updateFilters} />
										<label className="ml-1" htmlFor={value}>{value}</label>
									</div>
								))
							}
						</AccordionContent>
					</AccordionItem>
				))
			}
			</Accordion>
		</>
	)
}