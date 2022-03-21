import axios from "axios";

export function daysFormat(getDate) {
  const staticDate = new Date(getDate);
  const milliSeconds = new Date() - staticDate;
  // console.log('Time >> ', getDate, staticDate);
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  const years = days / 365;
  return `${Math.floor(years)}년 전`;
}

export function oneDaysFormat(getDate) {
  const staticDate = new Date(getDate);
  const milliSeconds = new Date() - staticDate;

  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  return `${Math.floor(days)}일 전`;
}

// 날짜를 보기 좋은 형태로 변환
// EX) 2022-02-20 05:17:43
export function timeFormat(getDate) {
  console.log("get data >> ", getDate);
  return getDate.replace("T", " ").substring(0, 19);
}

// 날짜를 보기 좋은 형태로 변환 (한국 시간으로 표기), 9시간 추가
// 1000(1초), 1000 * 60(1분), 1000 * 60 * 60(1시간), 1000 * 60 * 60 * 24(1일/24시간)
export function timeKrFormat(getDate) {
  // 9시간
  const ADD_TIME = 1000 * 60 * 60 * 9;

  let parseTime = Date.parse(getDate);
  parseTime += ADD_TIME;

  const newDate = new Date(parseTime);
  const ISODate = newDate.toISOString();

  return ISODate.replace("T", " ").substring(0, 19);
}

export function timeKrFormatAndMMDD(getDate = 0) {
  // 9시간
  const ADD_TIME = 1000 * 60 * 60 * 9;

  let parseTime = Date.parse(getDate);
  parseTime += ADD_TIME;

  const newDate = new Date(parseTime);
  // console.log("newDate >> ", newDate);
  const ISODate = newDate.toISOString();
  // console.log("ISODate >> ", ISODate);

  const formatMMDD = ISODate.replace("T", " ")
    .substring(5, 10)
    .replace("-", ". ");
  return formatMMDD;
}

export function changeTime(getDate) {
  // ====================================================
  // 게시물을 1달 전까진 오늘을 기준으로 시각을 출력하기 위한  함수입니다
  // getDate는 스트링으로 된 시각을 받고 함수 내에서 밀리초로 변환하여 사용함
  // ex) 5분전, 10분전, 4시간전, 3일전
  // 1달 이후부턴 년, 월, 일, 시간 순으로 출력
  // ex) 2041-03-04 05:43
  // ====================================================

  // server측에서 Date.now로 값을 바로 넣으니 오차없이 가져와졌다
  const staticDate = new Date(getDate);
  // (사용안함) MongoDB는 기본적으로 시간이 ISO 타입으로 저장된다고 하는데 이걸 다시 날짜객체로 만들어주면 내 위치가 한국이라 9시간이 더해지는 것 같다 그래서 다시 9시간을 빼준다.
  // staticDate.setHours(staticDate.getHours() - 9);

  //현재 시간을 불러온다
  const now = new Date();

  // 밀리초를 각각 초, 분, 시간, 하루 단위로 계산
  const millisecondsDiff = now - staticDate;
  const secondsDiff = millisecondsDiff / 1000;
  const minutesDiff = secondsDiff / 60;
  const hoursDiff = minutesDiff / 60;
  const daysDiff = hoursDiff / 24;

  // console.log("----- [ 현재시간 - 데이터 입력시간 ] -----");
  // console.log("원본 시간 > ", getDate);
  // console.log("밀리초 > ", millisecondsDiff);
  // console.log("초 > ", secondsDiff);
  // console.log("분 > ", minutesDiff);
  // console.log("시간 > ", hoursDiff);
  // console.log("일 > ", daysDiff);

  //1.5일 같은 날이 나오면 2일전으로 표기하기 위해 반드시 올림을 해서 반환한다
  //30일 초과105958904
  if (millisecondsDiff > 25_9200_0000) {
    // return getDate.replace('T', ' ').substring(0, 19);
    //1일 초과
  } else if (millisecondsDiff > 8640_0000) {
    return Math.ceil(daysDiff) + "일 전";

    //1시간 초과
  } else if (millisecondsDiff > 360_0000) {
    return Math.ceil(hoursDiff) + "시간 전";

    //1분 초과
  } else if (millisecondsDiff > 6_0000) {
    return Math.ceil(minutesDiff) + "분 전";

    //1분 미만, 초 단위는 오차가 조금 있어서 분 또는 방금전으로 대체
  } else {
    return "방금 전";
    // return Math.ceil(secondsDiff) + '초 전';
  }

  // 조건부의 숫자는 밀리초를 쪼개서 결과를 반환했습니다.
  // ==============================
  // 30일
  // 1000 * 60 * 60 * 24 * 30 =
  // 25_9200_0000
  // ==============================
  // 1일
  // 1000 * 60 * 60 * 24 =
  // 8640_0000
  // ==============================
  // 1시간
  // 1000 * 60 * 60 =
  // 360_0000
  // ==============================
  // 1분
  // 1000 * 60 =
  // 6_0000
  // ==============================
}
