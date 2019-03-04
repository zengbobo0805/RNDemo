package com.mymeituan;

import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

public class ToastExampleMoudle extends ReactContextBaseJavaModule {
    private static final String MESSAGE = "MESSAGE";

    public ToastExampleMoudle(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        //让js那边能够使用这些常量
        Map<String, Object> constants = new HashMap<>();
        constants.put(MESSAGE, "动脑 常量");
        return constants;
    }

    @ReactMethod
    public void show(int duration) {
        Toast.makeText(getReactApplicationContext(), "dongnao:" + duration, Toast.LENGTH_SHORT).show();
    }

    @ReactMethod
    public void testAndroidCallBack(String msg, Callback callback) {
        Toast.makeText(getReactApplicationContext(), msg, Toast.LENGTH_LONG).show();
        callback.invoke("david callback");
    }

    @ReactMethod
    public void textAndroidPromiseMethod(String msg, Promise promise) {
        Toast.makeText(getReactApplicationContext(), msg, Toast.LENGTH_SHORT).show();
        promise.resolve("david Promise resolve");
//        promise.reject("david Promise reject");
    }

    @ReactMethod
    public void onScaning() {
        WritableMap params = Arguments.createMap();
        params.putString("key", "mydata");
        getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("EventName", params);
    }

    @Override
    public String getName() {
        return "ToastForAndroid";
    }

    @Override
    public boolean canOverrideExistingModule() {
        return true;
    }
}
