import { useEffect, useMemo, useState } from 'react'
import FilterBar from '../components/FilterBar'
import MovieGrid from '../components/MovieGrid'
import { ErrorState, LoadingGrid } from '../components/States'
import { getTrendingMovies, searchMovies } from '../api/tmdb'

function sortMovies(movies, sort) {
  return [...movies].sort((a, b) => {
    if (sort === 'rating') return (b.vote_average || 0) - (a.vote_average || 0)
    if (sort === 'date' || sort === 'year') return (b.release_date || '').localeCompare(a.release_date || '')
    return (b.popularity || 0) - (a.popularity || 0)
  })
}

export default function Home() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [sort, setSort] = useState('popularity')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query.trim()), 450)
    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    const load = debouncedQuery ? searchMovies(debouncedQuery) : getTrendingMovies()
    load.then((data) => active && setMovies(data.results || [])).catch((reason) => active && setError(reason.message)).finally(() => active && setLoading(false))
    return () => { active = false }
  }, [debouncedQuery])

  const sortedMovies = useMemo(() => sortMovies(movies, sort), [movies, sort])

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <section className="mb-12 max-w-3xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-accent">Votre cinéma, partout</p>
        <h1 className="font-display text-4xl font-bold leading-tight text-zinc-950 dark:text-white sm:text-6xl">Trouvez votre prochain <span className="text-accent">coup de cœur.</span></h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-500 dark:text-zinc-400">Explorez les films qui font vibrer le monde en ce moment. Une sélection pensée pour vos prochaines soirées.</p>
      </section>
      <FilterBar query={query} setQuery={setQuery} sort={sort} setSort={setSort} />
      <div className="mb-6 mt-12 flex items-end justify-between"><div><h2 className="font-display text-2xl font-bold text-zinc-900 dark:text-white">{debouncedQuery ? `Résultats pour « ${debouncedQuery} »` : 'Tendances du jour'}</h2><p className="mt-1 text-sm text-zinc-500">{movies.length} films à découvrir</p></div></div>
      {loading ? <LoadingGrid /> : error ? <ErrorState message={error} /> : sortedMovies.length ? <MovieGrid movies={sortedMovies} /> : <p className="py-16 text-center text-zinc-500">Aucun film trouvé.</p>}
    </main>
  )
}
