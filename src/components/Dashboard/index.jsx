import React, { useEffect, useLayoutEffect, useState } from 'react'

// for redux
import { Store } from 'Store'

// components
import GenerateVuerd from 'components/Dashboard/generateVuerd'
import DashBoardModalButton from 'components/Dashboard/DashBoardButton/DashBoardModalButton'
import DashBoardDrawerButton from 'components/Dashboard/DashBoardButton/DashBoardDrawerButton'

// DashBoard components
import ModalItemNewErd from 'components/Dashboard/DashBoardComponents/ModalItemNewErd'
import DrawerItemErdList from "components/Dashboard/DashBoardComponents/DrawerItemErdList";
import ModalItemSaveButton from 'components/Dashboard/DashBoardComponents/ModalItemSaveButton'
import DrawerItemCommits from 'components/Dashboard/DashBoardComponents/DrawerItemCommits'

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import BuildIcon from '@material-ui/icons/Build';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AddBoxIcon from '@material-ui/icons/AddBox';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import SaveIcon from '@material-ui/icons/Save';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';

// 3rd-party
import Draggable from 'react-draggable'

// style
import './index.css'

const useStyles = makeStyles((theme) => ({
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    FloatingButton: {
        zIndex: 999,
        width: '60px',
        height: '40px',
        boxShadow: '-0px 0px 10px 2px #73FAF8',
    },
}));

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
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
    },
}))(MenuItem);

export default function Dashboard(props) {
    // for redux
    const [erdData, setErdData] = useState({});

    useLayoutEffect(() => {
        setErdData(Store.getState().ErdData.erdData)
        // console.log('DashBoard index - setErdData')
        // console.dir(erdData)
    }, [Store.getState().ErdData.erdData])

    //style
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [dragging, setDragging] = useState(false);

    const handleClick = (event) => {
        if (!dragging)
            setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <>
            <header style={{
                height: '50px',
                backgroundColor: '#333333',
                display: 'flex'
            }}>
                <Draggable
                    defaultPosition={{ x: 100, y: 120 }}
                    scale={1}
                    position={null}
                    onDrag={() => {
                        setDragging(true)
                    }}
                    onStop={() => {
                        setTimeout(() => {
                            setDragging(false)
                        }, 200);
                    }}
                >
                    <Fab
                        variant="extended"
                        size="medium"
                        color="primary"
                        aria-label="add"
                        className={classes.margin, classes.FloatingButton}
                        onClick={handleClick}
                    >
                        <BuildIcon className={classes.extendedIcon} />
                        작업
                    </Fab>
                </Draggable>
                <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <StyledMenuItem>
                        <DashBoardModalButton
                            component={ModalItemNewErd}
                            Icon={<AddBoxIcon fontSize="small" />}
                        >
                            새로작성
                        </DashBoardModalButton>
                    </StyledMenuItem>
                    <StyledMenuItem>
                        <DashBoardDrawerButton
                            DrawerWidth="300px"
                            DrawerPosition="left"
                            component={DrawerItemErdList}
                            onSetFunction={setErdData}
                            Icon={<SystemUpdateAltIcon fontSize="small" />}
                        >
                            불러오기
                        </DashBoardDrawerButton>
                    </StyledMenuItem>
                    <StyledMenuItem>
                        <DashBoardModalButton
                            component={ModalItemSaveButton}
                            Icon={<SaveIcon fontSize="small" />}
                        >
                            저장하기
                        </DashBoardModalButton>
                    </StyledMenuItem>
                    <StyledMenuItem>
                        <DashBoardDrawerButton
                            DrawerWidth="500px"
                            DrawerPosition="right"
                            component={DrawerItemCommits}
                            onSetFunction={setErdData}
                            Icon={<SettingsBackupRestoreIcon fontSize="small" />}
                        >
                            변경사항
                        </DashBoardDrawerButton>
                    </StyledMenuItem>
                </StyledMenu>
            </header>
            <div style={{
                height: '100%'
            }}>
                <GenerateVuerd
                    {...props}
                    erdData={erdData}
                />
            </div>
        </>
    );
}