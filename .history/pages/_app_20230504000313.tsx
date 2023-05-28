// import "@/assets/css/bootstrap-tcl.css"
// import "@/assets/css/main.css"

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ACCESS_TOKEN } from '@/constants'
import menuService from '@/services/menu'
import userService from '@/services/user'
import type { AppContext, AppProps } from 'next/app'
import Head from 'next/head'
import { getTokenSSRAndCSS, mappingMenuData } from "../helper";
import { useEffect, useMemo } from 'react'
import { useGlobalState } from '@/state'
import Cookies from 'js-cookie'
import App from 'next/app'
import categoryService from '@/services/category'
import { CategoryType, formatUserInfo } from '@/helper/formatApi'

export default function MyApp({ Component, pageProps }: AppProps) {

  const [token, setToken] = useGlobalState("token");
  const [currentUser, setCurrentUser] = useGlobalState("currentUser");
  const [user, setUser] = useGlobalState("user");

  const setMenu = useGlobalState("menus")[1];
  const setCategories = useGlobalState("categories")[1];

  const { user, menus, categoryList } = pageProps;

  useMemo(() => {
    setToken(pageProps.token);
  }, []);

  useEffect(() => {
    setMenu(menus);
    //optimize category
    const optimizedCategories: { [key: string]: CategoryType } = {};
    let i = 0;
    const count = categoryList.length;
    for (i = 0; i < count; i++) {
      const category = categoryList[i];
      optimizedCategories[category.id] = category;
    }
    setCategories(optimizedCategories);
  }, []);

  const tokenFetchMe = Cookies.get('token') as string;

  useEffect(()=>{
    if(tokenFetchMe){
       userService.fetchMe(tokenFetchMe).then(user => {
        if (user.data.id){
          setCurrentUser(user.data);
        } 
        // console.log("user.data", user.data)
      })
    } else if(!tokenFetchMe) {
      console.log("!tokenFetchMe")
      Cookies.remove('token')
      setCurrentUser(null);
    }
    
  }, [tokenFetchMe])

  return (
  <>
    <Head>
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Next Blog</title>
    </Head>
    
    <div className="wrapper-content">
      <Header />
      <Component {...pageProps} />
      <div className="spacing" />
      <Footer/>
    </div>
    
  </>)
}

MyApp.getInitialProps = async (appContext: AppContext ) => {

  const appProps = await App.getInitialProps(appContext);

  const [token, userToken] = getTokenSSRAndCSS(appContext.ctx);
  let userData = {};
  const menuList = [];
  const categoryList = [];
  if (typeof window === "undefined") {
    const userPromise = userService.fetchMe({ token: token });
    const menuPromise = menuService.getAll({});
    const categoryPromise = categoryService.getCategories();
    const [ userResponse, menuResponse, categoryResponse ] = await Promise.all([userPromise, menuPromise, categoryPromise].map((p) => p.catch((e) => e)));
    userData = formatUserInfo(userResponse.data);
    menuList.push(...menuResponse.data.items);
    categoryList.push(...categoryResponse.data.map((e: any) => (e)));
    // const menus = response.data.items.map(mappingMenuData);
  }
  return {
    pageProps: {
        ...appProps.pageProps,
        user: userData,
        token,
        menus: menuList || [],
        categoryList,
      }
  }
}