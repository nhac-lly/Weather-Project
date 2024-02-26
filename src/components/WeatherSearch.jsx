const WeatherSearch = ({ cityRef, countryRef, fetchData, clearData }) =>
    <div style={{ display: 'flex', gap: '0px 20px' }}>
        <label style={{ margin: 'auto', whiteSpace: 'nowrap' }}><span>City: </span><input type='text' ref={cityRef} /></label>
        <label style={{ margin: 'auto', whiteSpace: 'nowrap' }}><span>Country: </span><input type='text' ref={countryRef} /></label>
        <div style={{ display: 'flex', gap: '0px 10px' }}>
            <div><button type='button' onClick={fetchData}><span>Search</span></button></div>
            <div><button type='button' onClick={clearData}><span>Clear</span></button></div>
        </div>
    </div>

export default WeatherSearch