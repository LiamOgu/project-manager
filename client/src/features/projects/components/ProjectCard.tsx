import { useProjects } from "../api/useProjects";

interface ProjectCardProps {
  name: string;
  nbTodoTasks: number;
  nbCompletedTasks: number;
  nbInProgressTasks: number;
}

function ProjectCard({
  name,
  nbTodoTasks,
  nbCompletedTasks,
  nbInProgressTasks,
}: ProjectCardProps) {
  const totalTasks = nbTodoTasks + nbCompletedTasks + nbInProgressTasks;
  const progress = totalTasks > 0 ? (nbCompletedTasks / totalTasks) * 100 : 0;

  const { data, isPending, isError, error } = useProjects();

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {String(error)}</span>;
  }

  return (
    <div className="bg-base-100 border border-base-200 drop-shadow-xl rounded-lg p-6 hover:border-base-300 hover:drop-shadow-2xl transition-all">
      <h3 className="text-lg font-semibold mb-4">{name}</h3>

      {/* Statistiques simples */}
      <div className="space-y-2 mb-4 text-sm">
        <div className="flex justify-between">
          <span className="text-base-content/60">À faire</span>
          <span className="font-medium">{nbTodoTasks}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-base-content/60">En cours</span>
          <span className="font-medium">{nbInProgressTasks}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-base-content/60">Terminé</span>
          <span className="font-medium">{nbCompletedTasks}</span>
        </div>
      </div>

      {/* Barre de progression simple */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-base-content/50">Progression</span>
          <span className="font-medium">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-base-200 rounded-full h-1.5">
          <div
            className="bg-primary h-1.5 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Action */}
      <button className="btn btn-sm btn-ghost w-full justify-between">
        <span>Voir détails</span>
        <span>→</span>
      </button>
    </div>
  );
}

export default ProjectCard;
