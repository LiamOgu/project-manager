import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { useProjects } from "../features/projects/api/useProjects";
import ProjectCard from "../features/projects/components/ProjectCard";

interface Project {
  _id: string;
  name: string;
  ownerId: string;
  createdAt: string;
}

export default function HomePage() {
  const { data } = useProjects();

  console.log(data?.data);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-1">
        {/* Hero Section - Minimaliste */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-3">Project Manager</h1>
          <p className="text-base-content/60 mb-8">
            Gérez vos projets simplement
          </p>
          <button className="btn btn-primary">Nouveau projet</button>
        </div>

        {/* Projects Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">Projets</h2>
            <button className="btn btn-ghost btn-sm">Filtrer</button>
          </div>

          {/* Grid de cartes responsive */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.data.projects.map((project: Project) => (
              <ProjectCard key={project.name} name={project.name} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
