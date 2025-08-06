function TaskItem({ task }){

    return(
        <div>
            <li>
                <span>{task.text}</span>
            </li>
        </div>
    )
}

export default TaskItem;
