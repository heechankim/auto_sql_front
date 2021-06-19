import React, {useState, useEffect} from 'react'

// material-ui
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";

// for redux
import {Store} from 'Store'
import {connect} from 'react-redux'
import {assignWorkingErd} from "Store/ErdData";

// functions
import {GetErdForce, SaveErd} from 'Functions/Erd'

function ModalItemSaveButton(props)
{
    const [text, setText] = useState('저장중.')

    const {onWorkingErd} = props
    const {onSetFunction} = props
    const {onClose} = props

    useEffect(async () => {
        if(Store.getState().ErdData.erdId == -1) {
            setText('선택된 ERD가 존재하지 않습니다.');
            setTimeout(() => {
                onClose();
            }, 1000);
        }
        await SaveErd(Store.getState().ErdData.erdName, Store.getState().VuerdData.editor.value, Store.getState().ErdData.ownerId)
            .then((result) => {
                if(result.data.code === 200)
                {
                    setText('저장되었습니다.');
                    setTimeout(() => {
                        let _commitId;
                        let _erdData;
                        let getErdForcePromise = GetErdForce(Store.getState().ErdData.erdId)
                            .then((result) => {
                                let forceData = result.data.result
                                _commitId = forceData.commitId
                                _erdData = forceData.erdData

                                let payload = {
                                    commitId: _commitId,
                                    erdData: _erdData,
                                }
                                onWorkingErd(payload)
                                onSetFunction(_erdData)
                                onClose()
                            })
                    }, 1000);
                }
            })
            .catch((error) => {
                console.log("SaveErd - error")
                console.log(error)
            })
    }, [])

    return (
        <div
            style={{
                width: '400px',
                height: '180px',
            }}
        >
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '50px',
            }}>
                {text}
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px'
            }}>
                <CircularProgress color="inherit" />
            </div>
        </div>
    );
}
const mapToDispatch = (dispatch) => ({
    onWorkingErd: (action) => dispatch(assignWorkingErd(action))
});

export default connect(null, mapToDispatch)(ModalItemSaveButton);