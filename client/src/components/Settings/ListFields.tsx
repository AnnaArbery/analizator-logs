import { Input } from 'antd';
import InputSetting from './InputSetting';

type FieldsNewProps = {
  [key: string]: string;
};
type SettingsListFieldsProps = {
  fields: string[];
  setNewFields: (cb: (value: FieldsNewProps) => FieldsNewProps) => void;
};

const SettingsListFields = ({
  fields,
  setNewFields,
}: SettingsListFieldsProps) => {
  // const handlerChange = (value: string, name: string) => {
  //   let fields_new = fields.reduce((acc, item, idx) => {
  //     if (item === name) acc[idx] = value;
  //     else acc[idx] = item;
  //     return acc;
  //   }, [] as string[]);

  //   setFields(fields_new)
  // }

  return (
    <>
      {fields.map((name) => (
        <InputSetting name={name} key={name} setNewFields={setNewFields} />
      ))}
      <Input value='' key='add-value' />
    </>
  );
};

export default SettingsListFields;
