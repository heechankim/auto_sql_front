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

    const [list, setList] = useState()
    const [loading, setLoading] = useState(true)


    var tempList = []
    useLayoutEffect(  () => {
        // Get entire Erd List
        let getErdListPromise =  GetErdList()
            .then((result) => {
                // Map each Erd List

                result.data.result.map( (item) => {
                    let erdData = {}
                    // Get Each Erd List's time line
                    GetErdTimeLine(item.erdName, item.owner_id ? item.owner_id : Store.getState().User.userId)
                        .then((result) => {
                            let badgeCount = 0;
                            let currentUserId = Store.getState().User.userId;
                            // Map each Time line
                            result.data.result.map((dataItem) => {
                                if(dataItem.createdWho != currentUserId)
                                    badgeCount++
                                else
                                    badgeCount = 0
                            });

                            erdData = {
                                erdId: item.erdId,
                                erdName: item.erdName,
                                shared: item.shared ? item.shared : false,
                                owner_id: item.owner_id ? item.owner_id : "",
                                badgeCount: badgeCount,
                            }
                            tempList.push(erdData)
                        })
                })
                setList(tempList)
            })
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
        console.log("DrawerItemErdListItem")
        if(list)
        {
            console.log("list true")
            console.log(list)
            setLoading(false)
        }
        else
        {
            console.log("list false")
            console.log(list)
        }
    }, [list])

    if(loading) {
        console.log("loading : " + loading)
        return (<div>loading...</div>);
    }

    return (
        <>
            {
                <DrawerItemErdListItem
                    list={list}
                    onLoadButtonClick={onLoadButtonClick}
                    loading={loading}
                />
            }
        </>
    );
}
const mapToDispatch = (dispatch) => ({
    onWorkingErd: (action) => dispatch(assignWorkingErd(action))
});

export default connect(null, mapToDispatch)(DrawerItemErdList);