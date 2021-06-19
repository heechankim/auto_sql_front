import React, {useEffect, useState} from 'react'

// components
import DashBoardModal from "components/Dashboard/DashBoardComponents/DashBoardModal";

export default function DashBoardModalButton(props)
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
                    margin:'auto',
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
            <DashBoardModal
                openHooks={[open, setOpen]}
                title={props.children}
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