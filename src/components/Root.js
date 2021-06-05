import React from 'react'

// 3rd-party
import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';

// components
import Landing from 'components/Landing'
import Dashboard from 'components/Dashboard'

export default function Root()
{
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route exact path='/' component={Landing}/>
                <Route path='/dashboard' component={Dashboard}/>
            </Switch>
        </BrowserRouter>
    );
}