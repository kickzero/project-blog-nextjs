import { CategoryType, CommentType, MenuType, UserInfoType } from '@/helper/formatApi';
import { createGlobalState } from 'react-hooks-global-state';

export type TypeUser = {
    USERID: string;
    email: string;
    gender: string;
    description: string;
    fullname: string;
    status: string;
    profilepicture: string;
    permission: string;
}

type TypeInitState = {
    user: UserInfoType,
    token?: string;
    menus: MenuType[];
    categories: { [key: string]: CategoryType },
    pagingPost: {
        posts: any,
        currentPage: number,
        totalPage: number,
        totalPost: number
      },
    commentschild: any,
    dataPost: any,
    totalPages: any,
    currentUser: any | null,
    postIdDetail: any,
    commentsPaging: {
      exclude: number[],
      totalComment: number,
      currentPage: number,
      totalPage: number,
      comments: CommentType[],
    },
    replies: {
      [key: string]: {
        currentPage: number,
        totalPage: number,
        totalComment: number,
        comments: CommentType[],
        exclude: number[]
      }
    },
}

const initialState: TypeInitState = {
    user: {
        id: 0,
        email: "",
        firstName: "",
        lastName: "",
        link: "",
        name: "",
        nickname: "",
        slug: "",
        avatarUrls: "",
        description: "",
        simpleLocalAvatar: {
          full: "",
          mediaId: 0
        },
      },
    pagingPost: {
    posts: [],
    currentPage: 0,
    totalPage: 0,
    totalPost: 0
    },
    token: '',
    menus: [],
    categories: {},
    commentschild: [],
    dataPost: [],
    totalPages: [],
    currentUser: [],
    postIdDetail: [],
    commentsPaging: {
      exclude: [],
      totalComment: 0,
      currentPage: 0,
      totalPage: 0,
      comments: [],
    },
    replies: {
      //commentID-> reply
    },
};

const { useGlobalState } = createGlobalState(initialState);

export {
    useGlobalState
}