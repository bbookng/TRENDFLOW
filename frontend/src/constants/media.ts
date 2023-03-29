export const BREAK_POINTS = {
  MOBILE: '576px',
  DESKTOP: '1160px',
};

export const MEDIA_QUERY = {
  // 기본 적으로 작성되는 CSS는 576px 보다 작은 화면에서 작동
  TABLET: `screen and (min-width:${BREAK_POINTS.MOBILE})`, // 576px ~ 1160px
  DESKTOP: `screen and (min-width:${BREAK_POINTS.DESKTOP})`, // 1160px 이상인 화면
};

export const MOBILE_MIN_WIDTH = 320;
export const MOBILE_MAX_WIDTH = 540;
