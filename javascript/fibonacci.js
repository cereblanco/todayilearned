/**
Different Fibonacci Implementations in Javascript
1. Recursive fibonacci
2. Memoize version of recursive fibonacci -> improves recursive solution by using cache
3. Bottom-up implementation of fibonnaci -> optimized! solves `maximum recursion depth exceeded` in 1 & 2
4. Bottom-up implementation of fibonnaci that uses constant space complexity
*/

const fibRecursive = n => {
  if (n === 1 || n === 2) return n;
  return fibRecursive(n - 1) + fibRecursive(n - 2);
};

const fibMemoize = (n, cache = {}) => {
  if (cache[n]) return cache[n];
  if (n === 1 || n == 2) return n;
  result = fibMemoize(n - 1, cache) + fibMemoize(n - 2, cache);
  cache[n] = result;
  return cache[n];
};

const fibBottomUp = n => {
  cache = { 0: 0, 1: 1 };
  if (cache[n]) return cache[n];
  for (i = 2; i <= n; i++) {
    cache[i] = cache[i - 1] + cache[i - 2];
  }
  return cache[n];
};

const fibBottomUpO1Space = n => {
  first = second = 0;
  for (i = 1; i <= n; i++) {
    if (i == 1) {
      second = 1;
    } else {
      // tempFirst = first;
      // first = second;
      // second = first + tempFirst;
      // es6
      [first, second] = [second, first + second];
    }
  }
  return second;
};

console.log(fibBottomUp(1000));
console.log(fibBottomUpO1Space(1000));
