import React, {useEffect} from 'react';
import styles from './styles.module.css';

function AdminSignUpComponent(){

    return (
        <div className={styles.main}>
            <section className={styles.headerSection}>
                <h2 className={styles.mainHeader}>Create Account,</h2>
                <h2 className={styles.mainSubHeader}>Sign up to get started!</h2>
            </section>
            <section className={styles.formSection}>
                <form>
                    <label className={styles.doNotShow} htmlFor="admin-register-firstName">
                        First Name:
                    </label>
                    <input id='admin-register-firstName' type="text" placeholder='First Name'/>
                </form>
                <form>
                    <label className={styles.doNotShow} htmlFor="admin-register-lastName">
                        Last Name:
                    </label>
                    <input id="admin-register-lastName" type="text" placeholder='Last Name'/>
                </form>
                <form>
                    <label className={styles.doNotShow} htmlFor="admin-register-email">
                        Email:
                    </label>
                    <input id="admin-register-email" type="text" placeholder='Email'/>
                </form>
            </section>
        </div>
    );
}

export default AdminSignUpComponent;