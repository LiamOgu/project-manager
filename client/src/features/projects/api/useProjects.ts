import { useQuery } from "@tanstack/react-query";
import { projectsEndpoints } from "../../../api/axios";

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => projectsEndpoints.getAll(),
  });
};
