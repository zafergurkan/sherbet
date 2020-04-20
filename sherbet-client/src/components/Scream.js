import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typorgraphy from '@material-ui/core/Typography';

const styles = {
    card:{
        display:'flex'
    }
}

class Scream extends Component {
    render() {
        const{classes, scream : {body,createdAt,userImage,userHandle,screamId,likeCount,commentCount}}=this.props
        return (
            <Card>
            <CardMedia
            image={userImage}
            title="Profil Resmi"/>
            <CardContent>
                <Typorgraphy variant="h5"> {userHandle}</Typorgraphy>
                <Typorgraphy variant="body2" color="textSecondary"> {createdAt}</Typorgraphy>
                <Typorgraphy variant="body1" color="textSecondary"> {body}</Typorgraphy>
            </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Scream);
