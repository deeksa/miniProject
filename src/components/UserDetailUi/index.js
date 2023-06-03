import './index.css'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import StoriesDisplay from '../StoriesDisplay'
import PostsDisplay from '../PostsDisplay'

const UserDetailUi = props => {
  const {each, altProfile, altStory, altPost} = props
  console.log(each)

  return (
    <div className="userDetailContainer">
      <div>
        <div className="horizontalAlign">
          <img
            src={each.profilePic}
            alt={altProfile}
            className="profilePicContainer"
          />
          <div>
            <h1>{each.userName}</h1>
            <div className="horizontalAlign">
              <div className="horizontalAlign detailMargin">
                <p className="para1">{each.postsCount} </p>
                <p>posts</p>
              </div>
              <div className="horizontalAlign detailMargin">
                <p className="para1">{each.followersCount} </p>
                <p>followers</p>
              </div>
              <div className="horizontalAlign detailMargin">
                <p className="para1">{each.followingCount} </p>
                <p>following</p>
              </div>
            </div>
            <p className="para1">{each.userId}</p>
            <p>{each.userBio}</p>
          </div>
        </div>

        <ul className="storiesDisplayList">
          {each.stories.map(e => (
            <StoriesDisplay key={e.id} each={e} altStory={altStory} />
          ))}
        </ul>
        <hr className="horizontalLine" />
        <div className="horizontalAlign">
          <BsGrid3X3 size={25} className="imageMargin" />
          <h1>Posts</h1>
        </div>
        {each.posts.length !== 0 ? (
          <ul className="postsDisplayList">
            {each.posts.map(e => (
              <PostsDisplay key={e.id} each={e} altPost={altPost} />
            ))}
          </ul>
        ) : (
          <div className="noPosts">
            <BiCamera size={100} className="biCamera" />
            <h1>No Posts Yet</h1>
          </div>
        )}
      </div>
    </div>
  )
}
export default UserDetailUi
