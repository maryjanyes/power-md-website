export const productFilterCategories = [{
    title: "Виробник",
    type: "checkbox",
    name: "brand",
}, {
    title: "Ціна",
    type: "ranger",
    name: "price_range",
}, {
    title: "Ємність (Ah)",
    type: "checkbox",
    name: "capacity_ah",
}, {
    title: "Пусковий струм (А)",
    type: "checkbox",
    name: "starting_current_a",
}, {
    title: "Вольтаж (V)",
    type: "checkbox",
    name: "voltage",
}, {
    title: "Плюсова клема (R/L)",
    type: "radio",
    name: "polarity",
}, {
    title: "Виконання корпусу",
    type: "checkbox",
    name: "terminal_cover_type",
}, {
    title: "Тип акумулятора",
    type: "checkbox",
    name: "terminal_category_id",
}, {
    title: "Вага",
    type: "checkbox",
    name: "weight_kg",
}];

export const productCategoryFilterValues = {
    brand: ["bosch", "maxion", "forse", "ista", "moll", "exide", "varta"],
    capacity_ah: [50, 60, 70, 80],
    starting_current_a: [100, 200, 300],
    terminal_cover_type: [],
};

export const productTypeCategories = [
  {
    name: 'AGM',
    tagline: '',
    description: 'AGM - це вдосконалена свинцево-кислотна батарея, де електроліт не рідкий, а абсорбований у спеціальних скловолоконних матах.',
    image: "https://media.base44.com/images/public/6a088c4792d18435606e7c42/33df1649d_generated_038dea76.png",
    specs: { cycleLife: '500+', voltage: '6-12V', warranty: '3-5 роки' },
  },
  {
    name: 'GEL',
    tagline: '',
    description: 'GEL - гелевий акумулятор, це різновид свинцево-кислотних акумуляторів, у яких електроліт між пластинами знаходиться у гелевому стані.',
    image: "https://media.base44.com/images/public/6a088c4792d18435606e7c42/3613181c5_generated_ef8d6582.png",
    specs: { cycleLife: '700+', voltage: '6-12V', warranty: '1-3 роки' },
  },
];
