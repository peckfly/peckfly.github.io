
# Math Base

```go
import "math/big"

// gcd gcd(a, b) = gcd(b, a % b)
func gcd[T ~int | ~int64](a, b T) T {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}

func lcm[T ~int | ~int64](a, b T) T {
	return a / gcd(a, b) * b
}

// 判断一个数是否为质数
func isPrime(n int64) bool {
	for i := int64(2); i*i <= n; i++ {
		if n%i == 0 {
			return false
		}
	}
	return n >= 2
}

// 判断一个数是否为质数
// https://www.luogu.com.cn/problem/U82118
func isPrime2(n int64) bool {
	return big.NewInt(n).ProbablyPrime(0)
}


```