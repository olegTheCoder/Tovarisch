import React, {useState} from 'react'
import style from './style.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {addNewComment} from '../../redux/actions/commentActions'
import {useParams} from 'react-router-dom'

const Comment = ({id, accident}) => {

    let now = new Date().toLocaleString()

    const [text, setText] = useState('')
    const {title, description, category, comments, img} = accident



    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addNewComment({id, text}))
        setText('')
    }

    const comment = useSelector((state) => state.comment)
    // console.log(comment)


    return (
        <div className={style.windowForm}>
            <div className={style.detailBox}>
                <div className={style.titleBox}>
                    <label> {title}</label>
                    {/*<button type="button" className={style.close} aria-hidden="true">&times;</button>*/}
                </div>
                <div className={style.commentBox}>

                    <p className={style.taskDescription}>{description}</p>
                </div>
                <div className={style.actionBox}>
                    <ul className={style.commentList}>
                        <li>
                            <div className={style.commenterImage}>
                                <img src="http://placekitten.com/50/50"/>
                            </div>
                            <div className={style.commentText}>
                                {comment.map((el) => {
                                    return (
                                        <>
                                            <p className="">{el}</p>
                                            <span className={`date ${style.subText}`}>{now}</span>
                                        </>
                                    )

                                })}

                            </div>
                        </li>
                        <li>
                            <div className={style.commenterImage}>
                                <img src="http://placekitten.com/45/45"/>
                            </div>
                            <div className={style.commentText}>
                                <p className="">Hello this is a test comment and this comment is particularly very long
                                    and it goes on and on and on.</p> <span
                                className={`date ${style.subText}`}>{now}</span>

                            </div>
                        </li>
                        <li>
                            <div className={style.commenterImage}>
                                <img src="http://placekitten.com/40/40"/>
                            </div>
                            <div className={style.commentText}>
                                <p className="">Hello this is a test comment.</p> <span
                                className={`date ${style.subText}`}>{now}</span>

                            </div>
                        </li>
                    </ul>
                    <div className="form-inline" role="form">
                        <form onSubmit={submitHandler} className={style.formGroup}>
                            <input value={text} onChange={(e) => setText(e.target.value)} className="form-control"
                                   type="text" placeholder="Your comments"/>
                            <div className="formGroup">
                                <button type="submit" className="btn btn-danger">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment