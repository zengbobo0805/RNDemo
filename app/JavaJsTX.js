/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    ToastAndroid,
    DeviceEventEmitter,
    Text,
    TouchableOpacity,
    View,
    NativeModules, Dimensions
} from 'react-native';
import NavigationBar from "./component/NavigationBar";
import ViewUtils from "./util/ViewUtils";

const {width} = Dimensions.get('window');
export default class JavaJsTX extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            text: "river",
            text2: "默认",
            text3: "默认",
        }

    }

    componentDidMount(): void {
        //观察者对象     监听java  调用js
        DeviceEventEmitter.addListener("EventName", (params) => {
            let rest = NativeModules.ToastForAndroid.MESSAGE;
            this.setState({
                text3: (rest + params.key)
            });
            ToastAndroid.show("DeviceEventEmitter收到消息:" + "\n" + rest, ToastAndroid.SHORT)
        })

    }

    _onPressButton() {
        NativeModules.ToastForAndroid.show(1000);
    }

    _onPressButton2() {
        NativeModules.ToastForAndroid.testAndroidCallBack("hello David", (result) => {
            this.setState({
                text: result
            })
        });
    }

    _onPressButton3() {
        NativeModules.ToastForAndroid.textAndroidPromiseMethod("hello David").then((result) => {
            this.setState({
                text2: result
            })
        })
    }

    _onPressButton4() {
        NativeModules.ToastForAndroid.onScaning();
    }


    onBackPress() {
        this.props.navigator.pop();
    }


    render() {
        return (
            <View style={styles.flexStyle}>
                <NavigationBar
                    title='JAVA JS 通信'
                    titleColor={'white'}
                    leftButton={ViewUtils.getLeftBlackButton(() => this.onBackPress())}/>

                <View style={styles.container}>

                    <TouchableOpacity onPress={this._onPressButton.bind(this)}>
                        <Text style={styles.hello}>点击了</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this._onPressButton2.bind(this)}>
                        <Text style={styles.hello}>{this.state.text}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this._onPressButton3.bind(this)}>
                        <Text style={styles.hello}>{this.state.text2}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this._onPressButton4.bind(this)}>
                        <Text style={styles.hello}>{this.state.text3}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flexStyle: {
        flex: 1,
        width: width,
        flexDirection: 'column',
    },
    hello: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
