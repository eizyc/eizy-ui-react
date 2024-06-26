import { FC, ButtonHTMLAttributes, AnchorHTMLAttributes, PropsWithChildren, forwardRef } from 'react';
import classnames from 'classnames'
import { STYLE_PREFIX } from "../../utils/const";
import { Status } from '../../type';

const prefixCls = `${STYLE_PREFIX}-btn`

type ButtonSize = 'lg'|'md'|'sm'
type ButtonType = 'primary'|'secondary'|'tertiary'|'link'| Status

export interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    /** The Size of Button */
    size?: ButtonSize,
    buttonType?: ButtonType;
    ghost?: boolean;
    href?: string;
}

// button marker
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
// a marker
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps =Partial<NativeButtonProps & AnchorButtonProps>

export const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>((props, ref) => {
    const {buttonType, className, disabled, size, ghost, children, href, ...restProps} = props
    // button btn-lg btn-primary
    const classes = classnames(prefixCls, className, {
        [`${prefixCls}-${buttonType}`]: buttonType,
        [`${prefixCls}-${size}`]: size !== 'md',
        [`${prefixCls}-link-disabled`]: (buttonType === 'link') && disabled,
    })
    if( buttonType === 'link' ) {
        return (
          <span className={classes}>
              <a {...restProps}  href={href}>{children}</a>
          </span>
        );
    } else {
        return (
            <button ref={ref} {...restProps} className={classes} disabled={disabled}>{children}</button>
        )
    }
})

Button.defaultProps = {
    disabled: false,
    buttonType: 'default',
    size: 'md',
    ghost: false
}

export default Button;