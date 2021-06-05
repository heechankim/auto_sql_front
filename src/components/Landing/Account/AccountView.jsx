import React, {useState} from "react";

// material-ui
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";

// Store
import {Store} from 'Store'

// Style
import {withStyles} from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// icons
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import BuildIcon from '@material-ui/icons/Build';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

export default function AccountView({history})
{
    // Popover
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Card
                aria-controls='account-card'
                onClick={handleClick}
            >
                <CardHeader
                    style={{
                        paddingTop: '5px',
                        paddingBottom: '5px',
                    }}
                    avatar={
                        <Avatar
                            src={Store.getState().User.imageUrl}
                            size={100}
                            style={{border: 0}}
                        />
                    }
                    title={Store.getState().User.name}
                />
            </Card>
            <StyledMenu
                id="account-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem onClick={() => {
                    history.push('/dashboard')
                }}>
                    <ListItemIcon>
                        <BuildIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="ERD작업실" />
                </StyledMenuItem>
                <StyledMenuItem onClick={() => {
                    console.log("user logout!!")
                }}>
                    <ListItemIcon>
                        <MeetingRoomIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="로그아웃" />
                </StyledMenuItem>
            </StyledMenu>
        </>
    );
}