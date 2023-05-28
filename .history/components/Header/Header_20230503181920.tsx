
import HeaderLogo from './HeaderLogo';
import HeaderMenus from './HeaderMenus';
import HeaderSearch from './HeaderSearch';

import style from "./Header.module.css"
import { useGlobalState } from '@/state';

function Header({menus}: any) {
  const [currentUser, setCurrentUser] = useGlobalState("currentUser");
  
  return (
    <header id={style.header}>
      <div className="tcl-container">
        <div className={"tcl-row tcl-no-gutters " + style.header}>
          <HeaderLogo />
          <HeaderSearch />
          <HeaderMenus menus={menus}/>
        </div>
      </div>
    </header>
  );
}

export default Header;
