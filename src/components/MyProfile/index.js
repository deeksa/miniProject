import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import UserDetailUi from '../UserDetailUi'
import Header from '../Header'
import SearchPage from '../SearchPage'

const apiConstants = {
  loading: 'Loading',
  success: 'Success',
  failure: 'Failure',
}
class MyProfile extends Component {
  state = {
    apiStatus: '',
    myProfile: {},
    isSearchButtonClicked: false,
    searchInput: '',
  }

  componentDidMount() {
    this.getMyProfile()
  }

  getPostsList = d => ({
    id: d.id,
    image: d.image,
  })

  getUpdatedMyProfile = detail => ({
    id: detail.id,
    userId: detail.user_id,
    userName: detail.user_name,
    profilePic: detail.profile_pic,
    followersCount: detail.followers_count,
    followingCount: detail.following_count,
    userBio: detail.user_bio,
    postsCount: detail.posts_count,
    posts: detail.posts.map(e => this.getPostsList(e)),
    stories: detail.stories.map(e => this.getPostsList(e)),
  })

  onTapSearchButton = e =>
    this.setState({isSearchButtonClicked: true, searchInput: e})

  getMyProfile = async () => {
    this.setState({
      apiStatus: apiConstants.loading,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/my-profile`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      console.log('id')
      const updatedMyProfile = {
        profile: this.getUpdatedMyProfile(data.profile),
      }
      this.setState({
        apiStatus: apiConstants.success,
        myProfile: updatedMyProfile,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderMyProfile = () => {
    const {myProfile, isSearchButtonClicked, searchInput} = this.state
    return (
      <>
        <Header onTapSearchButton={this.onTapSearchButton} />
        {isSearchButtonClicked ? (
          <SearchPage text={searchInput} />
        ) : (
          <UserDetailUi
            each={myProfile.profile}
            altProfile="my profile"
            altStory="my story"
            altPost="my post"
          />
        )}
      </>
    )
  }

  renderLoader = () => (
    <div className="Stories">
      <Loader type="TailSpin" color="#0b69ff" height="20" width="20" />
    </div>
  )

  onTapRetry = () => {
    this.getMyProfile()
  }

  renderFailure = () => (
    <div className="searchFailurePage">
      <img
        src="https://res.cloudinary.com/dywufvi3m/image/upload/v1685771638/Group_7522searchFailure_1_mx9skx.png"
        alt="failure view"
      />
      <p>Something went wrong.Please try again</p>
      <button type="button" onClick={this.onTapRetry}>
        Try again
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.loading:
        return this.renderLoader()
      case apiConstants.success:
        return this.renderMyProfile()
      case apiConstants.failure:
        return this.renderFailure()

      default:
        return null
    }
  }
}
export default MyProfile
