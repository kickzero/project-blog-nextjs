import cls from 'classnames';
import Button from '../Button/Button';
// import './main-title.css';
import styles from "./MainTitle.module.css"

type MainTitlePype = {
  children?: any,
  btnLabel?: string,
  type?: string,
  btnProps?: Record<string, any>
}

function MainTitle({ children, btnLabel, type = '', btnProps = {} }: MainTitlePype) {
  const classes = cls(`${styles['main-title']} spacing`, {
    [styles['main-title__search']]: type === 'search',
    'd-flex tcl-jc-between tcl-ais-center': btnLabel,
  });

  return (
    <div className={classes}>
      <h2>{children}</h2>
      {btnLabel && <Button {...btnProps}>{btnLabel}</Button>}
    </div>
  );
}

MainTitle.defaultProps = {
  children: '',
  btnLabel: '',
  type: '',
  btnProps: {}
}

export default MainTitle;
