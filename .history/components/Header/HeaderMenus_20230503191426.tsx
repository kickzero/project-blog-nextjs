
import Link from "next/link";
import style from "./Header.module.css"
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useGlobalState } from "@/state";
import Image from "next/image";
import { MenuType } from "@/helper/formatApi";

export default function HeaderMenus() {
  const router = useRouter();
  // const [ DataPost , setDataPost] = useGlobalState("dataPost");
  // const [menuss] = useGlobalState("menus");
  // console.log("menuss", menuss)
  const [currentUser, setCurrentUser] = useGlobalState("currentUser");
  const [, setToken] = useGlobalState("token");
  const [menus] = useGlobalState("menus");
  function handleLogout() {
    const check = window.confirm('Ban co thuc su muon logout hay khong?');
    if(check) {
        Cookies.remove("token");
        setToken('');
        setCurrentUser(null);
        router.push('/login');
    }
  }

  console.log("menus", menus)

  function renderMenu(list: MenuType[]) {
    return (
      <ul className={styles["header-nav__lists"]}>
        {list.map((e) => {
          return (
            <li key={e.id}>
              <Link href={e.url}>{e.title}</Link>
              {e.child.length > 0 && renderMultipleMenu(e.child)}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="tcl-col-6">
      {/* Nav */}
      <div className={style["header-nav"]}>
        <ul className={style["header-nav__lists"]}>
          {renderMenu(menus)}
        </ul>
        <ul className={style["header-nav__lists"]}>
          {!currentUser && <li className={style["user"]}>
            <Link href="/login">
              {/* <Image src={''} alt={""} 
                width={500}
                height={500}/> */}
              <i className="icons ion-person" /> Tài khoản
            </Link>
          </li>}
          {currentUser && <li className={style["user"]}>
            <Link href="/login" >
              <i className="icons ion-person" /> {currentUser.name}
            </Link>
            <ul>
              <li>
                <Link href="/profile">
                  Update Profile
                </Link>
              </li>
              <li>
                <Link href="/changePassword">
                  Change password
                </Link>
              </li>
              <li>
                <a href="/login" onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </li>}
        </ul>
      </div>
    </div>
  );
}


