
import * as XLSX from 'xlsx';
import { prisma } from '../lib/prisma';

async function main() {
  console.log('🌱 Start seeding products...')

  const productsSheetFile = XLSX.readFile('../dataset/prices/prices_0cd7c563-e684-4207-9acd-756298bedad8.xls');
  const firstSheetName = productsSheetFile.SheetNames[0];
  const sheet = productsSheetFile.Sheets[firstSheetName];
  const sheetAsJSON =  XLSX.utils.sheet_to_json(sheet);

  console.log('sheetAsJSON', sheetAsJSON);

  await prisma.productItem.deleteMany();
  await prisma.productItem.createMany({
    data: sheetAsJSON as any,
    skipDuplicates: true,
  })

  console.log('✅ Seeding products completed')
}

main()
