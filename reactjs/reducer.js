export default function reducer(state={
    data: [],
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_DATA": {
        return {...state, fetching: true}
      }
      case "FETCH_DATA_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_DATA_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          data: action.payload,
        }
      }
      case "ADD_DATA": {
        return {
          ...state,
          data: [...state.data, action.payload],
        }
      }
      case "UPDATE_DATA": {
        const { id, text } = action.payload
        const newdata = [...state.data]
        const dataToUpdate = newdata.findIndex(data => data.id === id)
        newdata[dataToUpdate] = action.payload;

        return {
          ...state,
          data: newdata,
        }
      }
      case "DELETE_DATA": {
        return {
          ...state,
          data: state.data.filter(data => data.id !== action.payload),
        }
      }
    }

    return state
}
