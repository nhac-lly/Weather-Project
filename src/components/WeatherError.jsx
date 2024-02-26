const WeatherError = ({ data }) => <div style={{ width: '100%', border: '1px solid red', padding: '10px' }}>
    <span style={{ textAlign: 'left', color: 'red', fontWeight: 'bold' }}>{data.message}</span>
</div>

export default WeatherError