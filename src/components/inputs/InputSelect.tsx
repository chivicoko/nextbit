'use client';

type InputProps = {
  key?: number;
  classes?: string;
  valueArray?: string[];
  name?: string;
  label?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLOptionElement>) => void;
};

const InputSelect: React.FC<InputProps> = ({
  key = null,
  classes = '',
  valueArray = [''],
  name="",
  label="",
  disabled = false,
  autoFocus = false,
  onChange = () => {},
}) => {

  return (
    <>
      <label htmlFor={name} className="text-sm text-neutral-700">{label}</label>
      <div className="px-2 bg-white border border-customGray flex items-center justify-between rounded-radius-8 focus-within:ring-1 focus-within:ring-primary hover:ring-primary">
        <select name={name} id={name} className={`bg-transparent w-full py-[10px] pr-1 border-0 text-xs focus:outline-0 focus:ring-0 text-[#666666] ${classes}`}>
          {valueArray.map((item, index) => (
            <option disabled={disabled} autoFocus={autoFocus} onChange={onChange} key={key || index} value={item}>{item}</option>
          ))}
        </select>
      </div>
    </>
  );
};

export default InputSelect;
