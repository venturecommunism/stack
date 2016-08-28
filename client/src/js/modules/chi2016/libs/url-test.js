export default (url) => {
  return /^(f|ht)tps?:\/\//i.test(url);
};
