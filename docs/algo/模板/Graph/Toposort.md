
# Topo Sort

```go
// https://www.luogu.com.cn/record/113209256
// 拓扑排序: 可以用来判断有向图是否有环、求 DAG 上的 DP, 参考dx算法
// 拓扑序是否唯一：任意时刻队列中不能有超过一个元素
func topSort(g [][]int) (orders []int, unique bool) {
	n := len(g)
	deg := make([]int, n) // 记录每个点的入度
	for i := range g {
		for _, to := range g[i] {
			deg[to]++
		}
	}
	var q []int
	for i := 0; i < n; i++ {
		if deg[i] == 0 {
			q = append(q, i)
		}
	}
	unique = true // 返回序列是否唯一
	orders = make([]int, 0)
	for len(q) > 0 {
		if len(q) > 1 {
			unique = false
		}
		t := q[0]
		q = q[1:]
		orders = append(orders, t)
		for _, to := range g[t] {
			if deg[to]--; deg[to] == 0 {
				q = append(q, to)
			}
		}
	}
	// 如果len(orders) == n 表示存在拓扑序, 否则是有环
	return orders, unique
}

```