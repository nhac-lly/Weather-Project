import { useRef, useState } from 'react'
import './App.css'
import WeatherResultItem from './components/WeatherResultItem'
import WeatherCard from './components/WeatherCard'
import WeatherSearch from './components/WeatherSearch'
import WeatherError from './components/WeatherError'

function App() {
  const cityRef = useRef()
  const countryRef = useRef()
  const [data, setData] = useState(null)
  const [searchList, setSearchList] = useState([])

  const getQuery = () => {
    if (cityRef.current?.value && countryRef.current?.value) {
      return cityRef.current.value + ',' + countryRef.current.value
    }
    if (cityRef.current?.value) {
      return cityRef.current.value
    }
    if (countryRef.current?.value) {
      return countryRef.current.value
    }
    return ''
  }

  const fetchData = async () => {
    const q = getQuery()
    if (!q) return
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?${new URLSearchParams({
        q,
        appid: 'f717c4a03ccdb7b5482538125e0868fe'
      })}`)
      const json = await res.json()
      setData(json)
      if (json.cod === '404') return
      setSearchList(prev => [...prev, { ...json, curTime: Date.now() }])
    }
    catch (e) { console.log(e) }
  }

  const clearData = () => {
    cityRef.current.value = ''
    countryRef.current.value = ''
    setData(null)
  }

  const componentOptions = {
    cityRef,
    countryRef,
    fetchData,
    clearData,
    data,
    setData,
    searchList,
    setSearchList,
  }

  return (
    <>
      <div>
        <h2 style={{ textAlign: 'left' }}>Today's Weather</h2>
        <hr />
      </div>
      <div>
        <WeatherSearch {...componentOptions} />
        {data?.cod && data.cod === '404' && <WeatherError {...componentOptions} />}
        <div style={{ display: 'grid', gridAutoColumns: '300px', padding: '20px 0', whiteSpace: 'nowrap' }}>
          {data?.cod !== '404' && data && <WeatherCard {...componentOptions} />}
        </div>
        <div>
          <h2 style={{ textAlign: 'left' }}>Search History</h2>
          <hr />
          {searchList?.length > 0 && searchList.map((item, index) =>
            <WeatherResultItem item={item} index={index} {...componentOptions} />)}
          {searchList?.length === 0 && <p style={{ textAlign: 'center' }}>No record</p>}
        </div>
      </div>
    </>
  )
}

export default App
