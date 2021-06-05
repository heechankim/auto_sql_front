import React, {useState} from 'react'

// 3rd-party
import {useGoogleLogin} from 'react-google-login'

// material-ui
import Button from "@material-ui/core/Button";

// functions
import {HashEmail} from 'Functions'
import {SigninUser} from 'Functions'

export default function GoogleLoginButton({onLogin, isLogin})
{
    // state
    const [user, setUser] = useState({});

    // callback
    const onGoogleLoginSuccess = (response) => {
        let payload = {
            id: response.profileObj.googleId,
            email: response.profileObj.email,
            name: response.profileObj.name,
            imageUrl: response.profileObj.imageUrl,
            expires_in: response.tokenObj.expires_in,
            hashedEmail: HashEmail(response.profileObj.email),
            accessToken: '',
            refreshToken: '',
        }
        console.log("payload = ");
        console.dir(payload);
        let signinPromise = SigninUser(payload.hashedEmail)
        signinPromise.then((result) => {
            payload.accessToken = result.accessToken
            payload.refreshToken = result.refreshToken
            onLogin(payload)
            isLogin(true)
        })
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
            로그인
        </Button>
    );
}

