import React, { useState, useEffect } from 'react'
import './ConnectionsModal.css'
import Modal from '@material-ui/core/Modal';
import FriendsFollowing from '../FriendsFollowing'
import RelationshipFollowed from '../RelationshipFollowed'
import User from '../../utils/User'

const ConnectionsModal = (props) => {

  const [RelationshipFollowedState, setRelationshipFollowedState] = useState({
    friends: []
  })

  const [FriendsFollowingState, setFriendsFollowingState] = useState({
    friends: []
  })

  const RefreshFriendsFollowingState = () => {
    User.userRelationshipFollowingMe(props.userState.uid)
      .then((response) => {
        if (response.status === 200) {
          //setState(response)
          let result = []
          if (response.data !== null) {
            if (response.data.length > 0) {
              response.data.forEach(element => {
                result.push(element)
              })
            }
          }
          setFriendsFollowingState({ ...FriendsFollowingState, friends: result })
          //FriendsFollowing
          console.log(response)
          console.log(result)
        }
      })
  }

  const RefreshRelationshipFollowedState = () => {
    User.userRelationshipFollowingFollower(props.userState.uid)
      .then((response) => {
        if (response.status === 200) {
          //setState(response)
          let result = []
          if (response.data !== null) {
            if (response.data.length > 0) {
              response.data.forEach(element => {
                result.push(element)
              })
            }
          }
          setRelationshipFollowedState({ ...RelationshipFollowedState, friends: result })
          //RelationshipFollowedState
          console.log(response)
          console.log(result)
        }
      })
  }



  useEffect(() => {
    RefreshFriendsFollowingState()
    RefreshRelationshipFollowedState()
  }, [])


  const removeRelationshipFollowed = (item) => {

    User.userRelationshipFollowingIdDetach(
      item._id
    )
      .then(({ data: friends }) => {
        RelationshipFollowedState.friends.pop(item)
        RefreshFriendsFollowingState()
        RefreshRelationshipFollowedState()
    })
  }

  const removeFriendFollowing = (item) => {

    User.userRelationshipFollowingIdDetach(
      item._id
    )
      .then(({ data: friends }) => {
        RelationshipFollowedState.friends.pop(item)
        RefreshFriendsFollowingState()
        RefreshRelationshipFollowedState()
      })
  }

  const viewRelationshipFollowed = (item) => {
    props.changeCurrentViewRelationshipId(item.relationshipid)
  }


  return (
      <>
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={props.open}
          onClose={props.handleClose}
        >
          <div style={props.modalStyle} className={props.classes.paper}>
            <h2 id="simple-modal-title">Connections</h2>
            <p id="simple-modal-description">

            </p>
            <RelationshipFollowed 
              RelationshipFollowedState={RelationshipFollowedState}
              removeRelationshipFollowed={removeRelationshipFollowed}
              viewRelationshipFollowed={viewRelationshipFollowed}
            />
            <FriendsFollowing 
              friendsFollowingState={FriendsFollowingState}
              removeFriendFollowing={removeFriendFollowing}
            />
          </div>
        </Modal>
      </div>
      </>

  )
}

export default ConnectionsModal
