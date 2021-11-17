import React, {useEffect, useState, useLayoutEffect} from 'react'

// for redux
import { Store } from 'Store'
import {connect} from 'react-redux'
import {assignWorkingErd} from "Store/ErdData";

// material-ui
import Container from "@material-ui/core/Container";
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ShareIcon from '@material-ui/icons/Share';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// material-icon
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

// functions
import {DeleteErd, GetErdList, GetErdTimeLine, GetErdForce} from "Functions/Erd";


// style
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

var revert = false;

function DrawerItemErdList(props)
{
    const {onWorkingErd} = props
    const {onSetFunction} = props
    const {onClose} = props
    const {setOpen} = props

    const [list, setList] = useState()

    // snackbar
    const [alertOpen, setAlertOpen] = useState(false)
    const alertClick = () => {
        setAlertOpen(true)
    }
    const alertClose = (event, reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setAlertOpen(false)
    }

    useLayoutEffect(  () => {
        // Get entire Erd List
        const fetchData = async () => {
            let getErdListPromise = await GetErdList()
                .then(async (result) => {
                    // Map each Erd List
                    let tempList = []
                    let tempListTemp = await Promise.all(result.data.result.map(async (item) => {
                        let erdData = {}
                        // Get Each Erd List's time line
                        let testPromise = await GetErdTimeLine(item.erdName, item.owner_id ? item.owner_id : Store.getState().User.userId)
                            .then(async (result) => {
                                let badgeCount = 0;
                                let currentUserId = await Store.getState().User.userId;

                                // Map each Time line
                                await Promise.all(result.data.result.map((dataItem) => {
                                    if (dataItem.createdWho != currentUserId)
                                        badgeCount++
                                    else
                                        badgeCount = 0
                                }));

                                erdData = {
                                    erdId: item.erdId,
                                    erdName: item.erdName,
                                    shared: item.shared ? item.shared : false,
                                    owner_id: item.owner_id ? item.owner_id : "",
                                    badgeCount: badgeCount,
                                }
                                return erdData;
                            })
                        await tempList.push(testPromise)
                        return testPromise;
                        // return testPromise;
                    }))
                    return tempListTemp;

                })
            setList(getErdListPromise)
            //setList(erdList)
        }
        fetchData();
    }, [])

    const onLoadButtonClick = (_erdId, _erdName, _owner_id) => {
        let _commitId;
        let _erdData;
        let getErdForcePromise = GetErdForce(_erdId)
            .then((result) => {
                let forceData = result.data.result
                _commitId = forceData.commitId
                _erdData = forceData.erdData
                
                let payload = {
                    erdId: _erdId,
                    erdName: _erdName,
                    commitId: _commitId,
                    erdData: _erdData,
                    ownerId: _owner_id,
                }
                onWorkingErd(payload)
                onSetFunction(_erdData)
                onClose()
            })
    }
    const onDeleteButtonClick = (_erdId) => {
        let target = document.getElementById(_erdId)
        target.style.transitionProperty= "background-color"
        target.style.transitionDuration= "0.6s"
        target.style.background = "#E64E3C"

        let index = 0
        let targetIndex = -1
        list.map((item) => {
            if(item.erdId === _erdId)
                targetIndex = index
            index++
        })
        alertClick()
        setTimeout(() => {
            if(revert === false) {
                //console.log("revert false")
                let getErdForcePromise = DeleteErd(_erdId)
                    .then((result) => {
                        if (result.data.code === 200) {
                            //console.log(list.slice(0, targetIndex))
                            //console.log(list.slice(targetIndex + 1, list.length))
                            setList(list.slice(0, targetIndex).concat(list.slice(targetIndex + 1, list.length)))
                        }
                    })
            }
            else {
                //console.log("revert true")
                revert = false
            }
        }, 2000)

    }

    return (
        <>
            {
                list && <Container
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {
                        list.map(item => (
                            <Badge
                                key={item.erdId}
                                badgeContent={item.badgeCount}
                                color="error"
                                style={{
                                    marginBottom: '1px',
                                    width: '100%'
                                }}
                            >
                                <Accordion
                                    style={{
                                        width: '100%'
                                    }}
                                    id={item.erdId}
                                >
                                    <AccordionSummary
                                        id={item.erdId}
                                        expandIcon={item.shared ?
                                            <ShareIcon
                                                color="primary"
                                            />
                                            : ""}
                                    >
                                        {item.erdName}
                                    </AccordionSummary>
                                    <AccordionDetails
                                        style={{
                                            display: 'flex'

                                        }}
                                    >
                                        <Button
                                            style={{
                                                width:'110px'
                                            }}
                                            variant="contained"
                                            color="primary"
                                            startIcon={<CloudDownloadIcon/>}
                                            onClick={() => {
                                                onLoadButtonClick(item.erdId, item.erdName, item.owner_id ? item.owner_id : "")
                                            }}
                                        >
                                            <Typography variant="caption" display="block">
                                                불러오기
                                            </Typography>
                                        </Button>
                                        {
                                            ((!item.shared) || (item.owner_id === Store.getState().User.userId)) && <Button
                                                style={{
                                                    width: '110px'
                                                }}
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<DeleteForeverIcon/>}
                                                onClick={() => {
                                                    onDeleteButtonClick(item.erdId)
                                                }}
                                            >
                                                <Typography variant="caption" display="block">
                                                    삭제하기
                                                </Typography>
                                            </Button>
                                        }
                                    </AccordionDetails>
                                </Accordion>
                            </Badge>
                        ))
                    }
                </Container>
            }
            {/*<Snackbar*/}
            {/*    style={{*/}
            {/*        backgroundColor: "#f44336"*/}
            {/*    }}*/}
            {/*    anchorOrigin={{*/}
            {/*        vertical: 'bottom',*/}
            {/*        horizontal: 'center',*/}
            {/*    }}*/}
            {/*    open={alertOpen}*/}
            {/*    autoHideDuration={60000}*/}
            {/*    onClose={alertClose}*/}
            {/*    message="성공적으로 삭제 되었습니다."*/}
            {/*    action={*/}
            {/*        <>*/}
            {/*            <Button>*/}
            {/*                되돌리기*/}
            {/*            </Button>*/}
            {/*            <IconButton>*/}
            {/*                <CloseIcon fontSize="small" />*/}
            {/*            </IconButton>*/}
            {/*        </>*/}
            {/*    }*/}
            {/*/>*/}
            <Snackbar
                open={alertOpen}
                autoHideDuration={5000}
                onClose={alertClose}
            >
                <Alert
                    onClose={alertClose}
                    severity="error"
                >
                    삭제하면 되돌릴 수 없습니다.
                    <Button
                        style={{
                            marginLeft: '20px'
                        }}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            revert = true
                            alertClose()
                        }}
                    >
                        되돌리기
                    </Button>
                </Alert>
            </Snackbar>
        </>
    );
};
const mapToDispatch = (dispatch) => ({
    onWorkingErd: (action) => dispatch(assignWorkingErd(action))
});

export default connect(null, mapToDispatch)(DrawerItemErdList);