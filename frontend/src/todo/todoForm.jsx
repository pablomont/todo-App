import React from 'react'
import Grid from '../template/grid'
import IconButton from '../template/iconButton'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {changeDescription} from './todoActions'

const TodoForm = props => {

    const keyHandler = e =>{
        if(e.key === 'Enter'){
            e.shiftKey ? props.handleSearch() : props.handleAdd()
        }
        else if(e.key === 'Escape'){
            props.handleClear()
        }
    }


    return (
        <div role='form' className='todoForm'>
            <Grid cols = '12 9 10'>
                <input id='description' className='form-control'
                    placeholder='Adicione uma tarefa' value={props.description}
                    onChange={props.changeDescription}
                    onKeyUp={keyHandler}></input>
            </Grid>
            <Grid cols='12 3 2'>
                <IconButton style='primary btnForm' icon='plus'
                    onClick={props.handleAdd}></IconButton>
                <IconButton style='info btnForm' icon='search' 
                    onClick={props.handleSearch}></IconButton>
                <IconButton  style='default btnForm' icon='close'
                    onClick={props.handleClear}></IconButton>
            </Grid>
        </div>    
    )
}

const mapStateToProps = (state) => ({description: state.todo.description})
const mapDispatchToProps = (dispatch) => bindActionCreators({changeDescription}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)

