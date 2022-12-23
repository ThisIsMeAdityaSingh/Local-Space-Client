import React, {useState} from 'react';
import { Country, State, City }  from 'country-state-city';
import DialogPopover from '../../../../common/dialog-popover';

function AddressForm({styles, onInputChange, onFormSubmit, switchScreen, formData, errorData}){
    const [showDialog, setShowDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [stateCode, setStateCode] = useState('');

    const onSubmit = () => {
        const fields = {
            country: 'Country',
            state: 'State',
            city: 'City',
            pincode: 'Pincode',
            addressLine1: 'Address Line 1',
            addressLine2: 'Address Line 2'
        };

        for(const field of Object.keys(fields)){
            if(!formData[field]){
                setDialogContent(`Looks like you didn't select any ${field}. ${fields[field]} is required to proceed ahead`);
                setShowDialog(true);
                return;
            };
        }

        for(const field of Object.keys(fields)){
            if(errorData[field]){
                setDialogContent(`Looks like you didn't enter a valid ${field} value, please enter a correct ${fields[field].toLowerCase()} to proceed`);
                setShowDialog(true);
                return;
            }
        }

        onFormSubmit();
    };

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

    const onCityChange = event => {
        const {value} = event.target;
        if(value){
            onInputChange(event, 'city');
        }
    };

    return (
        <>
            <DialogPopover
                title={'Error'}
                content={dialogContent}
                isShown={showDialog}
                onClose={() => setShowDialog(false)}
            />
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
                        {Country.getAllCountries().map((item, index) => {
                            return <option value={`${item.name} - ${item.isoCode}`} key={index}>
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
                        {State.getStatesOfCountry(countryCode).map((item, index) => {
                            return <option value={`${item.name} - ${item.isoCode}`} key={index}>
                                {item.name}
                            </option>
                        })}
                    </select>
                </form>
                <form>
                    <label htmlFor="admin-register-city">
                        City:
                    </label>
                    <select
                        id="admin-register-city"
                        onChange={onCityChange}
                        disabled={formData['state'] && !errorData['submit'] ? false: true}
                    >
                        <option value="">Select a City</option>
                        {City.getCitiesOfCountry(countryCode)
                            .filter(item => item.stateCode === stateCode)
                            .map((item, index) => {
                                return <option value={item.name} key={index}>
                                    {item.name}
                                </option>
                            })
                        }
                    </select>
                </form>
                <form>
                    <label htmlFor="admin-register-pincode">
                        Pincode:
                    </label>
                    <input 
                        id="admin-register-pincode" 
                        type="text"
                        placeholder='Pincode'
                        disabled={formData['city'] ? false : true}
                        onChange={event => onInputChange(event, 'pincode')}
                    />
                </form>
                <form>
                    <label htmlFor="admin-register-firstName">
                        Address Line 1:
                    </label>
                    <input 
                        id='admin-register-addr1' 
                        type="text" 
                        placeholder='Address Line 1'
                        value={formData['addressLine1']}
                        onChange={event => onInputChange(event, 'addressLine1')}
                    />
                    {errorData['addressLine1'] ? <sub>{errorData['addressLine1']}</sub> : <sub>Required</sub>}
                </form>
                <form>
                    <label htmlFor="admin-register-firstName">
                        Address Line 2:
                    </label>
                    <input 
                        id='admin-register-addr2' 
                        type="text" 
                        placeholder='Address Line 2'
                        value={formData['addressLine2']}
                        onChange={event => onInputChange(event, 'addressLine2')}
                    />
                    {errorData['addressLine2'] ? <sub>{errorData['addressLine2']}</sub> : <sub>Required</sub>}
                </form>
                <div className={styles.buttonGroup}>
                    <button onClick={() => switchScreen(-1)}>Go back</button>
                    <button onClick={onSubmit}>Submit my profile</button>
                </div>
            </section>
        </>
    );
}

export default AddressForm;