const BASE_STYLES = `
  color: white;
  font-weight: 800;
  padding: 2px 5px 2px 5px;
`;

export const PREFIX_STYLE = `
  ${BASE_STYLES}
  background: #0C4767;
  border-radius: 50px 0 0 50px
`;

export const CLEAR_STYLE = `
  background: transparent;
  background-image: none;
  font-weight: 400;
`;

export const INFO_STYLE = `
  ${BASE_STYLES}
  background-image: linear-gradient(19deg, #FBDA61 0%, #FF5ACD 100%);
  border-radius: 0 50px 50px 0;
`;

export const EVENT_STYLE = `
  ${BASE_STYLES}
  background-color: #08AEEA;
  background-image: linear-gradient(19deg, #08AEEA 0%, #2AF598 100%);
  border-radius: 0 50px 50px 0;
`;

export const REQ_STYLE = `
  ${BASE_STYLES}
  background: rgb(0,134,255);
  background: linear-gradient(90deg, rgba(0,134,255,1) 0%, rgba(48,0,224,1) 100%);
  border-radius: 0 50px 50px 0;
`;

export const RES_STYLE = `
  ${BASE_STYLES}
  background: rgb(120,0,218);
  background: linear-gradient(90deg, rgba(120,0,218,1) 0%, rgba(102,37,83,1) 100%);
  border-radius: 0 50px 50px 0;
`;

export const WARN_STYLE = `
  ${BASE_STYLES}
  color: #B7972F;
  background-color: #FBDA61;
  background-image: linear-gradient(19deg, #FFF052 0%, #EDD892 100%);
  border-radius: 0 50px 50px 0;
`;

export const ERROR_STYLE = `
  ${BASE_STYLES}
  color: #FFBCBC;
  background-color: #FBDA61;
  background-image: linear-gradient(19deg, #E64055 0%, #BC1900 100%);
  border-radius: 0 50px 50px 0;
`;

export const SILLY_STYLE = `
  ${BASE_STYLES}
  background: linear-gradient(90deg, rgba(71,251,182,1) 0%, rgba(29,71,253,1) 50%, rgba(252,69,94,1) 100%);
  border-radius: 0 50px 50px 0;
`;

export const SILLY_STYLE_BODY = `
  ${CLEAR_STYLE}
  font-weight: bold;
  font-size: 50px;
  color: #62fb47;
  padding: 0 20px 20px 0;
  text-shadow:
    3px 3px 0 rgb(64,215,183),
    6px 6px 0 rgb(47,146,217),
    9px 9px 0 rgb(29,71,253),
    12px 12px 0 rgb(136,70,222),
    15px 15px 0 rgb(252,69,189),
    18px 18px 0 rgb(252,69,94);
`;
