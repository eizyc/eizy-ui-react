import { FC, PropsWithChildren } from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'


const Transition: FC<PropsWithChildren<CSSTransitionProps>> = (props) => {
  const {
    children,
    classNames,
    animation = 'message-in-top',
    wrapper,
    ...restProps
  } = props
  return (
    <CSSTransition
      classNames = { classNames ? classNames : animation}
      {...restProps}
    >
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  )
}
Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
}

export default Transition