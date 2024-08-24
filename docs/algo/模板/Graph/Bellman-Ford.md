# Bellman-ford

```go
// 模板题: https://www.acwing.com/problem/content/1170/
// 模板题: https://www.luogu.com.cn/record/115772394
// https://www.bilibili.com/video/BV1RK4y1d7ct?t=370.7&p=3
// https://cp-algorithms.com/graph/bellman_ford.html#description-of-the-algorithm
// https://oi-wiki.org/graph/shortest-path/#bellman-ford-%E7%AE%97%E6%B3%95
// 核心思想就是枚举n-1轮，每次看能否通过这条边，让1号顶点到e.b这个顶点的距离变得更短(1->e.b变成1->e.a->e.b)
// 如果一个图没有负权环：那么从一个点到另外一个点的最短路径，最多只会经过所有的V个顶点(V-1条边)。否则，说明同一个顶点经过两次，那就是存在了负权环。
// 所以我们只需要对所有的点进行V-1次松弛操作，就找到了源点到其他所有点的最短路径。如果还可以继续松弛，则说明原图中存在从源点出发可以找到的负环。
/**
bellman-ford算法所做的，就是不断的对图上的每一条边进行松弛。每次进行一轮循环，就对图中所有的边进行一次松弛操作。当一次循环中没有可以松弛的边的时候，算法可以停止
vector<int> d(n, INF);
d[v] = 0;
for (int i = 0; i < n - 1; ++i) {
    bool f = false;
	for (Edge e : edges)
		if (d[e.a] < INF) {
			d[e.b] = min(d[e.b], d[e.a] + e.cost);
			f = true;
		}
	if (f) {
		break;
	}
}
*/
// 需要注意的是，以 S 点为源点跑 Bellman-Ford 算法时，如果没有给出存在负环的结果，只能说明从 S 点出发不能抵达一个负环，而不能说明图上不存在负环(其实就是图可能是不联通的(可能是森林))。
// 因此如果需要判断整个图上是否存在负环，最严谨的做法是建立一个超级源点，向图上每个节点连一条权值为 0 的边，然后以超级源点为起点执行 Bellman-Ford 算法。
// 可以支持重边和自环
func bellmanFord(g [][]edge, n, start int) (d []int64, haveNegCircle bool) {
	const inf int64 = 1e18
	d = make([]int64, n)
	for i := range d {
		d[i] = inf
	}
	d[start] = 0
	f := false
	var times int
	if n == 1 {
		// n次, 防止n=1的时候只有一个点，没有执行松弛操作(WA过), 或者可以先循环n-2次，再在最后再判断一次，类似这样: https://www.luogu.com.cn/record/64944765
		times = 0
	} else {
		// n-1次
		times = 1
	}
	for ; times < n; times++ { // n-1次
		f = false
		for i := 0; i < n; i++ {
			if d[i] == inf {
				continue
			}
			for _, e := range g[i] {
				if d[i]+e.wt < d[e.to] {
					d[e.to] = d[i] + e.wt
					f = true
				}
			}
		}
		if !f {
			// 没有进行过松弛了，说明已经找到最短路径, 直接break
			break
		}
	}
	// 如果f=false说明已找到最短路径(不需要继续再松弛)，f=true表示还可以继续松弛, 说明存在负环
	return d, f
}

```