// data/customParts.ts
export interface Card {
    id: number;
    title: string;
    image: string;
    priceInPence: number;
  }
  
  export const customParts: { [key: string]: Card[] } = {
    cases: [
      { id: 1, title: 'Case 1', image: '/images/case1.jpg', priceInPence: 5000 },
      { id: 2, title: 'Case 2', image: '/images/case2.jpg', priceInPence: 7000 },
    ],
    cpus: [
      { id: 3, title: 'CPU 1', image: '/images/cpu1.jpg', priceInPence: 20000 },
      { id: 4, title: 'CPU 2', image: '/images/cpu2.jpg', priceInPence: 30000 },
    ],
    gpus: [
      { id: 5, title: 'GPU 1', image: '/images/gpu1.jpg', priceInPence: 40000 },
      { id: 6, title: 'GPU 2', image: '/images/gpu2.jpg', priceInPence: 60000 },
    ],
    primaryStorage: [
      { id: 7, title: 'Primary Storage 1', image: '/images/ps1.jpg', priceInPence: 10000 },
      { id: 8, title: 'Primary Storage 2', image: '/images/ps2.jpg', priceInPence: 15000 },
    ],
    secondaryStorage: [
      { id: 9, title: 'Secondary Storage 1', image: '/images/ss1.jpg', priceInPence: 8000 },
      { id: 10, title: 'Secondary Storage 2', image: '/images/ss2.jpg', priceInPence: 12000 },
    ],
  };
  