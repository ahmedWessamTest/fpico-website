import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { WEB_SITE_BASE_URL } from "../../constants/WEB_SITE_BASE_URL";
import { IAllBlogs } from "../../interfaces/IAllBlogs";
import { IGetBlogById } from "../../interfaces/IGetBlogById";

@Injectable({
  providedIn: "root",
})
export class BlogsService {
  http = inject(HttpClient);

  getAllBlogs(pageNum: number = 1) {
    return this.http.get<IAllBlogs>(`${WEB_SITE_BASE_URL}getBlogs?page=${pageNum}`);
  }

  getBlogById(blogId: string) {
    return this.http.get<IGetBlogById>(`${WEB_SITE_BASE_URL}getSingleBlogs/${blogId}`);
  }
}
