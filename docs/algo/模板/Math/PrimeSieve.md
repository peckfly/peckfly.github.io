
# Prime Sieve

```go
func SieveOfEratosthenes(n int) []bool {
	isPrimes := make([]bool, n+1)
	for i := range isPrimes {
		isPrimes[i] = true
	}
	isPrimes[0], isPrimes[1] = false, false
	for i := int64(2); i*i <= int64(n); i++ {
		if isPrimes[i] {
			for j := i * i; j <= int64(n); j += i {
				isPrimes[j] = false
			}
		}
	}
	return isPrimes
}

// LinearSieve https://www.luogu.com.cn/problem/P3383
// https://www.bilibili.com/video/BV1kG411u7Ze/
func LinearSieve(n int) ([]bool, []int) {
	notPrimes := make([]bool, n+1) // notPrimes[i] = false表示为质数
	notPrimes[0], notPrimes[1] = true, true
	var primes []int
	for i := 2; i <= n; i++ {
		if !notPrimes[i] {
			primes = append(primes, i)
		}
		for j := 0; int64(primes[j])*int64(i) <= int64(n); j++ { //除法比乘法慢，不用
			notPrimes[primes[j]*i] = true
			// 保证合数只被最小质因子筛掉
			// 若i是质数，则最多枚举到自身中断；若i是合数，最多枚举到自身的最小质因子中断
			if i%primes[j] == 0 {
				break
			}
		}
	}
	return notPrimes, primes
}

```