import "./App.css";
import { useReducer, useRef, createContext, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Notfound from "./pages/Notfound";
import { onCreate, onUpdate, onDelete } from "./util/diaryAction"

const mockData = [
  {
    id: 1,
    createdDate: new Date("2025-02-19").getTime(),
    emotionId: 1,
    content: "1번 일기 내용",
  },
  {
    id: 2,
    createdDate: new Date("2025-02-18").getTime(),
    emotionId: 2,
    content: "2번 일기 내용",
  },
  {
    id: 3,
    createdDate: new Date("2025-01-07").getTime(),
    emotionId: 3,
    content: "3번 일기 내용",
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        String(item.id) === String(action.data.id)
          ? { ...item, ...action.data }
          : item
      );
    case "DELETE":
      return state.filter(
        (item) => String(item.id) !== String(action.id)
      );
    default:
      return state;
  }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

const App = () => {

  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const handleCreate = useCallback(
    (data) => onCreate(dispatch, { id: idRef.current++, ...data }),
    []);
  const handleUpdate = useCallback((id, updates) => onUpdate(dispatch, id, updates), []);
  const handleDelete = useCallback((id) => onDelete(dispatch, id), []);

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider
          value={{
            handleCreate,
            handleUpdate,
            handleDelete,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;