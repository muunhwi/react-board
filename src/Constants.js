export const subInitialMenu = [
  { id: 1, parentId: 1, menu: "또드립" },
  { id: 2, parentId: 2, menu: "유저 게시글" },
  { id: 3, parentId: 2, menu: "붐업 베스트" },
  { id: 4, parentId: 3, menu: "읽을 거리 판" },
  { id: 5, parentId: 4, menu: "컴퓨터 / IT 판" },
];

export const selectMenu = [
  { id: 2, menu: "유저 게시글" },
  { id: 4, menu: "읽을 거리 판" },
  { id: 5, menu: "컴퓨터 / IT 판" },
];

const selectList = [
  {
    id: 1,
    menu: "제목",
  },
  {
    id: 2,
    menu: "닉네임",
  },
  {
    id: 3,
    menu: "컨탠츠",
  },
  {
    id: 4,
    menu: "제목/컨텐츠",
  },
];

export const initialMenu = [
  { id: 1, menu: "또드립" },
  { id: 2, menu: "유저 게시글" },
  { id: 3, menu: "읽을 거리 게시판" },
  { id: 4, menu: "커뮤니티" },
];

export const PageBtnClass = `
transition ease-in-out  bg-fuchsia-400 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300
text-xl flex justify-center items-center border rounded-full w-8 h-8 bg-purple-600 text-white
`;
