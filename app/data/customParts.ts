// data/customParts.ts
"use server"
import { prisma } from "@/lib/prisma"

export type Case = {
  id: string;
  title: string;
  image: string;
  priceInPence: number;
};

export type Motherboard = {
  id: string;
  title: string;
  image: string;
  priceInPence: number;
  socketType: string;
};

export type CPU = {
  id: string;
  title: string;
  image: string;
  priceInPence: number;
  wattage: number;
  socketType: string;
};

export type GPU = {
  id: string;
  title: string;
  image: string;
  priceInPence: number;
  wattage: number;
};

export type PSU = {
  id: string;
  title: string;
  image: string;
  priceInPence: number;
  wattage: number;
};

export type CPUCooler = {
  id: string;
  title: string;
  image: string;
  priceInPence: number;
  wattage: number;
};

export type Memory = {
  id: string;
  title: string;
  image: string;
  priceInPence: number;
  capacity: number;
};

export type Storage = {
  id: string;
  title: string;
  image: string;
  priceInPence: number;
  capacity: number;
};

export type CustomParts = {
  cases: Case[];
  motherboards: Motherboard[];
  cpus: CPU[];
  gpus: GPU[];
  psu: PSU[];
  cpuCoolers: CPUCooler[];
  memory: Memory[];
  storage: Storage[];
};

export async function getCustomParts(): Promise<CustomParts> {
  const cases = (await prisma.case.findMany()).map(caseItem => ({
    id: caseItem.id,
    title: caseItem.title,
    image: caseItem.imagePath,
    priceInPence: caseItem.priceInPence,
  }));

  const motherboards = (await prisma.motherboard.findMany()).map(motherboardItem => ({
    id: motherboardItem.id,
    title: motherboardItem.title,
    image: motherboardItem.imagePath,
    priceInPence: motherboardItem.priceInPence,
    socketType: motherboardItem.Socket,
  }));

  const cpus = (await prisma.cPU.findMany()).map(cpuItem => ({
    id: cpuItem.id,
    title: cpuItem.title,
    image: cpuItem.imagePath,
    priceInPence: cpuItem.priceInPence,
    wattage: cpuItem.Wattage,
    socketType: cpuItem.Socket,
  }));

  const gpus = (await prisma.gpu.findMany()).map(gpuItem => ({
    id: gpuItem.id,
    title: gpuItem.title,
    image: gpuItem.imagePath,
    priceInPence: gpuItem.priceInPence,
    wattage: gpuItem.Wattage,
  }));

  const psu = (await prisma.pSU.findMany()).map(psuItem => ({
    id: psuItem.id,
    title: psuItem.title,
    image: psuItem.imagePath,
    priceInPence: psuItem.priceInPence,
    wattage: psuItem.wattage,
  }));

  const cpuCoolers = (await prisma.cpuCooler.findMany()).map(cpuCoolerItem => ({
    id: cpuCoolerItem.id,
    title: cpuCoolerItem.title,
    image: cpuCoolerItem.imagePath,
    priceInPence: cpuCoolerItem.priceInPence,
    wattage: cpuCoolerItem.wattage,
  }));

  const memory = (await prisma.memory.findMany()).map(memoryItem => ({
    id: memoryItem.id,
    title: memoryItem.title,
    image: memoryItem.imagePath,
    priceInPence: memoryItem.priceInPence,
    capacity: memoryItem.capacity,
  }));

  const storage = (await prisma.storage.findMany()).map(storageItem => ({
    id: storageItem.id,
    title: storageItem.title,
    image: storageItem.imagePath,
    priceInPence: storageItem.priceInPence,
    capacity: storageItem.capacity,
  }));

  return {
    cases,
    motherboards,
    cpus,
    gpus,
    psu,
    cpuCoolers,
    memory,
    storage,
  };
}