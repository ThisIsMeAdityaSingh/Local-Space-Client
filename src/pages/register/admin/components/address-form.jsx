import React, {useState} from 'react';
import { Country, State, City }  from 'country-state-city';

function AddressForm({styles, onInputChange, onFormSubmit, switchScreen, formData, errorData}){
    const [countryCode, setCountryCode] = useState('');
    const [stateCode, setStateCode] = useState('');

    const onCountryChange = event => {
        const {value} = event.target;
        if(value){
            const countryCode = value.split('-')[1];
            onInputChange(event, 'country');
            setCountryCode(countryCode.trim());
        }
    };

    const onStateChange = event => {
        const {value} = event.target;
        if(value){
            const stateCode = value.split('-')[1];
            onInputChange(event, 'state');
            setStateCode(stateCode.trim());
        }
    };

    return (
        <section className={styles.formSection}>
            <form>
                <label htmlFor="admin-register-country">
                    Country:
                </label>
                <select
                    id='admin-register-country'
                    onChange={onCountryChange}
                >
                    <option value="">Select a Country</option>
                    {Country.getAllCountries().map(item => {
                        return <option value={`${item.name} - ${item.isoCode}`} key={item.isoCode}>
                            {item.name}
                        </option>
                    })}
                </select>
            </form>
            <form>
                <label htmlFor="admin-register-state">
                    State:
                </label>
                <select 
                    id="admin-register-state"
                    onChange={onStateChange}
                    disabled={formData['country'] && countryCode ? false: true}
                >
                    <option value="">Select a State</option>
                    {State.getStatesOfCountry(countryCode).map(item => {
                        return <option value={`${item.name} - ${item.isoCode}`} key={item.isoCode}>
                            {item.name}
                        </option>
                    })}
                </select>
            </form>
            <form>
                <label htmlFor="admin-register-city">
                    City:
                </label>
                <input 
                    id="admin-register-city" 
                    type="text"
                    disabled={formData['state'] && !errorData['submit'] ? false: true}
                    placeholder='City'
                    onChange={event => onInputChange(event, 'city')}
                />
            </form>
            <form>
                <label htmlFor="admin-register-pincode">
                    Pincode:
                </label>
                <input 
                    id="admin-register-pincode" 
                    type="text"
                    placeholder='Pincode'
                    disabled={formData['city'] && !errorData['submit']? false : true}
                    onChange={event => onInputChange(event, 'pincode')}
                />
            </form>
            <div className={styles.buttonGroup}>
                <button onClick={() => switchScreen(-1)}>Go back</button>
                <button onClick={onFormSubmit}>Submit my profile</button>
            </div>
        </section>
    );
}

export default AddressForm;