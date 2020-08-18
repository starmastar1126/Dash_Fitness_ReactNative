package com.fitnessfer;

import android.os.Bundle;
import android.os.PersistableBundle;
import android.view.WindowManager;

import com.facebook.react.ReactActivity;

import androidx.annotation.Nullable;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "dash";
  }

  @Override
  public void onCreate(@Nullable Bundle savedInstanceState, @Nullable PersistableBundle persistentState) {
    super.onCreate(savedInstanceState, persistentState);
    getWindow().setSoftInputMode(
            WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN
    );
  }
}
