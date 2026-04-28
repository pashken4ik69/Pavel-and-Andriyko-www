import { useNavigate } from "react-router";
import { useGetSpacesQuery } from "../api/spces-api";

function SpacesList() {
  const { data: spaces, isLoading } = useGetSpacesQuery();
  const navigate = useNavigate();

  if (isLoading) return <h1>Загрузка пространств...</h1>;
  if (!spaces || spaces.length === 0) return <h1>Пространств пока нет</h1>;

  return (
    <div className="list">
      {spaces.map((space) => (
        <div 
          key={space.id} 
          onClick={() => navigate(`/spaces/${space.id}`)} 
          className="card"
        >
          <img src={space.images} alt={space.title} />
          <div className="card-content">
            <h3>{space.title}</h3>
            <p>{space.description}</p>
            <p>👥 Вместимость: {space.capacity} чел.</p>
            <p>💰 {space.pricePerHour} ₽ / час</p>
            <p>⭐ {space.rating}</p>
            <code>{space.zoneType}</code>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SpacesList;
