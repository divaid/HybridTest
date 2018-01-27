package com.david.hybridtest;

import android.os.Build;
import android.os.Bundle;
import android.support.annotation.RequiresApi;
import android.support.v7.app.AppCompatActivity;
import android.view.ViewGroup;
import android.webkit.ConsoleMessage;
import android.webkit.JsPromptResult;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private WebView mWeb;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mWeb = (WebView) findViewById(R.id.web_view);
        mWeb.setWebChromeClient(new MyWebChromeClient());
        mWeb.setWebViewClient(new WebViewClient(){
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return super.shouldOverrideUrlLoading(view, request);
            }
        });
        mWeb.loadUrl("file:///android_asset/wuziqi/wuziqi.html");
    }
    class MyWebViewClient extends WebViewClient{
        @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
            if ("自定义协议".endsWith(request.getUrl().getHost())){
//              1.  自定义协议，从h5 到native，不过不能返回东西到h5
                return true;
            }
            return super.shouldOverrideUrlLoading(view, request);
        }
    }
    class MyWebChromeClient extends WebChromeClient {
        //对应js中的alert()方法,可以重写该方法完成与js的交互
        @Override
        public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
            return super.onJsAlert(view, url, message, result);
        }
        //对应js中的console.log方法,可以重写该方法完成与js的交互
        @Override
        public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
            return super.onConsoleMessage(consoleMessage);
        }
        @Override
        public boolean onJsPrompt(WebView view, String url, String message, String defaultValue, JsPromptResult result) {
            Toast.makeText(MainActivity.this, message, Toast.LENGTH_SHORT).show();
            //2. h5调用onpromp（）调用native （一般常用onJsPrompt）
            //这里传进来的参数就是从js的window.prompt(uri, value)传过来的参数
            return super.onJsPrompt(view, url, message, defaultValue, result);
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (mWeb != null) {
            ((ViewGroup) mWeb.getParent()).removeView(mWeb);
            mWeb.removeAllViews();
            mWeb.destroy();
            mWeb =null;
        }
    }

    @Override
    public void onBackPressed() {
        checkGoBack();
    }

    private void checkGoBack() {
        if (mWeb != null && mWeb.canGoBack()) {
            mWeb.goBack();
        } else {
            finish();
        }
    }
}
