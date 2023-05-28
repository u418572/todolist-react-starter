import { Footer, Header, TodoCollection, TodoInput } from 'components';
import {useState,useEffect} from 'react'
 import {getTodos,createTodo,patchTodo, deleteTodo} from '../api/todos'
  
const TodoPage = () => {
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState([])

  const handleChange = (value) => {
    setInputValue(value)
  } 

  const handleAddTodo = async() => {
    if(inputValue.length === 0){
      return; 
    }
  try{
 const data = await createTodo({
      title: inputValue,
      isDone: false,
    })
    setTodos((prevTodos) => {
      return [
        ...prevTodos,{
          id: data.id,
          title: data.title,
          isDone: data.isDone,
          isEdit:false
        }
       ]
    })
   
    setInputValue('')
  }catch(error) {
    console.error(error)
  }
   
  }

  const handleKeyDown = async() => {
    if(inputValue.length === 0){
      return; 
    }
    try{
 const data = await createTodo({
      title: inputValue,
      isDone: false,
    })
    setTodos((prevTodos) => {
      return [
        ...prevTodos,{
          id: data.id,
          title: data.title,
          isDone: data.isDone,
          isEdit:false
        }
       ]
    })
   
    setInputValue('')
  }catch(error) {
    console.error(error)
  }
    setInputValue('')
   }

   const handleToggleDone = async(id) => {
    const currentTodo = todos.find(todo => todo.id===id)
try{
await patchTodo({id, isDone:!currentTodo.isDone})

    setTodos((prevTodos) => {
       return prevTodos.map(todo => {
        if(todo.id === id) {
          return {
            ...todo,
            isDone:!todo.isDone,
          }
        }
        return todo
       })
    })
}catch(error) 
{console.log(error)}
       
   }

   const handleChangeMode = ({id, isEdit}) => {
      setTodos((prevTodos) => {
          return prevTodos.map(item => {
            if(item.id === id){
             return {
              ...item, isEdit
             }
            }else{
              return {...item, isEdit:false}
             }

          })
      })
   }
  const handleSave = async({id, title}) => {

    try {
      await patchTodo({
        id,
        title,
      });
    setTodos((prevTodos) => {
      return prevTodos.map(item => {
        if(item.id === id) {
          return {
            ...item,
            title,
            isEdit:false
          }
        }else {
          return item
        }
      })
    })
    } catch (error) {
      console.error(error);
    }
  }

   const handleDelete = async(id) => {
    try{
      await deleteTodo(id);
    setTodos((prevTodos) => 
    prevTodos.filter(item => item.id !==id)
    )
    }catch (error) {
      console.error(error);
    }
  }

useEffect(() => {
const getTodosAsync = async () => {
try {
const todos = await getTodos();
setTodos(todos.map((todo) => ({ ...todo, isEdit: false })));
} catch (error) {
console.error (error);
}
};
getTodosAsync();
}, []);

   
  return (
    <div>
       TodoPage
      <Header />
      <TodoInput inputValue={inputValue}
       onChange={handleChange} 
       onAddTodo={handleAddTodo}
      onKeyDown={handleKeyDown}/>
      <TodoCollection 
       todos={todos} 
       onSave={handleSave}
       onDelete={handleDelete}
       onToggleDone={handleToggleDone}
       onChangeMode={handleChangeMode} />
      <Footer count={todos.length}/>
      
    </div>
  );
};

export default TodoPage;
