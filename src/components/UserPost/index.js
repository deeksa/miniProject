import './index.css'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {FcLike} from 'react-icons/fc'
import {BiShareAlt} from 'react-icons/bi'
import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import CommentDisplay from '../CommentDisplay'

const UserPost = props => {
  const {each, onTapLikeButton, onTapTrueLikeButton} = props
  const onTapLike = () => {
    onTapLikeButton(each.postId)
  }
  const onTapTrueLike = () => {
    onTapTrueLikeButton(each.postId)
  }
  console.log(each.likeStatus)
  console.log('-------------------')

  return (
    <li>
      <div className="postsAlign">
        <div className="horizontalAlign">
          <img
            src={each.profilePic}
            alt="post author profile"
            className="postProfilePic"
          />
          <Link to={`/users/${each.userId}`}>{each.userName}</Link>
        </div>
        <img
          src={each.postDetails.imageUrl}
          alt="post"
          className="postContainerSize"
        />
        <div className="commentsContainer">
          <div className="horizontalAlign">
            {each.likeStatus === true ? (
              <button
                type="button"
                testid="likeIcon"
                className="iconButtonClass"
                onClick={onTapTrueLike}
              >
                <BsHeart size={25} className="iconMargin" />
              </button>
            ) : (
              <button
                type="button"
                testid="unLikeIcon"
                className="iconButtonClass"
                onClick={onTapLike}
              >
                <FcLike size={25} className="iconMargin" />
              </button>
            )}
            <FaRegComment size={25} className="iconMargin" />
            <BiShareAlt size={25} className="iconMargin" />
          </div>
          <p className="para1">{each.likesCount} likes</p>
          <p className="para2">{each.postDetails.caption}</p>
          <ul className="commentsUnorderedList">
            {each.comments.map(e => (
              <CommentDisplay each={e} key={e.userId} />
            ))}
          </ul>
          <p>{each.createdAt}</p>
        </div>
      </div>
    </li>
  )
}
export default withRouter(UserPost)
