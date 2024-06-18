import { CSSProperties, FC, PropsWithChildren, ReactNode } from 'react';
import classnames from 'classnames'
import { STYLE_PREFIX } from "../../utils/const";
import Icon from '../Icon/icon';
import { uuid } from '../../utils';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { createRoot } from 'react-dom/client';
import { useTimer } from './useTimer';

export type NoticeType = 'info'|'success'|'error'|'warning'|'loading'

export const prefixCls = `${STYLE_PREFIX}-message`

export interface MessageInnerProps {
  className?: string;
  type?: NoticeType;
  content?: ReactNode;
  id?: string;
}

export interface MessageProps {
  className?: string;
  style?: CSSProperties;
  dataSource: Array<any>
}

export interface NoticeProps {
  id: string,
  type: NoticeType,
  content?: ReactNode,
  duration: number,
  timer?: any,
  hide?: boolean,
}




export const MessageInner: FC<PropsWithChildren<MessageInnerProps>> = (props) => {
    const { className, type, content, children,  ...restProps } = props
    const innerClass = classnames({
      [`${prefixCls}-notice-${type}`]: type,
    })

    let icon = null

    switch (type) {
      case 'info':
        icon = <Icon icon='circle-info' />;
        break;
      case 'success':
        icon = <Icon icon='circle-check' />;
        break;
      case 'error':
        icon = <Icon icon='circle-xmark' />;
        break;
      case 'warning':
        icon = <Icon icon='circle-exclamation' />;
        break;
      case 'loading':
        icon = <Icon icon='spinner' />;
        break;
    }

    return (
        <div className={`${prefixCls}-notice`} {...restProps}>
          <div className={`${prefixCls}-notice-content`}>
            <div className={innerClass}>
              {icon}
              {content || children}
            </div>
          </div>
        </div>
     )
}

MessageInner.defaultProps = {
}

export const MessageWrapper: FC<PropsWithChildren<NoticeProps>> = (props) => {
  const { id, duration } = props
  const {onMouseEnter, onMouseLeave} = useTimer({
      id: id!,
      duration,
      remove: ()=> {
        removeMessage(id)
      },
  });

  return (
    <div>
      <div className={`${prefixCls}-notice-wrapper`}>
        <div style={{ display: 'inline-block' }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <MessageInner {...props} />
        </div>
      </div>
    </div>
  )
}

let messageMountRoot:any = null;
let messageList:Array<any> = [];

const Message: FC<PropsWithChildren<MessageProps>> = (props) => {
  const { dataSource } = props
  return <div className={prefixCls}>
    <TransitionGroup>
      {dataSource.map(item => (
        <CSSTransition
          key={item.id}
          timeout={500}
          classNames="message"
          onExit={(e:any) => {
            if (!e) return;
            e.style.height = `${e.scrollHeight}px`;
          }}
          onExiting={(e:any) => {
            if (!e) return;
            e.style.height = 0;
          }}
          onExited={(e:any) => {
            if (!e) return;
            e.style.height = 0;
          }}
      >
          <MessageWrapper {...item} />
        </CSSTransition>
      ))}
    </TransitionGroup>
</div>;
}

const removeMessage= (id: string) => {
  const idx = messageList.findIndex(i=>i.id===id)
  if (idx > -1) {
    let clone = [...messageList]
    clone.splice(idx, 1);
    messageList = clone
  }
  messageMountRoot.render(<Message dataSource={messageList} />);
}

const message = (type: NoticeType, content: ReactNode, duration: number) => {
  if (!messageMountRoot) {
    const container = document.createElement('div');
    document.body.appendChild(container);
    messageMountRoot = createRoot(container)
  }
  let clone = [...messageList];
  const task:NoticeProps = {
    id: uuid(),
    type,
    content,
    duration: duration*1000
  }
  clone.push(task)
  messageList = clone
  
  messageMountRoot.render(<Message dataSource={messageList} />);
}

const epxoseMessage = {
  success: (content: ReactNode, duration=3) => message('success', content, duration),
  warning: (content: ReactNode, duration=3) => message('warning', content, duration),
  loading: (content: ReactNode, duration=3) => message('loading', content, duration),
  info: (content: ReactNode, duration=3) => message('info', content, duration),
  error: (content: ReactNode, duration=3) => message('error', content, duration),
}


export default epxoseMessage;