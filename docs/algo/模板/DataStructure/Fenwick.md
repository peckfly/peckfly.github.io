# Fenwick

```go
type Fenwick[T, R ~int | ~int64] struct {
	tr []T
}

func NewFenwickTree[T, R ~int | ~int64](n int) Fenwick[T, R] {
	return Fenwick[T, R]{make([]T, n+1)}
}

// Add 位置 i 增加 val, 1<=i<=n
func (f Fenwick[T, R]) Add(i int, x T) {
	for ; i < len(f.tr); i += i & -i {
		f.tr[i] += x
	}
}

// Query 求前缀和 [0,i], 0<=i<=n
// 用的时候ans最好用int64
func (f Fenwick[T, R]) Query(i int) (ans R) {
	for ; i > 0; i -= i & -i {
		ans += R(f.tr[i])
	}
	return
}

```