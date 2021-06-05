import React from 'react'

// material-ui
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

// style
import {makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function DashBoardModal(props)
{
    const classes = useStyles();

    const [open, setOpen] = props.openHooks;

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Modal
            aria-labelledby="dashboard-modal-title"
            aria-describedby="dashboard-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    <h2 id="dashboard-modal-title">{props.title}</h2>
                    {props.children}
                </div>
            </Fade>
        </Modal>
    );
}