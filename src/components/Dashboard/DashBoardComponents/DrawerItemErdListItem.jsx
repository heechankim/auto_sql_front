import React, {useState, useEffect} from 'react'

// material-ui
import Container from "@material-ui/core/Container";
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from '@material-ui/core/Button'
import Badge from '@material-ui/core/Badge';

// material-icon
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ShareIcon from '@material-ui/icons/Share';


export default function DrawerItemErdListItem(props)
{
    const {list} = props;
    const {onLoadButtonClick} = props;
    const {loading} = props;

    const drawing = () => {
        console.log("drawing function")
        console.dir(list)
        return (<Container
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {
                list.map(item => (
                    <Badge
                        key={item.erdId}
                        badgeContent={item.badgeCount}
                        color="error"
                        style={{
                            marginBottom: '1px',
                            width: '100%'
                        }}
                    >
                        <Accordion
                            style={{
                                width: '100%'
                            }}
                        >
                            <AccordionSummary
                                id={item.erdId}
                                expandIcon={item.shared ?
                                    <ShareIcon
                                        color="primary"
                                    />
                                    : ""}
                            >
                                {item.erdName}
                            </AccordionSummary>
                            <AccordionDetails>
                                <Button
                                    variant="contained"
                                    color="default"
                                    startIcon={<CloudDownloadIcon/>}
                                    onClick={() => {
                                        onLoadButtonClick(item.erdId, item.erdName, item.owner_id ? item.owner_id : "")
                                    }}
                                >
                                    불러오기
                                </Button>
                            </AccordionDetails>
                        </Accordion>
                    </Badge>
                ))
            }
        </Container>);
    }

    return (
        <>
            {
                loading && drawing()
            }
        </>
    );
}