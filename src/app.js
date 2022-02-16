import { useState } from "react";
import './style.css'
function App() {
    const [city, setCity] = useState('Patna');
    const [locationData, setLocationData] = useState('')
    const [forecast, setForecast] = useState([])
    const [img, setImg] = useState('')
    const [current, setCurrent] = useState('')
    const [time, setTime] = useState(0)

    function submit() {
        let today = new Date()
        today = (today.getHours() ? today.getHours() - 1 : today.getHours());
        setTime(today)
        
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=3a81ceec694b4589a6791432212707&q=${city}`
        )
            .then((res) => res.json())
            .then((data) => {
                // console.log(data)
                setLocationData(data.location)
                setImg(data.current.condition)
                setCurrent(data.current)
                setForecast(data.forecast.forecastday[0].hour)
            })
    }
    return <section>
        <header>
            <h1><strong>Today's Weather</strong></h1>
            <h3>Check weather of any major city</h3>
        </header>
        <div className='head'>
            <input
                type='text'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder='Enter City Name'
                required
            ></input>
            <button className='' onClick={() => submit()}>Submit</button>
        </div>
        {
            locationData ? <>
                <div className='container1'>
                    <img src={img.icon} alt='Cloud'></img>
                    <h1>{current.temp_c}°C</h1>
                    <h5> {img.text} </h5>

                    <h2> <strong>{locationData.name}</strong>, {locationData.country}</h2> <br />
                    {/* {, {locationData.region}} */}
                    
                    <section className='innerContainer'>
                        <div><h6>Wind</h6><h6>{current.wind_kph} km/h</h6></div>
                        <div><h6>Humidity</h6><h6>{current.humidity}%</h6></div>
                        <div><h6>Precipitation</h6><h6>{current.precip_in}%</h6></div>
                    </section>
                    {/* {forecast ? Object.keys(forecast).map((t, i) => <div key={i}> {t} =  {forecast[i]}</div>)
                : "Place Not Found"} */}

                </div>
                <div className='weather'>
                    <div>
                        <section className='pseudo'></section>
                        <h4> Time : </h4>
                        <h4> Rains (%) :</h4>
                        <h4> Cloud (%) :</h4>
                        <h4> Temp (°C) :</h4>
                    </div>
                    {forecast.map((t, i) =>
                        time <= i && i < (time + 6) ?
                            <div key={i}>
                                <img src={forecast[i].condition.icon} alt={forecast[i].condition.text} />
                                <h5> {i}:00</h5>
                                <h5> {forecast[i].chance_of_rain}</h5>
                                <h5> {forecast[i].cloud}</h5>
                                <h5> {forecast[i].temp_c}</h5>
                            </div> : '')}
                </div>
            </> : "Place Not Found"}
            <footer>
                <h3>Information is provide by <a href='https://www.weatherapi.com/'><strong>Weather API</strong></a></h3>
            </footer>
    </section>
}

export default App;

// chance_of_rain: 70
// chance_of_snow: 0
// cloud: 62
// condition: {text: "Light rain shower", icon: "//cdn.weatherapi.com/weather/64x64/day/353.png", code: 1240}
// dewpoint_c: 24.5
// dewpoint_f: 76.1
// feelslike_c: 43
// feelslike_f: 109.4
// gust_kph: 11.5
// gust_mph: 7.2
// heatindex_c: 43
// heatindex_f: 109.4
// humidity: 55
// is_day: 1
// precip_in: 0.03
// precip_mm: 0.7
// pressure_in: 29.58
// pressure_mb: 1002
// temp_c: 35
// temp_f: 95
// time: "2021-08-16 13:00"
// time_epoch: 1629099000
// uv: 8
// vis_km: 10
// vis_miles: 6
// will_it_rain: 1
// will_it_snow: 0
// wind_degree: 101
// wind_dir: "ESE"
// wind_kph: 9
// wind_mph: 5.6
// windchill_c: 35
// windchill_f: 95
// Location 
// name = Patna
// region = Bihar
// country = India
// lat = 25.6
// lon = 85.12
// tz_id = Asia/Kolkata
// localtime_epoch = 1629103903
// localtime = 2021-08-16 14:21