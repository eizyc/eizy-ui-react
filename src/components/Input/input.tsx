import { PropsWithChildren, InputHTMLAttributes, ReactElement, ChangeEvent, forwardRef } from 'react';
import classnames from 'classnames'
import { STYLE_PREFIX } from "../../utils/const";

export const prefixCls = `${STYLE_PREFIX}-input`

type InputSize = 'lg' | 'md' |'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'|'prefix'|'suffix' > {
    className?: string;
    disabled?: boolean;
    block?: boolean;
    size?: InputSize;
    prefix?: string | ReactElement;
    suffix?: string | ReactElement;
    prepend?: string | ReactElement;
    append?: string | ReactElement;
    onChange? : (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, PropsWithChildren<InputProps>>((props, ref) => {
    const { className, disabled, block, size, prefix, suffix, prepend, append, ...restProps } = props

    const classes = classnames(prefixCls, className, {
      [`${prefixCls}-size-${size}`]: size,
      [`${STYLE_PREFIX}-disabled`]: disabled,
      [`${prefixCls}-block`]: block,
      [`${prefixCls}-group`]: prepend||append,
      [`${prefixCls}-group-append`]: !!append,
      [`${prefixCls}-group-prepend`]: !!prepend,
    })
    return(
    <div className={classes}>
      {prepend && <div className={`${prefixCls}-prepend`}>{prepend}</div>}
      <div className={`${prefixCls}-affix-wrapper`}>
        {prefix && <div className={`${prefixCls}-prefix`}>{prefix}</div>}
        <input type="text" 
          ref={ref}
          className={`${prefixCls}-inner`}
          disabled={disabled}
          {...restProps}
        />
        {suffix && <div className={`${prefixCls}-suffix`}>{suffix}</div>}
      </div>
      {append && <div className={`${prefixCls}-append`}>{append}</div>}
    </div>
    )
})

Input.defaultProps = {
  disabled: false,
  size: 'md'
}

export default Input;