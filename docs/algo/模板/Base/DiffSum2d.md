# 二维差分

```go

type Diff2dType interface {
	~int | ~int64 | float64
}

// Diff2d example: https://leetcode.cn/problems/increment-submatrices-by-one/
type Diff2d[T Diff2dType] struct {
	diff [][]T
	n, m int
}

// NewDiff2d 初始化二维差分
func NewDiff2d[T Diff2dType, V Diff2dType](a [][]V) Diff2d[T] {
	n, m := len(a), len(a[0])
	diff := make([][]T, n+2)
	for i := range diff {
		diff[i] = make([]T, m+2)
	}
	d2d := Diff2d[T]{
		n:    n,
		m:    m,
		diff: diff,
	}
	for i := 1; i <= n; i++ {
		for j := 1; j <= m; j++ {
			d2d.add(i, j, i, j, T(a[i-1][j-1]))
		}
	}
	return d2d
}

// x1,y1,x2,y2从1开始，将区域 x1<=r<=x2 && y1<=c<=y2 上的数都加上 x, 多 +1 是为了方便求前缀和
func (d2 *Diff2d[T]) add(x1, y1, x2, y2 int, x T) {
	d2.diff[x1][y1] += x
	d2.diff[x1][y2+1] -= x
	d2.diff[x2+1][y1] -= x
	d2.diff[x2+1][y2+1] += x
}

// 还原，求一次前缀和
func (d2 *Diff2d[T]) rollback() [][]T {
	// 切片不能直接 diff2 := d2.diff(数组是可以的), 可以用copy函数，但这里就不用了
	diff2 := make([][]T, d2.n+2)
	for i := range diff2 {
		diff2[i] = make([]T, d2.m+2)
		for j := 0; j < d2.m+2; j++ {
			diff2[i][j] = d2.diff[i][j]
		}
	}
	for i := 1; i <= d2.n; i++ {
		for j := 1; j <= d2.m; j++ {
			diff2[i][j] += diff2[i-1][j] + diff2[i][j-1] - diff2[i-1][j-1]
		}
	}
	// 保留中间 n*m 的部分，即为答案
	diff2 = diff2[1 : d2.n+1]
	for i, row := range diff2 {
		diff2[i] = row[1 : d2.m+1]
	}
	return diff2
}

// rangeAddQueries https://leetcode.cn/problems/increment-submatrices-by-one/
func rangeAddQueries(n int, queries [][]int) [][]int {
	base := make([][]int, n)
	for i := range base {
		base[i] = make([]int, n)
	}
	d2d := NewDiff2d[int, int](base)
	for _, q := range queries {
		d2d.add(q[0]+1, q[1]+1, q[2]+1, q[3]+1, 1)
	}
	return d2d.rollback()
}
```