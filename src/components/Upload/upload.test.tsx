import '@testing-library/jest-dom/extend-expect'
import axios from 'axios'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Upload, UploadProps, prefixCls } from './upload'
import { STYLE_PREFIX } from '../../utils/const';

jest.mock('../Icon/icon', () => {
  return (props: any) => {
    return <span onClick={props.onClick}>{props.icon}</span>
  }
})
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
  action: "fakeurl.com",
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true
}
let fileInput: HTMLInputElement, uploadArea: HTMLElement
const testFile = new File(['xyz'], 'test.png', {type: 'image/png'})
describe('test upload component', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<Upload {...testProps}>Click to upload</Upload>)
    fileInput = screen.getByText('', {selector: `.${prefixCls}-file-input`}) as HTMLInputElement
    uploadArea = screen.queryByText('Click to upload') as HTMLElement
  })
  it('upload process should works fine', async () => {
    mockedAxios.post.mockResolvedValue({'data': 'cool'})
    expect(uploadArea).toBeInTheDocument()
    expect(fileInput).not.toBeVisible()
    fireEvent.change(fileInput, { target: { files: [testFile ]}})
    expect(screen.getByText('spinner')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByText('check-circle')).toBeInTheDocument()
    })
    expect(screen.getByText('test.png')).toBeInTheDocument()
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', expect.objectContaining({
      raw: testFile,
      status: 'success',
      response: 'cool',
      name: 'test.png'
    }))
    expect(testProps.onChange).toHaveBeenCalledWith(expect.objectContaining({
      raw: testFile,
      status: 'success',
      response: 'cool',
      name: 'test.png'
    }))

    //remove the uploaded file
    expect(screen.getByText('times')).toBeInTheDocument()
    fireEvent.click(screen.getByText('times'))
    expect(screen.queryByText('test.png')).not.toBeInTheDocument()
    expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
      raw: testFile,
      status: 'success',
      name: 'test.png'
    }))
  })
  it('drag and drop files should works fine', async () => {
    mockedAxios.post.mockResolvedValue({'data': 'cool'})
    fireEvent.dragOver(uploadArea)
    expect(uploadArea).toHaveClass(`${STYLE_PREFIX}-is-dragover`)
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass(`${STYLE_PREFIX}-is-dragover`)
    fireEvent.drop(uploadArea, {
      dataTransfer: {
        files: [testFile]
      }
    })
    await waitFor(() => {
      expect(screen.getByText('test.png')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', expect.objectContaining({
      raw: testFile,
      status: 'success',
      response: 'cool',
      name: 'test.png'
    }))
  })
})