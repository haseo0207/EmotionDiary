// input 박스에 전달할 날짜를 문자열로 변환하는 메서드
export const getStringedDate = (targetDate) => {
    // yyyy-mm-dd
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth() + 1;
    let date = targetDate.getDate();
  
    if (month < 10) {
      month = `0${month}`;
    }
    if (date < 10) {
      date = `0${date}`;
    }
  
    return `${year}-${month}-${date}`;
  };