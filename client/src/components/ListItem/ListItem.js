import React from 'react'
import {Link} from 'react-router-dom'
import style from './style.module.css'


function ListItem({index, title, description, id}) {
    return (
        <div className={style.form}>
            <li className="list-group-item"><Link to={`/incident/${id}`}>{index + 1}. Заголовок: {title}.
                Описание: {description}</Link></li>
        </div>
    )
}

export default ListItem

