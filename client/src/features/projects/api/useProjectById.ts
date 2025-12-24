import { useQuery } from "@tanstack/react-query";
import { projectsEndpoints } from "../../../api/axios";

export const useProjectById = (id: string) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => projectsEndpoints.getById(id),
    enabled: !!id,
  });
};
