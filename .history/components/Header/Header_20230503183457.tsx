
import HeaderLogo from './HeaderLogo';
import HeaderMenus from './HeaderMenus';
import HeaderSearch from './HeaderSearch';

import style from "./Header.module.css"

function Header({menus}: any) {
  
  return (
    <header id={style.header}>
      <div className="tcl-container">
        <div className={"tcl-row tcl-no-gutters" + style.header}>
          <HeaderLogo />
          <HeaderSearch />
          <HeaderMenus menus={menus}/>
        </div>
      </div>
    </header>
  );
}

export default Header;
