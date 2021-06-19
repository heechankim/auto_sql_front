import React, {useState, useEffect} from 'react'

// components
import DashBoardDrawer from 'components/Dashboard/DashBoardComponents/DashBoardDrawer'



export default function DashBoardDrawerButton(props)
{
    const [open, setOpen] = useState(false);
    const Component = props.component;
    const {ComponentTitle} = props;

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
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    {props.Icon}
                </span>
                {/*{props.children ? props.children : ComponentTitle}*/}
            </div>
            <DashBoardDrawer
                openHooks={[open, setOpen]}
                DrawerPosition={props.DrawerPosition}
                DrawerWidth={props.DrawerWidth}
                DrawerName={props.children ? props.children : ComponentTitle}
                Icon={props.Icon}
            >
                <Component
                    onSetFunction={props.onSetFunction}
                    onClose={() => {
                        setOpen(false)
                    }}
                    setOpen={setOpen}
                />
            </DashBoardDrawer>
        </>
    );
}