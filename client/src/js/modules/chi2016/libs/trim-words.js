export default (s, numWords) => {
  if (!s) {
    return s;
  }
  let expString = s.split(/\s+/,numWords);
  if (expString.length >= numWords) {
    return expString.join(' ') + '…';
  }
  return s;
};
