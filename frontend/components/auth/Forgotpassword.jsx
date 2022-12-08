/**
 * Forgot Password component.
 * Author: Divya Shree
 * Date: 08/12/2022
 *
 * @module components/auth
 * @requires react
 * @requires react-redux
 * @requires @mui/material
 * @requires next
 * @requires next/router
 * @requires next/Image
 * @requires store/slice/appSlice
 */

import styles from "./_signup.module.scss";
import styles1 from "./_signupform.module.scss"
import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setCurrentView, setUserDetails } from "../../store/slice/appSlice";
import Image from "next/image";
import loginAnimation from '../../assets/loginVerification.gif';
import { Button } from "@mui/material";


const Forgotpassword = () => {

    const router = useRouter()

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setCurrentView("Forgotpassword"));
    }, [])

    const getGifWidth = () => {
        return window.innerWidth/2;
    }

    const getHeight = () => {
        return window.innerHeight*(2/3);
    }

    const handlePasswordChange = (event) => {
        event.preventDefault();
        updateUserPassword(event.target[0].value, event.target[1].value);    
    }

    const updateUserPassword = async(email, password) => {
        const userData = {
            email: email,
            password: password
        };

        try {
            await fetch('http://localhost:8080/user/', {
                method: 'PUT',
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
                    dispatch(setUserDetails(userJson));
                    await new Promise(r => setTimeout(r,1000));
                    router.push('/login');
                }
            }).catch(error => {
                console.error('Error while updating password');
                console.error(error);
            })
        } catch(err) {
            console.log(err.message);
        }
    }

    return(
        <div className={styles.signUpContainer}>
            <Image  height={getHeight()} alt="Login Logo" src={loginAnimation}/>
            <div  className={styles.mainContainer}>
                <div className={styles.formContainer}>
                    <h1 className={styles.h1Container}>Change Password</h1>
                    <form className={styles1.formHandleSignUp} onSubmit={handlePasswordChange}>
                        <div className={styles1.formItem}>
                            <label className={styles1.formLabel}>
                                Email<span className={styles1.formAsterisk}>*</span>
                            </label>
                            <input type='email' className={styles1.formControl} placeholder='Your Email'  required />
                        </div>
                        <div className={styles1.formItem}>
                            <label className={styles1.formLabel}>
                                Password<span className={styles1.formAsterisk}>*</span>
                            </label>
                            <input type='password' className={styles1.formControl} placeholder='Your Password'  required />
                        </div>
                        <div className={styles1.formItem}>
                            <p><a href='/login'>Recalled your old password?</a></p>
                        </div>
                        <div className={styles1.formItem}>
                            <Button type='submit' className={styles.loginButton} variant="contained">Change Password</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
    );
}

export default Forgotpassword;