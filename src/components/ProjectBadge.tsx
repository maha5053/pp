import { Link } from 'react-router-dom'
import { getProjectById } from '../data/projects'

export function ProjectBadge(props: { projectId: string }) {
  const project = getProjectById(props.projectId)
  const label = project?.title ?? props.projectId

  return (
    <Link
      to={`/${props.projectId}`}
      className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
      title={label}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-zinc-900" />
      <span className="max-w-56 truncate">{label}</span>
    </Link>
  )
}

