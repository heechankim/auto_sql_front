import React, {useEffect, useLayoutEffect, useState, useMemo} from 'react'

// material-ui
import Container from '@material-ui/core/Container'
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import {Typography} from "@material-ui/core";

import Chip from "@material-ui/core/Chip"
import FaceIcon from '@material-ui/icons/Face';

// for redux
import {Store} from 'Store'
import {connect} from 'react-redux'
import {assignWorkingErd} from "Store/ErdData";

// functions
import {GetErdTimeLine} from 'Functions/Erd'
import {GetErd, GetErdList} from "Functions/Erd";

// styles
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '5px 10px',
        width: 'auto',
    },
}));

// Local Function
const LookGoodDate = (_DateObj) => {
    let dateObj = new Date(_DateObj);
    let dateString = dateObj.getFullYear() + "년 " + (dateObj.getMonth() + 1) + "월 " + dateObj.getDate() + "일"
    return dateString
}
const LookGoodTime = (_DateObj) => {
    let dateObj = new Date(_DateObj);
    let timeString = dateObj.getHours() + "시 " + dateObj.getMinutes() + "분 " + dateObj.getSeconds() + "초"
    return timeString
}

function DrawerItemCommits(props)
{
    const [primaryIndex, setPrimaryIndex] = useState(0);

    const {onClose} = props

    //for erd
    const {onWorkingErd} = props
    const {onSetFunction} = props

    //for list
    const [list, setList] = useState([]);

    // 2021.11.02 10:24 chandaley12 인덱싱을 위해서 indexId 추가후 1부터 증가
    const getList = useMemo(() => {
        let startIndex = 1;
        list.map((item) => {
            item.indexId = startIndex++
        })
        return list;
    }, [list])

    const classes = useStyles();


    // timeline 생성
    useLayoutEffect(() => {
        GetErdTimeLine(Store.getState().ErdData.erdName, Store.getState().ErdData.ownerId ? Store.getState().ErdData.ownerId : Store.getState().User.userId)
            .then((result) => {
                setList(result.data.result);
                result.data.result.map((item) => {
                    if(Store.getState().ErdData.commitId === item.commitId) {
                        setPrimaryIndex(item.commitId)
                    }
                })
            })
    }, [])

    const onLoadButtonClick = (_commitId) => {
        let erdId = Store.getState().ErdData.erdId
        let erdName = Store.getState().ErdData.erdName
        let commitId = _commitId;
        setPrimaryIndex(commitId)

        let getErdPromise = GetErd(erdId, commitId)
            .then((result) => {
                if(result.data.code === 200)
                {
                    let _erdData = result.data.result.data
                    let payload = {
                        erdId: erdId,
                        erdName: erdName,
                        commitId: commitId,
                        erdData: _erdData
                    }
                    onWorkingErd(payload)
                    onSetFunction(_erdData)
                    onClose()
                }

            })
    }

    return (
        <Container>
            <Timeline align="alternate">
                {
                    getList.slice(0).reverse().map((item) => (
                        <TimelineItem
                            key={item.commitId}
                        >
                            <TimelineOppositeContent>
                                <Typography variant="body2" color={item.commitId === primaryIndex ? "primary" : "textSecondary"}>
                                    주요 변경 사항
                                </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineConnector />
                                <TimelineDot
                                    color={item.commitId === primaryIndex ? "primary" : "grey"}
                                >
                                    {item.indexId}
                                </TimelineDot>
                            </TimelineSeparator>
                            <TimelineContent>
                                <div className={classes.paper}>
                                    {/* Store.getState().ErdData.commitId === item.commitId ? "primary" : "default" */}
                                    <Chip
                                        icon={<FaceIcon />}
                                        label={item.createdWho}
                                        clickable
                                        color={item.commitId === primaryIndex ? "primary" : "default"}
                                        onClick={(event) =>{
                                            onLoadButtonClick(item.commitId)
                                        }}
                                    />
                                    <Typography
                                        variant="caption"
                                        display="block"
                                        gutterBottom
                                        color={item.commitId === primaryIndex ? "primary" : "initial"}
                                    >
                                        {
                                            LookGoodDate(item.createdAt)
                                        }
                                        <br />
                                        {
                                            LookGoodTime(item.createdAt)
                                        }
                                    </Typography>
                                </div>
                                {/* <Paper elevation={3} className={classes.paper}>
                                    <Typography variant="button">
                                        {item.createdWho}
                                    </Typography>
                                    <Typography variant="body1" component="h1">
                                        {
                                            LookGoodDate(item.createdAt)
                                        }
                                    </Typography>
                                    <Typography variant="body1">
                                        {
                                            LookGoodTime(item.createdAt)
                                        }
                                    </Typography>
                                </Paper> */}
                            </TimelineContent>
                        </TimelineItem>
                    ))
                }
            </Timeline>
        </Container>
    );
}
const mapToDispatch = (dispatch) => ({
    onWorkingErd: (action) => dispatch(assignWorkingErd(action))
});
export default connect(null, mapToDispatch)(DrawerItemCommits);