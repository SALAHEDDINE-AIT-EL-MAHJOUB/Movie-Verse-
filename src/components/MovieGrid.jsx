import MovieCard from './MovieCard'

export default function MovieGrid({ movies }) {
  return <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">{movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</div>
}
