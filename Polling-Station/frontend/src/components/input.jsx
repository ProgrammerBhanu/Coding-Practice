import { useRef, useState } from "react";
import './input.css';


function Form({ setShowTable }) {

    const initFormData = {
        population: 0,
        city: '',
        cityType: '',
        noOfPollingStations: 0,
        district: '',
        pollingStationNames: []
    }

    const [form, setForm] = useState(initFormData);

    const handleChange = (e) => {
        let { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

   
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        form.pollingStationNames = form.pollingStationNames.trim().split(",")

        console.log(form)
        fetch('http://localhost:3001/city', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'content-type': 'application/json'
            }
        }).then(() => setShowTable((prev) => prev + 1)).then(() => setForm(initFormData));
    }

    return <div className="container">
        <h3>City Detail's Form</h3>
        <form onSubmit={handleFormSubmit} className='form'>
            <div>
                <div className="inputcard">
                    <label>Population: </label>
                    <input onChange={handleChange} type='number' name="population" value={form.population} />
                </div>
                <div className="inputcard">
                    <label>City: </label>
                    <input onChange={handleChange} type='text' name="city" value={form.city} />
                </div>
                <div className="inputcard">
                    <label>CityType: </label>
                    <select name="department" onChange={handleChange} value={form.cityType} >
                        <option value="">--Choose an option--</option>
                        <option value="Metro">Metro</option>
                        <option value="Town">Town</option>
                        <option value="Village">Village</option>
                    </select>
                </div>
                <div className="inputcard">
                    <label>No Of Polling Stations: </label>
                    <input onChange={handleChange} type='number' name="noOfPollingStations" value={form.noOfPollingStations} />
                </div>
                <div className="inputcard">
                    <label>District: </label>
                    <input onChange={handleChange} type='text' name="district" value={form.district}/>
                </div>
                <div className="inputcard">
                    <label>Polling StationNames: </label>
                    <input onChange={handleChange} type='text' name="pollingStationNames" value={form.pollingStationNames}/>
                </div>
                
            </div>

            <input type='submit' />
        </form>
    </div>

}

export default Form;