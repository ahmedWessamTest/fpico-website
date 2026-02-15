import { ResolveFn } from "@angular/router";
import { IHomeData } from "../../interfaces/IHomeData";
import { HomeDataService } from "../../services/home/home-data.service";
import { inject } from "@angular/core";
import { finalize, timer } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";

export const homeContentResolver: ResolveFn<boolean | IHomeData> = (route, state) => {
  const homeDataService = inject(HomeDataService);
  const ngxSpinnerService = inject(NgxSpinnerService);
  ngxSpinnerService.show();
  return homeDataService.getHomeData().pipe(
    finalize(() => {
      timer(300).subscribe(() => ngxSpinnerService.hide());
    })
  );
};
