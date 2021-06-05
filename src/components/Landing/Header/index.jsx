import React, {useState} from 'react'

// material-ui
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

// style
import './index.css'

// components
import Account from 'components/Landing/Account'

export default function Header(props)
{
    const [value, setValue] = useState('home');

    const selectValueChange = (event, value) => {
        event.preventDefault()
        setValue(value)
    }

    return (
        <Account {...props} />
    );
}