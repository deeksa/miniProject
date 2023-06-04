import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import EachUserStory from '../EachUserStory'
import UserPost from '../UserPost'
import './index.css'
import Header from '../Header'
import SearchPage from '../SearchPage'

const apiConstants = {
  loading: 'Loading',
  completed: 'Completed',
  failure: 'Failure',
}
class HomePage extends Component {
  state = {
    apiStatus: '',
    apiPostStatus: '',
    userStatusList: [],
    userPostList: [],
    isSearchButtonTapped: false,
    searchInputText: '',
  }

  componentDidMount() {
    this.getUserStatus()
    this.getUserPost()
  }

  onTapSearchButton = e =>
    this.setState({isSearchButtonTapped: true, searchInputText: e})

  onTapLikeButton = async id => {
    const url = `https://apis.ccbp.in/insta-share/posts/${id}/like`
    const jwtToken = Cookies.get('jwt_token')
    const postObj = {
      like_status: true,
    }
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'POST',
      body: JSON.stringify(postObj),
    }
    const response = await fetch(url, options)
    console.log(response)
    this.setState(prevState => ({
      userPostList: prevState.userPostList.map(e => {
        if (e.postId === id) {
          return {...e, likeStatus: true, likesCount: e.likesCount + 1}
        }
        return e
      }),
    }))
  }

  onTapTrueLikeButton = async id => {
    const url = `https://apis.ccbp.in/insta-share/posts/${id}/like`
    const jwtToken = Cookies.get('jwt_token')
    const postObj = {
      like_status: true,
    }
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'POST',
      body: JSON.stringify(postObj),
    }
    const response = await fetch(url, options)
    console.log(response)
    this.setState(prevState => ({
      userPostList: prevState.userPostList.map(e => {
        if (e.postId === id) {
          return {...e, likeStatus: false, likesCount: e.likesCount - 1}
        }
        return e
      }),
    }))
  }

  getUpdatedUserStoryList = e => ({
    userId: e.user_id,
    userName: e.user_name,
    storyUrl: e.story_url,
  })

  getUserStatus = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },

      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const userStories = {usersStories: data.users_stories, total: data.total}
      const userStoriesList = userStories.usersStories.map(e =>
        this.getUpdatedUserStoryList(e),
      )
      console.log('data')
      this.setState({
        userStatusList: userStoriesList,
        apiStatus: apiConstants.completed,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  getPostDetails = details => ({
    imageUrl: details.image_url,
    caption: details.caption,
  })

  getPostComments = comments =>
    comments.map(e => ({
      userName: e.user_name,
      userId: e.user_id,
      comment: e.comment,
    }))

  getUpdatedData = e => ({
    postId: e.post_id,
    userId: e.user_id,
    userName: e.user_name,
    profilePic: e.profile_pic,
    postDetails: this.getPostDetails(e.post_details),
    likesCount: e.likes_count,
    comments: this.getPostComments(e.comments),
    createdAt: e.created_at,
    likeStatus: e.like_status,
  })

  getUpdatedUserPostList = posts => posts.map(e => this.getUpdatedData(e))

  getUserPost = async () => {
    this.setState({
      apiPostStatus: apiConstants.loading,
    })
    const url = 'https://apis.ccbp.in/insta-share/posts'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedUserPostList = this.getUpdatedUserPostList(data.posts)
      this.setState({
        userPostList: updatedUserPostList,
        apiPostStatus: apiConstants.completed,
      })
    } else {
      this.setState({
        apiPostStatus: apiConstants.failure,
      })
    }
  }

  renderLoader = () => (
    <div className="Stories" testid="loader">
      <Loader type="TailSpin" color="#0b69ff" height="20" width="20" />
    </div>
  )

  renderUsersStories = () => {
    const {userStatusList} = this.state
    const settings = {
      infinite: false,
      slidesToShow: 7,
      slidesToScroll: 1,
    }
    return (
      <div className="StoriesContainer">
        <div className="StoriesSlider">
          <Slider {...settings}>
            {userStatusList.map(e => (
              <EachUserStory each={e} key={e.userId} />
            ))}
          </Slider>
        </div>
      </div>
    )
  }

  renderStoriesFailurePage = () => (
    <div className="FailureStories">
      <img
        src="https://res.cloudinary.com/dywufvi3m/image/upload/v1685682927/Patherrorimg_ltfuyo.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.getUserStatus}>
        Try again
      </button>
    </div>
  )

  renderUsersStoriesInHome = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.loading:
        return this.renderLoader()
      case apiConstants.completed:
        return this.renderUsersStories()
      case apiConstants.failure:
        return this.renderStoriesFailurePage()

      default:
        return null
    }
  }

  renderUserPostUi = () => {
    const {userPostList} = this.state
    return (
      <ul className="unorderedList">
        {userPostList.map(e => (
          <UserPost
            each={e}
            key={e.postId}
            onTapLikeButton={this.onTapLikeButton}
            onTapTrueLikeButton={this.onTapTrueLikeButton}
          />
        ))}
      </ul>
    )
  }

  renderUserPostFailure = () => (
    <div className="FailurePosts">
      <img
        src="https://res.cloudinary.com/dywufvi3m/image/upload/v1685682927/Patherrorimg_ltfuyo.png"
        alt="error"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.getUserPost}>
        Try again
      </button>
    </div>
  )

  renderUserPosts = () => {
    const {apiPostStatus} = this.state
    switch (apiPostStatus) {
      case apiConstants.loading:
        return this.renderLoader()
      case apiConstants.completed:
        return this.renderUserPostUi()
      case apiConstants.failure:
        return this.renderUserPostFailure()

      default:
        return null
    }
  }

  render() {
    const {isSearchButtonTapped, searchInputText} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div>
        <Header onTapSearchButton={this.onTapSearchButton} />
        {isSearchButtonTapped ? (
          <SearchPage text={searchInputText} />
        ) : (
          <>
            {this.renderUsersStoriesInHome()}
            {this.renderUserPosts()}
          </>
        )}
      </div>
    )
  }
}
export default HomePage
