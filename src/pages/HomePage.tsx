import { Link } from 'react-router-dom'
import { useHelloQuery } from '../hooks/useHelloQuery.ts'

function HomePage() {
  const { data, isLoading } = useHelloQuery()

  return (
    <section className="space-y-8">
      <div className="card p-6">
        <p className="muted mb-2">Welcome</p>
        <h1 className="text-2xl font-semibold text-slate-50">Starter kit ready</h1>
        <p className="mt-2 text-slate-300">
          React 18 + Vite + TypeScript with Tailwind, ESLint, Router, React Query, Axios,
          React Hook Form, and Zod are prewired.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link className="button" to="/form">
            Try the form demo
          </Link>
          <a
            className="button bg-slate-800 text-slate-100 hover:bg-slate-700"
            href="https://tanstack.com/query/latest"
            target="_blank"
            rel="noreferrer"
          >
            React Query docs
          </a>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="muted">React Query example</p>
            <h2 className="text-lg font-semibold text-slate-50">Hello query</h2>
          </div>
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-sky-200">
            {isLoading ? 'Loading…' : 'Fresh'}
          </span>
        </div>
        <div className="mt-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          {isLoading && <p className="text-slate-400">Fetching data…</p>}
          {!isLoading && data && (
            <div className="space-y-1 text-sm text-slate-200">
              <p className="font-medium text-sky-200">{data.message}</p>
              <p className="text-slate-400">
                Timestamp: {new Date(data.timestamp).toLocaleTimeString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default HomePage
