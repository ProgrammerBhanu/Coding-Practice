import {useState } from "react";
import './input.css';


function Station({setShowTable}) {

    const initFormData = {
        polling: '',
        address: '',
        pincode:'',
        city: ''
        
    }

    const [form, setForm] = useState(initFormData);

    const handleChange = (e) => {
        let { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

   
    console.log(form);
    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/station', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'content-type': 'application/json'
            }
        }).then(() => setShowTable((prev) => prev + 1)).then(() => setForm(initFormData));
    }

    return <div className="container">
        <h3>Polling Station Detail's Form</h3>
        <form onSubmit={handleFormSubmit} className='form'>
            <div>
                <div className="inputcard">
                    <label>Polling Station: </label>
                    <input onChange={handleChange} type='text' name="polling" value={form.polling} />
                </div>
                <div className="inputcard">
                    <label>Address: </label>
                    <input onChange={handleChange} type='text' name="address" value={form.address} />
                </div>
                
                <div className="inputcard">
                    <label>Pincode: </label>
                    <input onChange={handleChange} type='number' name="pincode" value={form.pincode} />
                </div>
                <div className="inputcard">
                    <label>City: </label>
                    <input onChange={handleChange} type='text' name="city" value={form.city}/>
                </div>
                
            </div>

            <input type='submit' />
        </form>
    </div>

}

export default Station;