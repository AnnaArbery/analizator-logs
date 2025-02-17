import { List } from 'antd';
import { arrayMove, useSortable, SortableContext } from '@dnd-kit/sortable';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

type ListColumnsTableProps = {
  columns: string[];
  setColumns: (cb: (value: string[]) => string[]) => void;
  fieldsFile: string[];
};

const ListColumnsTable = ({
  columns,
  setColumns,
  fieldsFile,
}: ListColumnsTableProps) => {
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id === over?.id || !over?.id) return;

    setColumns((prev) => {
      const activeIndex = prev.findIndex((name) => name === active.id);
      const overIndex = prev.findIndex((name) => name === over?.id);

      return arrayMove(prev, activeIndex, overIndex);
    });
  };

  return (
    <DndContext onDragEnd={onDragEnd} modifiers={[restrictToVerticalAxis]}>
      <SortableContext items={columns}>
        <List
          size='small'
          bordered
          dataSource={columns}
          renderItem={(item) => (
            <ListItem
              item={item}
              style={{
                display: fieldsFile?.includes(item) ? 'block' : 'none',
              }}
            />
          )}
        />
      </SortableContext>
    </DndContext>
  );
};

const ListItem = (props: { item: string; style?: Record<string, string> }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props.item,
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: 'move',
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return (
    <List.Item
      key={props.item}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {props.item}
    </List.Item>
  );
};

export default ListColumnsTable;
