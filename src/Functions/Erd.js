import {GetUserAccessToken} from 'Functions'
export async function CreateErd(_erdName)
{
    let axios = require('axios')

    let data = {
        name:  _erdName,
    }

    return await axios.post(process.env.REACT_APP_SERVER + "erd",
        JSON.stringify(data),
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Authorization': GetUserAccessToken(),
            }
        }
    )
        .then((response) => {
            console.log("CreateErd - then")
            console.log(response)
            return response.data.result
        })
        .catch((error) => {
            console.log("CreateErd - error")
            console.log(error)
        })
};
export async function GetErdList()
{
    let axios = require('axios')

    return await axios.get(process.env.REACT_APP_SERVER + "erd/list",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Authorization': GetUserAccessToken(),
            },
            maxContentLength: 100000000,
            maxBodyLength: 1000000000
        }
    )
}
export async function GetErdTimeLine(_erdName)
{
    let axios = require('axios')

    return await axios.get(process.env.REACT_APP_SERVER + 'commit/' + _erdName,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Authorization': GetUserAccessToken(),
            },
            maxContentLength: 100000000,
            maxBodyLength: 1000000000
        }
    )
}
export async function GetErd(_erdId, _commitId)
{
    let axios = require('axios')

    return await axios.get(process.env.REACT_APP_SERVER + 'erd/' + _erdId + '/' + _commitId,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Authorization': GetUserAccessToken(),
            },
            maxContentLength: 100000000,
            maxBodyLength: 1000000000
        }
    )
}
export async function GetErdForce(_erdId)
{
    let axios = require('axios')

    return await axios.get(process.env.REACT_APP_SERVER + 'erd/' + _erdId + '/force',
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Authorization': GetUserAccessToken(),
            },
            maxContentLength: 100000000,
            maxBodyLength: 1000000000
        }
    )
}
export async function SaveErd(_erdName, _data)
{
    let axios = require('axios')

    let data = {
        data: _data
    }
    let token = await GetUserAccessToken();
    let response = await axios.post(process.env.REACT_APP_SERVER + 'commit/' + _erdName,
        JSON.stringify(data),
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Authorization': token,
            },
            maxContentLength: 100000000,
            maxBodyLength: 1000000000
        }
    );
    return response
}