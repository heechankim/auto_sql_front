import React, {useState} from "react";

// material-ui
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";

// Store
import {Store} from 'Store'

// Style
import {withStyles} from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function AccountView({history})
{
    return (
        <>
            <Card
                aria-controls='account-card'
            >
                <CardHeader
                    style={{
                        paddingTop: '5px',
                        paddingBottom: '5px',
                    }}
                    avatar={
                        <Avatar
                            src={Store.getState().User.imageUrl}
                            size={100}
                            style={{border: 0}}
                        />
                    }
                    title={Store.getState().User.name}
                />
            </Card>
        </>
    );
}