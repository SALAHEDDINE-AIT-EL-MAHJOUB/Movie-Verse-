import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const FavoritesContext = createContext(null)
const STORAGE_KEY = 'movieverse-favorites'

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const value = useMemo(() => ({
    favorites,
    isFavorite: (id) => favorites.some((movie) => movie.id === Number(id)),
    toggleFavorite: (movie) => {
      setFavorites((current) => current.some((item) => item.id === movie.id)
        ? current.filter((item) => item.id !== movie.id)
        : [...current, movie])
    },
  }), [favorites])

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites doit être utilisé dans FavoritesProvider.')
  return context
}
