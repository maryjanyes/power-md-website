import * as XLSX from 'xlsx';
import { prisma } from '../lib/prisma';

const sheetFields = {
  price_group: 'Ценовая группа/ Номенклатура/ Характеристика номенклатуры',
  leftover: 'Остаток',
  discount: '1! Спец (грн) %скидки',
  articul: 'Номенклатура.Артикул ',
  retail_price: '6.Розничная цена (грн)',
};

const brandCountryProduction = {
  Bosch: 'Germany',
  MOLL: 'Germany',
  EXIDE: 'Asia',
  MAXION: 'Ukraine',
  FORSE: 'Ukraine',
  ISTA: 'Ukraine',
};

type FileLine = {
  [sheetFields.price_group]: string,
  [sheetFields.leftover]: number,
  [sheetFields.discount]: number,
  [sheetFields.retail_price]: number,
}

function parsePricesSheet(fileData: FileLine[]): any[] {
  return fileData.map((fileLine) => {
    const productPriceGroup = fileLine[sheetFields.price_group];
    const [name, subModel, subModel2, aH, amp, polarity] = (productPriceGroup as string || '').split(' ');

    return {
      price: Number(fileLine[sheetFields.retail_price]),
      brand: name,
      polarity: polarity,
      starting_current_a: amp,
      capacity_ah: aH,
      name: productPriceGroup as string,
      voltage: 0,
      cycle_life: 1,
      weight_kg: '50',
      warranty_years: '1',
      production_country: (brandCountryProduction as any)[name] || '--',
      dimensions: '(100, 50, 50)',
      terminal_category: 'GEL',
      terminal_cover_type: 'Asia',
      image_url: 'https://www.power-md.co.ua/_next/image?url=https%3A%2F%2Fimages.prom.ua%2F5778492790_avtomobilnij-akumulyator-bosch.jpg&w=256&q=75',
      in_stock: true,
    };
  });
}

async function main() {
  const [fileName = './example.xls'] = process.argv.slice(2);
  console.log('🌱 Start seeding products...');

  const productsSheetFile = XLSX.readFile(fileName);
  const firstSheetName = productsSheetFile.SheetNames[0];
  const sheet = productsSheetFile.Sheets[firstSheetName];
  const sheetAsJSON = XLSX.utils.sheet_to_json(sheet);
  const parsedPositions = parsePricesSheet(sheetAsJSON as FileLine[]);

  // await prisma.productItem.deleteMany();
  await prisma.productItem.createMany({
    data: parsedPositions,
    skipDuplicates: true,
  });

  console.log('✅ Seeding products completed');
}

main()
