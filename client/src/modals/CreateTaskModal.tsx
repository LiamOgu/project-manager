import { useForm, type SubmitHandler } from "react-hook-form";
import { Modal } from "../components/common/Modal";
import { useCreateTask } from "../features/tasks/api/useCreateTask";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

interface Inputs {
  title: string;
  description: string;
  status: "todo" | "in_progress" | "done";
}

export function CreateTaskModal({
  isOpen,
  onClose,
  projectId,
}: CreateTaskModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: "",
      description: "",
      status: "todo",
    },
  });

  const { mutate } = useCreateTask();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data, projectId);
    mutate(
      {
        title: data.title,
        description: data.description,
        status: data.status,
        projectId: projectId,
      },
      {
        onSuccess: () => {
          onClose();
          reset();
        },
      },
    );
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nouvelle Tâche">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Champ Titre */}
        <fieldset className="fieldset mb-4">
          <legend className="fieldset-legend">Titre de la tâche</legend>
          <input
            {...register("title", {
              required: "Le titre est requis",
              minLength: {
                value: 3,
                message: "Le titre doit contenir au moins 3 caractères",
              },
            })}
            type="text"
            className={`input input-bordered w-full ${errors.title ? "input-error" : ""}`}
            placeholder="Ex: Créer la page d'accueil"
          />
          {errors.title && (
            <span className="text-error text-sm mt-1">
              {errors.title.message}
            </span>
          )}
        </fieldset>

        {/* Champ Description */}
        <fieldset className="fieldset mb-4">
          <legend className="fieldset-legend">Description</legend>
          <textarea
            {...register("description")}
            className="textarea textarea-bordered w-full"
            placeholder="Décrivez la tâche..."
            rows={3}
          />
        </fieldset>

        {/* Champ Status */}
        <fieldset className="fieldset mb-4">
          <legend className="fieldset-legend">Statut</legend>
          <select
            {...register("status")}
            className="select select-bordered w-full"
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In progress</option>
            <option value="done">Done</option>
          </select>
        </fieldset>

        {/* Actions */}
        <div className="modal-action">
          <button
            type="button"
            className="btn"
            onClick={() => {
              onClose();
              reset();
            }}
          >
            Annuler
          </button>
          <button type="submit" className="btn btn-primary">
            Créer la tâche
          </button>
        </div>
      </form>
    </Modal>
  );
}
