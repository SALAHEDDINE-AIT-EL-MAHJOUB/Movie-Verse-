import { ArrowDownUp, Search, X } from 'lucide-react'

export default function FilterBar({ query, setQuery, sort, setSort }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un film..." className="h-12 w-full rounded-xl border border-zinc-200 bg-white pl-11 pr-10 text-sm outline-none transition placeholder:text-zinc-400 focus:border-accent dark:border-white/10 dark:bg-surface dark:text-white" />
        {query && <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-accent"><X size={17} /></button>}
      </div>
      <label className="relative">
        <ArrowDownUp className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
        <select value={sort} onChange={(event) => setSort(event.target.value)} className="h-12 w-full appearance-none rounded-xl border border-zinc-200 bg-white pl-10 pr-10 text-sm text-zinc-700 outline-none focus:border-accent dark:border-white/10 dark:bg-surface dark:text-zinc-200 sm:w-52">
          <option value="popularity">Popularité</option>
          <option value="rating">Note</option>
          <option value="date">Date de sortie</option>
          <option value="year">Année</option>
        </select>
      </label>
    </div>
  )
}
