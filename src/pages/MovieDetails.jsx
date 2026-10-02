import { ArrowLeft, Clock3, Heart, Star } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getBackdropUrl, getMovieDetails, getPosterUrl } from '../api/tmdb'
import { useFavorites } from '../context/FavoritesContext'
import { ErrorState, PageLoader } from '../components/States'

export default function MovieDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [movie, setMovie] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getMovieDetails(id).then(setMovie).catch((reason) => setError(reason.message))
  }, [id])

  if (error) return <main className="mx-auto max-w-7xl px-5 py-12"><ErrorState message={error} /></main>
  if (!movie) return <PageLoader />
  const favorite = isFavorite(movie.id)

  return <main className="relative overflow-hidden"><div className="absolute inset-x-0 top-0 -z-10 h-[560px] opacity-20 blur-sm dark:opacity-30" style={{ backgroundImage: `linear-gradient(to bottom, transparent, #09090b), url(${getBackdropUrl(movie.backdrop_path)})`, backgroundPosition: 'center', backgroundSize: 'cover' }} /><div className="mx-auto max-w-7xl px-5 py-10 lg:px-8"><button onClick={() => navigate(-1)} className="mb-10 flex items-center gap-2 text-sm font-semibold text-zinc-500 transition hover:text-accent"><ArrowLeft size={16} /> Retour</button><div className="grid gap-10 md:grid-cols-[280px_1fr] lg:grid-cols-[340px_1fr]"><div className="mx-auto w-full max-w-[340px] overflow-hidden rounded-2xl shadow-2xl"><img src={getPosterUrl(movie.poster_path, 'w780')} alt={`Affiche de ${movie.title}`} className="w-full" /></div><div className="self-center"><div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider text-accent"><span>{movie.release_date?.slice(0, 4)}</span><span>•</span><span>{movie.original_language?.toUpperCase()}</span></div><h1 className="mt-4 font-display text-4xl font-bold leading-tight text-zinc-950 dark:text-white sm:text-6xl">{movie.title}</h1><div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-zinc-500"><span className="flex items-center gap-2 text-accent"><Star size={18} fill="currentColor" /> {movie.vote_average.toFixed(1)} / 10</span><span className="flex items-center gap-2"><Clock3 size={17} /> {movie.runtime || '—'} min</span></div><p className="mt-8 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-300">{movie.overview || 'Aucune description disponible pour ce film.'}</p><div className="mt-6 flex flex-wrap gap-2">{movie.genres?.map((genre) => <span key={genre.id} className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs text-zinc-500 dark:border-white/10">{genre.name}</span>)}</div><button onClick={() => toggleFavorite(movie)} className={`mt-9 flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition ${favorite ? 'bg-accent text-ink' : 'border border-zinc-300 text-zinc-800 hover:border-accent hover:text-accent dark:border-white/15 dark:text-white'}`}><Heart size={18} fill={favorite ? 'currentColor' : 'none'} /> {favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}</button></div></div></div></main>
}
