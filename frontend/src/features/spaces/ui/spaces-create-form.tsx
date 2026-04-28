import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { ISpaceCrate } from "../../../entities/spaces/model/types";
import { useCreateSpaceMutation } from "../../../entities/spaces/api/spces-api";

// Схема валидации
const schema = yup.object().shape({
  title: yup.string().required("Введите название"),
  zoneType: yup
    .string()
    .oneOf(["open-space", "meeting-room", "private-office"])
    .required("Выберите тип зоны"),
  pricePerHour: yup
    .number()
    .typeError("Должно быть числом")
    .positive("Цена должна быть больше 0")
    .required("Укажите цену"),
  capacity: yup
    .number()
    .typeError("Должно быть числом")
    .integer()
    .positive()
    .required("Укажите вместимость"),
  description: yup
    .string()
    .min(10, "Описание слишком короткое")
    .required("Введите описание"),
  images: yup.string().url("Введите корректную ссылку на изображение"),
});

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function SpacesCreateForm({ isOpen, onClose }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [createSpace, { isLoading }] = useCreateSpaceMutation();

  const onSubmit = async (data: ISpaceCrate) => {
    try {
      await createSpace(data).unwrap();
      reset();
      onClose();
    } catch (e) {
      console.error("Ошибка при создании:", e);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4>Создание пространства</h4>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form className="booking-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label>Название:</label>
            <input {...register("title")} placeholder="Введите название" />
            {errors.title && (
              <span className="error">{errors.title.message}</span>
            )}
          </div>

          <div className="field">
            <label>Тип зоны:</label>
            <select {...register("zoneType")}>
              <option value="open-space">Open Space</option>
              <option value="meeting-room">Meeting Room</option>
              <option value="private-office">Private Office</option>
            </select>
            {errors.zoneType && (
              <span className="error">{errors.zoneType.message}</span>
            )}
          </div>

          <div className="field">
            <label>Цена в час (₽):</label>
            <input type="number" {...register("pricePerHour")} />
            {errors.pricePerHour && (
              <span className="error">{errors.pricePerHour.message}</span>
            )}
          </div>

          <div className="field">
            <label>Вместимость (чел.):</label>
            <input type="number" {...register("capacity")} />
            {errors.capacity && (
              <span className="error">{errors.capacity.message}</span>
            )}
          </div>

          <div className="field">
            <label>Ссылка на изображение:</label>
            <input {...register("images")} placeholder="https://example.com" />
            {errors.images && (
              <span className="error">{errors.images.message}</span>
            )}
          </div>

          <div className="field">
            <label>Описание:</label>
            <textarea {...register("description")} rows={3} />
            {errors.description && (
              <span className="error">{errors.description.message}</span>
            )}
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Создание..." : "Создать"}
            </button>
            <button type="button" onClick={onClose} disabled={isLoading}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SpacesCreateForm;
