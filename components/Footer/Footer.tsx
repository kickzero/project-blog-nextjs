// import './footer.css';
import style from "./Footer.module.css"

function Footer() {
  return (
    <footer id="footer" className="bg-white">
      <div className="tcl-container">
        <div className={style.footer}>
          <div className="tcl-row">
            {/* Footer Column */}
            <div className="tcl-col-12 tcl-col-sm-6 tcl-col-md-4 tcl-col-lg-3">
              <div className={style["footer-logo"]}>
                <img src="/assets/images/logo.png" alt="NuxtBlog Logo" />
              </div>
              <p>© 2020, All Rights Reserved.</p>
              <p>
                Created by{' '}
                <a href="/" target="_blank" rel="noreferrer">
                  ZENDVN
                </a>
              </p>
            </div>
            {/* Footer Column */}
            <div className="tcl-col-12 tcl-col-sm-6 tcl-col-md-4 tcl-col-lg-2">
              <div className={style["footer-title"]}>
                <p>Categories</p>
              </div>
              <ul className={style["footer-content__list"]}>
                <li>
                  <a href="/">ReactJs</a>
                </li>
                <li>
                  <a href="/">Javascript</a>
                </li>
                <li>
                  <a href="/">Angular</a>
                </li>
                <li>
                  <a href="/">HTML, HTML5</a>
                </li>
              </ul>
            </div>
            {/* Footer Column */}
            <div className="tcl-col-12 tcl-col-sm-6 tcl-col-md-4 tcl-col-lg-3">
              <div className={style["footer-title"]}>
                <p>Liên hệ</p>
              </div>
              <ul className={style["footer-content__list"]}>
                <li>Số 01, Khối A1, Toà nhà Đạt Gia, 43 Đường Cây Keo, Tam Phú, Thủ Đức, Hồ Chí Minh</li>
                <li> 0383 308 983</li>
              </ul>
            </div>
            {/* Footer Column */}
            <div className="tcl-col-12 tcl-col-sm-6 tcl-col-md-4 tcl-col-lg-4">
              <div className={style["footer-title"]}>
                <p>Fanpage</p>
              </div>
              <div className={style["footer-facebook"]}>
                <div
                  className="fb-page"
                  data-href="/"
                  data-tabs
                  data-width
                  data-height
                  data-small-header="false"
                  data-adapt-container-width="true"
                  data-hide-cover="false"
                  data-show-facepile="true"
                >
                  <blockquote cite="/" className="fb-xfbml-parse-ignore">
                    <a href="/">Học Lập Trình Web Thông Qua Projects Thực Tế</a>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
