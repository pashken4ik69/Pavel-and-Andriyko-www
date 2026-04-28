import { useNavigate } from "react-router"
import { useAppSelector } from "../../../app/store/store"
import { useEffect } from "react"

function SpacesList() {
    const {spaces} = useAppSelector(state => state.sapces)
    const navigate = useNavigate()

    useEffect(() =>{
        
    }, [spaces])

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
