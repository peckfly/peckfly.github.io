
# Mono Stack 

```go

// https://www.luogu.com.cn/record/101599598
// f: i <= j --> max
// f: i >= j --> min
func monoStackLeft[T any](a []T, f func(T, T) bool) []int {
	n := len(a)
	r := make([]int, n)
	var s []int
	for i := 0; i < n; i++ {
		// if f = i <= j, pop all value that <= a[i], so top is bigger than a[i], so get a[i] left max
		for len(s) != 0 && f(a[s[len(s)-1]], a[i]) {
			s = s[:len(s)-1]
		}
		if len(s) != 0 {
			r[i] = s[len(s)-1]
		} else {
			r[i] = -1
		}
		s = append(s, i)
	}
	return r
}

// https://www.luogu.com.cn/record/101599598
// f: i <= j --> max
// f: i >= j --> min
func monoStackRight[T any](a []T, f func(T, T) bool) []int {
	n := len(a)
	r := make([]int, n)
	var s []int
	for i := n - 1; i >= 0; i-- {
		for len(s) != 0 && f(a[s[len(s)-1]], a[i]) {
			s = s[:len(s)-1]
		}
		if len(s) != 0 {
			r[i] = s[len(s)-1]
		} else {
			r[i] = n
		}
		s = append(s, i)
	}
	return r
}

```