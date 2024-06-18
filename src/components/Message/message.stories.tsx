import type { Meta, StoryObj } from '@storybook/react'
import Message, { MessageInner, NoticeType } from './message'
import message from './index';
import Button from '../Button';

type Story = StoryObj<typeof Message>


export const MessageInnerDemo = () => {
  return <MessageInner type="success">Primary MessageInner</MessageInner>
}



const msg = (type: NoticeType) => {
  message[type]?.(`This is a ${type} message`);
};

export const App: React.FC = () => (
  <>
  <Button onClick={()=>msg('info')} buttonType='secondary'>
    Info Message
  </Button>
  <Button onClick={()=>msg('loading')} buttonType='primary'>
    Loading Message
  </Button>
  <Button onClick={()=>msg('error')} buttonType='error'>
    Error Message
  </Button>
  <Button onClick={()=>msg('success')} buttonType='success'>
    Success Message
  </Button>
  <Button onClick={()=>msg('warning')} buttonType='warning'>
    Warning Message
  </Button>
  </>
);

/**
 * ### How to import
 * ~~~js
 * import { Message } from 'eizy-ui-react'
 * ~~~
 */
const meta:Meta<typeof Message> = {
  title: 'Basic/Message',
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'This is Message',
  }
};

export default meta
