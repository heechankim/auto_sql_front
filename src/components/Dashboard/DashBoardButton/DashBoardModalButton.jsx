import React, {useEffect, useState} from 'react'

// components
import DashBoardModal from "components/Dashboard/DashBoardComponents/DashBoardModal";

export default function DashBoardModalButton(props)
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
                    margin:'auto',
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
            <DashBoardModal
                openHooks={[open, setOpen]}
                title={props.children ? props.children : ComponentTitle}
                Icon={props.Icon}
            >
                <Component
                    onSetFunction={props.onSetFunction}
                    onClose={() => {
                        setOpen(false)
                    }}
                />
            </DashBoardModal>
        </>
    );
}