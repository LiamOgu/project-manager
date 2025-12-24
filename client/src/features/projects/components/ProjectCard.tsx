import { Link } from "react-router";
import { isoToFrDateFormat } from "../../../utils/dateFormat";
import type { ProjectStatsInterface } from "../types/ProjectStatsInterface";

function ProjectCard({
  _id,
  name,
  nbTotalTasks,
  nbTodoTasks,
  nbCompletedTasks,
  nbInProgressTasks,
  createdAt,
}: ProjectStatsInterface) {
  const progress =
    nbTotalTasks > 0 ? (nbCompletedTasks / nbTotalTasks) * 100 : 0;

  return (
    <div className="bg-base-100 border border-base-200 drop-shadow-xl rounded-lg p-6 hover:border-base-300 hover:drop-shadow-2xl transition-all">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold mb-4">{name}</h3>
        <span className="text-md opacity-50">
          date de création: {isoToFrDateFormat(createdAt)}{" "}
        </span>
      </div>

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
      <Link
        to={`/project?id=${_id}`}
        className="btn btn-sm btn-ghost w-full justify-between"
      >
        <span>Voir détails</span>
        <span>→</span>
      </Link>
    </div>
  );
}

export default ProjectCard;
