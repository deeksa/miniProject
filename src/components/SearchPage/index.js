import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import UserPost from '../UserPost'
import './index.css'

const apiConstants = {
  loading: 'Loading',
  success: 'Success',
  failure: 'Failure',
}
class SearchPage extends Component {
  state = {
    apiStatus: '',
    postsSearchList: [],
  }

  componentDidMount() {
    this.getSearchResult()
  }

  getPostComments = comments =>
    comments.map(e => ({
      userName: e.user_name,
      userId: e.user_id,
      comment: e.comment,
    }))

  getPostDetails = details => ({
    imageUrl: details.image_url,
    caption: details.caption,
  })

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

  getSearchResult = async () => {
    const {text} = this.props
    this.setState({apiStatus: apiConstants.loading})
    const url = `https://apis.ccbp.in/insta-share/posts?search=${text}`
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
      const updatedUserPostSearchList = this.getUpdatedUserPostList(data.posts)
      console.log(updatedUserPostSearchList)
      this.setState({
        postsSearchList: updatedUserPostSearchList,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstants.Failure,
      })
    }
  }

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
      postsSearchList: prevState.postsSearchList.map(e => {
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
    const data = await response.json()
    this.setState(prevState => ({
      postsSearchList: prevState.postsSearchList.map(e => {
        if (e.postId === id) {
          return {...e, likeStatus: false, likesCount: e.likesCount - 1}
        }
        return e
      }),
    }))
  }

  renderLoader = () => (
    <div className="Stories">
      <Loader type="TailSpin" color="#0b69ff" height="20" width="20" />
    </div>
  )

  renderSearchResult = () => {
    const {postsSearchList} = this.state

    return postsSearchList.length !== 0 ? (
      <div>
        <h1 className="searchHeading">Search Results</h1>
        <ul className="searchOrderedList">
          {postsSearchList.map(e => (
            <UserPost
              each={e}
              key={e.postId}
              onTapLikeButton={this.onTapLikeButton}
              onTapTrueLikeButton={this.onTapTrueLikeButton}
            />
          ))}
        </ul>
      </div>
    ) : (
      <div className="searchFailurePage">
        <img
          src="https://res.cloudinary.com/dywufvi3m/image/upload/v1685772515/GroupemptySearch_ptrefn.png"
          alt="search not found"
        />
        <h1>Search Not Found</h1>
        <p>Try different keyword or search again</p>
      </div>
    )
  }

  onTapRetry = () => {
    this.getSearchResult()
  }

  renderFailurePage = () => (
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
        return this.renderSearchResult()
      case apiConstants.failure:
        return this.renderFailurePage()

      default:
        return null
    }
    // return (
    //   <div>
    //     <h1 className="searchHeading">Search Results</h1>
    //     <ul className="searchOrderedList">
    //       {postsSearchList.map(e => (
    //         <UserPost
    //           each={e}
    //           key={e.postId}
    //           onTapLikeButton={this.onTapLikeButton}
    //           onTapTrueLikeButton={this.onTapTrueLikeButton}
    //         />
    //       ))}
    //     </ul>
    //   </div>
    // )
  }
}
export default SearchPage
