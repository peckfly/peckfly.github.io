# Sparse Table

```go
import "math/bits"

type ST[T ~int | ~int64 | ~float64] [][]T

// NewSparseTable example: https://www.luogu.com.cn/record/101541535 (快读)
func NewSparseTable[T ~int | ~int64 | ~float64](a []T) ST[T] {
	// st[i][j]表示从i开始长度为2^j次方长度的区间的最大值 st[i][j] = a[i ~ i+2^j-1]
	// 131072 = 2 ^ 17, 262144 = 2 ^ 18 但是 len(131072~262143)会返回18(实际上我们只需要用17(idx=0~17)), len(262144)返回19
	// 32 - __builtin_clz(n) == bits.Len(n)
	n := len(a)
	maxLog := bits.Len(uint(n)) // max_log = 32 - __builtin_clz(n);
	st := make(ST[T], n)
	for i, v := range a {
		st[i] = make([]T, maxLog)
		st[i][0] = v
	}
	for j := 1; j < maxLog; j++ {
		// 因为 st[i][j] = a[i ~ i+2^j-1],所以i+2^j-1 < n
		for i := 0; i+(1<<j)-1 < n; i++ {
			st[i][j] = st.Op(st[i][j-1], st[i+(1<<(j-1))][j-1])
		}
	}
	return st
}

// Query 查询区间 [l,r]，注意 l 和 r 是从 0 开始算的
func (st ST[T]) Query(from, to int) T {
	lg := bits.Len(uint(to-from+1)) - 1 //         int lg = 32 - __builtin_clz(to - from + 1) - 1;
	return st.Op(st[from][lg], st[to-(1<<lg)+1][lg])
}

// Op min, max, gcd, ...
func (st ST[T]) Op(a, b T) T { return st.max(a, b) }

func (ST[T]) max(a, b T) T {
	if a > b {
		return a
	}
	return b
}

```