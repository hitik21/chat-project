
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const CREATE_CHAT = 'CREATE_CHAT';
export const CURRENT_CHAT='CURRENT_CHAT';
export const DELETE_CHAT='DELETE_CHAT';
export const CLOSE_CHAT = 'CLOSE_CHAT';

export const addMessage = (chatId, user, message) => {
    return (dispatch) => {
      dispatch({
        type: ADD_MESSAGE,
        payload: { chatId, user, message, timestamp: new Date().toISOString() }
      });
  
      setTimeout(() => {
        const otherUserId = chatId; 
        const randomMessage = getRandomMessage(); 
        dispatch({
          type: ADD_MESSAGE,
          payload: { chatId, user: otherUserId, message: randomMessage, timestamp: new Date().toISOString() }
        });
      }, 1000); 
    };
  };

export const createChat = (chatId) => ({
  type: CREATE_CHAT,
  payload: { chatId }
});

export const currentChat = (chatId) => ({
  type: CURRENT_CHAT,
  payload: { chatId }
});
export const deleteChat = (chatId) => ({
    type: DELETE_CHAT,
    payload: { chatId }
  });


export const closeChat = (chatId) => ({
  type: CLOSE_CHAT,
  payload: { chatId }
});

export const getRandomMessage = () => {
    const messages = [
      "Hello!",
      "How are you?",
      "Nice to meet you!",
      "What's up?",
      "How's your day going?",
      "I'm here to help!"
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  };