import React, {useState, useEffect} from 'react'

// material-ui
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";

// for redux
import {Store} from 'Store'

// functions
import {SaveErd} from 'Functions/Erd'

export default function ModalItemSaveButton(props)
{
    const [text, setText] = useState('저장중.')

    const {setOpen} = props

    useEffect(async () => {
        if(Store.getState().ErdData.erdId == -1) {
            setText('선택된 ERD가 존재하지 않습니다.');
            setTimeout(() => {
                setOpen(false);
            }, 1000);
        }
        await SaveErd(Store.getState().ErdData.erdName, Store.getState().VuerdData.editor.value)
            .then((result) => {
                console.log("SaveErd - then")
                console.log(result)
                if(result.data.code === 200)
                {
                    setText('저장되었습니다.');
                    setTimeout(() => {
                        setOpen(false);
                    }, 1000);
                }
            })
            .catch((error) => {
                console.log("SaveErd - error")
                console.log(error)
            })
            console.log('ddddddd')
    }, [])

    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
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
        </>
    );
}