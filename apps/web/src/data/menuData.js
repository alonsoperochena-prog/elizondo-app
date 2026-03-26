export const productsData = [
  {
    id: 'mango-tropical',
    name: 'Mango Tropical',
    category: 'Smoothies',
    categoryId: 'smoothies',
    subcategory: 'Frutas',
    image: 'https://images.unsplash.com/photo-1505080140690-67f56bb2e6ff',
    description: 'Refrescante mezcla de mango fresco, plátano y un toque de jugo de naranja natural.',
    price: '52.00',
    ingredients: ['Leche', 'Mango', 'Azúcar', 'Mantequilla'],
    nutritionalComponents: [
      { name: 'Carbohidratos', color: 'hsl(var(--ing-carbohidratos))', defaultPercentage: 40 },
      { name: 'Proteína', color: 'hsl(var(--ing-proteina))', defaultPercentage: 10 },
      { name: 'Grasa', color: 'hsl(var(--ing-grasa))', defaultPercentage: 10 },
      { name: 'Leche', color: 'hsl(var(--ing-leche))', defaultPercentage: 40 }
    ],
    baseNutrition: { carbs: 45, protein: 8, fat: 12, calories: 280, fiber: 3, sodium: 150 }
  },
  {
    id: 'protein-shake-choco',
    name: 'Protein Shake de Chocolate',
    category: 'Smoothies',
    categoryId: 'smoothies',
    subcategory: 'Proteína',
    image: 'https://images.unsplash.com/photo-1622818425825-1dcdb3a39c30',
    description: 'Batido alto en proteína con cacao puro, plátano y leche de almendras.',
    price: '85.00',
    ingredients: ['Leche de Almendras', 'Proteína Whey', 'Cacao', 'Plátano'],
    nutritionalComponents: [
      { name: 'Proteína', color: 'hsl(var(--ing-proteina))', defaultPercentage: 50 },
      { name: 'Carbohidratos', color: 'hsl(var(--ing-carbohidratos))', defaultPercentage: 20 },
      { name: 'Grasa', color: 'hsl(var(--ing-grasa))', defaultPercentage: 10 },
      { name: 'Leche', color: 'hsl(var(--ing-leche))', defaultPercentage: 20 }
    ],
    baseNutrition: { carbs: 25, protein: 30, fat: 8, calories: 320, fiber: 5, sodium: 200 }
  },
  {
    id: 'cafe-americano',
    name: 'Café Americano',
    category: 'Café',
    categoryId: 'cafes',
    subcategory: 'Caliente',
    image: 'https://images.unsplash.com/photo-1623772257000-6e98619ddaf4',
    description: 'Espresso doble extraído a la perfección, diluido en agua caliente para un sabor suave y balanceado.',
    price: '38.00',
    ingredients: ['Agua', 'Granos de Café Tostado'],
    nutritionalComponents: [
      { name: 'Agua', color: '#87CEEB', defaultPercentage: 95 },
      { name: 'Cafeína', color: 'hsl(var(--ing-cafeina))', defaultPercentage: 5 }
    ],
    baseNutrition: { carbs: 0, protein: 0, fat: 0, calories: 5, fiber: 0, sodium: 10 }
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino Clásico',
    category: 'Café',
    categoryId: 'cafes',
    subcategory: 'Caliente',
    image: 'https://images.unsplash.com/photo-1521868328968-ec26b3b3b6b2',
    description: 'Equilibrio perfecto de espresso, leche vaporizada y una generosa capa de espuma de leche.',
    price: '48.00',
    ingredients: ['Leche Entera', 'Espresso', 'Cacao en polvo (opcional)'],
    nutritionalComponents: [
      { name: 'Leche', color: 'hsl(var(--ing-leche))', defaultPercentage: 60 },
      { name: 'Cafeína', color: 'hsl(var(--ing-cafeina))', defaultPercentage: 20 },
      { name: 'Grasa', color: 'hsl(var(--ing-grasa))', defaultPercentage: 20 }
    ],
    baseNutrition: { carbs: 12, protein: 8, fat: 7, calories: 140, fiber: 0, sodium: 100 }
  },
  {
    id: 'matcha-frio',
    name: 'Matcha Latte Frío',
    category: 'Café',
    categoryId: 'cafes',
    subcategory: 'Frío',
    image: 'https://images.unsplash.com/photo-1702392072279-00108dee02b3',
    description: 'Té verde matcha ceremonial con leche fría y hielo.',
    price: '65.00',
    ingredients: ['Leche', 'Matcha Ceremonial', 'Hielo', 'Jarabe Simple'],
    nutritionalComponents: [
      { name: 'Leche', color: 'hsl(var(--ing-leche))', defaultPercentage: 70 },
      { name: 'Carbohidratos', color: 'hsl(var(--ing-carbohidratos))', defaultPercentage: 15 },
      { name: 'Fibra', color: 'hsl(var(--ing-fibra))', defaultPercentage: 15 }
    ],
    baseNutrition: { carbs: 18, protein: 6, fat: 5, calories: 160, fiber: 2, sodium: 80 }
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    category: 'Café',
    categoryId: 'cafes',
    subcategory: 'Frío',
    image: 'https://images.unsplash.com/photo-1544803591-2267f09d81a3',
    description: 'Café extraído en frío por 24 horas, suave y con notas a chocolate.',
    price: '55.00',
    ingredients: ['Agua', 'Café de Especialidad', 'Hielo'],
    nutritionalComponents: [
      { name: 'Agua', color: '#87CEEB', defaultPercentage: 90 },
      { name: 'Cafeína', color: 'hsl(var(--ing-cafeina))', defaultPercentage: 10 }
    ],
    baseNutrition: { carbs: 0, protein: 0, fat: 0, calories: 5, fiber: 0, sodium: 15 }
  },
  {
    id: 'croissant',
    name: 'Croissant de Mantequilla',
    category: 'Panes Dulces',
    categoryId: 'pan_dulce',
    subcategory: 'Clásicos',
    image: 'https://images.unsplash.com/photo-1588496417403-d04662a2c3ce',
    description: 'Pan hojaldrado de origen francés, crujiente por fuera y suave por dentro, horneado diariamente.',
    price: '35.00',
    ingredients: ['Harina de Trigo', 'Mantequilla', 'Agua', 'Azúcar', 'Levadura', 'Sal'],
    nutritionalComponents: [
      { name: 'Carbohidratos', color: 'hsl(var(--ing-carbohidratos))', defaultPercentage: 45 },
      { name: 'Grasa', color: 'hsl(var(--ing-grasa))', defaultPercentage: 45 },
      { name: 'Proteína', color: 'hsl(var(--ing-proteina))', defaultPercentage: 10 }
    ],
    baseNutrition: { carbs: 38, protein: 6, fat: 20, calories: 350, fiber: 2, sodium: 320 }
  },
  {
    id: 'chocolatin',
    name: 'Chocolatín',
    category: 'Panes Dulces',
    categoryId: 'pan_dulce',
    subcategory: 'Clásicos',
    image: 'https://images.unsplash.com/photo-1585729986380-5ac3b27521ac',
    description: 'Masa de croissant rellena con dos barras de chocolate semi-amargo.',
    price: '42.00',
    ingredients: ['Harina de Trigo', 'Mantequilla', 'Chocolate Semi-amargo', 'Azúcar'],
    nutritionalComponents: [
      { name: 'Carbohidratos', color: 'hsl(var(--ing-carbohidratos))', defaultPercentage: 50 },
      { name: 'Grasa', color: 'hsl(var(--ing-grasa))', defaultPercentage: 40 },
      { name: 'Proteína', color: 'hsl(var(--ing-proteina))', defaultPercentage: 10 }
    ],
    baseNutrition: { carbs: 45, protein: 7, fat: 22, calories: 410, fiber: 3, sodium: 280 }
  },
  {
    id: 'sandwich-pavo',
    name: 'Sándwich de Pavo Ahumado',
    category: 'Sándwiches',
    categoryId: 'sandwiches',
    subcategory: 'Clásicos',
    image: 'https://images.unsplash.com/photo-1555554317-766200eb80d6',
    description: 'Pavo ahumado, queso suizo derretido, espinaca fresca y aderezo de la casa en pan artesanal.',
    price: '75.00',
    ingredients: ['Pan Artesanal', 'Pechuga de Pavo', 'Queso Suizo', 'Espinaca', 'Mayonesa', 'Mostaza'],
    nutritionalComponents: [
      { name: 'Proteína', color: 'hsl(var(--ing-proteina))', defaultPercentage: 35 },
      { name: 'Carbohidratos', color: 'hsl(var(--ing-carbohidratos))', defaultPercentage: 40 },
      { name: 'Grasa', color: 'hsl(var(--ing-grasa))', defaultPercentage: 20 },
      { name: 'Fibra', color: 'hsl(var(--ing-fibra))', defaultPercentage: 5 }
    ],
    baseNutrition: { carbs: 42, protein: 28, fat: 15, calories: 420, fiber: 6, sodium: 850 }
  },
  {
    id: 'sandwich-huevo',
    name: 'Sándwich de Huevo',
    category: 'Sándwiches',
    categoryId: 'sandwiches',
    subcategory: 'Desayuno',
    image: 'https://images.unsplash.com/photo-1489941712843-4141bf157a29',
    description: 'Huevo revuelto esponjoso, tocino crujiente y queso cheddar en pan brioche.',
    price: '68.00',
    ingredients: ['Pan Brioche', 'Huevo', 'Tocino', 'Queso Cheddar'],
    nutritionalComponents: [
      { name: 'Proteína', color: 'hsl(var(--ing-proteina))', defaultPercentage: 30 },
      { name: 'Grasa', color: 'hsl(var(--ing-grasa))', defaultPercentage: 40 },
      { name: 'Carbohidratos', color: 'hsl(var(--ing-carbohidratos))', defaultPercentage: 30 }
    ],
    baseNutrition: { carbs: 35, protein: 22, fat: 28, calories: 480, fiber: 2, sodium: 720 }
  }
];

export const getCategories = () => {
  const categoriesMap = new Map();
  
  productsData.forEach(product => {
    if (!categoriesMap.has(product.category)) {
      categoriesMap.set(product.category, {
        name: product.category,
        subcategories: new Set(),
        image: product.image
      });
    }
    if (product.subcategory) {
      categoriesMap.get(product.category).subcategories.add(product.subcategory);
    }
  });

  return Array.from(categoriesMap.entries()).map(([name, data]) => ({
    name,
    image: data.image,
    subcategories: Array.from(data.subcategories)
  }));
};