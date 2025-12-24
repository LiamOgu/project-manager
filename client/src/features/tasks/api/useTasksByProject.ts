import { useQuery } from "@tanstack/react-query";
import { tasksEndpoints } from "../../../api/axios";

export const useTasksByProject = (projectId: string) => {
  return useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => tasksEndpoints.getAllByProjectId(projectId),
  });
};
