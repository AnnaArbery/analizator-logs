import { Button, Input, Modal, Radio, Tabs, TabsProps } from 'antd';
import { useContext, useEffect, useState } from 'react';
import LogsContext from '../../context/logsContext';
import { logsList, initLogSettings } from '../../data/initialData';
import ListFields from './ListFields';

type SettingsProps = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
};

const Settings = ({ isModalOpen, setIsModalOpen }: SettingsProps) => {
  const { log, options, setLog, setOptions } = useContext(LogsContext);
  const [type, setType] = useState(log);
  const [file, setFile] = useState(options.file);
  const [fields, setFields] = useState(options.fields);
  const [newFields, setNewFields] = useState({});

  useEffect(() => {
    setFile(initLogSettings[type].file);
    setFields(initLogSettings[type].fields);
  }, [type]);

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
      label: 'Поля лога',
      children: (
        <ListFields
          fields={fields}
          setFields={setFields}
          setNewFields={setNewFields}
        />
      ),
    },
  ];

  const handlerSave = () => {
    console.log({
      type,
      file,
      newFields,
    });
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
