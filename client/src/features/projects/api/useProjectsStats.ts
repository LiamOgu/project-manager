import { useQuery } from "@tanstack/react-query";
import { projectsEndpoints } from "../../../api/axios";

export const useProjectsStats = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => projectsEndpoints.getAllStats(),
  });
};
