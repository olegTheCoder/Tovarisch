import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addNewComment, getComment } from "../../redux/actions/commentActions";

const Comment = ({ id, accident }) => {
  const [text, setText] = useState("");
  const { title, description, category, comments, img } = accident;
  const comment = useSelector((state) => state.comment);
  const user = useSelector((state) => state.auth);
  const isLoggedIn = Object.values(user).every((value) => value !== null);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addNewComment(text, id));
    setText("");
  };

  useEffect(() => {
    dispatch(getComment(id));
  }, []);

  return (
    <div className={style.windowForm}>
      <div className={style.detailBox}>
        <div className={style.titleBox}>
          <label> {title}</label>
        </div>
        <div className={style.commentBox}>
          <p className={style.taskDescription}>{description}</p>
        </div>
        <div className={style.actionBox}>
          <ul className={style.commentList}>
            <li>
              <div className={style.commenterImage}>
                <img src="http://placekitten.com/50/50" />
              </div>
              <div className={style.commentText}>
                {comment.map((el) => {
                  return (
                    <div key={el.id}>
                      <p className="">{el.text}</p>
                      <i>
                        <div className="aaa">{el.nickname}</div>
                      </i>
                    </div>
                  );
                })}
              </div>
            </li>
          </ul>
          <div className="form-inline" role="form">
            {isLoggedIn && (
              <form onSubmit={submitHandler} className={style.formGroup}>
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="form-control"
                  type="text"
                  placeholder="Напишите комментарий"
                />
                <div className="formGroup">
                  <button type="submit" className="send btn btn-danger">
                    Отправить телеграмму
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
