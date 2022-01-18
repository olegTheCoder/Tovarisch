import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function Incident() {
//  const dispatch = useDispatch()
const { id } = useParams()
  const allIncidents = useSelector((state) => state.incidents)
  const accident = allIncidents.find(el => el.id === Number(id))
 
   
  return (
    <div>
      <h1>Страница события</h1>
      <h2>Заголовок события: {accident.title}</h2>
      <h3>Описание события: {accident.description}</h3>
      <h3>Тип события: {accident.category}</h3>
      <h3>Комментарий пользователя, создавшего событие: {accident.comments}</h3>
    </div>
  )
}

export default Incident

