import React from 'react'

// material-ui
import {Container} from "@material-ui/core";

import {makeStyles} from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';


// components
import Account from "./Account";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

// https://preview.themeforest.net/item/dimon-react-next-app-landing-page-template/full_screen_preview/26271180?_ga=2.102474565.578745029.1614430241-1591077733.1609319700
export default function Landing(props)
{
    const classes = useStyles();
    return (
        <>
            <Container>

                <Card className={classes.root}>
                    <CardHeader
                        action={
                            <Account {...props} />
                        }
                    />
                    asd
                </Card>
            </Container>
        </>
    );
}