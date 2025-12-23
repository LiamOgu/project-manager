import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import ProjectCard from "../features/projects/components/ProjectCard";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header />
      <main className="container mx-auto p-4 min-h-90">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Welcome to the Project Manager
          </h1>
          <p className="mb-2">
            This is the home page of your project management application.
          </p>
        </div>
        <h2 className="text-2xl font-bold mb-4">List of the projects :</h2>
        <div>
          <ProjectCard
            name={"Project 1"}
            nbTodoTasks={3}
            nbCompletedTasks={1}
            nbInProgressTasks={4}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
