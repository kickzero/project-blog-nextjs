import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { actFetchNewItemAsync } from '../../store/comment/actions';
import styles from "./comments.module.css";
import Link from 'next/link';
import { Button } from '../shared/Button';
import { useGlobalState } from '@/state';

function CommentForm(props: any) {
  const {parentId, showForm = true} = props;
  // const dispatch = useDispatch();
  const [currentUser] = useGlobalState("currentUser");
  const [postIdDetail] = useGlobalState("postIdDetail");
  const [loading, setLoading] = useState(false);

  const [content, setContent] = useState('');

  if(!showForm) return <></>;

  function handleChange(event: any) {
    setContent(event.target.value);
  }

  function handleSubmit() {
    setLoading(true);
    const data = {
      author: currentUser.id,
      content,
      post: postIdDetail,
      parent: parentId 
    };
    // dispatch(actFetchNewItemAsync(data)).then((res: any) => {
    //     setLoading(false);
    // })
  }
  // console.log("currentUser", currentUser.simple_local_avatar?.full)
  if( !currentUser ) return (
    <p>Vui lòng <Link href="/login">Đăng nhập</Link> để bình luận</p>
  );
  
  return (
    <div className={styles["comments__form"]}>
      <div className={styles["comments__form--control"]}>
        <div className={styles["comments__section--avatar"]}>
          <a href="/">
            <img src={currentUser.simple_local_avatar?.full} alt="" />
          </a>
        </div>
        <textarea name="comment" onChange={handleChange}/>
      </div>
      <div className="text-right">
        <Button onClick={handleSubmit} loading={loading}>Bình luận</Button> 
      </div>
    </div>
  );
}

export default CommentForm;
