import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faLock } from "@fortawesome/free-solid-svg-icons";
import "./LoginSignup.css";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const verifyKeyCode = "10082003";

export default function ForgotPassword(){
    const keyCodeRef = useRef(null);
    const [keyCorrect, setKeyCorrect] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successChangePassword, setsuccessChangePassword] = useState(false);

    const handleVerify = () => {
        if(keyCodeRef.current.value === verifyKeyCode){
            setKeyCorrect(true);
        }
        else {
            setKeyCorrect(false);
            keyCodeRef.current.value = "";
            setErrorMessage('Incorrect verification code. Please try again!');
        }
    }

    return(
       <div className="App" style={{backgroundImage: 'url(/img/contact-bg.jpg)'}}>
         <div className="login-signup-container">
             {!keyCorrect ?
                (
                    <div className="login-signup-inputs">
                        <div className="input">
                            <FontAwesomeIcon icon={faKey} />
                            <MDBInput className="input-box" label="Enter code" type="text" ref={keyCodeRef}/>
                        </div>
                        <div className="submit-container">
                            <MDBBtn className="submit-btn" color="success" onClick={handleVerify}>
                                Verify
                            </MDBBtn>
                        </div>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                    </div>
                )
             :
                (
                    <div className="login-signup-inputs">
                        <div className="login-signup-text">Enter new password</div>
                        <div className="input">
                            <FontAwesomeIcon icon={faLock} />
                            <MDBInput className="input-box" label="New password" id="typeNewPassword" type="password" />
                        </div>
                        <div className="submit-container">
                            <MDBBtn className="submit-btn" color="success" onClick={() => setsuccessChangePassword(true)}>
                                Submit
                            </MDBBtn>
                        </div>
                        {successChangePassword && <div className="sucess-text">
                            Password changed
                            <Link to={'/login'}  className="highlight-text"> Log in?</Link>
                        </div>}
                    </div>
                )
             }
         </div>
       </div>
    )
}