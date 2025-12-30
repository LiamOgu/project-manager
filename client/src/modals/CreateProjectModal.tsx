import { useForm, type SubmitHandler } from "react-hook-form";
import { Modal } from "../components/common/Modal";
import { useCreateProject } from "../features/projects/api/useCreateProject";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Inputs {
  name: string;
}

export function CreateProjectModal({
  isOpen,
  onClose,
}: CreateProjectModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
    },
  });

  const { mutate } = useCreateProject();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    mutate(
      {
        name: data.name,
        ownerId: "69482861cf719452b0fbc890",
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
    <Modal isOpen={isOpen} onClose={onClose} title="Nouveau projet">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset mb-4">
          <legend className="fieldset-legend">Titre du project</legend>
          <input
            {...register("name", {
              required: "Le titre est requis",
              minLength: {
                value: 3,
                message: "Le titre doit contenir au moins 3 caractères",
              },
            })}
            type="text"
            className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`}
            placeholder="Ex: Créer la page d'accueil"
          />
          {errors.name && (
            <span className="text-error text-sm mt-1">
              {errors.name.message}
            </span>
          )}
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
            Créer le projet
          </button>
        </div>
      </form>
    </Modal>
  );
}
