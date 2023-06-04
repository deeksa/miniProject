import './index.css'

const CommentDisplay = props => {
  const {each} = props
  return (
    <li>
      <div className="horizontalAlign">
        <p className="para1">
          <span>{each.userName} </span>
        </p>
        <p>{each.comment}</p>
      </div>
    </li>
  )
}
export default CommentDisplay
