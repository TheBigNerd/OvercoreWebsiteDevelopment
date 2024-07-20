// data/customParts.ts
export type Card = {
  id: string;
  title: string;
  image: string;
  priceInPence: number;
};

export type CustomParts = {
  cases: Card[];
  cpus: Card[];
  gpus: Card[];
  primaryStorage: Card[];
  secondaryStorage: Card[];
};

export const customParts: CustomParts = {
  cases: [
    { id: 'case1', title: 'Cooler Master Case', image: '/images/case1.jpg', priceInPence: 5000 },
    { id: 'case2', title: 'NZXT Case', image: '/images/case2.jpg', priceInPence: 6999 },
  ],
  cpus: [
    { id: 'cpu1', title: 'Intel i9', image: '/images/cpu1.jpg', priceInPence: 34999 },
    { id: 'cpu2', title: 'AMD Ryzen 9', image: '/images/cpu2.jpg', priceInPence: 30000 },
  ],
  gpus: [
    { id: 'gpu1', title: 'NVIDIA RTX 3080', image: '/images/gpu1.jpg', priceInPence: 60000 },
    { id: 'gpu2', title: 'AMD Radeon RX 6800', image: '/images/gpu2.jpg', priceInPence: 55000 },
  ],
  primaryStorage: [
    { id: 'storage1', title: 'Samsung SSD 1TB', image: '/images/storage1.jpg', priceInPence: 12000 },
    { id: 'storage2', title: 'WD Black 1TB', image: '/images/storage2.jpg', priceInPence: 11000 },
  ],
  secondaryStorage: [
    { id: 'storage3', title: 'Seagate HDD 2TB', image: '/images/storage3.jpg', priceInPence: 8000 },
    { id: 'storage4', title: 'Toshiba HDD 2TB', image: '/images/storage4.jpg', priceInPence: 7500 },
  ],
};
