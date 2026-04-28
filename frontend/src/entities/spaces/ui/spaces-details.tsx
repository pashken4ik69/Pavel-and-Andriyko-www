import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useGetSpaceQuery, useDeleteSpaceMutation } from "../api/spces-api";
import { useCreateBookingsMutation } from "../../bookings/api/bookings-api";
import { useAppSelector } from "../../../app/store/store";

import ReviewsCreateForm from "../../../features/reviews/ui/reviews-create-form";
import ReviewsList from "../../reviews/ui/reviews-list";

interface IBookingForm {
  date: string;
  timeFrom: string;
  timeTo: string;
  comment?: string;
}

const schema = yup.object().shape({
  date: yup.string().required("Выберите дату"),
  timeFrom: yup.string().required("Укажите время начала"),
  timeTo: yup.string().required("Укажите время окончания"),
  comment: yup.string().max(200, "Комментарий слишком длинный").optional(),
});

function SpacesDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: space, isLoading } = useGetSpaceQuery(id || "");
  const { user } = useAppSelector((state) => state.auth);

  const [showCalendar, setShowCalendar] = useState(false);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

  const [createBooking, { isLoading: isBooking }] = useCreateBookingsMutation();
  const [deleteSpace, { isLoading: isDeleting }] = useDeleteSpaceMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBookingForm>({
    resolver: yupResolver(schema) as any,
  });

  const onSubmit: SubmitHandler<IBookingForm> = async (values) => {
    try {
      await createBooking({
        ...values,
        spaceId: Number(space?.id),
        userId: user?.id,
        comment: values.comment || "",
      }).unwrap();
      alert("Успешно забронировано!");
      setShowCalendar(false);
    } catch (err: any) {
      alert(err.data?.message || "Ошибка при бронировании");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Вы уверены, что хотите удалить это пространство?")) {
      try {
        await deleteSpace(Number(id)).unwrap();
        alert("Удалено успешно");
        navigate("/spaces");
      } catch (err: any) {
        alert(err.data?.message || "Ошибка при удалении");
      }
    }
  };

  if (isLoading) return <h1>Загрузка...</h1>;
  if (!space) return <h1>Данные отсутствуют</h1>;

  return (
    <div className="details">
      <img src={space.images} alt={space.title} />

      <div className="details-info">
        <h1>{space.title}</h1>
        <p>{space.description}</p>
        <p>👥 Вместимость: {space.capacity} чел.</p>
        <p>💰 Цена: {space.pricePerHour} руб/час</p>
        <p>⭐ Рейтинг: {space.rating}</p>
        <code>Тип: {space.zoneType}</code>
      </div>

      <div
        className="actions"
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <button onClick={() => navigate("/spaces")}>Назад</button>

        {!showCalendar && (
          <button onClick={() => setShowCalendar(true)}>Забронировать</button>
        )}

        {user?.role === "client" && (
          <button onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}>
            {isReviewFormOpen ? "Закрыть отзыв" : "Оставить отзыв"}
          </button>
        )}
      </div>

      {showCalendar && (
        <form className="booking-form" onSubmit={handleSubmit(onSubmit)}>
          <h4>Бронирование</h4>
          <div className="field">
            <label>Дата:</label>
            <input
              type="date"
              {...register("date")}
              min={new Date().toISOString().split("T")[0]}
            />
            {errors.date && (
              <span className="error">{errors.date.message}</span>
            )}
          </div>
          <div className="field">
            <label>Время с:</label>
            <input type="time" {...register("timeFrom")} />
            {errors.timeFrom && (
              <span className="error">{errors.timeFrom.message}</span>
            )}
          </div>
          <div className="field">
            <label>Время по:</label>
            <input type="time" {...register("timeTo")} />
            {errors.timeTo && (
              <span className="error">{errors.timeTo.message}</span>
            )}
          </div>
          <div className="field">
            <label>Комментарий:</label>
            <textarea {...register("comment")} />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" disabled={isBooking}>
              {isBooking ? "Загрузка..." : "Подтвердить"}
            </button>
            <button type="button" onClick={() => setShowCalendar(false)}>
              Отмена
            </button>
          </div>
        </form>
      )}

      {isReviewFormOpen && <ReviewsCreateForm spaceId={id!} />}

      {user?.role === "manager" && (
        <div
          className="manager-panel"
          style={{
            marginTop: "30px",
            borderTop: "1px solid var(--border)",
            paddingTop: "20px",
            width: "100%",
          }}
        >
          <h4>Админ-панель</h4>
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <button onClick={() => navigate(`/spaces/edit/${id}`)}>
              Изменить
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              style={{ borderColor: "#ef4444", color: "#ef4444" }}
            >
              {isDeleting ? "Удаление..." : "Удалить"}
            </button>
          </div>
          <div
            className="reviews-section"
            style={{ width: "100%", marginTop: "40px" }}
          >
            <h2>Отзывы</h2>
            <ReviewsList spaceId={id!} />
          </div>
        </div>
      )}
    </div>
  );
}

export default SpacesDetails;
