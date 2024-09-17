// data/customPartsService.ts
import { getCustomParts } from './customParts';

export async function fetchCustomParts() {
	const customParts = await getCustomParts();
	return customParts;
}