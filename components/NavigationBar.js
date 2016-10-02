import React from 'react';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {render} from 'react-dom';
import {connect} from 'react-redux';

import AppBar from 'material-ui/AppBar';

import NavigationDrawer from './NavigationDrawer';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import {toggleNavDrawer} from '../actions/uiActions';


class NavigationComponent extends React.Component {
    render() {
        const {
            toggleNavDrawer
        } = this.props;

        return (
            <div>
                <AppBar style={styles.mainAppbar} onLeftIconButtonTouchTap={toggleNavDrawer}
                        iconElementRight={
                            <IconMenu
                                iconButtonElement={
                                    <IconButton><MoreVertIcon /></IconButton>
                                }
                                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                            >
                                <MenuItem primaryText="Refresh" />
                                <MenuItem primaryText="Help" />
                                <MenuItem primaryText="Sign out" />
                            </IconMenu>
                        }
                />
                <NavigationDrawer/>
            </div>
        )
    }
}

export default connect(
    state => ({
    }),
    {
        toggleNavDrawer
    }
)(NavigationComponent)


const styles = {
    mainAppbar:{
        backgroundColor:'#424242'
    }
}