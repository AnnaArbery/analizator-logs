import { Input } from 'antd';
import { useState } from 'react';

type FieldsNewProps = {
  [key: string]: string;
};

type InputSettingProps = {
  name: string;
  setNewFields: (cb: (value: FieldsNewProps) => FieldsNewProps) => void;
};

const InputSetting = ({ name, setNewFields }: InputSettingProps) => {
  const [value, setValue] = useState<string>(name);

  const handlerChange = (value: string) => {
    setValue(value);
    setNewFields((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <Input
      value={value}
      key={name}
      onChange={(e) => handlerChange(e.target.value)}
    />
  );
};

export default InputSetting;
