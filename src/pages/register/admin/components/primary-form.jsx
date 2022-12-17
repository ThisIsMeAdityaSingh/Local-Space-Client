import React from 'react';
import {} from 'react-icons/io5';

function PrimaryForm({styles, formData, errorData, onInputChange, switchScreen}){
    return (
        <>
            <section className={styles.formSection}>
                <form>
                    <label htmlFor="admin-register-firstName">
                        First Name:
                    </label>
                    <input 
                        id='admin-register-firstName' 
                        type="text" 
                        placeholder='First Name'
                        value={formData['firstName']}
                        onChange={event => onInputChange(event, 'firstName')}
                    />
                    {errorData['firstName'] ? <sub>{errorData['firstName']}</sub> : <sub>Required</sub>}
                </form>
                <form>
                    <label htmlFor="admin-register-lastName">
                        Last Name:
                    </label>
                    <input 
                        id="admin-register-lastName" 
                        type="text" 
                        placeholder='Last Name'
                        value={formData['lastName']}
                        onChange={event => onInputChange(event, 'lastName')}
                    />
                    {errorData['lastName'] ? <sub>{errorData['lastName']}</sub> : <sub>Required</sub>}
                </form>
                <form>
                    <label htmlFor="admin-register-email">
                        Email:
                    </label>
                    <input 
                        id="admin-register-email" 
                        type="text" 
                        placeholder='Email'
                        value={formData['email']}
                        onChange={event => onInputChange(event, 'email')}
                    />
                    {errorData['email'] ? <sub>{errorData['email']}</sub> : <sub>Required</sub>}
                </form>
                <form>
                    <label htmlFor="admin-register-phone">
                        Phone Number:
                    </label>
                    <input 
                        id="admin-register-phone" 
                        type="text" 
                        placeholder='Phone Number'
                        value={formData['phone']}
                        onChange={event => onInputChange(event, 'phone')}
                    />
                    {errorData['phone'] ? <sub>{errorData['phone']}</sub> : <sub>Required</sub>}
                </form>
                <button onClick={() => switchScreen(1)}>Go next</button>
            </section>
        </>
    );
}

export default PrimaryForm;