type columnTitlesTable = {
  key: string;
  dataIndex: string;
  title: string;
  width?: number;
  render?: (text: string) => void;
  ellipsis?: boolean;
};

export default columnTitlesTable;
