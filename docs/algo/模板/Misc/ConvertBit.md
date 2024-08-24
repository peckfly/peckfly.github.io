# Convert 

```go
// https://leetcode.cn/problems/convert-to-base-2/solutions/2211859/jin-zhi-biao-da-shi-de-ben-zhi-bu-tong-y-1x4a/
func baseAny(n int, base int) string {
	if n == 0 {
		return "0"
	}
	var ans []byte
	for n != 0 {
		r := n % base
		if r < 0 {
			r -= base
		}
		n -= r
		if r >= 10 {
			ans = append(ans, byte('A'+r-10))
		} else {
			ans = append(ans, byte('0'+r))
		}
		n /= base
	}
	reverse(ans)
	return string(ans)
}

func reverse[T any](a []T) {
	for i, n := 0, len(a); i < n/2; i++ {
		a[i], a[n-1-i] = a[n-1-i], a[i]
	}
}
```