import MovieGrid from '../components/MovieGrid'
import { EmptyState } from '../components/States'
import { useFavorites } from '../context/FavoritesContext'

export default function Favorites() {
  const { favorites } = useFavorites()
  return <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><div className="mb-10"><p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-accent">Votre sélection</p><h1 className="font-display text-4xl font-bold text-zinc-950 dark:text-white">Mes favoris</h1><p className="mt-3 text-zinc-500">{favorites.length} film{favorites.length > 1 ? 's' : ''} sauvegardé{favorites.length > 1 ? 's' : ''}</p></div>{favorites.length ? <MovieGrid movies={favorites} /> : <EmptyState title="Votre liste est vide" description="Ajoutez des films à vos favoris pour les retrouver ici." />}</main>
}
