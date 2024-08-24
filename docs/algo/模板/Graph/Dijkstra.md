# Dijkstra

```go
import "container/heap"

// https://www.bilibili.com/video/BV1RK4y1d7ct?t=214.0&p=2
// https://www.luogu.com.cn/record/115759630
type dijkstraPairType interface {
	~int | ~int64 | string
}
type dijkstraPair[T dijkstraPairType] struct {
	val T
	// 其他
	dis int64
}
type dijkstraHeap[T dijkstraPairType] []dijkstraPair[T]

func (h *dijkstraHeap[T]) Len() int           { return len(*h) }
func (h *dijkstraHeap[T]) Less(i, j int) bool { return (*h)[i].dis < (*h)[j].dis } // < 为最小堆
func (h *dijkstraHeap[T]) Swap(i, j int)      { (*h)[i], (*h)[j] = (*h)[j], (*h)[i] }
func (h *dijkstraHeap[T]) Push(v interface{}) { *h = append(*h, v.(dijkstraPair[T])) }
func (h *dijkstraHeap[T]) Pop() interface{}   { a := *h; v := a[len(a)-1]; *h = a[:len(a)-1]; return v }

func (h *dijkstraHeap[T]) push(v dijkstraPair[T]) { heap.Push(h, v) }
func (h *dijkstraHeap[T]) pop() dijkstraPair[T]   { return heap.Pop(h).(dijkstraPair[T]) }
func (h *dijkstraHeap[T]) top() dijkstraPair[T]   { return (*h)[0] }

type edge struct {
	to int
	wt int64
}

func dijkstra(g [][]edge, n, start int) (dist []int64) {
	const inf int64 = 1e18 // 1e9+1
	dist = make([]int64, n)
	for i := range dist {
		dist[i] = inf
	}
	dist[start] = 0
	// 虽然可以用 dist 来判断是否需要 relax，但是对于一些变形题，用 vis 是最稳的
	vis := make([]bool, n)
	fa := make([]int, n)
	for i := range fa {
		fa[i] = -1
	}
	h := dijkstraHeap[int]{{start, 0}}
	for len(h) > 0 {
		p := h.pop()
		ver := p.val
		d := p.dis
		if vis[ver] { // p.dis > dist[ver]
			continue
		}
		vis[ver] = true
		for _, e := range g[ver] {
			w := e.wt
			if dist[e.to] > d+w {
				dist[e.to] = d + w
				fa[e.to] = ver
				h.push(dijkstraPair[int]{e.to, dist[e.to]})
			}
		}
	}

	// EXTRA: path from end to start
	// 记录边的编号 https://codeforces.com/problemset/problem/507/E
	//var path []int
	//end := n - 1
	//for x := end; x != -1; x = fa[x] {
	//  path = append(path, x)
	//}
	return
}

// 稠密图版本: https://icpc.qlu.edu.cn/solution/detail?id=94980, dx算法
func dijkstra2(g [][]int64, start int) []int64 {
	n := len(g)

	const inf int64 = 1e18 // 1e9+1
	dist := make([]int64, n)
	for i := range dist {
		dist[i] = inf
	}
	dist[start] = 0
	vis := make([]bool, n)
	for times := 1; times < n; times++ { // 枚举次数，只需要n-1轮就够了，因为最后一个点找到自己，也不会更新最短距离
		t := -1
		// 找到距离原点最近的点，用这个点去更新其他点
		for i := 0; i < n; i++ {
			if !vis[i] && (t == -1 || dist[i] < dist[t]) {
				t = i
			}
		}
		if t == -1 {
			break
		}
		// 加入圈内
		vis[t] = true
		// 更新t点的相邻点
		for i := 0; i < n; i++ {
			if dist[t]+g[t][i] < dist[i] {
				dist[i] = dist[t] + g[t][i]
			}
		}
	}
	return dist
}

```