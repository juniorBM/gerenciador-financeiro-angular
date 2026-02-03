import {makeEnvironmentProviders} from '@angular/core';
import {provideAuth} from './auth/provide-auth';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {setAuthTokenInterceptor} from './auth/interceptors/set-auth-token-interceptor';
import {provideEnvironmentNgxMask} from 'ngx-mask';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig} from '@angular/material/snack-bar';

export function provideCore() {
  return makeEnvironmentProviders(
    [
      provideAuth(),
      provideHttpClient(withInterceptors([setAuthTokenInterceptor])),
      provideEnvironmentNgxMask({
        thousandSeparator: ".",
        decimalMarker: ",",
      }),
      {
        provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        } as MatSnackBarConfig,
      },
    ]
  );
}
