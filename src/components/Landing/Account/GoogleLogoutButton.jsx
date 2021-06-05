import React, {useState} from 'react'

// 3rd-party
import {useGoogleLogin} from 'react-google-login'

// for redux
import {connect} from 'react-redux'
import {onGoogleLogin} from "Store/User";

// material-ui
import Button from "@material-ui/core/Button";

export default function GoogleLoginButton(props)
{
    // state
    const [user, setUser] = useState({});

    // props
    const {onLogin} = props;

    // callback
    const onGoogleLoginSuccess = (response) => {
        let payload = {
            id: response.profileObj.googleId,
            email: response.profileObj.email,
            name: response.profileObj.name,
            imageUrl: response.profileObj.imageUrl,
            expires_in: response.tokenObj.expires_in
        }
        onLogin(payload);
    }
    const onGoogleloginFail = (error) => {
        console.log(error)
    }

    // login hooks
    const {signIn, loaded} = useGoogleLogin({
        onSuccess: onGoogleLoginSuccess,
        onFailure: onGoogleloginFail,
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    })

    return (
        <Button
            variant="contained"
            color="primary"
            onClick={signIn}
        >
            로그아웃
        </Button>
    );
}