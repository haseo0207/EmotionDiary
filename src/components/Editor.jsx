import "./Editor.css";
import EmotionItem from "./EmotionItem";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { emotionList } from "../util/constants";
import { getStringedDate } from "../util/get-stringed-date";

const Editor = ({ initData, onSubmit }) => {
    const [input, setInput] = useState({
        createdDate: new Date(),
        emotionId: 3,
        content: "",
    });

    const nav = useNavigate();

    useEffect(() => {
        if (initData) {
            setInput({
                ...initData,
                // initData는 App에서 가져온 타임스탬프로 날짜값을 가지고 있음
                // Editor에서는 input의 기본값이 Date 값이기 때문에 변환시켜야함
                createdDate: new Date(Number(initData.createdDate)),
            });
        }
    }, [initData]);

    const onChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        // Date 객체로 형변환
        if (name === "createdDate") {
            value = new Date(value);
        }

        setInput({
            ...input,
            [name]: value,
        });
    };

    const onSubmitButtonClick = () => {
        onSubmit(input);
    };

    return (
        <div className="Editor">
            <section className="date_section">
                <h4>오늘의 날짜</h4>
                <input
                    name="createdDate"
                    onChange={onChangeInput}
                    value={getStringedDate(input.createdDate)}
                    type="date"
                />
            </section>
            <section className="emotion_section">
                <h4>오늘의 감정</h4>
                <div className="emotion_list_wrapper">
                    {emotionList.map((item) => (
                        <EmotionItem
                            onClick={() =>
                                onChangeInput({
                                    target: {
                                        name: "emotionId",
                                        value: item.emotionId,
                                    },
                                })
                            }
                            key={item.emotionId}
                            {...item}
                            isSelected={item.emotionId === input.emotionId}
                        />
                    ))}
                </div>
            </section>
            <section className="content_section">
                <h4>오늘의 일기</h4>
                <textarea
                    name="content"
                    value={input.content}
                    onChange={onChangeInput}
                    placeholder="오늘은 어땠나요?"
                />
            </section>
            <section className="button_section">
                <Button onClick={() => nav(-1)} text={"취소하기"} />
                <Button
                    onClick={onSubmitButtonClick}
                    text={"작성완료"}
                    type={"POSITIVE"}
                />
            </section>
        </div>
    );
};

export default Editor;