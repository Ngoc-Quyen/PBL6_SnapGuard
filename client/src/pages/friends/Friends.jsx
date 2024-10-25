import React, { useState } from 'react';
import Friend from './Friend';
import { listInvitation } from '../../utils/dataTest';
import './friend.scss';
import { Link } from 'react-router-dom';
import ListFriendsRequest from './ListFriendsRequest';
import ListFriendsSuggestion from './ListFriendsSuggestion';
import ListFriendsRequestOut from './ListFriendsRequestGoOut';
import ListFriends from './ListFriends';
const Friends = () => {
    return (
        <div>
            {/* <ListFriends /> */}
            <ListFriendsRequest />
            <ListFriendsRequestOut />
            <ListFriendsSuggestion />
        </div>
    );
};

export default Friends;
