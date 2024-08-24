
# Prim 

```go
import "container/heap"

// https://oi-wiki.org/graph/mst/#prim
// 可视化 https://visualgo.net/zh/mst
// 模板题 https://www.luogu.com.cn/problem/P1546 https://www.luogu.com.cn/record/117117871
// g[i][i]需要是INF，避免自环影响
// 有些题目需要在连通分量上求 MST，这时就需要用到 start
func mstPrim(g [][]int, n, start int) (haveMst bool, minSum int64, mstEdges [][2]int) {
	const inf int = 2e9

	mstEdges = make([][2]int, 0, n-1)     // 最小生成树有n-1条边
	minD := make([]struct{ v, d int }, n) // minD[i].d 表示当前 MST 到点 i 的最小距离，对应的边为minD[i].v-i
	for i := range minD {
		minD[i].d = inf
	}
	minD[start].d = 0

	inMst := make([]bool, n) // 初始化时所以点都不在MST中, 注意不要加入start
	for times := 0; times < n; times++ {
		// 找到当前不在MST中的距离MST最近的点。
		t := -1
		for i := 0; i < n; i++ {
			if !inMst[i] && (t == -1 || minD[i].d < minD[t].d) {
				t = i
			}
		}
		if minD[t].d == inf {
			return false, 0, nil
		}
		// 加入MST
		inMst[t] = true
		minSum += int64(minD[t].d)
		if t != start {
			mstEdges = append(mstEdges, [2]int{t, minD[t].v})
		}
		// update t's adjacent edges min distance
		// 因为t已经加入了mst，需要更新t相邻的点到mst的距离
		for to, d := range g[t] {
			// d是t->to这条边的距离, 因为t已加入，所以如果d比当前minD[to]小，则需要更新minD[to]
			if !inMst[to] && d < minD[to].d { // 注：若 mstPrim 结束后 minD 无其他用途，!inMST[w] 的判断可以去掉
				minD[to].d = d
				minD[to].v = t // 是通过t点更新的
			}
		}
	}
	return len(mstEdges) == n-1, minSum, mstEdges
}

// prim 堆优化版
// 模板题https://www.luogu.com.cn/problem/P1546, https://www.luogu.com.cn/record/117118429
type primMstPair struct {
	v, u int
	dis  int64
}
type primMstHeap []primMstPair

func (h *primMstHeap) Len() int           { return len(*h) }
func (h *primMstHeap) Less(i, j int) bool { return (*h)[i].dis < (*h)[j].dis } // < 为最小堆
func (h *primMstHeap) Swap(i, j int)      { (*h)[i], (*h)[j] = (*h)[j], (*h)[i] }
func (h *primMstHeap) Push(v interface{}) { *h = append(*h, v.(primMstPair)) }
func (h *primMstHeap) Pop() interface{}   { a := *h; v := a[len(a)-1]; *h = a[:len(a)-1]; return v }

func (h *primMstHeap) push(v primMstPair) { heap.Push(h, v) }
func (h *primMstHeap) pop() primMstPair   { return heap.Pop(h).(primMstPair) }
func (h *primMstHeap) top() primMstPair   { return (*h)[0] }

// 优先队列优化的prim
func mstPrim2(g [][]edge, n, start int) (haveMst bool, minSum int64, mstEdges [][2]int) {
	const inf int64 = 2e9

	mstEdges = make([][2]int, 0, n-1) // 最小生成树有n-1条边
	minD := make([]int64, n)
	for i := range minD {
		minD[i] = inf
	}
	minD[start] = 0

	inMst := make([]bool, n) // 初始化时所有点都不在MST中, 注意不要加入start
	h := primMstHeap{{start, -1, 0}}
	for len(h) > 0 {
		p := h.pop()
		t := p.v
		if inMst[t] {
			continue
		}
		inMst[t] = true
		minSum += p.dis
		if t != start {
			mstEdges = append(mstEdges, [2]int{t, p.u})
		}
		// update t's adjacent edges min distance
		// 因为t已经加入了mst，需要更新t相邻的点到mst的距离
		for _, e := range g[t] {
			// d是t->to这条边的距离, 因为t已加入，所以如果d比当前minD[to]小，则需要更新minD[to]
			if !inMst[e.to] && e.wt < minD[e.to] { // 注：若 mstPrim 结束后 minD 无其他用途，!inMST[w] 的判断可以去掉
				minD[e.to] = e.wt
				h.push(primMstPair{e.to, t, minD[e.to]})
			}
		}
	}
	return len(mstEdges) == n-1, minSum, mstEdges
}

```