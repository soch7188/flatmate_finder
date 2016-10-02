import React from 'react';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {logoImage} from '../constants/ImageHandler';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import Ranking from 'material-ui/svg-icons/editor/format-list-numbered';
import Restaurant from 'material-ui/svg-icons/maps/restaurant';
import ArrowRight from 'material-ui/svg-icons/navigation/subdirectory-arrow-right';
import Info from 'material-ui/svg-icons/action/info-outline';

import {toggleNavDrawer,clickCanteenListButton} from '../actions/uiActions';

class NavigationDrawer extends React.Component {
    render() {
        const {
            isShowDrawer,isShowCanteenList,
            toggleNavDrawer, clickCanteenListButton
        } = this.props;

        return (
            <Drawer open={isShowDrawer} docked={false} onRequestChange={toggleNavDrawer}>
                <LinkContainer to="/home">
                    <AppBar style={styles.drawerAppbar} title="Guacamoli" iconElementLeft={<img src={logoImage} onTouchTap={toggleNavDrawer} style={styles.logo}/>} />
                </LinkContainer>
                <LinkContainer to="/ranking">
                    <MenuItem primaryText="Ranking" leftIcon={<Ranking/>} onTouchTap={toggleNavDrawer}/>
                </LinkContainer>
                <MenuItem primaryText="Canteens" leftIcon={<Restaurant/>} onTouchTap={clickCanteenListButton} rightIcon={isShowCanteenList? <ExpandLess /> : <ExpandMore/>}/>
                {
                    isShowCanteenList?
                        <Menu>
                            <LinkContainer to="/canteens/lg1">
                                <MenuItem primaryText="LG1 - Maxims" leftIcon={<ArrowRight/>} onTouchTap={toggleNavDrawer} insetChildren={true}/>
                            </LinkContainer>
                            <LinkContainer to="/canteens/apc">
                                <MenuItem primaryText="LG7 - APC" leftIcon={<ArrowRight/>} onTouchTap={toggleNavDrawer} insetChildren={true}/>
                            </LinkContainer>
                            <LinkContainer to="/canteens/grb">
                                <MenuItem primaryText="LG7 - GRB" leftIcon={<ArrowRight/>} onTouchTap={toggleNavDrawer} insetChildren={true}/>
                            </LinkContainer>
                            <LinkContainer to="/canteens/milano">
                                <MenuItem primaryText="LG7 - Milano" leftIcon={<ArrowRight/>} onTouchTap={toggleNavDrawer} insetChildren={true}/>
                            </LinkContainer>
                        </Menu>
                        :null
                }

                <LinkContainer to="/about">
                    <MenuItem primaryText="About Us" leftIcon={<Info/>} onTouchTap={toggleNavDrawer}/>
                </LinkContainer>
            </Drawer>
        )
    }
}

export default connect(
    state => ({
        isShowDrawer: state.uiStates.isShowDrawer,
        isShowCanteenList: state.uiStates.isShowCanteenList
    }),
    {
        toggleNavDrawer,clickCanteenListButton
    }
)(NavigationDrawer)


const styles = {
    logo:{
        display: 'inline-block', height: 40
    },
    drawerAppbar:{
        backgroundColor:'black'
    }
}