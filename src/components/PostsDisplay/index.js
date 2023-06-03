import './index.css'

const PostsDisplay = props => {
  const {each, altPost} = props
  return (
    <li>
      <img src={each.image} alt={altPost} className="postsDisplayImage" />
    </li>
  )
}
export default PostsDisplay
