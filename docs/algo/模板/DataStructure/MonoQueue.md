# Mono Queue

```go

// MqData https://oi-wiki.org/ds/monotonous-queue/#%E8%BF%87%E7%A8%8B
// https://www.luogu.com.cn/record/101022424
type MqData[T ~int | ~int64 | ~string] struct {
	Val T
	Del int // 懒删除标记(因为我们push的时候pop了一些，但是正常pop的时候是要包含push的时候pop掉的那些元素，所以需要有这个记录，我这个item当时push进去的时候pop了多少个)
}

// MonoQueue <= 维护区间最大值, >=维护区间最小值
// qMax := &MonoQueue[int]{Less: func(i, j $T$) bool { return i <= j }}
// qMin := &MonoQueue[int]{Less: func(i, j $T$) bool { return i >= j }}
type MonoQueue[T ~int | ~int64 | ~string] struct {
	Data []MqData[T]
	Size int // 单调队列对应的区间的长度
	Less func(i, j T) bool
}

func (mq *MonoQueue[T]) Push(v T) {
	mq.Size++
	d := MqData[T]{Val: v, Del: 1}
	for len(mq.Data) > 0 && mq.Less(mq.Data[len(mq.Data)-1].Val, d.Val) {
		d.Del += mq.Data[len(mq.Data)-1].Del
		mq.Data = mq.Data[:len(mq.Data)-1]
	}
	mq.Data = append(mq.Data, d)
}

func (mq *MonoQueue[T]) Pop() {
	mq.Size--
	if mq.Data[0].Del > 1 {
		mq.Data[0].Del--
	} else {
		mq.Data = mq.Data[1:]
	}
}

// Top 返回区间最值
// 调用前需保证 mq.size > 0
func (mq *MonoQueue[T]) Top() T {
	return mq.Data[0].Val
}

// https://leetcode.cn/problems/sliding-window-maximum/
func maxSlidingWindow(a []int, k int) []int {
	n := len(a)
	var ans []int
	qMax := &MonoQueue[int]{Less: func(i, j int) bool { return a[i] <= a[j] }}
	for i := 0; i < n; i++ {
		if qMax.Size >= k {
			qMax.Pop()
		}
		qMax.Push(i)
		if i >= k-1 {
			ans = append(ans, a[qMax.Top()])
		}
	}
	return ans
}

```