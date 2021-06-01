import './todo-page.component.scss'
import Header from '../header/header.component';
import ContentTitle from '../content-title/content-title.component';
import TodoItem from '../todo-item/todo-item.component';
import ContentMessage from '../content-message/content-message.component';
import TodoInputForm from '../todo-input-form/todo-input-form.component';
import { useTodoTasks } from '../../hooks/use-todo-tasks';
import { useState } from 'react';

const TodoPage = () => {

  const { readAllTasks, createTask, updateTask, deleteTask } = useTodoTasks();
  const [tasks, setTasks] = useState(readAllTasks());
  const [message, setMessage] = useState({type: null, text: null});
  const [selectedTaskId, selectTask] = useState(null as string);
  
  const onCreate = (description: string) => {
    if (!shouldSaveTask(description)) {
      setMessage({type: 'alert', text: '1文字以上入力してください'});
      return;
    }

    try {
      createTask(description);
      setMessage({type: 'info', text: '正常にタスクを追加しました'});
    } catch (error) {
      setMessage({type: 'alert', text: 'エラーが発生しました'});
    }
    setTasks(readAllTasks());
  }

  const onUpdate = (taskId: string, description: string) => {
    if (!shouldSaveTask(description)) {
      setMessage({type: 'alert', text: 'エラーが発生しました'});
      return;
    }
    
    try {
      selectTask(null);
    　updateTask(taskId, description);
    　setMessage({type: 'info', text: 'タスクを編集しました'});
    } catch (error) {
      setMessage({type: 'alert', text: 'エラーが発生しました'});
    }
    setTasks(readAllTasks());
  }

  const onDelete = (taskId: string) => {
    try {
      selectTask(null);
    　deleteTask(taskId);
    　setMessage({type: 'info', text: 'タスクを削除しました'});
    } catch (error) {
      setMessage({type: 'alert', text: 'エラーが発生しました'});
    }
    setTasks(readAllTasks());
  }

  const onSelect = (taskId: string) => {
    if (selectedTaskId && selectedTaskId === taskId) {
      selectTask(null);
    } else {
      selectTask(taskId);
    }
  }


  return (
    <div className="page">
      <Header>TODO</Header>
      <div className="page-content">
        <ContentTitle>一覧</ContentTitle>
        <div className="page-content-list-todo-items">
          {
            tasks ?
            tasks.map(e => {
              return (
                <TodoItem
                  key={e.id}
                  task={e}
                  isSelected={selectedTaskId===e.id}
                  onSelect={onSelect}
                  onDelete={onDelete}
                ></TodoItem>
              )
            }) : null
          }
        </div>
       
        <ContentMessage type={message.type} text={message.text}></ContentMessage>
        <TodoInputForm
          taskId={selectedTaskId}
          description={selectedTaskId ? tasks.find(e => e.id === selectedTaskId).description : null}
          onCreate={onCreate}
          onUpdate={onUpdate}
        ></TodoInputForm>
      </div>
    </div>
  )
}

// 保存可否の判断
function shouldSaveTask(description: string): boolean {
  // 1文字以上の入力を必須とする
  if (description && description.length > 0) {
    return true;
  }
  return false;
}

export default TodoPage