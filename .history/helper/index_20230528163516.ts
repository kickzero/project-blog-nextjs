import { NextPageContext } from "next";
import Cookies from 'js-cookie';
var cookie = require('cookie');

type UserToken = {
  id: string;
  email: string;
}

export function mappingPostData(post: any) {
  return {
    id: post.id,
    title: post.title.rendered,
    slug: post.slug,
    contentHTML: post.content.rendered,
    thumb: post.featured_media_url,
    pubDate: post.date,
    authorName: post.author_data.nickname,
    authorAvatar: post.author_data.avatar,
    desc: post.excerpt.rendered,
    categoriesId: post.categories,
    viewCount: post.view_count,
    commentCount: post.comment_count
  }
}

export function mappingMenuData(item: any) {
  const childItemsData = item?.child_items || [];
  const childItems = childItemsData.map(mappingMenuData);

  return {
    id: item.ID,
    name: item.title,
    link: item.url,
    childItems,
  };
}

export function mappingCommentData(item: any) {
  return {
    id: item.id,
    date: item.date,
    contentHTML: item.content.rendered,
    replyCount: item.comment_reply_count,
    parent: item.parent,
    authorName: item.author_data.nickname,
    authorAvatar: item.author_data.avatar,
  };
}

export const parseJwt = (token: string) => {
  try {
      let base64Url = token.split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
  } catch(e) {
      return null;
  }
}

export const getTokenSSRAndCSS = (ctx?: NextPageContext): [string, UserToken | null] => {
  let token = '';
  let userToken = null;
  if(typeof window === "undefined") {
      // SSR
      const cookieStr = ctx?.req?.headers?.cookie || '';
      token = cookie.parse(cookieStr).token;
      userToken = parseJwt(token);
  } else {
      // CSR
      token = Cookies.get('token') || '';
  }

  return [token, userToken];
}

export const validateEmail = (email :string): boolean => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const handleError = (key: string, value: string, password?: string): string => {
  let error = '';
  if(value.trim().length === 0) {
      return "Trường này là bắt buộc.";
  }
  switch (key) {
      case "email":
          if(!validateEmail(value)) error = 'Email không hợp lệ';
          else error = '';
          break;
      case "password":
          if(value.length < 6) error = 'Mật khẩu quá ngắn';
          else error = '';
          break;
      case "repassword":
          if(value !== password) error = "Mật khẩu nhập lại không khớp";
          else error = '';
          break;
  }

  return error;
}

//day js
export const getTimeSince = (date: string ) => {
  let seconds: number = Math.floor((Date.now() - Date.parse(new Date(date))) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " năm trước";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " tháng trước";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " ngày trước";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " giờ trước";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " phút trước";
  }
  return Math.floor(seconds) + " giây trước";

}