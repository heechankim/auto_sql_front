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
import ShareIcon from '@material-ui/icons/Share';
import Badge from '@material-ui/core/Badge';

// material-icon
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

// functions
import {GetErd, GetErdList, GetErdTimeLine, GetErdForce} from "Functions/Erd";

// component
import DrawerItemErdListItem from "./DrawerItemErdListItem";

function DrawerItemErdList(props)
{
    const {onWorkingErd} = props
    const {onSetFunction} = props
    const {onClose} = props
    const {setOpen} = props

    const [list, setList] = useState()



    useLayoutEffect( async () => {
        // Get entire Erd List
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
                                if(dataItem.createdWho != currentUserId)
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
                console.log('!!!!!!!!!');
                console.log(tempListTemp);
                return tempListTemp;

            })
        console.log('getErdListPromise');
        console.log(getErdListPromise);
        setList(getErdListPromise)
        //setList(erdList)

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

    useEffect(() => {
        console.log("useEffect")
        console.log(list)

    }, [list])
    return (
        <>
            {
                list && <DrawerItemErdListItem
                    list={list}
                    onLoadButtonClick={onLoadButtonClick}
                    setOpen={setOpen}
                />
            }
        </>
    );
};
const mapToDispatch = (dispatch) => ({
    onWorkingErd: (action) => dispatch(assignWorkingErd(action))
});

export default connect(null, mapToDispatch)(DrawerItemErdList);