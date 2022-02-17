// \n로 구성된 줄바꿈 문자열을 <br>로 변환해준다

// 실패
export const textWrap = (string) => {
  console.log(string);
  console.log(string.split("\n", "<br>"));
  console.log(string.replaceAll("\n", "<br>"));
  return string.replaceAll("\n", "{<br/>}");
};
