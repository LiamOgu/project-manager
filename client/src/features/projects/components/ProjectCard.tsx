import ProjectStatisticBadge from "./ProjectStatisticBadge";

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

  return (
    <div className="card bg-base-100 w-100 shadow-xl hover:shadow-2xl transition-shadow duration-200 border border-base-300">
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold mb-4">{name}</h2>

        {/* Barre de progression */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-base-content/70">Progression</span>
            <span className="font-semibold">{Math.round(progress)}%</span>
          </div>
          <progress
            className="progress progress-primary w-full"
            value={progress}
            max="100"
          ></progress>
        </div>

        {/* Statistiques avec badges */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <ProjectStatisticBadge title="To-do" count={nbTodoTasks} />

          <ProjectStatisticBadge
            title="In Progress"
            count={nbInProgressTasks}
          />

          <ProjectStatisticBadge title="Completed" count={nbCompletedTasks} />
        </div>

        {/* Actions */}
        <div className="card-actions justify-end mt-2">
          <button className="btn btn-primary btn-sm">
            Détail du projet
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
