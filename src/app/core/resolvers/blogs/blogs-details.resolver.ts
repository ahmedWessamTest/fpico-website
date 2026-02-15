import { inject } from "@angular/core";
import { ResolveFn, Router } from "@angular/router";
import { BlogsService } from "../../services/blogs/blogs.service";
import { IGetBlogById } from "../../interfaces/IGetBlogById";
import { NgxSpinnerService } from "ngx-spinner";
import { catchError, EMPTY, finalize, timer } from "rxjs";

export const blogsDetailsResolver: ResolveFn<boolean | IGetBlogById> = (route, state) => {
  const blogsService = inject(BlogsService);
  const ngxSpinnerService = inject(NgxSpinnerService);
  const _Router = inject(Router);
  ngxSpinnerService.show();

  return blogsService.getBlogById(route.paramMap.get("id")!).pipe(
    finalize(() => {
      timer(300).subscribe(() => ngxSpinnerService.hide());
    }),
    catchError(()=>{
      _Router.navigate(['/ar']);
      return EMPTY
    })
  );
};
