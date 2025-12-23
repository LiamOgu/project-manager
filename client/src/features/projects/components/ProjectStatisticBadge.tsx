interface ProjectStatisticBadgeProps {
  title: "To-do" | "In Progress" | "Completed";
  count: number;
}

function ProjectStatisticBadge({ title, count }: ProjectStatisticBadgeProps) {
  const color = {
    "To-do": "warning",
    "In Progress": "info",
    Completed: "success",
  };
  return (
    <div
      className={`flex flex-col items-center p-3 bg-${color[title]}/10 rounded-lg`}
    >
      <div className={`badge badge-${color[title]} badge-sm mb-1 w-full`}>
        {title}
      </div>
      <span className="text-2xl font-bold">{count}</span>
    </div>
  );
}

export default ProjectStatisticBadge;
