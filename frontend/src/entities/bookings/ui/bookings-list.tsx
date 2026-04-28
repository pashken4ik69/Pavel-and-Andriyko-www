import {
  useGetBookingsQuery,
  useCancelBookingsMutation,
  useApproveBookingsMutation,
} from "../api/bookings-api";
import { useAppSelector } from "../../../app/store/store";

function BookingsList() {
  const { data: bookings, isLoading } = useGetBookingsQuery();
  const { user } = useAppSelector((state) => state.auth);

  const [cancelBooking] = useCancelBookingsMutation();
  const [updateStatus] = useApproveBookingsMutation();

  const handleCancel = async (id: number) => {
    if (window.confirm("Вы уверены?")) {
      await cancelBooking(id);
    }
  };

  const handleStatusChange = async (
    id: number,
    status: "approved" | "rejected",
  ) => {
    await updateStatus({ id, status });
  };

  if (isLoading) return <h1>Загрузка...</h1>;

  return (
    <div className="list">
      {bookings?.map((booking) => (
        <div key={booking.id} className={`booking-item ${booking.status}`}>
          <h2>{booking.comment || "Заявка без названия"}</h2>
          <p>📅 {booking.date}</p>
          <p>
            🕒 {booking.timeFrom} — {booking.timeTo}
          </p>
          <code>Статус: {booking.status}</code>

          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            {booking.status === "pending" && (
              <button onClick={() => handleCancel(booking.id)}>Отменить</button>
            )}

            {user?.role === "manager" && booking.status === "pending" && (
              <>
                <button
                  onClick={() => handleStatusChange(booking.id, "approved")}
                  style={{ borderColor: "#22c55e", color: "#22c55e" }}
                >
                  Одобрить
                </button>
                <button
                  onClick={() => handleStatusChange(booking.id, "rejected")}
                  style={{ borderColor: "#ef4444", color: "#ef4444" }}
                >
                  Отклонить
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookingsList;
