import React from 'react';
import styles from './styles.module.css';

function AdminSignUpComponent(){

    return (
        <div className={styles.main}>
            <section className={styles.headerSection}>
                <h2>Create Account,</h2>
                <h2>Sign up to get started!</h2>
            </section>
            <section className={styles.formSection}>
                <form>
                    <label htmlFor="admin-register-firstName">
                        First Name:
                    </label>
                    <input 
                        id='admin-register-firstName' 
                        type="text" 
                        placeholder='First Name'
                    />
                </form>
                <form>
                    <label htmlFor="admin-register-lastName">
                        Last Name:
                    </label>
                    <input id="admin-register-lastName" type="text" placeholder='Last Name'/>
                </form>
                <form>
                    <label htmlFor="admin-register-email">
                        Email:
                    </label>
                    <input id="admin-register-email" type="text" placeholder='Email'/>
                </form>
                <button>Go next</button>
            </section>
            <section className={styles.footerSection}>
                <h4>I am already a member, <span>Sign in</span></h4>
            </section>
        </div>
    );
}

export default AdminSignUpComponent;