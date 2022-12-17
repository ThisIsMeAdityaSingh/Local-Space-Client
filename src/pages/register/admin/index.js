import React, {useState} from 'react';
import { REGISTRATION_DATA_VALIDATION, PASSWORD_VALIDATION } from '../../../common/validations';
import PasswordForm from './components/password-form';
import PrimaryForm from './components/primary-form';
import styles from './styles.module.css';

function AdminSignUpComponent(){
    const [index, setIndex] = useState(0);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: ''
    });
    const [errorData, setErrorData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: ''
    });

    /**
     * Validates the field data and populates the error state.
     * @param {string} value - data to be validated
     * @param {string} field - corresponding error field
     * @return {void}
     */
    const formDataValidation = (value, field) => {
        if(REGISTRATION_DATA_VALIDATION[field].required){
            if(value.length < REGISTRATION_DATA_VALIDATION[field].min){
                setErrorData(prevState => {
                    return {...prevState, [field]: `Please enter a minimum of ${REGISTRATION_DATA_VALIDATION[field].min} letters`}
                });
                return;
            }
            
            if(value.length > REGISTRATION_DATA_VALIDATION[field].max){
                setErrorData(prevState => {
                    return {...prevState, [field]: `Please enter a maximum of ${REGISTRATION_DATA_VALIDATION[field].max} letters`}
                });
                return;
            }
            
            if(!REGISTRATION_DATA_VALIDATION[field].regex.test(value)){
                setErrorData(prevState => {
                    return {...prevState, [field]: 'Please enter a valid value'}
                });
                return;
            }

            setErrorData(prevState => {
                return {...prevState, [field]: ''}
            });
        }

        setErrorData(prevState => {
            return {...prevState, [field]: ''}
        });
        return;
    };

    const passwordValidation = (value, field) => {
        if(value.length < PASSWORD_VALIDATION.minLength.minLength){
            setErrorData(prevState => {
                return {...prevState, [field]: PASSWORD_VALIDATION.minLength.ErrorMessage};
            });
            return;
        }

        if(value.length > PASSWORD_VALIDATION.maxLength.maxLength){
            setErrorData(prevState => {
                return {...prevState, [field]: PASSWORD_VALIDATION.maxLength.ErrorMessage};
            });
            return;
        }

        if(!PASSWORD_VALIDATION.letters.regex.test(value)){
            setErrorData(prevState => {
                return {...prevState, [field]: PASSWORD_VALIDATION.letters.ErrorMessage};
            });
            return;
        }

        if(!PASSWORD_VALIDATION.digits.regex.test(value)){
            setErrorData(prevState => {
                return {...prevState, [field]: PASSWORD_VALIDATION.digits.ErrorMessage};
            });
            return;
        }

        if(!PASSWORD_VALIDATION.specialCharacters.regex.test(value)){
            setErrorData(prevState => {
                return {...prevState, [field]: PASSWORD_VALIDATION.specialCharacters.ErrorMessage};
            });
            return;
        }

        
        setErrorData(prevState => {
            return {...prevState, [field]: ''};
        });
    };

    /**
     * Adds the data to the state, and validates the data to populate error state
     * @param {FormEvent<HTMLInputElement>} event - input event object
     * @param {string} field - location of data to be populated in the state
     */
    const onInputChange = (event, field) => {
        const {value} = event.target;
        if(field === 'password' || field === 'confirmPassword'){
            passwordValidation(value.trim(), field);
        }else{
            formDataValidation(value.trim(), field);
        }
        setFormData(prevState => {
            return {...prevState, [field]: value};
        });
    };

    const switchScreen = num => setIndex(prevState => prevState + num);

    /**
     * Switched between screen depending upon user journey and action
     */
    const renderLogic = () => {
        switch (index) {
            case 1:
                return <PrimaryForm
                    styles={styles}
                    formData={formData} 
                    errorData={errorData} 
                    onInputChange={onInputChange} 
                    switchScreen={switchScreen}
                />
            case 0:
                return <PasswordForm 
                    styles={styles} 
                    switchScreen={switchScreen} 
                    onInputChange={onInputChange} 
                    formData={formData}
                    PASSWORD_VALIDATION={PASSWORD_VALIDATION}
                />
            default:
                break;
        }
    };

    return (
        <div className={styles.main}>
            <section className={styles.headerSection}>
                <h2>Create Account,</h2>
                <h2>Sign up to get started!</h2>
            </section>
            {renderLogic()}
            <section className={styles.footerSection}>
                <h4>I am already a member, <span>Sign in</span></h4>
            </section>
        </div>
    );
}

export default AdminSignUpComponent;