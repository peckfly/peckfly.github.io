
# Heap


```go
import "container/heap"

type HpType interface {
	~int | ~int64 | string
}
type Hp[T HpType] struct {
	val T
	// 其他
}

// < 为最小堆
type hp[T HpType] struct {
	arr []Hp[T]
	f   func(i, j T) bool // i < j 是最小堆
}

func (h *hp[T]) Len() int           { return len(h.arr) }
func (h *hp[T]) Less(i, j int) bool { return h.f(h.arr[i].val, h.arr[j].val) }
func (h *hp[T]) Swap(i, j int)      { (h.arr)[i], (h.arr)[j] = (h.arr)[j], (h.arr)[i] }
func (h *hp[T]) Push(v interface{}) { h.arr = append(h.arr, v.(Hp[T])) }
func (h *hp[T]) Pop() interface{}   { a := h.arr; v := a[len(a)-1]; h.arr = a[:len(a)-1]; return v }

func (h *hp[T]) push(v Hp[T]) { heap.Push(h, v) }
func (h *hp[T]) pop() Hp[T]   { return heap.Pop(h).(Hp[T]) }
func (h *hp[T]) top() Hp[T]   { return (h.arr)[0] }

// https://leetcode.cn/problems/last-stone-weight/
func lastStoneWeight(stones []int) int {
	q := &hp[int]{f: func(i, j int) bool {
		return i > j
	}}
	for _, store := range stones {
		q.push(Hp[int]{store})
	}
	for q.Len() > 1 {
		x, y := q.pop(), q.pop()
		if x.val > y.val {
			q.push(Hp[int]{x.val - y.val})
		}
	}
	if q.Len() > 0 {
		return q.top().val
	}
	return 0
}

```