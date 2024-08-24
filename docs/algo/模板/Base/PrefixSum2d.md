
# Prefix Sums 2d

```go

type PrefixSumType interface {
	~int | ~int64
}

type PrefixSum2d[T PrefixSumType] struct {
	prefixSums [][]T
}

func NewPrefixSum2d[T, V PrefixSumType](a [][]V) PrefixSum2d[T] {
	n, m := len(a), len(a[0])
	prefixSums := make([][]T, n+1)
	for i := range prefixSums {
		prefixSums[i] = make([]T, m+1)
	}
	for i := 0; i < n; i++ {
		for j := 0; j < m; j++ {
			prefixSums[i+1][j+1] = prefixSums[i+1][j] + prefixSums[i][j+1] - prefixSums[i][j] + T(a[i][j])
		}
	}
	return PrefixSum2d[T]{prefixSums: prefixSums}
}

func (m *PrefixSum2d[T]) SumRegion(r1 int, c1 int, r2 int, c2 int) T {
	return m.prefixSums[r2+1][c2+1] - m.prefixSums[r1][c2+1] - m.prefixSums[r2+1][c1] + m.prefixSums[r1][c1]
}

// NumMatrix https://leetcode.cn/problems/range-sum-query-2d-immutable/
type NumMatrix struct {
	p2d PrefixSum2d[int64]
}

func Constructor(matrix [][]int) NumMatrix {
	return NumMatrix{p2d: NewPrefixSum2d[int64, int](matrix)}
}

func (m *NumMatrix) SumRegion(r1 int, c1 int, r2 int, c2 int) int {
	return int(m.p2d.SumRegion(r1, c1, r2, c2))
}

```