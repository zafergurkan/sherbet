import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';

import Typography from '@material-ui/core/Typography';
import  { Link } from 'react-router-dom';

const styles = {
    card:{
        display:'flex',
        marginBottom:20
    },
    image:{
        minWidth: 200,

    },
    content:{
        padding: 25,
        objectFit:'cover'
    },
    large: {
        width: '120px ',
       height: '120px ',
       margin:10,
 
      },
  
    
}

class Scream extends Component {
   
    render() {
        let defaultImg ="https://firebasestorage.googleapis.com/v0/b/sherbetapp-66fc8.appspot.com/o/img.png?alt=media&token=2fdc0026-5443-4036-921c-e97a739268e1";
        dayjs.extend(relativeTime);
        const{classes, scream : {body,createdAt,userImage,userHandle,screamId,likeCount,commentCount}}=this.props
        return (
            <Card className={classes.card}>

         <Avatar alt="Remy Sharp" src={userImage===null ?  defaultImg : userImage } className={classes.large} />

            <CardContent className={classes.content}>
                <Typography variant="h5" 
                component={Link} 
                to={`/users/${userHandle}`}
                color="primary"
                > {userHandle}</Typography>
                <Typography variant="body2" color="textSecondary"> {dayjs(createdAt).fromNow()}</Typography>
                <Typography variant="body1" color="textSecondary"> {body}</Typography>
            </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Scream);
