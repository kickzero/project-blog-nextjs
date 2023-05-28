export interface MenuType {
  id: string,
  child: MenuType[],
  title: string,
  url: string,
}
export interface UserInfoType {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  link: string,
  name: string,
  nickname: string,
  slug: string,
  avatarUrls: string,
  description: string,
  simpleLocalAvatar: {
    full: string,
    mediaId: number
  },
}
export interface PostType {
  id: string,
  authorId: string,
  author: {
    nickname: string,
    desc: string,
    avatar: string,
  },
  categories: string[],
  commentCount: string,
  commentStatus: string,
  content: string,
  date: string,
  excerpt: string,
  mediaURL: string,
  link: string,
  slug: string,
  tags: string,
  title: string,
  viewCount: number
}
export interface PostDetailType {
  id: number,
  date: string,
  slug: string,
  status: string,
  type: string,
  link: string,
  title: string,
  content: string,
  excerpt: string,
  author: number,
  featuredMedia: number,
  commentStatus: string,
  categories: number[],
  tags: number[],
  lang: string,
  featuredMediaUrl: string,
  authorInfo: {
    nickname: string,
    description: string,
    avatar: string
  },
  viewCount: number,
  commentCount: number,
}
export interface CommentType {
  id: number,
  author: number,
  authorInfo: {
    nickname: string,
    desc: string,
    avatar: string,
  },
  authorAvatarUrls: string,
  commentReplyCount: number,
  content: string,
  date: string,
  status: string,
  parent: number,
}
export interface CategoryType {
  id: string,
  description: string,
  lang: string,
  link: string,
  name: string,
  count: number,
  parent: string,
  slug: string,
}
export const formatMenu = (list: []) => {
  const parseStructMenu = (menu: any) => {
    const childItemsData = menu?.child_items || [];
    const child = childItemsData.map(parseStructMenu);
    return {
      id: menu.ID,
      child,
      title: menu.title,
      url: menu.url,
    } as MenuType;
  };
  return list.map(parseStructMenu);
};
export const formatUserInfo = (user: any) => {
  return {
    id: user?.id,
    email: user?.email,
    firstName: user?.first_name,
    lastName: user?.last_name,
    link: user?.link,
    name: user?.name,
    nickname: user?.nickname,
    slug: user?.slug,
    avatarUrls: user?.avatar_urls[96],
    description: user?.description,
    simpleLocalAvatar: {
      full: user?.simple_local_avatar?.full,
      mediaId: user?.simple_local_avatar?.media_id
    },
  } as UserInfoType
}
export const formatPost = (post: any) => {
  return {
    id: post.id,
    authorId: post.author,
    author: {
      nickname: post.author_data?.nickname,
      desc: post.author_data?.description,
      avatar: post.author_data?.avatar
    },
    categories: post.categories,
    commentCount: post.comment_count,
    commentStatus: post.comment_status,
    content: post.content?.rendered,
    date: post.date,
    excerpt: post.excerpt?.rendered,
    mediaURL: post.featured_media_url,
    link: post.link,
    slug: post.slug,
    tags: post.tags,
    title: post.title?.rendered,
    viewCount: post.view_count
  } as PostType
}
export const formatPostDetail = (postDetail: any) => {
  const { id, date, slug, status, type, link, title, content, excerpt, author, author_data, featured_media, comment_status, categories, tags, lang, view_count, comment_count, featured_media_url } = postDetail;
  return {
    id,
    date,
    slug,
    status,
    type,
    link,
    title: title.rendered,
    content: content.rendered,
    excerpt: excerpt.rendered,
    author,
    authorInfo: {
      nickname: author_data.nickname,
      description: author_data.description,
      avatar: author_data.avatar
    },
    featuredMedia: featured_media,
    commentStatus: comment_status,
    categories,
    tags,
    lang,
    featuredMediaUrl: featured_media_url,
    viewCount: view_count,
    commentCount: comment_count,
  } as PostDetailType
}
export const formatCategory = (category: any) => {
  return {
    id: category.id,
    description: category.description,
    lang: category.lang,
    link: category.link,
    name: category.name,
    count: category.count,
    parent: category.parent,
    slug: category.slug,
  } as CategoryType
}
export const formatComment = (comment: any) => {
  const { id, author, author_avatar_urls, author_data, comment_reply_count, content, date, status, parent } = comment;
  return {
    id,
    author,
    authorInfo: author_data,
    authorAvatarUrls: author_avatar_urls,
    commentReplyCount: comment_reply_count,
    content: content.rendered,
    date,
    status,
    parent,
  } as CommentType
}