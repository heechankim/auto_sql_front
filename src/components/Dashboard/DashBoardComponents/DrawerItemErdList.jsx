import React, {useEffect, useState} from 'react'

// for redux
import {connect} from 'react-redux'
import {assignWorkingErd} from "Store/ErdData";

// material-ui
import Container from "@material-ui/core/Container";
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from '@material-ui/core/Button'

// material-icon
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

// functions
import {GetErd, GetErdList, GetErdTimeLine} from "Functions/Erd";

function DrawerItemErdList(props)
{
    const {onWorkingErd} = props
    const {onSetFunction} = props

    const [list, setList] = useState([])

    useEffect(() => {
        let getErdListPromise = GetErdList()
            .then((result) => {
                setList(result.data.result)
            })
    }, [])

    const onLoadButtonClick = (_erdId, _erdName) => {
        let _commitId;
        let _erdData;
        let getErdTimeLinePromise = GetErdTimeLine(_erdName)
            .then((result) => {
                console.log('after GetErdTimeLine')
                //console.log(result)
                const commitArray = result.data.result;
                //console.log(commitArray[0].commitId) -> 26
                _commitId = commitArray[0].commitId
                return GetErd(_erdId, _commitId)
            })
            .then((result) => {
                console.log('after GetErd')
                //console.log(result)
                console.log('GetErd data')
                //console.log(result.data.result[0].data)
                _erdData = result.data.result[0].data;

                let payload = {
                    erdId: _erdId,
                    erdName: _erdName,
                    commitId: _commitId,
                    erdData: _erdData,
                }
                onWorkingErd(payload)
                onSetFunction(_erdData)
            })
    }
    return (
        <Container>
            {
                list.map(item => (
                    <Accordion
                        key={item.erdId}
                    >
                        <AccordionSummary
                            id={item.erdId}
                        >
                            {item.erdName}
                        </AccordionSummary>
                        <AccordionDetails>
                            <Button
                                variant="contained"
                                color="default"
                                startIcon={<CloudDownloadIcon/>}
                                onClick={() => {
                                    onLoadButtonClick(item.erdId, item.erdName)
                                }}
                            >
                                불러오기
                            </Button>
                        </AccordionDetails>
                    </Accordion>
                ))
            }
        </Container>
    );
}
const mapToDispatch = (dispatch) => ({
    onWorkingErd: (action) => dispatch(assignWorkingErd(action))
});

export default connect(null, mapToDispatch)(DrawerItemErdList);