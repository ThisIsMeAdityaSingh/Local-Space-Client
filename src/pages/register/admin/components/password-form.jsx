import React, {useState} from 'react';
import {IoEllipseSharp, IoCheckmarkCircle, IoCloseCircleSharp} from 'react-icons/io5';
import DialogPopover from '../../../../common/dialog-popover';

function PasswordForm({styles, onInputChange, switchScreen, errorData, formData, PASSWORD_VALIDATION}){

    const [showDialog, setShowDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState('');

    const onScreenChange = () => {
        // first check if password, and, confirm password is filled
        if(!formData.password){
            setDialogContent('Please enter a password to continue ahead.');
            setShowDialog(true);
            return;
        }

        if(!formData.confirmPassword){
            setDialogContent('Please re-enter your password in confirm password box to continue.');
            setShowDialog(true);
            return;
        }

        if(formData.password !== formData.confirmPassword){
            setDialogContent('Looks like you password and your confirm password does not match! Please make sure that they both are same, to continue ahead');
            setShowDialog(true);
            return;
        }

        if(errorData.password){
            setDialogContent(`Looks like the password you entered isn't valid, please make sure all your check marks are green to proceed ahead`);
            setShowDialog(true);
            return;
        }

        if(errorData.confirmPassword){
            setDialogContent(`Looks like the confirm password you entered isn't valid, please make sure confirm password is same as your password`);
            setShowDialog(true);
            return;
        }

        switchScreen(1);
    };

    const oneLetter = () => {
        if(!formData['password']){
            return {
                icon: <IoEllipseSharp color='darkgray' size={24}/>,
                dataTest: 'password-one-letter-initial',
                className: 'initial'
            };
        }

        if(!PASSWORD_VALIDATION.letters.regex.test(formData['password'])){
            return {
                icon: <IoCloseCircleSharp color='red' size={24}/>,
                dataTest: 'password-one-letter-failed',
                className: 'failed'
            };
        }

        return {
            icon: <IoCheckmarkCircle color='green' size={24}/>,
            dataTest: 'password-one-letter-passed',
            className: 'passed'
        };
    };

    const oneDigit = () => {
        if(!formData['password']){
            return {
                icon: <IoEllipseSharp color='darkgray' size={24}/>,
                dataTest: 'password-one-digit-initial',
                className: 'initial'
            };
        }

        if(!PASSWORD_VALIDATION.digits.regex.test(formData['password'])){
            return {
                icon: <IoCloseCircleSharp color='red' size={24}/>,
                dataTest: 'password-one-digit-failed',
                className: 'failed'
            };
        }

        return {
            icon: <IoCheckmarkCircle color='green' size={24}/>,
            dataTest: 'password-one-digit-passed',
            className: 'passed'
        };
    };

    const specialCharacter = () => {
        if(!formData['password']){
            return {
                icon: <IoEllipseSharp color='darkgray' size={24}/>,
                dataTest: 'password-spacial-character-initial',
                className: 'initial'
            };
        }

        if(!PASSWORD_VALIDATION.specialCharacters.regex.test(formData['password'])){
            return {
                icon: <IoCloseCircleSharp color='red' size={24}/>,
                dataTest: 'password-spacial-character-failed',
                className: 'failed'
            };
        }

        return {
            icon: <IoCheckmarkCircle color='green' size={24} />,
            dataTest: 'password-spacial-character-passed',
            className: 'passed'
        };
    };

    const passwordLength = () => {
        if(!formData['password']){
            return {
                icon: <IoEllipseSharp color='darkgray' size={24} />,
                dataTest: 'password-min-length-initial',
                className: 'initial'
            };
        }

        if(formData['password'].length < PASSWORD_VALIDATION.minLength.minLength || formData['password'].length > PASSWORD_VALIDATION.maxLength.maxLength){
            return {
                icon: <IoCloseCircleSharp color='red' size={24} />,
                dataTest: 'password-min-length-failed',
                className: 'failed'
            };
        }

        return {
            icon: <IoCheckmarkCircle color='green' size={24} />,
            dataTest: 'password-min-length-passed',
            className: 'passed'
        };
    };

    return (
        <>
            <DialogPopover
                title={'Error'}
                content={dialogContent}
                isShown={showDialog}
                onClose={() => setShowDialog(false)}
            />
            <section className={styles.passwordValidation}>
                <div className={styles.passwordValidationChecks}>
                    <div data-test={oneLetter().dataTest}>{oneLetter().icon || <IoEllipseSharp color='darkgray'/>}</div>
                    <div styles={styles.passwordValidationChecksText}>Your password must contain at least one letter</div>
                </div>
                <div className={styles.passwordValidationChecks}>
                    <div data-test={oneDigit().dataTest}>{oneDigit().icon || <IoEllipseSharp color='darkgray' />}</div>
                    <div styles={styles.passwordValidationChecksText}>Your password must contain at least one digit</div>
                </div>
                <div className={styles.passwordValidationChecks}>
                    <div data-test={specialCharacter().dataTest}>{specialCharacter().icon || <IoEllipseSharp color='darkgray' />}</div>
                    <div styles={styles.passwordValidationChecksText}>{`Your password must contain at least one symbol in this list !@#$%^&*()=+_- or a space`}</div>
                </div>
                <div className={styles.passwordValidationChecks}>
                    <div data-test={passwordLength().dataTest}>{passwordLength().icon || <IoEllipseSharp color='darkgray' />}</div>
                    <div styles={styles.passwordValidationChecksText}>Your password must be between 6 to 50 characters long</div>
                </div>
            </section>
            <section className={styles.formSection} data-test='admin-sign-up-password-form'>
                <form>
                    <label htmlFor="admin-register-password">
                        Password:
                    </label>
                    <input 
                        id='admin-register-password'
                        data-test='admin-sign-up-password'
                        type="text"
                        value={formData.password}
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
                        data-test='admin-sign-up-cnfPassword'
                        value={formData.confirmPassword}
                        placeholder='Re-enter password'
                        disabled={errorData['password'] !== ''}
                        onChange={event => onInputChange(event, 'confirmPassword')}
                    />
                    <sub>Required. Please re-enter you password again to go next.</sub>
                </form>
                <div className={styles.buttonGroup}>
                    <button onClick={() => switchScreen(-1)}>Go back</button>
                    <button data-test='admin-sign-up-password-next' onClick={onScreenChange} >
                        Go next
                    </button>
                </div>
            </section>
        </>
    );
}

export default PasswordForm;