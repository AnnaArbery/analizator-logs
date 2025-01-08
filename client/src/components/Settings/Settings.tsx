import { Button, Input, Modal, Radio, Tabs, TabsProps } from 'antd';
import { useContext, useEffect, useState } from 'react';
import LogsContext from '../../context/logsContext';
import { logsList, initLogSettings } from '../../data/initialData';
import ListFields from './ListFields';
import ListColumns from './ListColumns';

type SettingsProps = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  clearFilters: () => void;
};

const Settings = ({
  isModalOpen,
  setIsModalOpen,
  clearFilters,
}: SettingsProps) => {
  const { log, options, setLog, setOptions, namesColumns, setNamesColumns } =
    useContext(LogsContext);
  const [type, setType] = useState(log);
  const [file, setFile] = useState(options.file);
  const [fields, setFields] = useState(options.fields);
  const [columns, setColumns] = useState<string[]>([]);
  const [newFields, setNewFields] = useState<Record<string, string>>({});

  useEffect(() => {
    setFile(initLogSettings[type].file);
    setFields([...initLogSettings[type].fields]);
  }, [type]);

  useEffect(() => {
    setColumns(namesColumns);
  }, [namesColumns]);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Файл',
      children: (
        <>
          <Radio.Group
            block
            options={logsList}
            defaultValue={type}
            value={type}
            optionType='button'
            style={{ marginBottom: '10px' }}
            onChange={(e) => setType(e.target.value)}
          />
          <Input value={file} onChange={(e) => setFile(e.target.value)} />
        </>
      ),
    },
    {
      key: '2',
      label: 'Поля файла',
      children: (
        <>
          <Radio.Group
            block
            options={logsList}
            defaultValue={type}
            value={type}
            optionType='button'
            style={{ marginBottom: '10px' }}
            onChange={(e) => setType(e.target.value)}
          />
          <ListFields fields={fields} setNewFields={setNewFields} />
        </>
      ),
    },
    {
      key: '3',
      label: 'Поля таблицы',
      children: (
        <>
          <Radio.Group
            block
            options={logsList}
            defaultValue={type}
            value={type}
            optionType='button'
            style={{ marginBottom: '10px' }}
            onChange={(e) => setType(e.target.value)}
          />
          <ListColumns
            columns={columns}
            setColumns={setColumns}
            fieldsFile={fields}
          />
        </>
      ),
    },
  ];

  const handlerSave = () => {
    const optionsNewFields = initLogSettings[type].fields.map((item) => {
      if (newFields[item]) item = newFields[item];
      return item;
    });
    const newOptions = {
      title: initLogSettings[type].title,
      file,
      fields: optionsNewFields,
    };
    clearFilters();
    setLog(type);
    setOptions((prev) => ({ ...prev, ...newOptions }));

    setNamesColumns([...columns]);
    setIsModalOpen(false);
  };

  return (
    <Modal
      title='Настройки анализа лога'
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <Tabs defaultActiveKey='1' items={items} />
      <Button
        type='primary'
        style={{ marginTop: '20px' }}
        onClick={handlerSave}
      >
        Сохранить
      </Button>
    </Modal>
  );
};

export default Settings;
