""" Different Fibonacci Implementations
1. Recursive fibonacci
2. Memoize version of recursive fibonacci -> improves recursive solution by using cache
3. Bottom-up implementation of fibonacci -> optimized! solves `maximum recursion depth exceeded` issue in 1 & 2
4. Bottom-up implementation of fibonacci that uses constant space complexity
"""


def fib_recursive(n):
    if n <= 1:
        return n
    return fib_recursive(n - 1) + fib_recursive(n - 2)


def fib_memoize(n, cache={}):
    if n in cache:
        return cache[n]
    if n <= 1:
        result = n
    else:
        result = fib_memoize(n - 1, cache) + fib_memoize(n - 2, cache)
    cache[n] = result
    return result


def fib_bottom_up(n):
    cache = {0: 0, 1: 1}
    if n <= 1:
        return cache[n]
    for i in range(2, n + 1):
        cache[i] = cache[i - 1] + cache[i - 2]
    return cache[n]


def fib_bottom_up_o1_space(n):
    first = second = 0
    for i in range(1, n + 1):
        if i == 1:
            second = 1
        else:
            first, second = second, first + second

    return second


if __name__ == "__main__":

    # uncomment to try solution 1
    # print(fib_recursive(1000))

    # uncomment to try solution 2
    # print(fib_memoize(1000))
    print(fib_bottom_up(1000))
    print(fib_bottom_up_o1_space(1000))
