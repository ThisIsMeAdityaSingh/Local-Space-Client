import React from 'react';
import {IoEllipseSharp, IoCheckmarkCircle, IoCloseCircleSharp} from 'react-icons/io5';

function PasswordForm({styles, onInputChange, switchScreen, errorData, formData, PASSWORD_VALIDATION}){

    const oneLetter = () => {
        if(!formData['password']){
            return {
                icon: <IoEllipseSharp color='darkgray' />,
                className: 'initial'
            };
        }

        if(!PASSWORD_VALIDATION.letters.regex.test(formData['password'])){
            return {
                icon: <IoCloseCircleSharp color='red' />,
                className: 'failed'
            };
        }

        return {
            icon: <IoCheckmarkCircle color='green' />,
            className: 'passed'
        };
    };

    const oneDigit = () => {
        if(!formData['password']){
            return {
                icon: <IoEllipseSharp color='darkgray' />,
                className: 'initial'
            };
        }

        if(!PASSWORD_VALIDATION.digits.regex.test(formData['password'])){
            return {
                icon: <IoCloseCircleSharp color='red' />,
                className: 'failed'
            };
        }

        return {
            icon: <IoCheckmarkCircle color='green' />,
            className: 'passed'
        };
    };

    const specialCharacter = () => {
        if(!formData['password']){
            return {
                icon: <IoEllipseSharp color='darkgray' />,
                className: 'initial'
            };
        }

        if(!PASSWORD_VALIDATION.specialCharacters.regex.test(formData['password'])){
            return {
                icon: <IoCloseCircleSharp color='red' />,
                className: 'failed'
            };
        }

        return {
            icon: <IoCheckmarkCircle color='green' />,
            className: 'passed'
        };
    };

    const minLength = () => {
        if(!formData['password']){
            return {
                icon: <IoEllipseSharp color='darkgray' />,
                className: 'initial'
            };
        }

        if(formData['password'].length < PASSWORD_VALIDATION.minLength.minLength){
            return {
                icon: <IoCloseCircleSharp color='red' />,
                className: 'failed'
            };
        }

        return {
            icon: <IoCheckmarkCircle color='green' />,
            className: 'passed'
        };
    };

    const maxLength = () => {
        if(!formData['password']){
            return {
                icon: <IoEllipseSharp color='darkgray' />,
                className: 'initial'
            };
        }

        if(formData['password'].length > PASSWORD_VALIDATION.maxLength.maxLength){
            return {
                icon: <IoCloseCircleSharp color='red' />,
                className: 'failed'
            };
        }

        return {
            icon: <IoCheckmarkCircle color='green' />,
            className: 'passed'
        };
    };

    return (
        <>
            <section className={styles.passwordValidation}>
                <ul>
                    <li className={oneLetter().className || 'initial'}>
                        <span>{oneLetter().icon || <IoEllipseSharp color='darkgray' />}</span>
                        Your password must contain at least one letter
                    </li>
                    <li className={oneDigit().className || 'initial'}>
                        <span>{oneDigit().icon || <IoEllipseSharp color='darkgray' />}</span>
                        Your password must contain at least one digit
                    </li>
                    <li className={specialCharacter().className || 'initial'}>
                        <span>{specialCharacter().icon || <IoEllipseSharp color='darkgray' />}</span>
                        {`Your password must contain at least one symbol in this list !@#$%^&*()=+_- or a space`}
                    </li>
                    <li className={minLength().className || 'initial'}>
                        <span>{minLength().icon || <IoEllipseSharp color='darkgray' />}</span>
                        Your password must be at least six characters long
                    </li>
                    <li className={maxLength().className || 'initial'}>
                        <span>{maxLength().icon || <IoEllipseSharp color='darkgray' />}</span>
                        Your password cannot be longer than 50 characters
                    </li>
                </ul>
            </section>
            <section className={styles.formSection}>
                <form>
                    <label htmlFor="admin-register-password">
                        Password:
                    </label>
                    <input 
                        id='admin-register-password' 
                        type="text" 
                        placeholder='Password'
                        onChange={event => onInputChange(event, 'password')}
                    />
                    <sub>Required</sub>
                </form>
                <form>
                    <label htmlFor="admin-register-cnfPassword">
                        Re-enter password:
                    </label>
                    <input 
                        id="admin-register-cnfPassword" 
                        type="text" 
                        placeholder='Re-enter password'
                        disabled={errorData['password'] === ''}
                        onChange={event => onInputChange(event, 'confirmPassword')}
                    />
                    <sub>Required. Please re-enter you password again to go next.</sub>
                </form>
                <div className={styles.buttonGroup}>
                    <button onClick={() => switchScreen(-1)}>Go back</button>
                    <button 
                        onClick={() => switchScreen(1)}
                        disabled={errorData['password'] !== '' && formData['confirmPassword'] !== formData['password'] && formData['password'] !== ''}
                    >
                        Go next
                    </button>
                </div>
            </section>
        </>
    );
}

export default PasswordForm;