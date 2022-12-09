package org.speedcuber.timer;
import android.content.Context;
import android.location.LocationManager;
import android.util.Log;

import androidx.core.location.LocationManagerCompat;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class LocationStatus extends ReactContextBaseJavaModule {
    LocationStatus(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "LocationStatus";
    }

    @ReactMethod
    public void isLocationEnabled(Promise promise) {
        promise.resolve(isLocationEnabled(getReactApplicationContext()));
    }

    private boolean isLocationEnabled(Context context) {
        // Copied from https://stackoverflow.com/a/58109400/14765128
        LocationManager locationManager = (LocationManager) context.getSystemService(Context.LOCATION_SERVICE);
        return LocationManagerCompat.isLocationEnabled(locationManager);
    }
}
