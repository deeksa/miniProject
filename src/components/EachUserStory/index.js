import './index.css'

const EachUserStory = props => {
  const {each} = props
  return (
    <div className="eachUserStory">
      <img
        src={each.storyUrl}
        alt="user story"
        className="eachUserStoryImage"
      />
      <p>{each.userName}</p>
    </div>
  )
}
export default EachUserStory
