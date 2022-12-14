import { SINGLE } from '../../../data/single';
import PostCardCommentBtn from '../PostCardCommentBtn/PostCardCommentBtn.component';
import React from 'react';

const PostCardLikeAndComment = ({
  className = '',
  itemClass = 'px-3 h-8 text-xs',
  hiddenCommentOnMobile = true,
  event
}) => (
  <div
    className={`nc-PostCardLikeAndComment flex items-center space-x-2 ${className}`}
    data-nc-id='PostCardLikeAndComment'>
    <PostCardCommentBtn
      href={SINGLE.href}
      commentCount={SINGLE.commentCount}
      className={`${hiddenCommentOnMobile ? 'hidden sm:flex' : 'flex'}  ${itemClass}`}
    />
  </div>
);

export default PostCardLikeAndComment;
