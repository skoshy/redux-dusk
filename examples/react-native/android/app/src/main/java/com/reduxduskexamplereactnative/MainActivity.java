package com.reduxduskexamplereactnative;

import android.os.Bundle;
import com.facebook.react.ReactFragmentActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

// we extend ReactFragmentActivity instead of ReactActivity due to react-native-screens. See here: https://github.com/kmagiera/react-native-screens
public class MainActivity extends ReactFragmentActivity {

    // added for react-native screens
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(null);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ReduxDuskExampleReactNative";
    }

    // from react-navigation v3 - https://github.com/react-navigation/react-navigation/issues/5370 and 
    // https://reactnavigation.org/docs/en/getting-started.html
    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }
}
