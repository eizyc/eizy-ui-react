import { FC } from 'react'
import { UploadFile } from './upload'
import Icon from '../Icon/icon'
import Progress from '../Progress/progress'
import { STYLE_PREFIX } from '../../utils/const';
interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (_file: UploadFile) => void;
}

const prefixCls = `${STYLE_PREFIX}-upload-list`
export const UploadList: FC<UploadListProps> = (props) => {
  const {
    fileList,
    onRemove,
  } = props
  return (
    <ul className={prefixCls}>
      {fileList.map(item => {
        return (
          <li className={`${prefixCls}-item ${prefixCls}-item-status-${item.status}`} key={item.uid}>
            <span className={`${prefixCls}-item-name`}>
              <Icon icon="paperclip" theme="secondary" />
              {item.name}
            </span>
            <span className={`${prefixCls}-item-icon`}>
              {(item.status === 'uploading' || item.status === 'ready') && <Icon icon="spinner" spin theme="primary" />}
              {item.status === 'success' && <Icon icon="check-circle" />}
              {item.status === 'error' && <Icon icon="times-circle"/>}
            </span>
            <span className={`${prefixCls}-item-action`}>
              <Icon icon="times" onClick={() => { onRemove(item)}}/>
            </span>
            {item.status === 'uploading' &&
            <div className={`${prefixCls}-item-progress`}>
              <Progress 
                percent={item.percent || 0}
                size={2}
                showInfo={false}
              />
            </div>
            }
          </li>
        )
      })}
    </ul>
  )

}

export default UploadList;