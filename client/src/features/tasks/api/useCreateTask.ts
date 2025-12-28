import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksEndpoints } from "../../../api/axios";

interface CreateTaskData {
  title: string;
  description: string;
  status: string;
  projectId: string;
}

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskData) => tasksEndpoints.Create(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.projectId],
      });
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
};
