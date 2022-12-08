import styles from "./_signupform.module.scss"
import React from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../store/slice/appSlice";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
const Loginform = () => {

    const router = useRouter()

    const dispatch = useDispatch();
    
    const handleLogin = (event) => {
        event.preventDefault();
        authenticateUser(event.target[0].value , event.target[1].value);
    }

    const authenticateUser = async(username,password) => {
        const userData = {
            email: username,
            password: password
        };

        try {
            await fetch('http://localhost:8080/user/auth', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                  },
                  redirect: 'follow',
                  referrerPolicy: 'no-referrer', 
                  body: JSON.stringify(userData)
            })
            .then((response) => response.json())
            .then(async(userJson) => {
                if(userJson['error']){
                    alert(userJson['error']);
                }
                else {
                    dispatch(setUserDetails(userJson.data));
                    await new Promise(r => setTimeout(r,1000));
                    const value = (userJson.data.role).localeCompare("Customer");
                    if (value === 0){
                        router.push('/dashboard');
                    } else {
                        router.push('/dashboard');
                    }
                }
            }).catch(error => {
                console.error('Error while logging in');
            })
        } catch(err) {
            console.log(err.message);
        }
    }

    return (
        <form className={styles.formHandleSignUp} onSubmit={handleLogin}>
            <div className={styles.formItem}>
                <label className={styles.formLabel}>
                    Email<span className={styles.formAsterisk}>*</span>
                </label>
                <input type='email' className={styles.formControl} placeholder='Your Email'  required />
            </div>
            <div className={styles.formItem}>
                <label className={styles.formLabel}>
                    Password<span className={styles.formAsterisk}>*</span>
                </label>
                <input type='password' className={styles.formControl} placeholder='Your Password'  required />
            </div>
            <div className={styles.formItem}>
                <p><a href='/forgotPassword'>Forgot password?</a></p>
            </div>
            <div className={styles.formItem}>
                <Button type='submit' className={styles.loginButton} variant="contained">Login</Button>
            </div>
        </form>
    );
}

export default Loginform;