import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'lightbox-react';
import { UserFacade } from '../hooks/user.hook';
import '../styles/Login.scss';

function Login({
    show
}) {
    const [submitted, setUISubmit] = useState(false);
    const [email, setEmail] = useState(null);
    
    const handleSubmit = useCallback(() => {
        setUISubmit(true);
        const loginElement = document.getElementById('login-email');
        if (loginElement && loginElement.value) {
            setEmail(loginElement.value);
        }
    }, [setUISubmit, setEmail]);

    const LoginContent = useMemo(() => (
        <div className="Login">
            <h2 className="Login-title">Login to Vote</h2>
            <div className={submitted ? "Login-step" : "Login-step Login-step--active"}>
                <h3>Step 1: <label for="login-email">Login with email</label></h3>
                <small>We only send you a sign-in link, no other emails!</small>
                <input id="login-email" type="text" placeholder="email" disabled={submitted} />
                <button onClick={handleSubmit} disabled={submitted}>Submit</button>
            </div>
            <div className={submitted ? "Login-step Login-step--active" : "Login-step"}>
                <h3>Step 2: Check your email</h3>
                {email && <small>Email sent to <strong>{email}</strong></small>}
            </div>
        </div>
    ), [handleSubmit, submitted, email]);

    const closeLightbox = useCallback(() => {
        setEmail(null);
        setUISubmit(false);
    }, [setEmail, setUISubmit]);

    if (!show) {
        return null;
    }

    return (
        <Lightbox
            mainSrc={LoginContent}
            onCloseRequest={closeLightbox}
            enableZoom={false}
        />
    )
};

Login.propTypes = {
    show: PropTypes.bool
}

export default Login;