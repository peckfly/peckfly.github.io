# Fenwick

```go
type fenwick[T, R ~int | ~int64] struct {
	tr []T
}

func NewFenwickTree[T, R ~int | ~int64](n int) fenwick[T, R] {
	return fenwick[T, R]{make([]T, n+1)}
}

// 位置 i 增加 val, 1<=i<=n
func (f fenwick[T, R]) add(i int, x T) {
	for ; i < len(f.tr); i += i & -i {
		f.tr[i] += x
	}
}

// 求前缀和 [0,i], 0<=i<=n
// 用的时候ans最好用int64
func (f fenwick[T, R]) sum(i int) (ans R) {
	for ; i > 0; i -= i & -i {
		ans += R(f.tr[i])
	}
	return
}
```