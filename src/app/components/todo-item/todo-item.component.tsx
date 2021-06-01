import * as React from 'react';
import { useState } from 'react';
import { Task } from '../../models/task.model';
import './todo-item.component.scss';

type Props = {
  task: Task;
  isSelected: boolean;
  onSelect?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
}

const TodoItem = (props: Props) => {

  const handleSelect = (e: any) => {
    if (props.task.id && props.onSelect) {
      props.onSelect(props.task.id);
    }
  }

  const handleDelete = (e: any) => {
    if (props.task.id && props.onDelete) {
      props.onDelete(props.task.id);
    }
  }

  return (
    <div className="todo-item">
      <span className={`todo-item-task ${props.isSelected ? 'editing' : ''}`} onClick={handleSelect}>{props.task.description}</span>
      {
        props.isSelected ? 
          <button className="todo-item-delete-button" onClick={handleDelete}>削除</button>
          : ''
      }
    </div>
  );
}

export default TodoItem;