import React, { useRef } from "react";
import "./LoginSignup.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import { MDBInput,MDBBtn } from 'mdb-react-ui-kit';
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../Component/FirebaseConfig/firebaseConfig";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function Login () {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const goTo = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        signInWithEmailAndPassword(auth,email,password).then(
            () => {
                dispatch({type: 'auth/setIsAuth', payload: true});
                localStorage.setItem('isAuth', true);
                goTo('/home');
            }
        ).catch(
            () => {
                passwordRef.current.value = "";
                toast.error("Wrong password or email address");
            }
        )
    }

    return (
        <div className="App" style={{backgroundImage: 'url(/img/service-bg.jpg)'}}>
            <div className="login-signup-container">
                <div className="login-signup-header">
                    <div className="login-signup-text">
                        Welcome to <span className="logo">Blog<span className="logo-highlight">ger</span></span>
                    </div>
                </div>
                <div className="login-signup-inputs">
                    <div className="input">
                        <FontAwesomeIcon icon={faEnvelope} className="input-icon"/>
                        <MDBInput className="input-box" label="User's Email" id="typeEmail" type="email" ref={emailRef} />
                    </div>
                    <div className="input">
                        <FontAwesomeIcon icon={faLock} className="input-icon"/>
                        <MDBInput className="input-box" label="Password" id="typePassword" type="password" ref={passwordRef} />
                    </div>
                </div>
                <div className="submit-container">
                    <MDBBtn className='me-1 submit-btn' color='success' onClick={handleLogin}>
                        Log in
                    </MDBBtn>
                    <div className="underline"></div>
                    <div className="have-account-text">
                        Don't have an account? 
                        <Link className="highlight-text" to={'/signup'}> Resgister</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}