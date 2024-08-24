
# Floyd

```go
// https://www.luogu.com.cn/record/114501188
// https://www.bilibili.com/video/BV1RK4y1d7ct?t=685.4 (讲的不错, 推荐优先看下)
// 其实就是我们求任意两个点的最短路径的时候(记做f[i][j], 我们都想通过
// floyd 可以处理带有负权边的图，但是不能处理有负环的图
// dx算法 and https://oi-wiki.org/graph/shortest-path/#floyd-%E7%AE%97%E6%B3%95
// 定义f[k][i][j]表示只允许经过节点1到k的情况下，节点i到节点j的最短路径长度
// 显然f[n][i][j]就是节点i到j的最短路径长度
// 初始化:
// 1、当i和j之间有边的时候, f[0][i][j]=g[i][j]
// 2、当i=j的时候，f[0][i][j]=0
// 3、当i和j没有边的时候f[0][i][j]=INF
// 状态转移: 先按照经过节点遍历
// f[k][i][j] = min(f[k-1][i][j], f[k-1][i][k] + f[k-1][k][j])
// 第一种选择是i到j不经过k点，第二种选择是i到j需要经过k点
// 每新增一个插点，就等于新增一个桥，就尝试更新那些经过新桥的最短路径
// 性质: 循环完第k层之后，会将所有插点编号不超过k的最短路径都找出来，但是插点编号超过k的最短路径是找不出来的
// 为什么k一定要在最外层? 因为计算第k层的f[i, j]时，必须先将k-1层的状态全部计算出来
// 状态计算可以理解为，第k-1层的二维表向第k层的二维表映射,
// 1、如果路径不经过k点: 第k-1层的f[i, j]直接投射到第k层的f[i, j]
// 2、如果路径经过k点: 第k-1层的f[i, k] f[k, j]都不经过k点(f[k-1][i][k]、f[k-1][k][j]分别是k结尾和k开头，是不以k作为桥的，所以也可以直接投射到第k层，所以f[i][j] = f[i][k]+f[k][j]
// 所以可以省掉第一维
// f[k][i][j] = min(f[k-1][i][j], f[k-1][i][k] + f[k-1][k][j])
// f[i][j] = min(f[i][j], f[i][k] + f[k][j])
func floyd(g [][]int64) [][]int64 {
	n := len(g)
	d := make([][]int64, n)
	for i := range d {
		d[i] = make([]int64, n)
		for j := range d[i] {
			d[i][j] = g[i][j]
		}
	}
	min := func(a, b int64) int64 {
		if a < b {
			return a
		}
		return b
	}
	for k := 0; k < n; k++ {
		for i := 0; i < n; i++ {
			for j := 0; j < n; j++ {
				d[i][j] = min(d[i][j], d[i][k]+d[k][j])
			}
		}
	}
	return d
}

```