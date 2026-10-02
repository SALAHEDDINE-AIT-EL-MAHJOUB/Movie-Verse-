import { AlertCircle, LoaderCircle } from 'lucide-react'

export function LoadingGrid() {
  return <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">{Array.from({ length: 10 }, (_, index) => <div key={index} className="animate-pulse space-y-3"><div className="aspect-[2/3] rounded-2xl bg-zinc-200 dark:bg-white/10" /><div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-white/10" /><div className="h-3 w-1/3 rounded bg-zinc-200 dark:bg-white/10" /></div>)}</div>
}

export function ErrorState({ message }) {
  return <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center"><AlertCircle className="mx-auto mb-3 text-red-400" /><p className="text-sm text-red-300">{message}</p></div>
}

export function EmptyState({ title, description }) {
  return <div className="rounded-2xl border border-dashed border-zinc-300 p-12 text-center dark:border-white/15"><p className="font-display text-xl font-bold text-zinc-900 dark:text-white">{title}</p><p className="mt-2 text-sm text-zinc-500">{description}</p></div>
}

export function PageLoader() {
  return <div className="grid min-h-[60vh] place-items-center"><LoaderCircle className="animate-spin text-accent" size={34} /></div>
}
