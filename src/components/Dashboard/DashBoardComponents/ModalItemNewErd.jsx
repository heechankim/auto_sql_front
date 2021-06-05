import React, {useEffect, useState} from 'react'

// material-ui
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'

// functions
import {CreateErd} from 'Functions/Erd'

export default function ModalItemNewErd(props)
{
    const [erdName, setErdName] = useState('');

    const onSaveButton = () => {
        CreateErd(erdName);
        props.setOpen(false);
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
                />
            </form>
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
        </div>
    );
}