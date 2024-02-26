const WeatherError = ({ data }) => <><br /><div style={{ width: '100%', border: '1px solid red', padding: '0 20px' }}>
    <span style={{ textAlign: 'left', color: 'red', fontWeight: 'bold' }}>{data.message}</span>
</div></>

export default WeatherError