import React, { useState, useCallback, useMemo } from 'react';
import Lightbox from 'lightbox-react';
import '../styles/Login.scss';

const LoginConfirm: React.FC = () => {
    const [email, setEmail] = useState<string | null>(null);
    // const [{ isLoginShown }, login, , , showLogin] = useUserFacade();

    const handleSubmit = useCallback(() => {
        const loginElement = document.getElementById('loginconfirm-email') as HTMLInputElement;
        if (loginElement && loginElement.value) {
            setEmail(loginElement.value);
            // TODO: verify email
        }
    }, [setEmail]);

    const LoginContent = useMemo(() => (
        <div className="Login">
            <h2 className="Login-title">Confirm Email</h2>
            <div className="Login-step Login-step--active">
                <h3>Signing in with a new device?</h3>
                <small><label htmlFor="loginconfirm-email">Confirm your email</label></small>
                <input
                    id="loginconfirm-email"
                    type="text"
                    placeholder="email"
                    onKeyUp={(evt) => evt.key === 'Enter' && handleSubmit()}
                />
                <button onClick={handleSubmit}>Submit</button>
            </div>
            <div className="Login-step Login-step--active">
                <h3>Not your login link?</h3>
                <a className="LoginConfirm-cancel" href="/">Continue without Logging In</a>
            </div>
        </div>
    ), [handleSubmit, email]);

    const closeLightbox = useCallback(() => {
        setEmail(null);
        // TODO: any other cleanup
    }, [setEmail]);

/*     if (!isLoginShown) {
        return null;
    } */

    return (
        <Lightbox
            // @ts-ignore
            mainSrc={LoginContent}
            onCloseRequest={closeLightbox}
            enableZoom={false}
        />
    )
}

export default LoginConfirm;