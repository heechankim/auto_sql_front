import React, {useState, useEffect} from 'react'

// components
import DashBoardDrawer from 'components/Dashboard/DashBoardComponents/DashBoardDrawer'



export default function DashBoardDrawerButton(props)
{
    const [open, setOpen] = useState(false);
    const Component = props.component;

    return (
        <>
            <div
                variant="contained"
                style={{
                    width: '100%',
                    height: '100%',
                }}
                onClick={() => {
                    setOpen(true)
                }}
            >
                <span
                    style={{
                        marginRight: '10px',
                    }}
                >
                    {props.Icon}
                </span>
                {props.children}
            </div>
            <DashBoardDrawer
                openHooks={[open, setOpen]}
                DrawerPosition={props.DrawerPosition}
                DrawerWidth={props.DrawerWidth}
                DrawerName={props.children}
                Icon={props.Icon}
            >
                <Component
                    onSetFunction={props.onSetFunction}
                />
            </DashBoardDrawer>
        </>
    );
}