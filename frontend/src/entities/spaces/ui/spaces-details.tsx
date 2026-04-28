import { useNavigate, useParams } from "react-router";
import { useGetSpaceQuery } from "../api/spces-api";
import { useAppSelector } from "../../../app/store/store";
function SpacesDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: space } = useGetSpaceQuery(id || "");
  const { user } = useAppSelector((state) => state.auth);

  if (!space) return <div>Данные отсутствуют</div>;

  return (
    <div className="details">
      <img src={space.images} alt={space.images} />
      <h3>{space.title}</h3>
      <p>{space.description}</p>
      <p>{space.capacity}</p>
      <p>{space.pricePerHour}</p>
      <p>{space.rating}</p>
      <p>{space.zoneType}</p>
      <button onClick={() => navigate("/spaces")}>Назад</button>
      <button>Забронировать</button>
      {user?.role === "manager" && (
        <>
          <button>Удалить</button>
          <button>Изменить</button>
        </>
      )}
    </div>
  );
}

export default SpacesDetails;
