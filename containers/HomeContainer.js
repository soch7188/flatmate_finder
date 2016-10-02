import React, {PropTypes} from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {guacamoliTheme} from '../constants/guacamoliTheme';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {hongkong, nt, kowloon} from '../constants/ImageHandler';

import {Row, Col, Glyphicon, Button, Modal} from 'react-bootstrap';
import {homeBackgroundImage, houseBanner} from '../constants/ImageHandler';
import NavigationComponent from '../components/NavigationBar';



import {showModalFilter, hideModalFilter, clickAdvancedFilter,
    toggleSearchButton,
    inputSearchQuery, submitSearchQuery
} from '../actions/uiActions';

var axios = require('axios');
const muiTheme = getMuiTheme(guacamoliTheme);

class HomePage extends React.Component {
    render() {
        const locationCount ={
            "hk": 100,
            "kl": 50,
            "nt": 40
        }

        function testing(){
            console.log("testing");
        }

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <NavigationComponent />
                    <Row>

                        <Card>
                            <CardMedia>
                                <img style={styles.banner} src={houseBanner} />
                            </CardMedia>
                        </Card>
                    </Row>
                    <Row style={{paddingTop:20}}>
                        <Col md={4}>
                            <Card style={{margin:15}} onClick={()=>testing()}>
                                <CardMedia
                                    overlay={<CardTitle title="Hong Kong" subtitle={locationCount.hk} />}
                                >
                                    <img src={hongkong} />
                                </CardMedia>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card style={{margin:15}}>
                                <CardMedia
                                    overlay={<CardTitle title="Kowloon" subtitle={locationCount.kl} />}
                                >
                                    <img src={kowloon} />
                                </CardMedia>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card style={{margin:15}}>
                                <CardMedia
                                    overlay={<CardTitle title="New Territories" subtitle={locationCount.nt} />}
                                >
                                    <img src={nt} />
                                </CardMedia>
                            </Card>
                        </Col>
                    </Row>
                    {/*<DialogFilter isShow={isShowFilterModal} onHide={hideModalFilter} isAdvancedFilter={isAdvancedFilter} onClickAdvanced={clickAdvancedFilter}/>*/}
                </div>
            </MuiThemeProvider>
        );
    }
}

export default connect(
    state => ({
        isShowFilterModal: state.uiStates.isShowFilterModal,
        isAdvancedFilter: state.uiStates.isAdvancedFilter,
        isSearch: state.uiStates.isSearch,
        isFilter: state.uiStates.isFilter
    }),
    {
        showModalFilter, hideModalFilter, clickAdvancedFilter,
        toggleSearchButton,
        inputSearchQuery, submitSearchQuery
    }
)(HomePage)

/**
 * styles
 */

const styles = {
    banner:{
        height:300
    }
}