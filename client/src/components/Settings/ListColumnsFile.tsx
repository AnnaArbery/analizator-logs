import { useState } from 'react';
import { Button, Flex } from 'antd';
import { Input } from 'antd';
import InputSetting from './InputSetting';
import { DeleteFilled } from '@ant-design/icons';
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

type SettingsListFieldsProps = {
  fields: string[];
  setFields: (fields: string[]) => void;
  setNewFields: (
    cb: (value: Record<string, string>) => Record<string, string>
  ) => void;
  handlerAddColumn: (value: string) => void;
  handlerDelColumn: (value: string) => void;
};

const SettingsListFields = ({
  fields,
  setFields,
  setNewFields,
  handlerAddColumn,
  handlerDelColumn,
}: SettingsListFieldsProps) => {
  const [newColumn, addNewColumn] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const addColumn = () => {
    if (newColumn === '' || fields.includes(newColumn)) return;
    handlerAddColumn(newColumn);
    addNewColumn('');
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id === over?.id || !over?.id) return;

    // @ts-ignore
    setFields((prev) => {
      const activeIndex = prev.findIndex((name: string) => name === active.id);
      const overIndex = prev.findIndex((name: string) => name === over?.id);
      return arrayMove(prev, activeIndex, overIndex);
    });
  };

  return (
    <>
      <DndContext
        onDragEnd={onDragEnd}
        modifiers={[restrictToVerticalAxis]}
        sensors={sensors}
      >
        <SortableContext items={fields}>
          {fields.map((name) => (
            <CardFileItem
              key={name}
              name={name}
              setNewFields={setNewFields}
              handlerDelColumn={handlerDelColumn}
            />
          ))}
        </SortableContext>
      </DndContext>
      <Flex>
        <Input
          value={newColumn}
          onChange={(e) => addNewColumn(e.target.value)}
          key='add-value'
        />
        <Button type='default' onClick={addColumn}>
          Добавить
        </Button>
      </Flex>
    </>
  );
};

type CardFileItemProps = {
  name: string;
  styleEl?: Record<string, string>;
  setNewFields: (
    cb: (value: Record<string, string>) => Record<string, string>
  ) => void;
  handlerDelColumn: (item: string) => void;
};

const CardFileItem = ({
  name,
  setNewFields,
  handlerDelColumn,
  styleEl = {},
}: CardFileItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: name,
  });

  const style: React.CSSProperties = {
    ...styleEl,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: 'move',
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return (
    <Flex ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <InputSetting name={name} setNewFields={setNewFields} />
      <Button type='default' onClick={() => handlerDelColumn(name)}>
        <DeleteFilled />
      </Button>
    </Flex>
  );
};

export default SettingsListFields;
