import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import Upload, { UploadFile } from './upload'
import Button from '../Button/button'
import Icon from '../Icon/icon'



const defaultFileList: UploadFile[] = [
  {
    uid:'1',
    size:300,
    name:'error file',
    status: 'error',
    percent: 10
  },
  {
    uid:'2',
    size:200,
    name:'success file',
    status: 'success',
    percent: 10
  },
  {
    uid:'3',
    size:100,
    name:'uploading file',
    status: 'uploading',
    percent: 50
  }
]

type Story = StoryObj<typeof Upload>


export const Playground: Story =  {
  args: {
    defaultFileList,
    action: 'https://jsonplaceholder.typicode.com/posts/',
    onChange: action('changed'),
    beforeUpload: ()=> {
      action('beforeUpload')
      return true
    },
    children: <Button> click to upload</Button>
  }
}

export const WithDrag: Story =  {
  args: {
    defaultFileList,
    action: 'https://jsonplaceholder.typicode.com/posts/',
    onChange: action('changed'),
    beforeUpload: ()=> {
      action('beforeUpload')
      return true
    },
    drag: true,
    children: (
      <>
        <Icon icon="upload" size="5x" theme="primary" />
        <br/>
        <p style={{marginTop:'20px'}}>Darg file over to upload</p>
      </>
    )
  }
}

/**
 * ### How to import
 * ~~~js
 * import { Upload } from '@eizyui/eizy-ui-react'
 * ~~~
 */
const meta:Meta<typeof Upload> = {
  title: 'Basic/Upload',
  component: Upload,
  tags: ['autodocs'],
  argTypes: {
    defaultFileList: {
      description: `    
      UploadFile {
        uid: string;
        size: number;
        name: string;
        status?: 'ready' | 'uploading' | 'success' | 'error';
        percent: number;
        raw?: File;
        response?: any;
        error?: any;
      }`
    },
  },
  parameters: {
    docs: {
      controls: { exclude: ['children'] },
    }
  }
};

export default meta