import { fireEvent, getByRole, render, screen } from '@testing-library/react';
import { useMergedState } from '../index'
import { useEffect } from 'react';
const TestWithInput = ({ value, defaultValue }: any) => {
  const [val, setVal] = useMergedState(null, { value, defaultValue });
  return (
    <>
      <input
        value={val}
        onChange={e => {
          setVal(e.target.value);
        }}
      />
      <span className="txt">{val}</span>
    </>
  );
};
const TestWithButton = () => {
  const [value, setValue] = useMergedState<number>(0, {
    onChange
  });
  return (
    <>
    <button
      data-testid="trigger-once"
      onClick={() => {
        setValue(v => v + 1);
      }}
    >
      {value}
    </button>
    <button
      data-testid="trigger-twice"
      onClick={() => {
        setValue(v => v + 1);
        setValue(v => v + 1);
      }}
    >
      {value}
    </button>
    </>
  )
}

const TestWithSpan = ({ value, defaultValue }: any) => {
  const [val, setVal] = useMergedState<number>(123, { value, defaultValue, onChange });
  return (
    <>
      <button
          data-testid="test-button"
          onClick={() => {
            setVal(v => v + 1);
            setVal(v => v + 1);
          }}
          onMouseEnter={() => {
            setVal(2);
          }}
        >
      {value}
    </button>
      <span data-testid="test-span" className="txt">{val}</span>
    </>
  );
};

const TestWithSameValue = ({ value, defaultValue }: any) => {
  const [val, setVal] = useMergedState<number>(undefined, { value, defaultValue, onChange });
  return (
    <>
      <button
          data-testid="test-button"
          onClick={() => {
            setVal(1);
          }}
          onMouseEnter={() => {
            setVal(2);
          }}
        >
      {value}
    </button>
      <span data-testid="test-span" className="txt">{val}</span>
    </>
  );
};
const onChange = jest.fn();
describe('useMergedState',()=>{
  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });
  describe('control / un-control  switch', ()=> {
    it('still keep the control content when value to undefined [to uncontrol]', ()=> {
      // remove the warning from react control->un control
      jest.spyOn(console, 'error').mockImplementation((msg) => {
        if(msg.indexOf('A component is changing a controlled input to be uncontrolled')!==-1){
          return
        }
        console.error(msg)
      });
      const { rerender } = render(<TestWithInput value="test"/>)
      let el = screen.getByRole('textbox') as HTMLInputElement
      let text = screen.getByText(
        'test',
        { selector: '.txt' }
      )
      expect(text).toBeInTheDocument();
      rerender(<TestWithInput value={undefined}/>)
      el = screen.getByRole('textbox') as HTMLInputElement
      text = screen.getByText('', {selector: `.txt`})
      expect(el.value).toEqual('test');
      text = screen.getByText(
        '',
        { selector: '.txt' }
      )
      expect(text).toBeInTheDocument();
  
    })
    it('uncontrolled to controlled', ()=> {
      const { rerender } = render(<TestWithSpan />)

      expect(screen.getByTestId('test-span').textContent).toEqual('123');
      expect(onChange).not.toHaveBeenCalled();

      rerender(<TestWithSpan value={1}/>)
      expect(screen.getByTestId('test-span').textContent).toEqual('1');
      // expect(onChange).not.toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith(1, 123);


      rerender(<TestWithSpan value={undefined} />);
      fireEvent.mouseEnter(screen.getByTestId('test-button'));
      fireEvent.click(screen.getByTestId('test-button'));
      expect(screen.getByTestId('test-span').textContent).toEqual('4');
      expect(onChange).toHaveBeenCalledWith(4, 2);


    })
  })
  describe('correct defaultValue/value', ()=> {
    it('raw', () => {
      render(<TestWithInput defaultValue="test" />);
      const el = screen.getByRole('textbox') as HTMLInputElement
      expect(el.value).toEqual('test');
    });

    it('func', () => {
      render(<TestWithInput defaultValue={() => 'bamboo'} />);
      const el = screen.getByRole('textbox') as HTMLInputElement
      expect(el.value).toEqual('bamboo');
    });
    it('not rerender when setState as deps', () => {
      let renderTimes = 0;
      const Test = () => {
        const [val, setVal] = useMergedState(0);

        useEffect(() => {
            renderTimes += 1;
            expect(renderTimes < 10).toBeTruthy();

            setVal(1);
          }, [setVal]);

          return <div data-testid="test">{val}</div>;
      };

      render(<Test/>);
      expect(screen.getByTestId('test').textContent).toEqual('1');
    });
    it('postState', () => {
      const Test = () => {
        const [val] = useMergedState(1, { postState: v => v * 2 });

        return <div data-testid="test">{val}</div>;
      };

      render(<Test />);

      expect(screen.getByTestId('test').textContent).toEqual('2');
    });
    it('should alway use option value', () => {
      const Test = ({value}:{value: number}) => {
        const [val, setVal] = useMergedState(undefined, { value, onChange});
        return (
          <span
           data-testid='span'
            onClick={() => {
            setVal(12);
          }}
        >
          {val}
        </span>
        );
      };

      render(<Test value={1}/>);
      fireEvent.click(screen.getByTestId('span'));
      expect(screen.getByTestId('span').textContent).toEqual('1');
    });
  })
  describe('trigger onChange if props change', () => {
    it('trigger only once if props change more than once',()=>{
      render(<TestWithButton />);
      expect(screen.getByTestId('trigger-once').textContent).toEqual('0');
      expect(onChange).not.toHaveBeenCalled();

      fireEvent.click(screen.getByTestId('trigger-once'));
      expect(screen.getByTestId('trigger-once').textContent).toEqual('1');
      expect(onChange).toHaveBeenCalledWith(1, 0);
      onChange.mockReset();

      fireEvent.click(screen.getByTestId('trigger-twice'));
      expect(screen.getByTestId('trigger-once').textContent).toEqual('3');
      expect(onChange).toHaveBeenCalledWith(3, 1);
      onChange.mockReset();
    })

    it('not trigger onChange if set same value', () => {

      render(<TestWithSameValue value={1}/>)

      fireEvent.click(screen.getByTestId('test-button'));
      expect(onChange).not.toHaveBeenCalled();

      fireEvent.mouseEnter(screen.getByTestId('test-button'));
      expect(onChange).toHaveBeenCalledWith(2, 1);


    });

  })

  
})