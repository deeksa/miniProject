import './index.css'

const StoriesDisplay = props => {
  const {each, altStory} = props
  return (
    <li>
      <img src={each.image} alt={altStory} className="storiesDisplay" />
    </li>
  )
}
export default StoriesDisplay
