export const RESTAURANT = {
  name: "Barrica Verde",
  tagline: "Wine Bar & Tapas",
  address: "C/ de l'Arquebisbe Mayoral, 16, Ciutat Vella, 46002 València",
  phone: "+34 XXX XXX XXX",
  hours: "12:00 - 23:00",
  days: "Lunes - Domingo",
  priceRange: "€10 - €20"
}

export const CATEGORIES = [
  { id: "tapas", name: "TAPAS" },
  { id: "quesos", name: "QUESOS" },
  { id: "embutidos", name: "EMBUTIDOS" },
  { id: "vinos", name: "VINOS" }
]

export const MENU_ITEMS = [
  // TAPAS
  { id: 1, name: "Aceitunas Aliñadas", price: 450, category: "tapas",
    description: "Olivas verdes marinadas con especias mediterráneas" },
  { id: 2, name: "Pan con Tomate", price: 600, category: "tapas",
    description: "Pan rústico con tomate rallado, aceite de oliva virgen extra" },
  { id: 3, name: "Boquerones en Vinagre", price: 750, category: "tapas",
    description: "Anchoas frescas marinadas en vinagre con ajo y perejil" },
  { id: 4, name: "Patatas Bravas", price: 650, category: "tapas",
    description: "Patatas fritas con salsa brava picante y alioli" },
  { id: 5, name: "Pimientos de Padrón", price: 700, category: "tapas",
    description: "Pimientos verdes salteados con sal gruesa" },
  { id: 6, name: "Jamón Croquetas", price: 850, category: "tapas",
    description: "Croquetas cremosas de jamón ibérico (6 unidades)" },
  
  // QUESOS
  { id: 7, name: "Queso de Cabra", price: 950, category: "quesos",
    description: "Queso artesanal de cabra con miel y nueces" },
  { id: 8, name: "Manchego Curado", price: 1200, category: "quesos",
    description: "Queso manchego con 12 meses de curación" },
  { id: 9, name: "Tabla de Quesos", price: 1650, category: "quesos",
    description: "Selección de quesos españoles con membrillo y frutos secos" },
  
  // EMBUTIDOS
  { id: 10, name: "Chorizo Ibérico", price: 950, category: "embutidos",
    description: "Chorizo de bellota cortado a cuchillo" },
  { id: 11, name: "Jamón Ibérico", price: 1850, category: "embutidos",
    description: "Jamón ibérico de bellota 100% puro" },
  { id: 12, name: "Salchichón", price: 800, category: "embutidos",
    description: "Salchichón artesano curado" },
  { id: 13, name: "Tabla de Embutidos", price: 1950, category: "embutidos",
    description: "Selección de embutidos ibéricos premium" },
  
  // VINOS
  { id: 14, name: "Vermut de la Casa", price: 500, category: "vinos",
    description: "Vermut artesanal con naranja y aceitunas" },
  { id: 15, name: "Vino Tinto (Copa)", price: 400, category: "vinos",
    description: "Selección de vinos tintos españoles" },
  { id: 16, name: "Vino Blanco (Copa)", price: 400, category: "vinos",
    description: "Vinos blancos frescos y aromáticos" },
  { id: 17, name: "Rioja Reserva", price: 2800, category: "vinos",
    description: "Vino tinto Rioja Reserva (botella)" },
  { id: 18, name: "Albariño", price: 2200, category: "vinos",
    description: "Vino blanco Rías Baixas (botella)" },
  { id: 19, name: "Cava Brut", price: 1800, category: "vinos",
    description: "Cava brut nature (botella)" }
]

export const formatPrice = (cents) => {
  const euros = Math.floor(cents / 100)
  const c = cents % 100
  return c === 0 ? `${euros}` : `${euros},${String(c).padStart(2, "0")}`
}
