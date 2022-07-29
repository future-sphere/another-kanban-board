export type Todos = Todo[];
export type Todo = {
  text: string;
  editable: boolean;
  editInput?: string;
};
export interface IColumn {
  title: string;
  backgroundColor: string;
  todos: Todo[];
}
