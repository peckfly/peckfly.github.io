# Hungarian

```go
// 【推荐】可视化 https://visualgo.net/zh/matching 选择「图示 - CP4 3.11a*」，然后选择「增广路 - 标准」
// https://www.renfei.org/blog/bipartite-matching.html 推荐
// https://zhuanlan.zhihu.com/p/96229700
// 模板题 https://www.luogu.com.cn/problem/P3386 https://www.luogu.com.cn/record/117127152
// bfs版本: https://www.luogu.com.cn/record/108397286
func hungarian(g [][]int, n int) (match []int, cnt int) {
	match = make([]int, n)
	for i := range match {
		match[i] = -1 // 一开始所有人都没有匹配
	}
	var vis []bool // 记录是否访问过

	// 返回是否可以为u找到匹配对象
	var dfs func(int) bool
	dfs = func(u int) bool {
		for _, to := range g[u] {
			if vis[to] {
				continue // 已访问过，考虑过了
			}
			vis[to] = true
			if match[to] == -1 || dfs(match[to]) {
				// 如果还没匹配过，或者可以未已匹配的那个人找到新的匹配
				match[u] = to
				match[to] = u
				return true
			}
		}
		return false
	}
	for i := range match {
		if match[i] == -1 { // 还没匹配过
			// 重新清空vis数组
			vis = make([]bool, n)
			vis[i] = true
			if dfs(i) { // 是否可以为i找到一个匹配
				cnt++
			}
		}
	}
	// 返回匹配结果和匹配对数
	return
}

// 匈牙利算法的另一种写法，适用左右两侧节点有明确区分的情况，要求 g 中存储的是左侧到右侧的单向边
// 模板题 https://www.luogu.com.cn/problem/P3386, https://www.luogu.com.cn/record/117127554
// 匈牙利算法的另一种写法，适用左右两侧节点有明确区分的情况，要求 g 中存储的是左侧到右侧的单向边
func hungarianLR(g [][]int, nl, nr int) (matchL []int, cnt int) {
	matchL = make([]int, nl)
	matchR := make([]int, nr)
	for i := range matchL {
		matchL[i] = -1
	}
	for i := range matchR {
		matchR[i] = -1
	}
	var vis []bool // 记录是否访问过

	// 返回是否可以为u找到匹配对象
	var dfs func(int) bool
	dfs = func(u int) bool {
		for _, to := range g[u] {
			if vis[to] {
				continue // 已访问过，考虑过了
			}
			vis[to] = true
			if matchR[to] == -1 || dfs(matchR[to]) {
				// 如果还没匹配过，或者可以未已匹配的那个人找到新的匹配
				matchL[u] = to
				matchR[to] = u
				return true
			}
		}
		return false
	}
	for i := 0; i < nl; i++ {
		// 重新清空vis数组
		vis = make([]bool, nr)
		if dfs(i) { // 是否可以为i找到一个匹配
			cnt++
		}
	}
	return matchL, cnt
}

```