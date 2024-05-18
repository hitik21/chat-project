// chatReducer.js
import { eventWrapper } from '@testing-library/user-event/dist/utils';
import { ADD_MESSAGE, CREATE_CHAT, CLOSE_CHAT, DELETE_CHAT, CURRENT_CHAT } from '../actions';

const initialState = {
  chats: {},
  openChats: [],
  currentChat: null 
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CHAT:
  const  newChatId  = action.payload.chatId;
  if (state.chats.hasOwnProperty(newChatId)) {
    if (!state.openChats.includes(newChatId)) {
      return {
        ...state,
        openChats: [...state.openChats, newChatId]
      };
    }
  } else {
    return {
      ...state,
      chats: {
        ...state.chats,
        [newChatId]: []
      },
      openChats: [...state.openChats, newChatId]
    };
  }
  return state;
    case ADD_MESSAGE:
      const { chatId, user, message, timestamp } = action.payload;
      return {
        ...state,
        chats: {
          ...state.chats,
          [chatId]: [
            ...(state.chats[chatId] || []),
            { user, message, timestamp }
          ]
        }
      };
    case CURRENT_CHAT:
      const currentChatId = action.payload.chatId;
      if (!state.openChats.includes(currentChatId)) {
        return {
          ...state,
          openChats: [...state.openChats, currentChatId], 
          currentChat: currentChatId
        };
      }
      return {
        ...state,
        currentChat: currentChatId
      };
    case CLOSE_CHAT:
      const updatedOpenChats = state.openChats.filter(id => id !== action.payload.chatId);
      return {
        ...state,
        openChats: updatedOpenChats,
        currentChat: state.currentChat === action.payload.chatId ? null : state.currentChat 
      };
    case DELETE_CHAT:
      const { [action.payload.chatId]: _, ...remainingChats } = state.chats;
      return {
        ...state,
        chats: remainingChats,
        openChats: state.openChats.filter(id => id !== action.payload.chatId),
        currentChat: state.currentChat === action.payload.chatId ? null : state.currentChat 
      };
    default:
      return state;
  }
};

export default chatReducer;
