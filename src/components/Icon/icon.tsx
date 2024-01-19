import { PropsWithChildren, FC } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { STYLE_PREFIX } from '../../utils/const';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'light' | 'dark'

export interface IconProps extends FontAwesomeIconProps {
  theme? : ThemeProps,
  className?: any,
}

const prefixCls = `${STYLE_PREFIX}-icon`


export const Icon: FC<PropsWithChildren<IconProps>> = (props) => {
  const { className, theme, ...restProps } = props
  const classes = classnames(`${prefixCls}`, className, {
    [`icon-${theme}`]: theme
  })
  return (
    <FontAwesomeIcon className={classes} {...restProps} />
  )
}

export default Icon
