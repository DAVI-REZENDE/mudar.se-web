import { 
  GoogleMap,
  useJsApiLoader,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import './styles.scss'

export function NewVacancy() {
  const [ latitude, setLatitude ] = useState(0)
  const [ longitude, setLongitude ] = useState(0)
  const [ state, setState ] = useState('')
  const [ city, setCity ] = useState('')
  const [ address, setAddress ] = useState('')
  const [ code, setCode ] = useState('')

  const {isLoaded, loadError} = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDZjZe0pH8BxTFv-pNbZU5iV9VBg2FHJ14",
    libraries: ["places"]
  })

  const mapContainerStyle = {
    width: "100%",
    height: "100%"
  }

  const position = {
    lat: latitude,
    lng: longitude
  }

  useEffect(() => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      })
    }else {
      return;
    }

  }, [])

  return (
    <div className="wrapper">
      <form>
        <section className="step-one">
          <h2>Step 1</h2>
          <input className="state" placeholder="Estado" value={state} onChange={(e) => setState(e.target.value)} />
          <input className="city" placeholder="Cidade" value={city} onChange={(e) => setCity(e.target.value)} />
          <input className="aderess" placeholder="Endereço" value={address} onChange={(e) => setAddress(e.target.value)} />
          <input className="code" placeholder="CEP" value={code} onChange={(e) => setCode(e.target.value)} />

          <div className="map">
            {loadError && "Error load map"}
            {!isLoaded && "Loading map"}

            <GoogleMap 
              mapContainerStyle={mapContainerStyle} 
              zoom={15} 
              center={position}
            >
              <Marker position={position} />
            </GoogleMap>
          </div>
        </section>
      </form>
    </div>
  );
}
