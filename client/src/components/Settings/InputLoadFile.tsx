import { UploadOutlined } from '@ant-design/icons';
import { Button, GetProp, Upload, UploadFile, UploadProps } from 'antd';
import { useState } from 'react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const InputLoadFile = ({ setFile }: { setFile: (name: string) => void }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    const formData = new FormData();
    if (!fileList.length) return;

    formData.append('logfile', fileList[0] as FileType);

    setUploading(true);

    try {
      const res = await fetch(import.meta.env.VITE_URL_FILE, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setFileList([]);
      if (data.name) {
        setFile(data.name);
      }
    } catch (e) {
      console.log('Возникли проблемы');
    } finally {
      setUploading(false);
    }
  };

  const props: UploadProps = {
    onRemove: () => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,
  };

  return (
    <div style={{ marginBottom: '10px' }} className='fileUpload'>
      <Upload {...props}>
        <Button>Выбрать файл</Button>
      </Upload>
      <Button
        type='default'
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        icon={<UploadOutlined />}
        className='fileUpload__btn'
      >
        Загрузить
      </Button>
    </div>
  );
};

export default InputLoadFile;
