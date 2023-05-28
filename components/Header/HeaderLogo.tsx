

import Link from "next/link";
import style from "./Header.module.css"

function HeaderLogo() {
  return (
    <div className="tcl-col-2">
      {/* Logo */}
      <div className={style["header-logo"]}>
        <Link href="/">
          <img src="/assets/images/logo.png" alt="Go to homepage" />
        </Link>
      </div>
    </div>
  );
}

export default HeaderLogo;
