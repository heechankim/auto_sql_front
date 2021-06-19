import React, {useEffect, useState} from 'react'

// for redux
import {connect} from 'react-redux'
import {assignWorkingErd} from "Store/ErdData";

// material-ui
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'

// functions
import {CreateErd, GetErdForce} from 'Functions/Erd'

function ModalItemNewErd(props)
{
    const {onWorkingErd} = props
    const {onSetFunction} = props
    const {onClose} = props

    const [erdName, setErdName] = useState('');

    const onSaveButton = () => {
        let createErdPromise = CreateErd(erdName)
            .then((erdResult) => {
                let _commitId;
                let _erdData;
                let getErdForcePromise = GetErdForce(erdResult.id)
                    .then((result) => {
                        let forceData = result.data.result
                        _commitId = forceData.commitId
                        _erdData = forceData.erdData

                        let payload = {
                            erdId: erdResult.id,
                            erdName: erdResult.name,
                            commitId: _commitId,
                            erdData: _erdData,
                        }
                        onWorkingErd(payload)
                        onSetFunction(_erdData)
                        onClose();
                    })
            })
    };

    return (
        <div style={{
            width: '400px',
            height: '180px',
        }}>
            <form noValidate autoComplete="off">
                <TextField
                    id="erd-name"
                    label="ERD 이름"
                    variant="outlined"
                    style={{
                        width: '100%'
                    }}
                    onChange={(event) => {
                        event.preventDefault()
                        setErdName(event.target.value)
                    }}
                    autoFocus
                />

            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    position: 'relative',
                    top: '50px',
                    justifyContent: 'center',
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<SaveIcon />}
                    onClick={onSaveButton}
                >
                    만들기
                </Button>
            </div>
            </form>
        </div>
    );
}
const mapToDispatch = (dispatch) => ({
    onWorkingErd: (action) => dispatch(assignWorkingErd(action))
});

export default connect(null, mapToDispatch)(ModalItemNewErd);