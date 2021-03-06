import { initialState } from './state';
import * as ActionTypes from './constants';

export default PlaylistPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_MUSIC_PLAYLIST: {
      return {
        ...state,
        isLoading: true,
        playlist: null
      }
    }
    case ActionTypes.GET_MUSIC_PLAYLIST_SUCCESS: {
      return {
        ...state,
        playlist: action.payload,
        isLoading: false,
        error: null,
      }
    }
    case ActionTypes.GET_MUSIC_PLAYLIST_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case ActionTypes.RESET_MUSIC_PLAYLIST: return initialState
    default: return state
  }
}
