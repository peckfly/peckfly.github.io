
# Modify Heap

```go
import "container/heap"

// 支持修改、删除指定元素的堆
// 用法：调用 push 会返回一个 *Mh 指针，记作 p
// 将 p 存于他处（如 slice 或 map），可直接在外部修改 p.v 后调用 fix(p.hi)，从而做到修改堆中指定元素
// 调用 remove(p.hi) 可以从堆中删除 p
//mp := &mh[int]{f: func(i, j int) bool {
//return i < j
//}}
//push1 := mp.push(1)
//push2 := mp.push(20)
//push3 := mp.push(10)
//println(push1.val, push1.hi) // 1 0
//println(push2.val, push2.hi) // 20 1
//println(push3.val, push3.hi) // 10 2
//println(mp.top().val) // 1
//push1.val = 50
//mp.fix(push1.hi)      // 调整
//println(mp.top().val) // 10
//mp.remove(0)          // 移除第一个，传递的是hi(index)
//println(mp.top().val) // 20

// 使用例子：https://leetcode.cn/problems/divide-an-array-into-subarrays-with-minimum-cost-ii/description/

type MhType interface {
	~int | ~int64 | string
}
type Mh[T MhType] struct {
	val T
	idx int
	hi  int // *Mh 在 mh 中的下标，可随着 Push Pop 等操作自动改变 （会动态变化)
	// 其他
}
type mh[T MhType] struct {
	arr []*Mh[T] // mh 指 modifiable heap
	f   func(i, j T) bool
}

func (h *mh[T]) Len() int           { return len(h.arr) }
func (h *mh[T]) Less(i, j int) bool { return h.f(h.arr[i].val, h.arr[j].val) } // < 为最小堆
func (h *mh[T]) Swap(i, j int) {
	(h.arr)[i], (h.arr)[j] = (h.arr)[j], (h.arr)[i]
	(h.arr)[i].hi = i
	(h.arr)[j].hi = j
}
func (h *mh[T]) Push(v interface{}) { h.arr = append(h.arr, v.(*Mh[T])) }
func (h *mh[T]) Pop() interface{}   { a := h.arr; v := a[len(a)-1]; h.arr = a[:len(a)-1]; return v }

func (h *mh[T]) push(v *Mh[T]) *Mh[T] { v.hi = len(h.arr); heap.Push(h, v); return v }
func (h *mh[T]) pop() *Mh[T]          { return heap.Pop(h).(*Mh[T]) }
func (h *mh[T]) top() *Mh[T]          { return (h.arr)[0] }
func (h *mh[T]) fix(i int)            { heap.Fix(h, i) }
func (h *mh[T]) remove(i int) *Mh[T]  { return heap.Remove(h, i).(*Mh[T]) }

```