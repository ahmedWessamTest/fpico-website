import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { catchError, delay, retryWhen, scan, throwError } from "rxjs";

export const retryInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService); // Injecting ToastrService

  return next(req).pipe(
    retryWhen((errors) =>
      errors.pipe(
        scan((retryCount, error) => {
          if (retryCount >= 3 || error.status !== 0) {
            toastr.error("Internet connection error. Please check your network.", "Error"); // Show error message
            throw error; // Stop retrying
          }
          console.warn(`Retrying API call... Attempt #${retryCount + 1}`);
          return retryCount + 1;
        }, 0),
        delay(2000) // Wait 2 seconds before retrying
      )
    ),
    catchError((error) => {
      console.error("API call failed:", error);
      return throwError(() => error);
    })
  );
};
