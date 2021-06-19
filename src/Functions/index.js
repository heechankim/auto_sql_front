import {connect} from 'react-redux'
import {onGoogleLogin} from "../Store/User";

const axios = require('axios')

const HEADERS = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
}

export function HashEmail(email)
{
    const SHA256 = require('crypto-js/sha256')
    return SHA256(email).toString()
}
export async function CreateUser(userId)
{
    let data = {
        hashedEmail:  userId,
    }
    let result = await axios.post(process.env.REACT_APP_SERVER + "user",
        JSON.stringify(data),
        HEADERS
    )
        .then((response) => {
            console.log("CreateUser - then")
            console.log(response)
            return response;
        })
        .catch((error) => {
            console.log("CreateUser - error")
            console.log(error)
        })
        return result;
}
export async function SigninUser(userId)
{
    const axios = require('axios')
    let data = {
        hashedEmail: userId,
    }
    return await axios.get(process.env.REACT_APP_SERVER + 'token/login/' + userId,
        {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        }
    )
        .then((response) => {
            console.log("SigninUser - then")
            console.log(response)
            return {
                code:response.code,
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken
            };
        })
        .catch((error) => {
            console.log("SigninUser - error")
            console.log(error)
            return {
                code:400
            }
        })
}
export async function SendRefreshToken()
{
    let axios = require('axios')
    let {Store} = require('Store')
    return await axios.get(process.env.REACT_APP_SERVER + 'token/reissue',
        {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Authorization': Store.getState().User.accessToken,
            }
        }
    )
}
export function IsUserLogin()
{
    // console.log('IsUserLogin')
    let {Store} = require('Store')
    if(Store.getState().User.accessToken)
        return true;
    else
        return false;

}
// function RefreshToken()
// {
//     if(!IsUserLogin())
//         return false;
//
//     let {Store} = require('Store')
//
//     let sendRefreshTokenPromise = SendRefreshToken()
//         .catch((error) => {
//             console.log('sendRefreshTokenPromise - error');
//             console.log(error);
//             let signinPromise = SigninUser(Store.getState().User.hashedEmail)
//                 .then((result) => {
//                     console.log("sendRefreshTokenPromise - error -> SigninUser - then")
//                     return result.accessToken;
//                 })
//                 .catch((error) => {
//                     console.log("sendRefreshTokenPromise - error -> SigninUser - error")
//                     console.log(error)
//                 })
//         })
// }
export function GetUserAccessToken()
{
    // console.log('GetUserAccessToken')
    if(! IsUserLogin())
        return false

    let {Store} = require('Store')
    return Store.getState().User.accessToken
}