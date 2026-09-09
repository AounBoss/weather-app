import React , {useState} from 'react';
function WeatherSearch({onSearch}){
    const [city,setCity] = useState('');
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!city.trim())
            return
        onSearch(city);
        setCity('');
    }
    return (
    <form onSubmit={handleSubmit}><input type="text" placeholder="Enter city name"
     value={city}
    onChange={(e) => setCity(e.target.value)}/> <button type="submit">Search</button></form>
   )
}
export default WeatherSearch;