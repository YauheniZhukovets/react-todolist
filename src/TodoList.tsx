import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (filter: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    filter: FilterValuesType
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

function TodoList(props: PropsType) {


    const setAllFilterValue = () => props.changeFilter("all", props.id)
    const setActiveFilterValue = () => props.changeFilter("active", props.id)
    const setCompletedFilterValue = () => props.changeFilter("completed", props.id)
    const getBtnColor = (filter: FilterValuesType) => props.filter=== filter ? "secondary" : "primary" ;
    const changeTodoListTitle = (newTitle: string) => props.changeTodoListTitle(newTitle, props.id)

    const tasksJSX = props.tasks.map(task => {
        const getClasses = () => task.isDone ? "is-done": "" ;
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
        const changeTaskTitle = (newTitle: string) => {
            props.changeTaskTitle(task.id, newTitle, props.id)
        }
        const removeTask = () => props.removeTask(task.id, props.id)
        return (

            <ListItem
                key={task.id}
                // className={getClasses()}
                divider
                style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >

                <Checkbox
                    size={"medium"}
                    color={"primary"}
                    checked={task.isDone}
                    onChange={changeStatus}
                />
                <EditableSpan title={task.title} changeTitle={changeTaskTitle} spanClass={getClasses()}/>
                <IconButton
                    size={"small"}
                    onClick={removeTask}
                >
                    <Delete/>
                </IconButton>
            </ListItem>
        )
    })

    const addTask = (title: string) => props.addTask(title, props.id)
    return(
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "300px",
            maxWidth: "300px"
        }}>
            <div>
                <Typography
                    variant={"h6"}
                    align={"center"}
                    gutterBottom
                    style={{fontWeight: "bold"}}
                >
                    <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
                    <IconButton
                        size={"small"}
                        onClick={()=>props.removeTodoList(props.id)}
                    >
                        <Delete/>
                    </IconButton>
                </Typography>
                <AddItemForm addItem={addTask} />
            </div>
            <List>
                {tasksJSX}
            </List>
            <div>
                <ButtonGroup
                    size={"small"}
                    variant={"contained"}
                    disableElevation
                    fullWidth
                >
                    <Button
                        color={getBtnColor("all")}
                        onClick={setAllFilterValue}>All</Button>
                    <Button
                        color={getBtnColor("active")}
                        onClick={setActiveFilterValue}>Active</Button>
                    <Button
                        color={getBtnColor("completed")}
                        onClick={setCompletedFilterValue}>Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}

export default TodoList;