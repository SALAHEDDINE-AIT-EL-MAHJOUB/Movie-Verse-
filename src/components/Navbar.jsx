import { Film, Heart, Moon, Sun } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const { favorites } = useFavorites()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const linkClass = ({ isActive }) => `transition-colors ${isActive ? 'text-accent' : 'text-zinc-400 hover:text-white'}`

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-ink/80">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <NavLink to="/" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-accent text-ink shadow-glow transition-transform group-hover:rotate-6">
            <Film size={22} strokeWidth={2.5} />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-zinc-950 dark:text-white">Movie<span className="text-accent">Verse</span></span>
        </NavLink>
        <nav className="flex items-center gap-5 text-sm font-semibold">
          <NavLink to="/" className={linkClass}>Accueil</NavLink>
          <NavLink to="/favorites" className={`${linkClass({ isActive: location.pathname === '/favorites' })} relative flex items-center gap-2`}>
            <Heart size={16} /> Favoris
            {favorites.length > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] text-ink">{favorites.length}</span>}
          </NavLink>
          <button onClick={toggleTheme} aria-label="Changer de thème" className="grid h-10 w-10 place-items-center rounded-full border border-zinc-200 text-zinc-600 transition hover:border-accent hover:text-accent dark:border-white/10 dark:text-zinc-300">
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </nav>
      </div>
    </header>
  )
}
