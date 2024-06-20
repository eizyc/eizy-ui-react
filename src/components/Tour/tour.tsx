import { CSSProperties, FC, PropsWithChildren, ReactNode, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import classnames from 'classnames'
import { STYLE_PREFIX } from "../../utils/const";
import { PlacementType } from '../Overlay/placement';
import { useMergedState, useUpdateEffect } from '../../utils/hooks';
import Overlay from '../Overlay';
import Button from '../Button';
import { getMaskStyle } from './getMaskStyle';
import useEvent from '../../utils/hooks/useEvent';

export const prefixCls = `${STYLE_PREFIX}-tour`

interface TourButtonProps {
  children: ReactNode;
}

export interface TourStepProps {
  target: () => HTMLElement ;
  title?: string,
  description?: string,
  placement?: PlacementType;
  renderContent?: (currentStep: number) => ReactNode;
  prevButtonProps?: TourButtonProps;
  nextButtonProps?: TourButtonProps;
  beforePrev?: (currentStep: number) => Promise<void>;
  beforeNext?: (currentStep: number) => Promise<void>;
}

export interface TourProps {
  className?: string;

  style?: CSSProperties;

  open: boolean;

  step?: number;

  defaultStep?: number;

  steps: TourStepProps[];

  getContainer?: () => HTMLElement;

  onFinish?: () => void;

  // onClose?: () => void;

  onChange?: (currentStep: number) => void;

}


export const Tour: FC<PropsWithChildren<TourProps>> = (props) => {
    const {
      className,
      open,
      step,
      steps,
      onChange,
      onFinish,
      defaultStep,
      getContainer
    } = props;

    const mounted = useRef(false);
    const [maskStyle, setMaskStyle] = useState<CSSProperties>({
    });
    const [animationStyle, setAnimationStyle] = useState<CSSProperties>({
        transition: 'none'
    })

    const [ currentStep, setCurrentStep ] = useMergedState<number>(0, {
      value: step,
      defaultValue: defaultStep,
      onChange
    });

    const _onFinish = useEvent(onFinish)

    const selectedElement = open? steps?.[currentStep]?.target():null;
    const containerElement = getContainer?.() || document.documentElement;
    
    const [currentStepInfo, end] = useMemo<[TourStepProps, boolean]>(()=>{
      return [steps?.[currentStep] || {} as TourStepProps, currentStep === steps?.length]
    }, [currentStep, steps])

    useUpdateEffect(() => {
      if (end) {
        _onFinish();
        setCurrentStep(0)
        setAnimationStyle({
          transition: 'none'
        })
      }
    }, [end, _onFinish])




    useLayoutEffect(() => {
      let observer: ResizeObserver;
      if (!selectedElement||!containerElement) {
        setMaskStyle({
          transition: 'none'
        });
      } else {
        observer = new ResizeObserver(() => {
          const style = getMaskStyle(selectedElement, containerElement);
          setMaskStyle(style);
        });
        observer.observe(containerElement);
      }
      return () => {
        observer?.disconnect();
      }
    }, [containerElement, selectedElement]);

    const { renderContent } = currentStepInfo;

    const content = renderContent ? renderContent(currentStep) : (
      <div className={`${prefixCls}-content`}>
        <div className={`${prefixCls}-title`}>{currentStepInfo.title}</div>
        <div className={`${prefixCls}-description`}>{currentStepInfo.description}</div>
      </div>
    );

    const operation = (
      <div className={`${prefixCls}-operation`}>
        {
          currentStep !== 0 && 
            <div className='prev' onClick={() => prev()}>
              { currentStepInfo.prevButtonProps?.children || 
              <Button
                size='sm'>
                {'Back'}
              </Button>
              }
            </div>
           
        }
        <div className='next' onClick={() => next()}>
          { currentStepInfo.nextButtonProps?.children || 
          <Button
            size='sm'>
            {currentStep === steps?.length - 1 ? 'Done' : 'Next'}
          </Button>
          }
        </div>
      </div>
    )

    const prev = async () => {
      if (currentStep <= 0) return
      const { beforePrev } = currentStepInfo
      await beforePrev?.(currentStep)
      setCurrentStep(val=>val-1)
      setAnimationStyle({})
    }

    const next = async () => {
      if (currentStep > steps?.length ) return
      const { beforeNext } = currentStepInfo
      await beforeNext?.(currentStep)
      setCurrentStep(val=>val+1)
      setAnimationStyle({})
    }

    const classes = classnames(prefixCls, className, {
    })

    return (
      open?
      <>
      <Overlay.WithArrow 
        trigger={selectedElement} 
        value={true} 
        className={classes} 
        mask={true} 
        maskClassName={`${prefixCls}-mask`} 
        maskStyle={{...maskStyle, ...animationStyle}}
        arrowSize={8}
        arrowOffsetX={12}
        arrowOffsetY={8}
        gap={4}
        placement={currentStepInfo?.placement || 'bottom'}
      >
        <div className={`${prefixCls}-inner`}>
          {content}
          {operation}
        </div>
      </Overlay.WithArrow>
      </>
      :null
    )
}

Tour.defaultProps = {
}

export default Tour;