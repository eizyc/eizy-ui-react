import { FC, MouseEvent, PropsWithChildren, ReactNode, useCallback, useContext, useMemo } from 'react';
import classnames from 'classnames'
import { SelectContext } from './select'
import { STYLE_PREFIX } from "../../utils/const";
import Icon from '../Icon/icon';

const prefixCls = `${STYLE_PREFIX}-select-option`

export type RawValueType = string | number;
export interface BaseOptionProps {
  label?: ReactNode;
  value: RawValueType;
  name?: string;
}

export interface OptionProps extends BaseOptionProps{
    className?: string;
    disabled?: boolean;
}

export const Option: FC<PropsWithChildren<OptionProps>> = (props) => {
    const { className, children, label, value, disabled, ...restProps } = props
    const { onSelect, selectedValues, multiple } = useContext(SelectContext)
    const selected = useMemo(()=>selectedValues.has(value), [selectedValues, value])

    const classes = classnames(prefixCls, className, {
      [`${STYLE_PREFIX}-selected`]: selected
    })

    const handleClick = useCallback((e: MouseEvent) => {
      e.preventDefault()
      if (disabled){
        return
      }
      onSelect?.(value, !selected)
    }, [disabled, onSelect, selected, value])

    return <li className={classes} onClick={handleClick}>
      <span className={`${prefixCls}-content`}>{children??label??value}</span>
      {multiple && selected && <Icon icon="check" className={`${prefixCls}-icon`}/>}
    </li>
}

Option.defaultProps = {
  disabled: false
}

export default Option;