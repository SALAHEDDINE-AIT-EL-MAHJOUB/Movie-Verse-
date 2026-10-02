import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { FavoritesProvider } from './context/FavoritesContext'
import { ThemeProvider } from './context/ThemeContext'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'

export default function App() {
  return <ThemeProvider><FavoritesProvider><BrowserRouter><Navbar /><Routes><Route path="/" element={<Home />} /><Route path="/favorites" element={<Favorites />} /><Route path="/movie/:id" element={<MovieDetails />} /><Route path="*" element={<Home />} /></Routes></BrowserRouter></FavoritesProvider></ThemeProvider>
}
