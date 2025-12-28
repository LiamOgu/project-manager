import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsEndpoints } from "../../../api/axios";

interface CreateProjectData {
  name: string;
  ownerId: string;
}

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectData) => projectsEndpoints.Create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
};
