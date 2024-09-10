"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import type { Product } from "@prisma/client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const fieldsToFilter = [
	{ nice: 'CPU Model', dbName: 'cpuModel' },
	{ nice: 'GPU Model', dbName: 'gpuModel' },
	{ nice: 'Colour', dbName: 'colour' },
	{ nice: 'Case Size', dbName: 'caseSize' },
	{ nice: 'Memory Size', dbName: 'memorySize' },
	{ nice: 'Memory Type', dbName: 'memoryType' },
	{ nice: 'Storage Type', dbName: 'storageType' },
	{ nice: 'Total Storage', dbName: 'totalStorage' },
	{ nice: 'Connectivity', dbName: 'connectivity' },
	{ nice: 'Cooling Method', dbName: 'coolingMethod' }
];

export default function FiltersMenu({ products } : { products: Product[] }) {
	const router = useRouter();
	const pn = usePathname();
	const searchParams = useSearchParams();
	
	const filters: { [key: string] : Set<string> } = {};
	products.forEach(product => {
		fieldsToFilter.forEach(field => {
			if (!filters[field.dbName]) filters[field.dbName] = new Set(); // Sets ensure no duplicates are added into the lists
			
			filters[field.dbName].add(product[field.dbName as keyof Product] as string); // :(
		})
	})
	
	const updateFilters = () => {
		const checked = document.querySelectorAll<HTMLInputElement>('input:checked');
		let newSearchParams = "";
		
		Array.from(checked).map(checkbox => {
			const [filterName, filterValue] = checkbox.value.split("-");
			newSearchParams += `&${filterName}=${filterValue}`;
		});
		
		router.push(pn + newSearchParams.replace("&", "?"));
	}
	
	return (
		<>
			<h2 className="text-2xl text-center">Filters</h2>
			<Accordion type="multiple" className="mt-2">
			{
				Object.entries(filters).map(([filterName, filterValues]) => {
					const niceName = fieldsToFilter.find(field => field.dbName === filterName)?.nice;
					return (
						<AccordionItem value={filterName} key={filterName} className="bg-gray-300 rounded px-4">
							<AccordionTrigger>{niceName}</AccordionTrigger>
							<AccordionContent className="flex flex-col">
								{
									Array.from(filterValues).map(value => (
										<div key={filterName + "-" + value}>
											<input type="checkbox" id={value} value={filterName + "-" + value} onChange={updateFilters} checked={searchParams.getAll(filterName).includes(value)} />
											<label className="ml-1" htmlFor={value}>{value}</label>
										</div>
									))
								}
							</AccordionContent>
						</AccordionItem>
					)
				})
			}
			</Accordion>
		</>
	)
}