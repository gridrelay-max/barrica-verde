import { useState, useEffect, useRef } from 'react'
import './App.css'
import { RESTAURANT, CATEGORIES, MENU_ITEMS, formatPrice } from './data'

function MenuItem({ item, onClick }) {
  return (
    <div className="menu-item" onClick={() => onClick(item)}>
      <div className="menu-item-content">
        <div className="menu-item-title">{item.name}</div>
        {item.description && (
          <p className="menu-item-description">{item.description}</p>
        )}
        <span className="menu-item-price">€{formatPrice(item.price)}</span>
      </div>
    </div>
  )
}

function ItemModal({ item, onClose }) {
  if (!item) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body">
          <div className="modal-header">
            <h2>{item.name}</h2>
            <span className="modal-price">€{formatPrice(item.price)}</span>
          </div>
          {item.description && (
            <p className="modal-description">{item.description}</p>
          )}
          <button onClick={onClose} className="modal-close-btn">Cerrar</button>
        </div>
      </div>
    </div>
  )
}

function CategorySection({ category, items, onItemClick }) {
  return (
    <div className="category-section">
      <h3 className="category-title">{category.name}</h3>
      {items.map((item) => (
        <MenuItem key={item.id} item={item} onClick={onItemClick} />
      ))}
    </div>
  )
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id)
  const [selectedItem, setSelectedItem] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const categoryRefs = useRef({})

  const filteredItems = searchQuery.trim()
    ? MENU_ITEMS.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : MENU_ITEMS

  const scrollToCategory = (catId) => {
    setActiveCategory(catId)
    categoryRefs.current[catId]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.dataset.category)
          }
        })
      },
      { threshold: 0.5, rootMargin: '-100px 0px -50% 0px' }
    )

    Object.values(categoryRefs.current).forEach(el => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="app">
      <header className="header">
        <h1>{RESTAURANT.name}</h1>
        <p>{RESTAURANT.tagline}</p>
      </header>

      <nav className="category-nav">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`nav-btn ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => scrollToCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </nav>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar en el menú..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <main className="main-content">
        {searchQuery.trim() ? (
          <div className="category-section">
            <h3 className="category-title">Resultados</h3>
            {filteredItems.map((item) => (
              <MenuItem key={item.id} item={item} onClick={setSelectedItem} />
            ))}
          </div>
        ) : (
          CATEGORIES.map(category => {
            const categoryItems = MENU_ITEMS.filter(i => i.category === category.id)
            return (
              <div
                key={category.id}
                ref={el => categoryRefs.current[category.id] = el}
                data-category={category.id}
              >
                <CategorySection
                  category={category}
                  items={categoryItems}
                  onItemClick={setSelectedItem}
                />
              </div>
            )
          })
        )}

        <div className="restaurant-info">
          <p><strong>Dirección:</strong> {RESTAURANT.address}</p>
          <p><strong>Horario:</strong> {RESTAURANT.hours}</p>
          <p><strong>Rango de precios:</strong> {RESTAURANT.priceRange}</p>
        </div>
      </main>

      <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  )
}
