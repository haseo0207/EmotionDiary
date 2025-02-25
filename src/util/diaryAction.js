// 일기 생성
export const onCreate = (dispatch, data) => {
    dispatch({
        type: "CREATE",
        data,
    });
};

// 기존 일기 수정
export const onUpdate = (dispatch, id, updates) => {
    dispatch({
        type: "UPDATE",
        data: { id, ...updates },
    });
};

// 기존 일기 삭제
export const onDelete = (dispatch, id) => {
    dispatch({
        type: "DELETE",
        id,
    });
};