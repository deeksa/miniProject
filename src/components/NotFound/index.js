import './index.css'

const NotFound = props => {
  const onTapHomePage = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="NotFoundContainer">
      <img
        src="https://res.cloudinary.com/dywufvi3m/image/upload/v1685813966/erroring_1notFound_eeesvb.png"
        alt="page not found"
      />
      <h1>Page Not Found</h1>
      <p>we are sorry, the page you requested could not be found</p>
      <p>Please go back to the homepage.</p>
      <button type="button" onClick={onTapHomePage}>
        Home Page
      </button>
    </div>
  )
}
export default NotFound
