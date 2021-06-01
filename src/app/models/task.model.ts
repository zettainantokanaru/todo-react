export class Task {
  // ユニークID
  id: string;
  // タスク内容
  description: string;
  // 作成日時
  createDatetime: Date;
  // 更新日時
  updateDatetime: Date;

  constructor(id: string, description: string, createDatetime: Date, updateDatetime: Date) {
    this.id = id;
    this.description = description;
    this.createDatetime = createDatetime;
    this.updateDatetime = updateDatetime;
  }
}
