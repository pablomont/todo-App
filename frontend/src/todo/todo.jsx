import React, {Component} from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component{

    constructor(props){
        super(props)
        this.state = {description: '', list: []}
        this.refresh()
    }

    handleAdd(){
        const description = this.state.description
        axios.post(URL, { description })
            .then(resp => this.refresh())
    }

    handleChange(e){
        this.setState({description: e.target.value})
    }

    handleRemove(todo){
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => this.refresh())
    }

    refresh(){
        axios.get(`${URL}?sort=-createdAt`)
        .then(resp => this.setState({...this.state, description: '', list: resp.data}))
    }
   
    render(){
        return(
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm description = {this.state.description} 
                    handleAdd={() => this.handleAdd()}
                    handleChange={(e) => this.handleChange(e)}
                    />
                <TodoList list={this.state.list} handleRemove={(todo) => this.handleRemove(todo)}/>
            </div>
        )
    }
}