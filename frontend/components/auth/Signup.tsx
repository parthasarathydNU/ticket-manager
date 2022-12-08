import styles from "./_signup.module.scss";
import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import Signupform from "./Signupform";
import { setCurrentView } from "../../store/slice/appSlice";
import signUpAnimation from '../../assets/loginPageGIF.gif'
import Image from "next/image";
function Signup() {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setCurrentView("Sign Up"));
    }, []);

    const getHeight = () => {
        return window.innerHeight*(2/3);
    }

    return (
        <div className={styles.signUpContainer}>
            <div className={styles.mainContainer}>
                <div className={styles.formContainer}>
                    <h1 className={styles.h1Container}>Sign up for support portal</h1>
                    <p>Already a user? <b><a href='/login' className={styles.anchorLogin}>Login</a></b></p>
                    <Signupform />
                </div>
            </div>
            <Image  height={getHeight()} alt="SignUp Logo" src={signUpAnimation}/>
        </div>

    )
}

export default Signup;