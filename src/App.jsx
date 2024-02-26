import { useRef, useState } from 'react'
import './App.css'
import { DeleteSvg, SearchSvg } from './svg'

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

  return (
    <>
      <div>
        <h2 style={{ textAlign: 'left' }}>Today's Weather</h2>
        <hr />
      </div>
      <div>
        <div style={{ display: 'flex', gap: '0px 20px' }}>
          <label style={{ margin: 'auto', whiteSpace: 'nowrap' }}><span>City: </span><input type='text' ref={cityRef} /></label>
          <label style={{ margin: 'auto', whiteSpace: 'nowrap' }}><span>Country: </span><input type='text' ref={countryRef} /></label>
          <div style={{ display: 'flex', gap: '0px 10px' }}>
            <div><button type='button' onClick={fetchData}><span>Search</span></button></div>
            <div><button type='button' onClick={clearData}><span>Clear</span></button></div>
          </div>
        </div>
        {data?.cod && data.cod === '404' && <div style={{ width: '100%', border: '1px solid red', padding: '10px' }}><span style={{ textAlign: 'left', color: 'red', fontWeight: 'bold' }}>{data.message}</span></div>}
        <div style={{ display: 'grid', gridAutoColumns: '300px', padding: '20px 0', whiteSpace: 'nowrap' }}>
          {data?.cod !== '404' && data && <div style={{ textAlign: 'left' }}>
            <span style={{ fontWeight: 'lighter' }}>{data.name + ', ' + data.sys.country}</span>
            <h1 style={{ margin: '1px' }}>{data.weather[0].main}</h1>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <span style={{ fontWeight: 'lighter' }}>Description: </span><span style={{ fontWeight: 'bold' }}>{data.weather[0].description}</span>
              <span style={{ fontWeight: 'lighter' }}>Temperature: </span><span style={{ fontWeight: 'bold' }}>{data.main.temp}</span>
              <span style={{ fontWeight: 'lighter' }}>Humidity: </span><span style={{ fontWeight: 'bold' }}>{data.main.humidity}</span>
              <span style={{ fontWeight: 'lighter' }}>Time: </span><span style={{ fontWeight: 'bold' }}>{new Date(+data?.dt * 1000).toLocaleDateString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>}
        </div>
        <div>
          <h2 style={{ textAlign: 'left' }}>Search History</h2>
          <hr />
          {
            searchList?.length > 0 && searchList.map((item, index) => {
              return <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid grey', fontWeight: '500' }}>
                <span style={{ margin: 'auto 0' }}>{index + 1}. {item.name + ', ' + item.sys.country}</span>
                <div style={{ display: 'flex' }}>
                  <span style={{ padding: '0 5px' }}>{new Date(item.curTime).toLocaleTimeString('en-US')}</span>
                  <button style={{ height: '26px', padding: '1px' }} type='button' onClick={() => setData(item)}><SearchSvg /></button>
                  <button style={{ height: '26px', padding: '1px' }} type='button' onClick={() => {
                    setSearchList(prev => prev.filter((_, i) => i !== index))
                  }}><DeleteSvg style={{ margin: 'auto' }} /></button>
                </div>
              </div>
            })
          }
        </div>
      </div>
    </>
  )
}

export default App
