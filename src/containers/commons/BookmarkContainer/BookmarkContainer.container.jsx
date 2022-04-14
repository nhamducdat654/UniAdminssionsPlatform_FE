import React from 'react'
import { useAppSelector, useAppDispatch } from '../../../app/hook'
import {
  addNewSavedByPostId,
  removeSavedByPostId,
  selectRecentSaveds,
  selectRecentRemoveds
} from '../../../app/bookmarks/bookmarksSlice'
import NcBookmark from '../../../components/commons/NcBookmarkProps/NcBookmarkProps.component'

const BookmarkContainer = props => {
  const { postId, initBookmarked } = props
  const recentSaveds = useAppSelector(selectRecentSaveds)
  const recentRemoveds = useAppSelector(selectRecentRemoveds)
  const dispatch = useAppDispatch()
  const isBookmarked = () => {
    if (recentSaveds.includes(postId)) {
      return true
    }
    if (initBookmarked && !recentRemoveds.includes(postId)) {
      return true
    }
    return false
  }

  const handleClickBookmark = () => {
    if (isBookmarked()) {
      dispatch(removeSavedByPostId(postId))
    } else {
      dispatch(addNewSavedByPostId(postId))
    }
  }

  return (
    <NcBookmark
      onClick={handleClickBookmark}
      isBookmarked={isBookmarked()}
      {...props}
    />
  )
}

export default BookmarkContainer
