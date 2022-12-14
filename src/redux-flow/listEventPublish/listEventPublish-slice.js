/* eslint-disable */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getListEventService } from '../../services/EventService';
import { EVENT, EVENT_CHECK, EVENT_HS } from '../../constants/AppConst';
import { notification } from 'antd';
import { storeListEventPublish } from './listEventPublish-action';

export const fetchListEventPublish = createAsyncThunk(
  'listEvent/fetch_list_event_publish',
  async (payload, { dispatch, rejectWithValue }) => {
    const param = {
      page: payload.page ? payload.page : 1,
      limit: payload.limit ? payload.limit : 10,
      status: payload.status ? payload.status : EVENT.ON_GOING
    };
    await getListEventService(param)
      .then(async (res) => {
        dispatch(storeListEventPublish(res.data.data.list));
      })
      .catch((err) => {
        notification.error({
          message: 'Lỗi!',
          description: `Đã có lỗi xảy ra. Vui lòng reload lại website!`
        });
        return rejectWithValue(err.response);
      });
  }
);

const listEventPublishSlice = createSlice({
  name: 'listEventPublish',
  initialState: {
    data: [],
    isFetching: true,
    listEventPublish: {}
  },
  reducers: {
    storeListEventPublish: (state, action) => {
      return {
        ...state,
        listEventPublish: action.payload,
        isFetching: false
      };
    },
    cleanListEventPublish: (state) => {
      return { ...state, listEventPublish: {} };
    }
  }
});

export const listEventPublishAction = listEventPublishSlice.actions;
export default listEventPublishSlice.reducer;
