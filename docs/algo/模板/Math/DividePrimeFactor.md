# Divide Prime Factor

```go
// 唯一分解定理
// O(sqrt(n))
func dividePrimeFactor[T ~int | ~int64](n T) [][2]T {
	var cnt [][2]T
	for i := T(2); i <= n/i; i++ {
		if n%i == 0 {
			s := T(0)
			for n%i == 0 {
				n /= i
				s++
			}
			cnt = append(cnt, [2]T{i, s})
		}
	}
	if n > 1 {
		cnt = append(cnt, [2]T{n, 1})
	}
	return cnt
}
```