import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import type { Product } from "@prisma/client";

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

export default async function FiltersMenu({ products } : { products: Product[] })  {
	const filters: { [key: string] : Set<String> } = {};
	products.forEach(product => {
		fieldsToFilter.forEach(field => {
			if (!filters[field.name]) {
				filters[field.name] = new Set();
			}
			
			filters[field.name].add(product[field.field as keyof Product] as String); // :(
		})
	})
	
	return (
		<>
			<h2 className="text-2xl text-center">Filters</h2>
			<Accordion type="multiple" className="mt-2">
			{
				Object.entries(filters).map(([filterName, filterValues]) => (
					<AccordionItem value={filterName} key={filterName} className="bg-gray-300 rounded px-4">
						<AccordionTrigger>{filterName}</AccordionTrigger>
						<AccordionContent>
							<ul>
								{
									Array.from(filterValues).map(value => (
										<li key={value as string}>{value}</li>
									))
								}
							</ul>
						</AccordionContent>
					</AccordionItem>
				))
			}
			</Accordion>
		</>
	)
}