
# Bipartite

```go
// 二分图: 如果一张无向图的N个节点可以分成A、B两个不相交的非空集合，并且每个集合内的点之间没有边相连，那么称该无向图为二分图
// 定理: 二分图不存在奇环(如果存在奇环。 因为每一条边都是从一个集合走到另一个集合，只有走偶数次，才可能回到同一个集合。
// https://cp-algorithms.com/graph/bipartite-check.html
// 模板题 LC886 https://leetcode.cn/problems/possible-bipartition/ 
// 0 表示未访问该节点
// 1 表示左边集合的颜色，2表示右边的集合的颜色
func isBipartite(g [][]int, n int) bool {
	colors := make([]int8, n)
	// 返回是否有矛盾
	var dfs func(int, int8) bool
	dfs = func(u int, c int8) bool {
		colors[u] = c // 先把当前点染色
		for _, to := range g[u] {
			// 尝试把相邻的点染成反的颜色
			if colors[to] == 0 {
				if !dfs(to, 3-c) {
					// 无法把to染色成相反颜色，返回false
					return false
				}
			} else if colors[to] == c {
				// 如果已经染色了，则需要判断是否矛盾, 一条边的两个点不能有同样的颜色(也就是同一个集合内没有连边)
				return false
			}
		}
		return true
	}
	// 遍历左边的
	for i := 0; i < n; i++ {
		// 如果还没有被访问
		if colors[i] == 0 && !dfs(i, 1) {
			return false
		}
	}
	return true
}

```