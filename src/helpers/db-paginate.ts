export const paginateRange = (page: number, limitItem: number, totalItem: number) => {
  let totPage = Math.trunc(totalItem / limitItem);
  totPage = totalItem / limitItem - totPage > 0 ? totPage + 1 : totPage;
  const nextPage = totPage > Number(page) ? Number(page) + 1 : null;
  const prevPage = Number(page) <= 1 ? null : Number(page) - 1;
  return { prevPage, activePage: Number(page), nextPage, totPage };
};

export const eatGetCollecc = (page: number, limit: number) => {
  const _toSkip = Number(page) - 1;
  const tolimit = Number(limit);
  const toSkip = _toSkip === 0 ? _toSkip : _toSkip * tolimit;
  return { toSkip, tolimit };
};
