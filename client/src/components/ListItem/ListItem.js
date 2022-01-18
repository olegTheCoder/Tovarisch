import React from 'react'
import { Link } from 'react-router-dom'


function ListItem({index, title, description, id}) {
  return (
    <>
      <li className="list-group-item"><Link to={`/incident/${id}`}>{index+1}. Заголовок: {title}. Описание: {description}</Link></li>
    </>
  )
}

export default ListItem

