/**
 * Signup component.
 * Author: Divya Shree
 * Date: 08/12/2022
 *
 * @module components/auth
 * @requires react
 * @requires @mui/material
 */

import styles from "./_signupform.module.scss";
import React from "react";
import { Button } from "@mui/material";

function Signupform() {

    const fields = [
        {
            label: "Firstname",
            type: "text",
            placeholder: "Your firstname"
        },
        {
            label: "Lastname",
            type: "text",
            placeholder: "Your lastname"
        },
        {
            label: "Phone Number",
            type: "text",
            placeholder: "Your phone number"
        },
        {
            label: "Your e-mail address",
            type: "email",
            placeholder: "Your e-mail address"
        },
        {
            label: "Password",
            type: "password",
            placeholder: "Password"
        }
    ];

    const handleSignUp = (event) => {
        event.preventDefault();
        addUserDetails(event.target[0].value,
            event.target[1].value, 
            event.target[2].value, 
            event.target[3].value,
            event.target[4].value,
            event.target[5].value);
    }
    
    const addUserDetails = async (firstname, lastname, number, email, password, role) => {
        const postData = {
            firstname: firstname,
            lastname: lastname,
            phoneNumber: number,
            email: email,
            password: password,
            role: role
        };
    
        try {
            await fetch('http://localhost:8080/user', {
              method: 'POST',
              mode: 'cors',
              cache: 'no-cache',
              credentials: 'same-origin',
              headers: {
                'Content-Type': 'application/json'
              },
              redirect: 'follow',
              referrerPolicy: 'no-referrer', 
              body: JSON.stringify(postData)
            }).then((response) => response.json())
              .then((userJson) =>{
                if(userJson['error']){
                    alert(userJson['error']);
                }
                else {
                    window.location.href = '/login';
                }
            })
            .catch(error => {
                console.error('Error while signing up');
                console.error(error);
            })
        } catch(err) {
            console.log(err.message);
        }
    }

    return (
        <form className={styles.formHandleSignUp} onSubmit={handleSignUp}>
            {fields.map((field) => {
                return (
                    <div className={styles.formItem}>
                        <label className={styles.formLabel}>
                            {field.label}<span className={styles.formAsterisk}>*</span>
                        </label>
                        <input type={field.type} className={styles.formControl} placeholder={field.placeholder} required />
                    </div>
                );
            })}
            <div className={styles.formItem}>
                <label className={styles.formLabel}>Role<span className={styles.formAsterisk}>*</span></label>
                <div className={styles.labelHolder}>

                    
                    
                    <div className={styles.container}>
                        {/* <label>Customer</label>
                        <input className={styles.radioOption}  type="radio" name="role" value="Customer" required /> */}

                        <select name="role" required>
                            <option value="Agent">Agent</option>
                            <option value="Customer">Customer</option>
                        </select>

                    </div>
                    {/* <div className={styles.container}>
                        <label>Agent</label>
                        <input className={styles.radioOption}  type="radio" name="role" value="Agent" />
                    </div> */}
                </div>  
            </div>
            <div className={styles.formItem}>
                <Button type='submit' className={styles.registerButton} variant="contained">Register</Button>
            </div>
        </form>
    );
}

export default Signupform;