import { CSSProperties, FC, PropsWithChildren, ReactNode, MouseEvent } from 'react';
import classnames from 'classnames'
import { STYLE_PREFIX } from "../../utils/const";
import { useMergedState } from "../../utils/hooks";

export const prefixCls = `${STYLE_PREFIX}-switcher`

export interface SwitcherProps {
    className?: string;
    style?: CSSProperties;
    defaultValue?: boolean;
    checkedChildren?: ReactNode;
    unCheckedChildren?: ReactNode;
    value?: boolean;
    size?: 'lg' | 'md' |'sm';
    disabled?: boolean;
    onChange?: (value: boolean, prevValue: boolean) => void;
    onClick?: (checked: boolean, event: MouseEvent) => void;
}

export const Switcher: FC<PropsWithChildren<SwitcherProps>> = (props) => {
    const { className, style, defaultValue, value, size, disabled, checkedChildren, unCheckedChildren, onChange, onClick, ...restProps } = props

    const [checked, setChecked] = useMergedState(false, {
      defaultValue,
      value,
      onChange
    })

    const classes = classnames(prefixCls, className, {
      [`${prefixCls}-size-${size}`]: size!=='md',
      [`${prefixCls}-checked`]: checked,
      [`${STYLE_PREFIX}-disabled`]: disabled,
    })

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      if (disabled){
        return
      }
      setChecked(val=>!val)
      onClick?.(checked, e)
    }

    return (
    <button type='button' className={classes} style={style} {...restProps} disabled={disabled} onClick={(e)=>handleClick(e)}>
      <div className={`${prefixCls}-handle`}>
      </div>
      <span className={`${prefixCls}-inner`}>
            <span className={`${prefixCls}-inner-checked`}>
              {checkedChildren}
            </span>
            <span className={`${prefixCls}-inner-unchecked`}>
              {unCheckedChildren}
            </span>
          </span>
    </button>
    )
}

Switcher.defaultProps = {
  disabled: false,
  size: 'md'
}

export default Switcher;