import { Link } from "react-router";
import { isoToFrDateFormat } from "../../../utils/dateFormat";
import type { TaskCardInterface } from "../types/TasksInterface";

function TaskCard({ title, status, createdAt }: TaskCardInterface) {
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "todo":
      case "à faire":
        return "bg-gray-100 text-gray-700";
      case "in progress":
      case "en cours":
        return "bg-blue-100 text-blue-700";
      case "done":
      case "terminé":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-lg transition-all duration-200">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base font-medium text-gray-900 line-clamp-2 flex-1">
            {title}
          </h3>
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap ${getStatusStyle(
              status,
            )}`}
          >
            {status}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <time className="text-gray-400">{isoToFrDateFormat(createdAt)}</time>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100 mb-4"></div>

      {/* Action */}
      <Link
        to={`/task?name=${title}`}
        className="flex items-center justify-between text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
        <span className="font-medium">Voir détails</span>
        <span className="text-gray-400 group-hover:translate-x-1 transition-transform">
          →
        </span>
      </Link>
    </div>
  );
}

export default TaskCard;
