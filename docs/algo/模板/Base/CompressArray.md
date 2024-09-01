
# Compress Array

```go
type CompressArray[T ~int | ~int64 | ~float64 | ~string] struct {
	v T
	i int
}

func NewCompressArray[T ~int | ~int64 | ~float64 | ~string](a []T, startIndex int) (kth []int) {
	c := &CompressArray[T]{}
	return c.compress(a, startIndex)
}

func (*CompressArray[T]) compress(a []T, startIndex int) (kth []int) {
	ps := make([]CompressArray[T], len(a))
	for i, v := range a {
		ps[i] = CompressArray[T]{v, i}
	}
	sort.Slice(ps, func(i, j int) bool { return ps[i].v < ps[j].v }) // or SliceStable
	kth = make([]int, len(a))

	// a 有重复元素
	k := startIndex
	for i, p := range ps {
		if i > 0 && p.v != ps[i-1].v {
			k++
		}
		kth[p.i] = k
	}
	// 若需要用 kth 值访问原始值，可以将 ps 去重后求 kth

	// a 无重复元素，或者给相同元素也加上顺序（例如某些求 kth 的题目）
	// for i, p := range ps {
	//	kth[p.i] = i + startIndex
	// }
	return
}

```