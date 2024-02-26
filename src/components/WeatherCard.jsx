const WeatherCard = ({ data }) => <div style={{ textAlign: 'left' }}>
    <span style={{ fontWeight: 'lighter' }}>{data.name + ', ' + data.sys.country}</span>
    <h1 style={{ margin: '1px' }}>{data.weather[0].main}</h1>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <span style={{ fontWeight: 'lighter' }}>Description: </span><span style={{ fontWeight: 'bold' }}>{data.weather[0].description}</span>
        <span style={{ fontWeight: 'lighter' }}>Temperature: </span><span style={{ fontWeight: 'bold' }}>{data.main.temp}</span>
        <span style={{ fontWeight: 'lighter' }}>Humidity: </span><span style={{ fontWeight: 'bold' }}>{data.main.humidity}</span>
        <span style={{ fontWeight: 'lighter' }}>Time: </span><span style={{ fontWeight: 'bold' }}>{new Date(+data?.dt * 1000).toLocaleDateString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
    </div>
</div>

export default WeatherCard