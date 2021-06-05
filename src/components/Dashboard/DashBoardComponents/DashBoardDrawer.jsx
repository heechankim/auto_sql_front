import React, {useState} from 'react'

// material-ui
import Drawer from '@material-ui/core/Drawer'
import Typography from "@material-ui/core/Typography";

export default function DashBoardDrawer(props)
{
    const [open, setOpen] = props.openHooks

    return (
        <Drawer
            anchor={props.DrawerPosition}
            open={open}
            style={{
                zIndex: 3000
            }}
            onClose={() => {
                setOpen(false)
            }}
        >
            <div
                style={{
                    width: props.DrawerWidth
                }}
            >
                <Typography>
                    {props.DrawerName}
                </Typography>
            </div>
            {props.children}
        </Drawer>
    );
}