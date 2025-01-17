import { Button, Flex, Input, Modal, Radio, Tabs, TabsProps } from 'antd';
import { useContext, useEffect, useState } from 'react';
import LogsContext from '../../context/logsContext';
import { logsList, initLogSettings } from '../../data/initialData';
import ListColumnsFile from './ListColumnsFile';
import ListColumnsTable from './ListColumnsTable';
import InputLoadFile from './InputLoadFile';

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
  const [initialNamesColumns, setInitialNamesColumns] = useState<string[]>([]);

  useEffect(() => {
    setFile(initLogSettings[type].file);
    setFields([...initLogSettings[type].fields]);
  }, [type]);

  useEffect(() => {
    if (!columns.length) {
      setInitialNamesColumns(namesColumns);
    }
    setColumns(namesColumns);
  }, [namesColumns]);

  const handlerAddColumn = (value: string) => {
    setFields((prev) => [...prev, value]);
  };

  const handlerDelColumn = (value: string) => {
    setFields((prev) => prev.filter((item) => item !== value));
  };

  const handlerSave = () => {
    const optionsNewFields = fields.map((item) => {
      if (newFields[item]) item = newFields[item];
      return item;
    });

    const newOptions = {
      title: initLogSettings[type].title,
      file,
      fields: optionsNewFields,
    };

    // @ts-ignore
    setOptions((prev) => ({ ...prev, ...newOptions }));
    // setOptions({ ...options, ...newOptions });
    setNewFields({});

    setLog(type);
    setNamesColumns([...columns]);
    clearFilters();
    setIsModalOpen(false);
  };

  const handlerReset = () => {
    setOptions(initLogSettings[type]);
    setFields(initLogSettings[type].fields);
    setFile(initLogSettings[type].file);
    setColumns([...initialNamesColumns]);
    setNamesColumns([...initialNamesColumns]);
    setNewFields({});
    clearFilters();
  };

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
          <InputLoadFile setFile={setFile} />
          <Input
            value={file}
            onChange={(e) => {
              if (e.target.value === '') return;
              setFile(e.target.value);
            }}
          />
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
          <ListColumnsFile
            fields={fields}
            setFields={setFields}
            setNewFields={setNewFields}
            handlerAddColumn={handlerAddColumn}
            handlerDelColumn={handlerDelColumn}
          />
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
          <ListColumnsTable
            columns={columns}
            setColumns={setColumns}
            fieldsFile={fields}
          />
        </>
      ),
    },
  ];

  return (
    <Modal
      title='Настройки анализа лога'
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <Tabs defaultActiveKey='1' items={items} />
      <Flex justify='space-between' style={{ marginTop: '20px' }}>
        <Button type='primary' onClick={handlerSave}>
          Сохранить
        </Button>
        <Button type='default' onClick={handlerReset}>
          Сброс
        </Button>
      </Flex>
    </Modal>
  );
};

export default Settings;
