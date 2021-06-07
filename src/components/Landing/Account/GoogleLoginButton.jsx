import React, {useState} from 'react'

// 3rd-party
import {useGoogleLogin} from 'react-google-login'

// material-ui
import Button from "@material-ui/core/Button";
import Avatar from '@material-ui/core/Avatar';

// functions
import {CreateUser, HashEmail} from 'Functions'
import {SigninUser} from 'Functions'

export default function GoogleLoginButton({onLogin, isLogin})
{
    // state
    const [user, setUser] = useState({});

    // callback
    const onGoogleLoginSuccess = async (response) => {
        let payload = {
            id: response.profileObj.googleId,
            email: response.profileObj.email,
            name: response.profileObj.name,
            imageUrl: response.profileObj.imageUrl,
            expires_in: response.tokenObj.expires_in,
            userId: response.profileObj.email.split('@')[0],
            accessToken: '',
            refreshToken: '',
        }



        let signinPromise = await SigninUser(payload.userId).then(async result => {
            if(result.code == 200) {
                payload.accessToken = result.accessToken
                payload.refreshToken = result.refreshToken
                await onLogin(payload)
                await isLogin(true)
            }
            else {
                let response = await CreateUser(payload.userId)
                await SigninUser(payload.userId).then(async result => {
                    payload.accessToken = result.accessToken
                    payload.refreshToken = result.refreshToken
                    await onLogin(payload)
                    await isLogin(true)
                });
            }
            
        }).catch(error => {
            console.log(error)
            
        })
        // signinPromise.then((result) => {
        //     console.log("signinPromise then")
        //     payload.accessToken = result.accessToken
        //     payload.refreshToken = result.refreshToken
        //     onLogin(payload)
        //     isLogin(true)
        // })
        // signinPromise.catch((error) =>{
        //     console.log("signinPromise error - creating user")
        //     let createPromise = CreateUser(payload.userId)
        //     createPromise.then((result) => {
        //         console.log("CreateUser success")
        //         console.log(result)
        //     })
        //     createPromise.catch((error) => {
        //         console.log("CreateUser error")
        //         console.log(error)
        //     })
            
        // })
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
            onClick={signIn}
            style={{
                backgroundColor: '#FFFFFF'
            }}
        >
            <Avatar src="/images/google_icon.png" />
        </Button>
    );
}

