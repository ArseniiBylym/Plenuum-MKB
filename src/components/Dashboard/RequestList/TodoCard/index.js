import TodoCard from './TodoCard.js';

const TodoCardContainer = (props) => {
  return TodoCard({...props,
      key:props.key,
      linkProperties:{
        pathname: '/compass',
        state: { fromTodo: props.todo }
      }});
};

export default TodoCardContainer;
