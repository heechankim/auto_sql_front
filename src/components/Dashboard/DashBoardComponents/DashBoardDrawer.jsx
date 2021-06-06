import React, {useState} from 'react'

// material-ui
import Drawer from '@material-ui/core/Drawer'
import Typography from "@material-ui/core/Typography";

import {makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    center: {
        display: 'flex',
        justifyContent: 'center',
        margin: '15px 0'
    },
}));

export default function DashBoardDrawer(props)
{
    const [open, setOpen] = props.openHooks

    const classes = useStyles();

    return (
        <Drawer
            anchor={props.DrawerPosition}
            open={open}
            onClose={() => {
                setOpen(false)
            }}
        >
            <div
                style={{
                    width: props.DrawerWidth
                }}
                className={classes.center}
            >
                <Typography variant="h6"
                    style={{
                        marginRight: '10px'
                    }}
                >
                    {props.Icon}
                </Typography>
                <Typography variant="h6">
                    {props.DrawerName}
                </Typography>
            </div>
            {props.children}
        </Drawer>
    );
}