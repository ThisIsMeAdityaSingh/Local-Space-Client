import React, {useState} from 'react';
import DialogPopover from '../../../../common/dialog-popover';

function PrimaryForm({styles, formData, errorData, onInputChange, switchScreen, setFormData, setErrorData}){

    const [showDialog, setShowDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState('');

    const onScreenChange = () => {
        const availableFields = {
            firstName: 'First name',
            lastName: 'Last name',
            email: 'E-mail',
            phone: 'Phone number'
        };
        
        //1. checking values are not empty, if yes, populate the error field and
        //   stop user from going forward until resolved.
        
        for(const field of Object.keys(availableFields)){
            if(!formData[field]){
                setErrorData(prevState => {
                    return {...prevState, [field]: `${availableFields[field]} is required.`};
                });
                setDialogContent(`Looks like you haven't entered anything in ${availableFields[field]} please provide your ${availableFields[field].toLowerCase()} to continue.`);
                setShowDialog(true);
                return;
            }
        }

        // 2. After above condition is passed, check for any errors in error data
        //    if error exists, stop user from going forward until resolved.
        for(const field of Object.keys(availableFields)){
            if(errorData[field]){
                setDialogContent(`Looks like you have entered something wrong in ${availableFields[field]} please resolve it before continuing ahead.`);
                setShowDialog(true);
                return;
            }
        }

        switchScreen(1);
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
                    <label htmlFor="admin-register-firstName">
                        First Name:
                    </label>
                    <input 
                        id='admin-register-firstName' 
                        data-test='primary-form-first-name'
                        type="text" 
                        placeholder='First Name'
                        value={formData['firstName']}
                        onChange={event => onInputChange(event, 'firstName')}
                    />
                    <sub data-test='primary-form-first-name-error'>{errorData['firstName'] ? errorData['firstName'] : 'Required'}</sub>
                </form>
                <form>
                    <label htmlFor="admin-register-lastName">
                        Last Name:
                    </label>
                    <input 
                        id="admin-register-lastName"
                        data-test='primary-form-last-name'
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
                        data-test='primary-form-email'
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
                        data-test='primary-form-phone-number'
                        type="text" 
                        placeholder='Phone Number'
                        value={formData['phone']}
                        onChange={event => onInputChange(event, 'phone')}
                    />
                    {errorData['phone'] ? <sub>{errorData['phone']}</sub> : <sub>Required</sub>}
                </form>
                <button data-test="primary-form-next-button" onClick={onScreenChange}>Go next</button>
            </section>
        </>
    );
}

export default PrimaryForm;