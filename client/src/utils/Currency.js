// 통화 관련 모듈

// 숫자를 한국 통화로 변경(integer of korea currency)
export function intOfKr(value = 0) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 한국통화를 숫자로 변경(korea currency of integer)
const krOfInt = (value) => {
  return parseInt(value.replaceAll(",", ""));
};
