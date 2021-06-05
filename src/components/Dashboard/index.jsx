import React, {useEffect, useLayoutEffect, useState} from 'react'

// for redux
import {Store} from 'Store'

// components
import GenerateVuerd from 'components/Dashboard/generateVuerd'
import DashBoardModalButton from 'components/Dashboard/DashBoardButton/DashBoardModalButton'
import DashBoardDrawerButton from 'components/Dashboard/DashBoardButton/DashBoardDrawerButton'

// DashBoard components
import ModalItemNewErd from 'components/Dashboard/DashBoardComponents/ModalItemNewErd'
import DrawerItemErdList from "components/Dashboard/DashBoardComponents/DrawerItemErdList";
import ModalItemSaveButton from 'components/Dashboard/DashBoardComponents/ModalItemSaveButton'
import DrawerItemCommits from 'components/Dashboard/DashBoardComponents/DrawerItemCommits'

// style
import './index.css'

export default function Dashboard(props)
{
    const [erdData, setErdData] = useState({});

    useEffect(() => {
        console.log("============================================================")
    }, [])

    useLayoutEffect(() => {
        setErdData(Store.getState().ErdData.erdData)
        console.log('DashBoard index - setErdData')
        console.dir(erdData)
    }, [Store.getState().ErdData.erdData])

    return (
        <>
            <header style={{
                height: '50px',
                backgroundColor: '#333333',
                display: 'flex'
            }}>
                <div>
                    <img src="/images/logo.png"
                         height="45px"
                    />
                </div>
                <div className="dashboard-buttons">
                    <DashBoardModalButton
                        component={ModalItemNewErd}
                    >
                        새 ERD
                    </DashBoardModalButton>
                    <DashBoardModalButton
                        component={ModalItemSaveButton}
                    >
                        저장하기
                    </DashBoardModalButton>
                    <DashBoardDrawerButton
                        DrawerWidth="300px"
                        DrawerPosition="left"
                        component={DrawerItemErdList}
                        onSetFunction={setErdData}
                    >
                        ERD
                    </DashBoardDrawerButton>
                    <DashBoardDrawerButton
                        DrawerWidth="400px"
                        DrawerPosition="right"
                        component={DrawerItemCommits}
                    >
                        변경사항
                    </DashBoardDrawerButton>
                </div>
            </header>
            <div style={{
                height: '100%'
            }}>
                <GenerateVuerd
                    {...props}
                    erdData={erdData}
                />
            </div>
        </>
    );
}