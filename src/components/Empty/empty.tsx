import { CSSProperties, FC, PropsWithChildren } from 'react';
import classnames from 'classnames'
import { STYLE_PREFIX } from "../../utils/const";
import EmptyIcon from './emptyIcon';

const prefixCls = `${STYLE_PREFIX}-empty`

export interface EmptyProps {
    image?: string;
    description?: string;
    imageStyle?: CSSProperties;
    className?: string;
}

export const Empty: FC<PropsWithChildren<EmptyProps>> = (props) => {
    const { className, image, description, children, imageStyle, ...restProps } = props

    const classes = classnames(prefixCls, className, {
    })

    
    const renderContent = ()=> {
      if (children) {
        return children
      } else {
        return (
          <>
            <div className={`${prefixCls}-image`} style={imageStyle}>
              {image?<img src={image} alt='empty'/>:<EmptyIcon/>}
            </div>
            {description&&<p>{description}</p>}
          </>
        )
      }
    }

    return <div className={classes}>
      {renderContent()}
    </div>
}

Empty.defaultProps = {
  description: 'Data Not Found',
  imageStyle: {
    height: '120px'
  }
}

export default Empty;