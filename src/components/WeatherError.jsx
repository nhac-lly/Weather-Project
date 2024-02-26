const WeatherError = ({ data }) => <><br /><div style={{ border: '1px solid red', padding: '0 20px' }}>
    <span style={{ textAlign: 'left', color: 'red', fontWeight: 'bold' }}>{data.message}</span>
</div></>

export default WeatherError