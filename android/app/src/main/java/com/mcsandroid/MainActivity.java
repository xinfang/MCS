package com.mcsandroid;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.burnweb.rnsimplealertdialog.RNSimpleAlertDialogPackage;
import com.smixx.reactnativeicons.ReactNativeIcons;  // <--- import
import java.util.Arrays; // <--- import this if you want to specify which fonts to load
import com.smixx.reactnativeicons.IconFont; // <--- import this if you want to specify which fonts to load


import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "MCSAndroid";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new ReactNativeIcons(),
            new RNSimpleAlertDialogPackage()
        );
    }
}
