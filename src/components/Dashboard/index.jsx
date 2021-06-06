import React, {useEffect, useLayoutEffect, useState} from 'react'

// for redux
import {Store} from 'Store'

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
import {makeStyles} from "@material-ui/core/styles";
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
    dashboardButtons: {
        marginTop: '5px',
        marginLeft: '60px',
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    FloatingButton: {
        zIndex: 900000050,
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
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

export default function Dashboard(props)
{
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
        if(!dragging)
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
                    defaultPosition={{x: 100, y: 120}}
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
                        <ListItemIcon>
                            <AddBoxIcon fontSize="small" />
                        </ListItemIcon>
                        {/* <ListItemText primary="새로만들기" /> */}
                        <DashBoardModalButton
                            component={ModalItemNewErd}
                        >
                            새로만들기
                        </DashBoardModalButton>
                    </StyledMenuItem>
                    <StyledMenuItem>
                        <ListItemIcon>
                            <SystemUpdateAltIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="불러오기" />
                    </StyledMenuItem>
                    <StyledMenuItem>
                        <ListItemIcon>
                            <SaveIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="저장하기" />
                    </StyledMenuItem>
                    <StyledMenuItem>
                        <ListItemIcon>
                            <SettingsBackupRestoreIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="변경사항" />
                    </StyledMenuItem>
                </StyledMenu>
                <div className={classes.dashboardButtons}>
                    <DashBoardModalButton
                        component={ModalItemNewErd}
                    >
                        새 ERD
                    </DashBoardModalButton>
                    <DashBoardModalButton
                        component={ModalItemSaveButton}
                    >
                        저장하기
                    </DashBoardModalButton>
                    <DashBoardDrawerButton
                        DrawerWidth="300px"
                        DrawerPosition="left"
                        component={DrawerItemErdList}
                        onSetFunction={setErdData}
                    >
                        ERD
                    </DashBoardDrawerButton>
                    <DashBoardDrawerButton
                        DrawerWidth="500px"
                        DrawerPosition="right"
                        component={DrawerItemCommits}
                        onSetFunction={setErdData}
                    >
                        변경사항
                    </DashBoardDrawerButton>
                </div>
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