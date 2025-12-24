import { useSearchParams } from "react-router";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { useTasksByProject } from "../features/tasks/api/useTasksByProject";
import TaskCard from "../features/tasks/components/TaskCard";
import type { TaskCardInterface } from "../features/tasks/types/TasksInterface";

function ProjectDetailsPage() {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("id");

  const { data } = useTasksByProject(projectId || "");
  const tasks = data?.data.tasks || [];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-3">Project Details Page</h1>
          <p className="text-base-content/60 mb-8">
            Gérez vos tâches simplement
          </p>
          <button className="btn btn-primary">Nouvelle tâche</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task: TaskCardInterface) => (
            <TaskCard
              key={task._id}
              title={task.title}
              status={task.status}
              createdAt={task.createdAt}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProjectDetailsPage;
