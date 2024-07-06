import { useState } from 'react'
import axios from 'axios'
import BG_Video from './assets/weather.mp4'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=bd04d6b7f0f027c66af9697347e8c354`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className='app'>

      <video src={BG_Video} autoPlay muted loop />

      <div className="container">
        <div className='search'>
          <input
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyDown={searchLocation}
            type='text'
            placeholder='Enter Location'
          />
        </div>
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}&deg;F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feel">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}&deg;F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()}<small>mph</small></p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }

      </div>
    </div>
  )
}

export default App;
