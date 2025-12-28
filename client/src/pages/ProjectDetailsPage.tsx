import { Link, useSearchParams } from "react-router";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { useProjectById } from "../features/projects/api/useProjectById";
import { useTasksByProject } from "../features/tasks/api/useTasksByProject";
import TaskCard from "../features/tasks/components/TaskCard";
import type { TaskCardInterface } from "../features/tasks/types/TasksInterface";

function ProjectDetailsPage() {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("id");

  const { name } = useProjectById(projectId || "").data?.data.project || {};
  const projectName = name || "Projet";

  const { data } = useTasksByProject(projectId || "");
  const tasks = data?.data.tasks || [];

  const todoTasks = tasks.filter(
    (task: TaskCardInterface) => task.status === "todo",
  );
  const inProgressTasks = tasks.filter(
    (task: TaskCardInterface) => task.status === "in_progress",
  );
  const doneTasks = tasks.filter(
    (task: TaskCardInterface) => task.status === "done",
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="breadcrumbs text-sm absolute left-16 p-4">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>{projectName}</li>
            </ul>
          </div>
          <h1 className="text-4xl font-bold mb-3">Project Details Page</h1>
          <p className="text-base-content/60 mb-8">
            Gérez vos tâches simplement
          </p>
          <button className="btn btn-primary">Nouvelle tâche</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Colonne Todo */}
          <div className="flex flex-col">
            <div className="bg-base-200 p-4 rounded-lg mb-4">
              <h2 className="text-xl font-semibold">Todo</h2>
              <span className="text-sm text-base-content/60">
                {todoTasks.length} tâches
              </span>
            </div>
            <div className="space-y-4">
              {todoTasks.map((task: TaskCardInterface) => (
                <TaskCard
                  key={task._id}
                  title={task.title}
                  status={task.status}
                  createdAt={task.createdAt}
                />
              ))}
            </div>
          </div>

          {/* Colonne In Progress */}
          <div className="flex flex-col">
            <div className="bg-base-200 p-4 rounded-lg mb-4">
              <h2 className="text-xl font-semibold">In Progress</h2>
              <span className="text-sm text-base-content/60">
                {inProgressTasks.length} tâches
              </span>
            </div>
            <div className="space-y-4">
              {inProgressTasks.map((task: TaskCardInterface) => (
                <TaskCard
                  key={task._id}
                  title={task.title}
                  status={task.status}
                  createdAt={task.createdAt}
                />
              ))}
            </div>
          </div>

          {/* Colonne Done */}
          <div className="flex flex-col">
            <div className="bg-base-200 p-4 rounded-lg mb-4">
              <h2 className="text-xl font-semibold">Done</h2>
              <span className="text-sm text-base-content/60">
                {doneTasks.length} tâches
              </span>
            </div>
            <div className="space-y-4">
              {doneTasks.map((task: TaskCardInterface) => (
                <TaskCard
                  key={task._id}
                  title={task.title}
                  status={task.status}
                  createdAt={task.createdAt}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProjectDetailsPage;
