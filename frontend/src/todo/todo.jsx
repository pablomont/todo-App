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
            .then(resp => this.refresh(this.state.description  ))
    }

    handleMarkAsDone(todo){
        axios.put(`${URL}/${todo._id}`, {...todo, done: true})
            .then(resp => this.refresh(this.state.description))
    }

    handleMarkAsPending(todo){
        axios.put(`${URL}/${todo._id}`, {...todo, done: false})
            .then(resp => this.refresh(this.state.description))
    }

    handleSearch(){
        this.refresh(this.state.description)
    }

    handleClear(){
        this.refresh()
    }

    refresh(description = ''){
        const search = description ? `&description__regex=/${description}/` : ' '
        axios.get(`${URL}?sort=-createdAt${search}`)
        .then(resp => this.setState({description, list: resp.data}))
    }
   
    render(){
        return(
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm /*description = {this.state.description}*/ 
                    handleAdd={() => this.handleAdd()}
                    handleChange={(e) => this.handleChange(e)}
                    handleSearch={() => this.handleSearch()}
                    handleClear={() => this.handleClear()}
                    />
                <TodoList /*list={this.state.list}*/ handleRemove={(todo) => this.handleRemove(todo)}
                    handleMarkAsDone={(todo) => this.handleMarkAsDone(todo)}
                    handleMarkAsPending={(todo) => this.handleMarkAsPending(todo)} />
            </div>
        )
    }
} 