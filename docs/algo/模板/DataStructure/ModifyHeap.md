
# Modify Heap


```go
type HeapElement[T any] struct {
    val T   // 元素值
    hi  int // 元素在堆中的索引，随着堆操作动态变化
}

type ModifiableHeap[T any] struct {
    arr     []*HeapElement[T] // 堆中存储的元素
    compare func(i, j T) bool
}

func NewModifiableHeap[T any](compare func(i, j T) bool) *ModifiableHeap[T] {
    return &ModifiableHeap[T]{compare: compare}
}

func (h *ModifiableHeap[T]) Len() int           { return len(h.arr) }
func (h *ModifiableHeap[T]) Less(i, j int) bool { return h.compare(h.arr[i].val, h.arr[j].val) }
func (h *ModifiableHeap[T]) Swap(i, j int) {
    h.arr[i], h.arr[j] = h.arr[j], h.arr[i]
    h.arr[i].hi = i
    h.arr[j].hi = j
}
func (h *ModifiableHeap[T]) Push(x interface{}) {
    element := x.(*HeapElement[T])
    element.hi = len(h.arr)
    h.arr = append(h.arr, element)
}
func (h *ModifiableHeap[T]) Pop() interface{} {
    old := h.arr
    n := len(old)
    element := old[n-1]
    h.arr = old[0 : n-1]
    return element
}

// push 插入一个新的元素到堆中，并返回该元素的指针
func (h *ModifiableHeap[T]) push(val T) *HeapElement[T] {
    element := &HeapElement[T]{val: val}
    heap.Push(h, element)
    return element
}
func (h *ModifiableHeap[T]) pop() *HeapElement[T]         { return heap.Pop(h).(*HeapElement[T]) }
func (h *ModifiableHeap[T]) top() *HeapElement[T]         { return h.arr[0] }
func (h *ModifiableHeap[T]) fix(i int)                    { heap.Fix(h, i) }
func (h *ModifiableHeap[T]) remove(i int) *HeapElement[T] { return heap.Remove(h, i).(*HeapElement[T]) }
```

[使用例子](https://leetcode.cn/problems/divide-an-array-into-subarrays-with-minimum-cost-ii/description/)

```go
/*
// 支持修改、删除指定元素的堆
// 用法：调用 push 会返回一个 *Mh 指针，记作 p
// 将 p 存于他处（如 slice 或 map），可直接在外部修改 p.v 后调用 fix(p.hi)，从而做到修改堆中指定元素
// 调用 remove(p.hi) 可以从堆中删除 p
*/
//func testModifyHeap() {
// // 创建一个最小堆，基于 int 类型
// minHeap := NewModifiableHeap[int](func(i, j int) bool {
//  return i < j
// })
// push1 := minHeap.push(1)
// push2 := minHeap.push(20)
// push3 := minHeap.push(10)
//
// fmt.Println(push1.val, push1.hi) // 输出: 1 0
// fmt.Println(push2.val, push2.hi) // 输出: 20 1
// fmt.Println(push3.val, push3.hi) // 输出: 10 2
// fmt.Println(minHeap.top().val)   // 输出: 1
//
// push1.val = 50
// minHeap.fix(push1.hi)          // 调整堆
// fmt.Println(minHeap.top().val) // 输出: 10
//
// minHeap.remove(0)              // 移除堆顶元素
// fmt.Println(minHeap.top().val) // 输出: 20
//}

```