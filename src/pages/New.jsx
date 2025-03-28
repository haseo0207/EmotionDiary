import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";

const New = () => {
  const { handleCreate } = useContext(DiaryDispatchContext);
  const nav = useNavigate();

  const onSubmit = (input) => {
    handleCreate({
      createdDate: input.createdDate.getTime(),
      emotionId: input.emotionId,
      content: input.content
    });
    
    // 뒤로가기 방지
    nav("/", { replace: true });
  };

  return (
    <div>
      <Header
        title={"새 일기 쓰기"}
        leftChild={
          <Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />
        }
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;