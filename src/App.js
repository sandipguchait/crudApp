import React, { Component } from 'react';
import './App.css';
import ListItem from './listItem';

class App extends Component {

  state = {
    todos:[],
    newTodo:[],
    editing: false,
    editingIndex: null,
    notification: null
  }
  this.apiUrl ='5c45c6df3858aa001418c4b6.mockapi.io';

  handleChange = (event) => {
     this.setState({ newTodo: event.target.value })
  }

  generateTodoId =()=> {
    const lastTodo = this.state.todos[this.state.todos.length - 1];
    if( lastTodo ) {
      return lastTodo.id +1 
    } 
    return 1;
  }

  addTodo = () => {
    // strucure for new todo
    const newTodo = {
      name: this.state.newTodo,
      id: this.generateTodoId()
    }
    // joining old todo with new todo using .push()
    const oldTodos = this.state.todos;
  if ( this.state.newTodo.length > 0 ) {
      oldTodos.push(newTodo);
      // setting the state
      this.setState ( {
        todos: oldTodos,
        newTodo: ''
      })
      this.alert('Todo added successfully')
  }
  }

  deleteTodo = (key) => {
    const todos = this.state.todos;
    delete todos[key]
    this.setState({ todos: todos });
    this.alert('Todo deleted successfully')
  }

  editTodo =(index) => {
    const todo = this.state.todos[index];
    this.setState({ 
      editing: true,
      newTodo: todo.name,
      editingIndex: index
    
    })
  }

  updateTodo = ()=> {
    const todos = this.state.todos;
    const edittodo = this.state.todos[this.state.editingIndex];
    edittodo.name = this.state.newTodo;
   
    todos[this.state.editingIndex] = edittodo;
     
    this.setState({ 
      todos, editing: false, editingIndex: null , newTodo: ''
     })
     this.alert('Todo updated successfully')

  }
  alert = (notification)=> {
    this.setState({ notification : notification})
    setTimeout(()=> {
      this.setState({
        notification: null
      })
    }, 2000)
  }
  

  render() {
      const { todos, newTodo , editing, notification }= this.state ;

    return (
      <div className="App">
        <header className="App-header">
          <h2 className="text-center p-4 color">CRUD-APP</h2>
          <div className="container">
         { notification && 
              <div className="alert mt-3 alert-success">
              <p className="text-center">{notification}</p>
              </div>
            }
          <input 
            type="text" 
            name="todo"
            className="my-4 form-control" 
            placeholder="Add a new ToDo"
            onChange={this.handleChange}
            value={newTodo}
          />
          <button 
              className="btn-success mb-4 form-control"
              disabled={newTodo.length < 5 }
              onClick={ editing ? this.updateTodo : this.addTodo }
            >
            { editing ? 'Update Todo' : 'Add Todo'}
          </button>
            { !editing && 
             <ul className="list-group">
             {todos.map((item, index ) => {
              return <ListItem 
               item={item}
               key={item.id}
               editTodo={()=>this.editTodo(index)}
               deleteTodo={()=>this.deleteTodo(index)}
               />
             })}
            </ul> }
          </div>
        </header>
      </div>
    );
  }
}

export default App;
