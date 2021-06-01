import { Logger } from '../helpers/logger';
import { Task } from '../models/task.model';
import { StorageUtil } from '../utils/storage-util';

// タスク保存キー
const StorageKey = 'TASKS';

/**
 * TODOタスクCRUD操作フック
 */
export const useTodoTasks = () => {

  const storageUtil = new StorageUtil('local');

  let cachedData: Task[];
  
  const readAllTasks = (): Task[] => {
    if (cachedData) {
      return cachedData;
    }
    const savedTasks = storageUtil.getValue(StorageKey);
    Logger.debug('Read tasks', savedTasks);
    if (savedTasks) {
      cachedData = savedTasks as Task[];
      return cachedData;
    }
    return [];
  }

  const createTask = (description: string): void => {
    const taskId = generateTaskId();
    const currentDatetime = new Date();
    const task = new Task(taskId, description, currentDatetime, currentDatetime);
    const currentTasks = readAllTasks();
    const newTasks = [...currentTasks, task];
    storageUtil.setValue(StorageKey, newTasks);
    cachedData = newTasks;
  }

  const updateTask = (taskId: string, description: string): void => {
    const currentDatetime = new Date();
    const currentTasks = readAllTasks();
    const updatedTask = currentTasks.find(e => e.id === taskId);
    if (updatedTask) {
      updatedTask.description = description;
      updatedTask.updateDatetime = currentDatetime;
      storageUtil.setValue(StorageKey, [...currentTasks]);
    }
  }

  const deleteTask = (taskId: string): void => {
    const currentTasks = readAllTasks();
    const filteredTasks = currentTasks.filter(e => e.id !== taskId);
    storageUtil.setValue(StorageKey, filteredTasks);
    cachedData = filteredTasks;
  }

  return { readAllTasks, createTask, updateTask, deleteTask };
};

// ID生成（ランダム8桁）
function generateTaskId(): string {
  return Math.random().toString(36).slice(-8);
}

