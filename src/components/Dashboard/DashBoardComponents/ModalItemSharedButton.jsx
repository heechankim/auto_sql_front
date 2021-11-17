import React, {useState, useEffect} from 'react'

// for redux
import {Store} from 'Store'

// material ui
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CircularProgress from "@material-ui/core/CircularProgress";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';

// material icon
import ShareIcon from '@material-ui/icons/Share';

// function
import {SharedErd} from 'Functions/Erd'


export default function ModalItemSharedButton(props)
{
    const {onClose} = props

    const [teamName, setTeamName] = useState('')
    const [teamMember, setTeamMember] = useState([])

    const [isSelected, setIsSelected] = useState(false);

    const [isSharing, setIsSharing] = useState(false);
    const [text, setText] = useState('공유중.')

    useEffect(() => {
        if(Store.getState().ErdData.erdId == -1) {
            setIsSelected(false)
            setTimeout(() => {
                onClose()
            }, 1000)
        }
        else {
            setIsSelected(true)
        }
    }, [])

    const onSharedButton = () => {
        let sharedErdPromise = SharedErd( Store.getState().ErdData.erdId, Store.getState().ErdData.erdName, teamName, teamMember)
            .then((result) => {
                if(result.data.code === 200)
                {
                    setIsSharing(true)
                    setTimeout(() => {
                        setText("공유되었습니다.")
                    }, 2500)
                    setTimeout(() => {
                        onClose()
                    }, 4000)
                }
            })
    }

    if(!isSelected) {
        return (
            <div
                style={{
                width: '400px',
                height: '180px',
            }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '50px',
                    }}
                >
                    <Typography variant="body1">
                        선택된 ERD가 존재하지 않습니다.
                    </Typography>
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

    return (
        <>
            <div style={{
                width: '400px',
                display: isSharing ? 'none' : 'block',
            }}>

                <form noValidate autoComplete="off">
                    <TextField
                        id="shared_name"
                        label="팀 이름"
                        variant="outlined"
                        style={{
                            width: '100%',
                        }}
                        onChange={(event) => {
                            event.preventDefault()
                            setTeamName(event.target.value)
                        }}
                        autoFocus
                    />

                    <div
                        style={{
                            marginTop: '20px'
                        }}
                    >
                        <Autocomplete
                            multiple
                            id="team-member"
                            options={teamMember}
                            getOptionLabel={(option) => option}
                            onChange={(event, value) => {
                                setTeamMember(value)
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="팀원 추가"
                                    placeholder="이메일입력"
                                    onKeyPress={(event) => {
                                        if(event.key === "Enter") {
                                            setTeamMember([...teamMember, event.target.value])
                                        }
                                    }}
                                />
                            )}
                        />
                    </div>
                </form>

                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '20px'
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<ShareIcon />}
                            onClick={onSharedButton}
                        >
                            공유하기
                        </Button>
                    </div>


            </div>
            <div style={{
                width: '400px',
                height: '180px',
                display: isSharing ? 'block' : 'none',
            }}>
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
        </>
    );
}