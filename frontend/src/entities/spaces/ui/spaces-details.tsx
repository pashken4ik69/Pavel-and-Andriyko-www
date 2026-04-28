import { useState } from "react";
import { useCreateBookingsMutation } from "../../bookings/api/bookings-api";
import { useAppSelector } from "../../../app/store/store";
import { useGetSpaceQuery } from "../api/spces-api";
import { useNavigate, useParams } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
    const [createBooking, { isLoading: isBooking }] = useCreateBookingsMutation();

    const { register, handleSubmit, formState: { errors } } = useForm<IBookingForm>({
        resolver: yupResolver(schema) as any
    });

    const onSubmit: SubmitHandler<IBookingForm> = async (values) => {
        try {
            await createBooking({
                ...values,
                spaceId: Number(space?.id),
                userId: user?.id,
                comment: values.comment || ""
            }).unwrap();
            alert("Успешно забронировано!");
            setShowCalendar(false);
        } catch (err: any) {
            alert(err.data?.message || "Ошибка при бронировании");
        }
    };

    if (isLoading) return <div>Загрузка...</div>;
    if (!space) return <div>Данные отсутствуют</div>;

    return (
        <div className="details">
            <img src={space.images} alt={space.title} />
            <h3>{space.title}</h3>
            <p>Цена: {space.pricePerHour} руб/час</p>

            <button onClick={() => navigate("/spaces")}>Назад</button>

            {!showCalendar ? (
                <button onClick={() => setShowCalendar(true)}>Забронировать</button>
            ) : (
                <form className="booking-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                        <label>Дата:</label>
                        <input type="date" {...register("date")} min={new Date().toISOString().split("T")[0]} />
                        {errors.date && <span className="error" style={{ color: 'red' }}>{errors.date.message}</span>}
                    </div>

                    <div className="field">
                        <label>Время с:</label>
                        <input type="time" {...register("timeFrom")} />
                        {errors.timeFrom && <span className="error" style={{ color: 'red' }}>{errors.timeFrom.message}</span>}
                    </div>

                    <div className="field">
                        <label>Время по:</label>
                        <input type="time" {...register("timeTo")} />
                        {errors.timeTo && <span className="error" style={{ color: 'red' }}>{errors.timeTo.message}</span>}
                    </div>

                    <div className="field">
                        <label>Комментарий:</label>
                        <textarea {...register("comment")} />
                    </div>

                    <button type="submit" disabled={isBooking}>
                        {isBooking ? "Загрузка..." : "Подтвердить бронь"}
                    </button>
                    <button type="button" onClick={() => setShowCalendar(false)}>Отмена</button>
                </form>
            )}

            {user?.role === "manager" && (
                <div className="manager" style={{ marginTop: '20px', borderTop: '1px solid #ccc' }}>
                    <h4>Админ-панель</h4>
                    <button>Удалить</button>
                    <button>Изменить</button>
                </div>
            )}
        </div>
    );
}

export default SpacesDetails;
