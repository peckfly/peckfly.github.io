# Johnson

```go
// johnson全源最短路N*M*logM,稀疏图上优于floyd
// 模板题: https://www.luogu.com.cn/problem/P5905
// 提交记录: https://www.luogu.com.cn/record/115921758
// https://oi-wiki.org/graph/shortest-path/#johnson-%E5%85%A8%E6%BA%90%E6%9C%80%E7%9F%AD%E8%B7%AF%E5%BE%84%E7%AE%97%E6%B3%95
// 1、新建一个虚拟源点（如0或n)，从该点向其他所有点连一条边权为0的边。再用spfa算法求出该点到所有点的最短路，记做h[i]
// 2、将新图的边权改造为 w'(u, v)=w(u, v)+h(u)-h(v), 具体为什么和证明看dx算法
//
//	证明w'(u, v) >= 0
//	2.1、 0到v的最短路如果经过u，那么h(v) = h(u) + w(u, v)
//	2.2、 0到v的最短路如果不经过u，说明有其他的路比h(u) + w(u, v)短， 那么h(v) <= h(u) + w(u, v)
//
// 3、从每个点开始，跑dijkstra最短路
func shortestPathJohnson(g [][]edge, n int) (dist [][]int64, negCircle bool) {
	// 1、虚拟源点(记做点n)
	var virtual []edge
	for i := 0; i < n; i++ {
		virtual = append(virtual, edge{i, 0})
	}
	g = append(g, virtual)
	h, negCircle := spfa(g, n+1, n)
	if negCircle {
		// 负环
		return nil, true
	}
	// 2、修改边权
	for u := 0; u < n; u++ {
		for i, e := range g[u] {
			v := e.to
			g[u][i].wt += h[u] - h[v]
		}
	}
	const inf int64 = 1e18
	// 3、跑dijkstra
	dist = make([][]int64, n)
	for i := 0; i < n; i++ {
		d := dijkstra(g, n, i) // 注意传n，不需要考虑n这个点了
		for j := range d {
			if d[j] != inf {
				d[j] -= h[i] - h[j] // 还原
			}
		}
		dist[i] = d
	}
	return dist, false
}
```