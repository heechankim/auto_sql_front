import React, {useEffect, useState} from 'react'

// material-ui
import Button from '@material-ui/core/Button';

// components
import DashBoardModal from "components/Dashboard/DashBoardComponents/DashBoardModal";

export default function DashBoardModalButton(props)
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
            <DashBoardModal
                openHooks={[open, setOpen]}
                title={props.children}
            >
                <Component
                    setOpen={setOpen}
                />
            </DashBoardModal>
        </>
    );
}