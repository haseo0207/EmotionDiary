import emotion1 from "./../assets/emotion1.png";
import emotion2 from "./../assets/emotion2.png";
import emotion3 from "./../assets/emotion3.png";
import emotion4 from "./../assets/emotion4.png";
import emotion5 from "./../assets/emotion5.png";

// 이미지 반환
export const getEmotionImage = (emotionId) => {
    switch (emotionId) {
        case 1:
          return emotion1; // 완전좋음
        case 2:
          return emotion2; // 좋음
        case 3: 
          return emotion3; // 그럭저럭
        case 4:
          return emotion4; // 나쁨
        case 5:
          return emotion5; // 끔찍함
        default:
          return null;
      }
};