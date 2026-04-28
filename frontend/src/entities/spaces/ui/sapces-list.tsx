import { useNavigate } from "react-router"
import { useGetSpacesQuery } from "../api/spces-api"

function SpacesList() {
    const {data: spaces} = useGetSpacesQuery()
    const navigate = useNavigate()

    if (!spaces) {
        return <div>Spaces нету</div>
    }

  return (
    <div className="list">
      {spaces.map((space) => (
        <div onClick={() => navigate(`/spaces/${space.id}`)} className="card">
            <img src={space.images} alt={space.images} />
            <h3>{space.title}</h3>
            <p>{space.description}</p>
            <p>{space.capacity}</p>
            <p>{space.pricePerHour}</p>
            <p>{space.rating}</p>
            <p>{space.zoneType}</p>
        </div>
      ))}
    </div>
  )
}

export default SpacesList
