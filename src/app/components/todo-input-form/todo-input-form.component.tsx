import { useEffect, useRef } from 'react';
import './todo-input-form.component.scss';

type Props = {
  taskId?: string;
  description?: string;
  onCreate?: (description: string) => void
  onUpdate?: (taskId: string, description: string) => void
}

const TodoInputForm = (props: Props) => {

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.value = props.description;
  });
   
  const handleChange = (e: any) => {
  }

  const handleCreate = (e: any) => {
    if (props.onCreate) {
      props.onCreate(inputRef.current.value);
    }
    inputRef.current.value = '';
  }

  const handleUpdate = (e: any) => {
    if (props.onUpdate && props.taskId) {
      props.onUpdate(props.taskId, inputRef.current.value);
    }
    inputRef.current.value = '';
  }

  return (
    <div className="todo-input-form">
      <input ref={inputRef} type="text" placeholder="タスクのタイトルを入力してください" className="todo-input-form-input" onChange={handleChange}/>
      {
        props.taskId ? 
          <button className="todo-input-form-action-button" onClick={handleUpdate}>編集</button>
          : <button className="todo-input-form-action-button" onClick={handleCreate}>登録</button>
      }

    </div>
  );
}

export default TodoInputForm;