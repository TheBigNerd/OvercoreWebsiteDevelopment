// data/customParts.ts
export type Card = {
  id: string;
  title: string;
  image: string;
  priceInPence: number;
  sizes?: string[];
  socketType?: string;
};

export type CustomParts = {
  cases: Card[];
  motherboards: Card[];
  cpus: Card[];
  gpus: Card[];
  primaryStorage: Card[];
  secondaryStorage: Card[];
};

export const customParts: CustomParts = {
  cases: [
    { id: 'case1', title: 'Cooler Master Case', image: '/images/case1.jpg', priceInPence: 5000, sizes: ['ATX', 'MicroATX'] },
    { id: 'case2', title: 'NZXT Case', image: '/images/case2.jpg', priceInPence: 6999, sizes: ['MicroATX'] },
  ],
  motherboards: [
    { id: 'mb1', title: 'ASUS ROG Strix', image: '/images/mb1.jpg', priceInPence: 20000, sizes: ['ATX'], socketType: 'LGA1200' },
    { id: 'mb2', title: 'MSI MPG Z490', image: '/images/mb2.jpg', priceInPence: 18000, sizes: ['MicroATX'], socketType: 'LGA1200' },
    { id: 'mb3', title: 'Gigabyte B450M DS3H', image: '/images/mb3.jpg', priceInPence: 15000, sizes: ['MicroATX'], socketType: 'AM4' },
  ],
  cpus: [
    { id: 'cpu1', title: 'Intel i9', image: '/images/cpu1.jpg', priceInPence: 34999, socketType: 'LGA1200' },
    { id: 'cpu2', title: 'AMD Ryzen 9', image: '/images/cpu2.jpg', priceInPence: 30000, socketType: 'AM4' },
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

