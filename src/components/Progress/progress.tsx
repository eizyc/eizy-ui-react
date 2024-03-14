import { CSSProperties, FC, PropsWithChildren, useMemo } from 'react'
import Icon from '../Icon/icon'
import { STYLE_PREFIX } from '../../utils/const';
import classnames from 'classnames';

const prefixCls = `${STYLE_PREFIX}-progress`

const format = (num:string|number):string => Number.isNaN(num)?`${num}`:`${num}px`

type Types = 'line'
type Sizes = number | string | [number | string, number | string]
type Statuses = 'active'| 'success' | 'error' | 'normal'


export interface ProgressProps {
  className?: string;
  percent: number;
  styles?: CSSProperties;
  type?: Types;
  size?: Sizes;
  showInfo?: boolean;
  status?: Statuses;
}

export const Progress: FC<PropsWithChildren<ProgressProps>> = (props) => {
  const {
    percent,
    styles,
    showInfo,
    size,
    status
  } = props

  const _status = useMemo(()=>{
    return percent === 100 ? 'success': status
  }, [percent, status])

  const classes = classnames(prefixCls,`${prefixCls}-status-${_status}`)

  const innerClasses = classnames(`${prefixCls}-inner`)

  const outerClasses = classnames(`${prefixCls}-outer`,{
    [`${prefixCls}-show-info`]: showInfo
  })

  const strokeWidth = useMemo<string>(()=>{
    return Array.isArray(size)?format(size[0]):`100%`
  }, [size])

  const strokeHeight = useMemo<string>(()=>{
    if (size === undefined) {
      return `8px`
    }
    return format(Array.isArray(size)?size[1]:size)
  }, [size])

  const renderInfo = () => {
    switch (_status) {
      case 'success':
        return <Icon icon='circle-check'/>
      case 'error':
        return <Icon icon='circle-xmark'/>
      default:
        return `${percent}%`
    }
  }


  return (
    <div className={classes} style={{...styles, width: strokeWidth}}>
      <div className={outerClasses} style={{ height: strokeHeight }}>
        <div 
          className={innerClasses}
          style={{width: `${percent}%`}}
        >
        </div>
      </div>
      {showInfo && <span className={`${prefixCls}-info`}>
        {renderInfo()}
        </span>
      }
    </div>
  )
}

Progress.defaultProps = {
  status: 'normal',
  showInfo: true,
  type: "line"
}
export default Progress;
