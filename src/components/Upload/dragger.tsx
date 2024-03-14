import { FC, useState, DragEvent, PropsWithChildren } from 'react'
import classNames from 'classnames'
import { STYLE_PREFIX } from '../../utils/const';


const prefixCls = `${STYLE_PREFIX}-upload-dragger`

interface DraggerProps {
  onFile: (files: FileList) => void;
}

export const Dragger: FC<PropsWithChildren<DraggerProps>> = (props) => {
  const { onFile, children } = props
  const [ dragOver, setDragOver ] = useState(false)
  const classes = classNames(prefixCls, {
    [`${STYLE_PREFIX}-is-dragover`]: dragOver
  })
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDragOver(false)
    onFile(e.dataTransfer.files)
  }
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault()
    setDragOver(over)
  }
  return (
    <div 
      className={classes}
      onDragOver={e => { handleDrag(e, true)}}
      onDragLeave={e => { handleDrag(e, false)}}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}

export default Dragger;