import React, {useState, useEffect} from 'react'

// material-ui
import Button from '@material-ui/core/Button';

// components
import DashBoardDrawer from 'components/Dashboard/DashBoardComponents/DashBoardDrawer'

export default function DashBoardDrawerButton(props)
{
    const [open, setOpen] = useState(false);
    const Component = props.component;

    return (
        <>
            <Button
                variant="contained"
                style={{
                    width: '100px',
                    marginRight: '20px'
                }}
                onClick={() => {
                    setOpen(true)
                }}
            >
                {props.children}
            </Button>
            <DashBoardDrawer
                openHooks={[open, setOpen]}
                DrawerPosition={props.DrawerPosition}
                DrawerWidth={props.DrawerWidth}
                DrawerName={props.children}
            >
                <Component
                    onSetFunction={props.onSetFunction}
                />
            </DashBoardDrawer>
        </>
    );
}