//package com.mcsandroid;
//
//import android.view.View;
//
//import com.facebook.react.uimanager.SimpleViewManager;
//import com.facebook.react.uimanager.ThemedReactContext;
//import com.facebook.react.uimanager.ReactProp;
//import com.facebook.react.uimanager.UIProp;
//import android.content.Context;
//import android.graphics.Canvas;
//import android.graphics.drawable.GradientDrawable;
//import android.graphics.drawable.GradientDrawable.Orientation;
//import java.io.InputStream;
//
//import android.graphics.drawable.Drawable;
//import android.util.Log;
///**
// * Created by xyuan1 on 5/25/16.
// */
//
//public class MCSFairValueCapsuleManager extends SimpleViewManager<View> {
//
//    private GradientDrawable mDrawable;
//    private ThemedReactContext ctx;
//
//    public static final String REACT_CLASS = "MCSFairValueCapsuleView";
//
//    @UIProp(UIProp.Type.STRING)
//    public static final String PROP_SRC = "src";
//    @UIProp(UIProp.Type.NUMBER)
//    public static final String PROP_BORDER_RADIUS = "borderRadius";
//    @UIProp(UIProp.Type.STRING)
//    public static final String PROP_RESIZE_MODE = ViewProps.RESIZE_MODE;
//
//    @Override
//    public String getName()
//    {
//        return REACT_CLASS;
//    }
//
//    @ReactProp(name = "fair")
//    public void setFair(View view,  String fair) {
//        try {
//            InputStream ims = ctx.getAssets().open("images/" );
//            Drawable d = Drawable.createFromStream(ims, null);
//            view.setImageDrawable(d);
//        } catch (Exception ex) {
//            Log.e("KenBurnsView", "setSource", ex);
//        }
////    public void setFairValue(VideoView view, @Nullable String streamUrl) {
////        if (!LibsChecker.checkVitamioLibs(mActivity))
////            return;
////
////        view.setVideoPath(streamUrl);
////        view.setMediaController(new MediaController(mContext));
////        view.requestFocus();
//    }
//
//    @Override
//    public View createViewInstance(ThemedReactContext context)
//    {
//        ctx = context;
//        View newView= new View(context);
//        return newView;
//    }
//
////    @Override
////    protected void onDraw(Canvas canvas) {
////        super.onDraw(canvas);
////        mDrawable.setBounds(0, 0, getWidth(), getHeight());
////        mDrawable.setColors(new int[]{mStartColor, mEndColor});
////        mDrawable.draw(canvas);
////    }
//
//}
//
