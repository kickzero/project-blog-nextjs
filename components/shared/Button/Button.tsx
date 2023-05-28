import cls from 'classnames';
import IconLoading from '../IconLoading';
// import './button.css';
import styles from "./Button.module.css"

type ButtonType = {
  theme?: string,
  loading?: boolean,
  loadingPos?: string,
  size?: string,
  as?: string,
  htmlType?: 'button' | 'submit' | 'reset' | undefined,
  className?: string,
  children?: any,
  restProps?: Record<string, any>,
  [key: string]: any,
}

function Button( props: ButtonType) {
  const { theme = 'default', loading, loadingPos = 'left', size, as = 'button', htmlType, className, children, ...restProps } = props;
  const classes = cls(
    styles['btn'],
    {
      [styles['btn-default']]: theme === 'default',
      [styles['btn-category']]: theme === 'category',
      [styles['btn-primary']]: theme === 'primary',
      [styles['btn-size-large']]: size === 'large',
    },
    className
  );

  const content = (
    <>
      {loading && loadingPos === 'left' && <IconLoading />}
      {children}
      {loading && loadingPos === 'right' && <IconLoading />}
    </>
  );

  const injectedProps = {
    className: classes,
    type: htmlType,
    ...restProps,
  };

  if (as === 'a') {
    return <a {...injectedProps}>{content}</a>;
  }

  return <button {...injectedProps}>{content}</button>;
}

// Button.defaultProps = {
//   type: 'default',
//   loading: false,
//   loadingPos: 'left',
//   size: '',
//   as: 'button',
//   htmlType: 'button',
// }

export default Button;
