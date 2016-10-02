import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import {imageUrlMapper} from '../constants/Utility';
import {hongkong, nt, kowloon} from '../constants/ImageHandler';



export default class LocationThumbnail extends React.Component {
    render() {
        const locationName = this.props.locationDetail.locationName;
        const count = this.props.locationDetail.Count;

        return (
            <Card style={{margin:15}}>
                <CardMedia
                    overlay={<CardTitle title={locationName} subtitle={count} />}
                >
                    <img src={imageUrlMapper("Kowloon")} />
                </CardMedia>
            </Card>
        );
    }
};