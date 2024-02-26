import { DeleteSvg, SearchSvg } from '../svg'

const WeatherResultItem = ({ item, index, setData, setSearchList }) => <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid grey', fontWeight: '500' }}>
    <span style={{ margin: 'auto 0' }}>{index + 1}. {item.name + ', ' + item.sys.country}</span>
    <div style={{ display: 'flex', gap: '2px' }}>
        <span style={{ padding: '0 5px' }}>{new Date(item.curTime).toLocaleTimeString('en-US')}</span>
        <button style={{ height: '26px', padding: '1px' }} className='svg-icon' type='button' onClick={() => setData(item)}><SearchSvg /></button>
        <button style={{ height: '26px', padding: '1px' }} className='svg-icon' type='button' onClick={() => {
            setSearchList(prev => prev.filter((_, i) => i !== index))
        }}><DeleteSvg style={{ margin: 'auto' }} /></button>
    </div>
</div>

export default WeatherResultItem