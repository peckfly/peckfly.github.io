
# Heap

[例题](https://leetcode.cn/problems/last-stone-weight/)

```go
type Heap[T any] struct {
    arr     []T
    compare func(i, j T) bool
}

func NewHeap[T any](compare func(i, j T) bool) *Heap[T] {
    return &Heap[T]{compare: compare}
}

func (h *Heap[T]) Len() int           { return len(h.arr) }
func (h *Heap[T]) Less(i, j int) bool { return h.compare(h.arr[i], h.arr[j]) }
func (h *Heap[T]) Swap(i, j int)      { h.arr[i], h.arr[j] = h.arr[j], h.arr[i] }
func (h *Heap[T]) Push(v interface{}) { h.arr = append(h.arr, v.(T)) }
func (h *Heap[T]) Pop() interface{}   { a := h.arr; v := a[len(a)-1]; h.arr = a[:len(a)-1]; return v }

func (h *Heap[T]) push(v T) { heap.Push(h, v) }
func (h *Heap[T]) pop() T   { return heap.Pop(h).(T) }
func (h *Heap[T]) top() T   { return h.arr[0] }

```