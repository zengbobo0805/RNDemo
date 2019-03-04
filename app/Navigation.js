/**
 * 路由配置
 */

import React, { Component } from 'react'
import {View, StatusBar, Platform,Text } from 'react-native'
import {Navigator } from 'react-native-deprecated-custom-components'
import PropTypes from 'prop-types';
import SplashView from './navigation/SplashView'
import MainScreen from './main/MainScreen';
export default class Navigation extends Component{

    constructor(props){
      super(props)
    }

    render(){
        return Platform.OS == "ios"?(
          <Navigator
            initialRoute={{component: SplashView}}
            configureScene={() => Navigator.SceneConfigs.FloatFromRight}
            renderScene={(route, navigator) => {
                  return <route.component navigator={navigator} {...route.args}/>
                }
            }/>
        ):(
          <View style={{flex: 1}}>
            <StatusBar
             backgroundColor="#06C1AE"
             barStyle="light-content"/>
            <Navigator
              initialRoute={{component: SplashView}}
              configureScene={() => Navigator.SceneConfigs.PushFromLeft}
              renderScene={(route, navigator) => {
                    return <route.component navigator={navigator} {...route.args}/>
                  }
              }/>
          </View>
        )
    }
}
