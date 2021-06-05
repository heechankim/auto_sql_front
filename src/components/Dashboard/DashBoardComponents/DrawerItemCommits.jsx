import React, {useEffect, useLayoutEffect, useState} from 'react'

// material-ui
import Container from '@material-ui/core/Container'
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Paper from "@material-ui/core/Paper";
import {Typography} from "@material-ui/core";

// for redux
import {Store} from 'Store'

// functions
import {GetErdTimeLine} from 'Functions/Erd'

// styles
import {makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '3px 10px',
    },
}));

export default function DrawerItemCommits()
{
    const [list, setList] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        GetErdTimeLine(Store.getState().ErdData.erdName)
            .then((result) => {
                setList(result.data.result);
            })
    }, [])

    return (
        <Container>
            <Timeline align="alternate">
                {
                    list.map((item) => (
                        <TimelineItem
                            key={item.commitId}
                        >
                            <TimelineSeparator>
                                <TimelineDot>
                                    {item.commitId}
                                </TimelineDot>
                            </TimelineSeparator>
                            <TimelineContent>
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography variant="body1">
                                        {Date(item.createdAt).toString()}
                                    </Typography>
                                </Paper>
                            </TimelineContent>
                        </TimelineItem>
                    ))
                }
            </Timeline>
        </Container>
    );
}