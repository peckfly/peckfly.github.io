
# Kruskal

```go
import "sort"

type mstEdge struct {
	from, to int
	w        int
}

// https://oi-wiki.org/graph/mst/#kruskal
// 适用于稀疏图 O(MLogM)，或者边已经按权值排序的情况
// 性质：
// - 对于不同的 MST，同一边权的边的个数都是相同的（应用见后面的最小生成树计数）
// - 对于任意正确加边方案，加完小于某权值的边后，图的连通性是一样的
// 模板题 https://www.luogu.com.cn/problem/P3366  https://www.luogu.com.cn/record/116881270
// https://codeforces.com/edu/course/2/lesson/7/2/practice/contest/289391/problem/E
// 题目推荐 https://cp-algorithms.com/graph/mst_kruskal.html#toc-tgt-5
func kruskal(edges []mstEdge, n int) (haveMst bool, minSum int64) {
	sort.Slice(edges, func(i, j int) bool { return edges[i].w < edges[j].w })
	p := make([]int, n)
	for i := 0; i < n; i++ {
		p[i] = i
	}
	var find func(x int) int
	find = func(x int) int {
		if x != p[x] {
			p[x] = find(p[x])
		}
		return p[x]
	}
	mstEdgeCnt := 0
	for _, e := range edges {
		ra, rb := find(e.from), find(e.to)
		if ra == rb {
			continue
		}
		p[ra] = rb
		minSum += int64(e.w)
		mstEdgeCnt++ // 记录mst的边数
	}
	// 不连通
	if mstEdgeCnt < n-1 {
		return false, 0
	}
	return true, minSum
}

```