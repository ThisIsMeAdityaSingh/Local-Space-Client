import React, {useState} from 'react';
import { Country, State, City }  from 'country-state-city';

function AddressForm({styles, onInputChange, onFormSubmit, switchScreen, formData, errorData}){
    const [countryCode, setCountryCode] = useState('');
    const [stateCode, setStateCode] = useState('');

    const onOptionSelect = (event, field) => {
        const {value} = event.target;
        console.log(value, field);
        // onInputChange(event, 'country')
    };

    return (
        <section className={styles.formSection}>
            <form>
                <label htmlFor="admin-register-country">
                    Country:
                </label>
                <input 
                    id='admin-register-country'
                    list='admin-register-country-list'
                    type="text" 
                    placeholder='Country'
                    onChange={event => onOptionSelect(event, 'country')}
                />
                <datalist id='admin-register-country-list'>
                    {Country.getAllCountries().map(item => {
                        return <option value={`${item.name} (${item.isoCode})`} key={item.isoCode}>
                            {item.name}
                        </option>
                    })}
                </datalist>
            </form>
            <form>
                <label htmlFor="admin-register-state">
                    State:
                </label>
                <input 
                    id="admin-register-state" 
                    type="text"
                    disabled={formData['country'] && !errorData['country']? true: false}
                    placeholder='State'
                    onChange={event => onInputChange(event, 'state')}
                />
            </form>
            <form>
                <label htmlFor="admin-register-city">
                    City:
                </label>
                <input 
                    id="admin-register-city" 
                    type="text"
                    disabled={formData['country'] && formData['state'] && !errorData['country'] && !errorData['submit']}
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
                    disabled={formData['city'] ? true : false}
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