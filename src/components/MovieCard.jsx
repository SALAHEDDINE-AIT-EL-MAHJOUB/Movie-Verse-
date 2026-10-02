import { Heart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getPosterUrl } from '../api/tmdb'
import { useFavorites } from '../context/FavoritesContext'

export default function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(movie.id)
  const year = movie.release_date?.slice(0, 4) || '—'

  return (
    <article className="group relative">
      <Link to={`/movie/${movie.id}`} className="block overflow-hidden rounded-2xl bg-zinc-100 shadow-sm dark:bg-surface">
        <div className="aspect-[2/3] overflow-hidden">
          {getPosterUrl(movie.poster_path) ? <img src={getPosterUrl(movie.poster_path)} alt={`Affiche de ${movie.title}`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="grid h-full place-items-center p-4 text-center text-sm text-zinc-400">Affiche indisponible</div>}
        </div>
        <div className="space-y-2 p-4">
          <h2 className="truncate font-display font-bold text-zinc-900 dark:text-white">{movie.title}</h2>
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>{year}</span>
            <span className="flex items-center gap-1 text-accent"><Star size={13} fill="currentColor" /> {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
          </div>
        </div>
      </Link>
      <button onClick={() => toggleFavorite(movie)} aria-label={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'} className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full backdrop-blur-md transition ${favorite ? 'bg-accent text-ink' : 'bg-black/50 text-white hover:bg-accent hover:text-ink'}`}>
        <Heart size={16} fill={favorite ? 'currentColor' : 'none'} />
      </button>
    </article>
  )
}
