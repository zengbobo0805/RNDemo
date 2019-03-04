/**
 * Sample React Native App
 * Created by xiangzhihong on 2017/7/15.
 * 美团首页
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import HomePage from './HomePage';
import NearbyPage from './NearbyPage';
import DiscoverPage from './DiscoverPage';
import OrderPage from './OrderPage';
import MinePage from './MinePage';
export default class MainScreen extends Component {

    constructor() {
        super();
        this.state = {
            selectedTab: 'Home',
        }
    }

    onPress(tabName) {
        if (tabName) {
            this.setState({
                    selectedTab: tabName,
                }
            );
        }
    }

    renderTabView(title, tabName, defaultTab, isBadge) {
        var tabNomal;
        var tabPress;
        var tabPage;
        switch (tabName) {
            case 'Home':
                tabNomal = require('../../res/images/icon_tabbar_homepage.png');
                tabPress = require('../../res/images/icon_tabbar_homepage_selected.png');
                tabPage = <HomePage {...this.props}/>;
                break;
            case 'Discover':
                tabNomal = require('../../res/images/icon_tabbar_merchant_normal.png');
                tabPress =require('../../res/images/icon_tabbar_merchant_selected.png');
                tabPage = <DiscoverPage />;
                break;
            case 'Order':
                tabNomal = require('../images/tabbar_order.png');
                tabPress = require('../images/tabbar_order_selected.png');
                tabPage = <OrderPage {...this.props}/>;
                break;
            case 'Mine':
                tabNomal = require('../images/tabbar_mine.png');
                tabPress = require('../images/tabbar_mine_selected.png');
                tabPage = <MinePage {...this.props}/>;
                break;
            default:
        }

        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === tabName}
                title={title}
                titleStyle={styles.tabText}
                selectedTitleStyle={styles.selectedTabText}
                renderIcon={() => <Image style={styles.icon} source={tabNomal}/>}
                renderSelectedIcon={() => <Image style={styles.icon} source={tabPress}/>}
                onPress={() => this.onPress(tabName)}>

                <View style={styles.page}>
                    {tabPage}
                </View>
            </TabNavigator.Item>
        );
    }


    render() {
        return (
            <View style={styles.container}>
                <TabNavigator
                    tabBarStyle={styles.tabStyle}>
                    {this.renderTabView('首页', 'Home', HomePage, false)}
                    {this.renderTabView('逛一逛', 'Discover', DiscoverPage, false)}
                    {this.renderTabView('订单', 'Order', OrderPage, false)}
                    {this.renderTabView('我的', 'Mine', MinePage, false)}
                </TabNavigator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText: {
        fontSize: 10,
        color: 'black'
    },
    selectedTabText: {
        fontSize: 10,
        color: 'green'
    },
    icon: {
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    }
});
