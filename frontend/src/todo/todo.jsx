import React, {Component} from 'react'
import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'


export default class Todo extends Component{

    constructor(props){
        super(props)
        this.state = {description: '', list: []}
    }

    handleAdd(){
        console.log(this.state.description)
    }

    handleChange(e){
        this.setState({description: e.target.value})
    }
   
    render(){
        return(
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm description = {this.state.description} 
                    handleAdd={() => this.handleAdd()}
                    handleChange={(e) => this.handleChange(e)}
                    />
                <TodoList />
            </div>
        )
    }
}