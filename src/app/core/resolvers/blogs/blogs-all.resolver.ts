import { ResolveFn } from '@angular/router';

export const blogsAllResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
