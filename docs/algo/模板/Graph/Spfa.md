# Spfa

```go
// 模板题: https://www.acwing.com/problem/content/1170/ (https://www.cnblogs.com/TimusGo/p/17556959.html)
// 模板题: https://www.luogu.com.cn/record/115789523
// https://oi-wiki.org/graph/shortest-path/#%E9%98%9F%E5%88%97%E4%BC%98%E5%8C%96spfa
// spfa算法(队列优化的bellman-ford算法)
// bellman-ford每次迭代的时候，很多时候有很多无用的更新（就是很多时候会并没有通过dist[e.a]去更新到dist[e.b]
// 所以其实只有dist[e.a]变小了，dist[e.b]才有可能会变小 (dist[e.b] = min(dist[e.b], dist[e.a] + w)
// 也就是： 只有上一次被松弛的结点，所连接的边，才有可能引起下一次的松弛操作
// 那么我们用队列来维护「哪些结点可能会引起松弛操作」，就能只访问必要的边了
// SPFA 也可以用于判断s点是否能抵达一个负环，只需记录最短路经过了多少条边，当经过了至少n条边时，说明s点可以抵达一个负环
// queue队列里面存储的就是所有变小过的e.a(被松弛过的就放入队列)
// 核心就是：更新过谁，我再拿谁更新别人。(一个点如果没有被更新过的话，拿他更新别人一点是没有效果的)
// 注意这个算法的某个点，是有可能多次入队的, inQ数组记录的是这个点当前是否已在队列中
// extra: https://cp-algorithms.com/graph/finding-negative-cycle-in-graph.html (打印负环)
func spfa(g [][]edge, n, start int) (d []int64, haveNegCircle bool) {
	const inf int64 = 1e18
	d = make([]int64, n)
	for i := range d {
		d[i] = inf
	}
	inQ := make([]bool, n)
	cnt := make([]int, n) //记录经过的边数

	d[start] = 0
	inQ[start] = true
	var q []int
	q = append(q, start)

	for len(q) > 0 {
		t := q[0]
		q = q[1:]
		inQ[t] = false
		for _, e := range g[t] {
			if d[t]+e.wt < d[e.to] {
				d[e.to] = d[t] + e.wt
				cnt[e.to] = cnt[t] + 1 // e.to从t过来，边数+1
				if cnt[e.to] >= n {
					// 最短路经过了n条边，找到了一个负环
					return d, true
				}
				if !inQ[e.to] {
					// e.to被松弛了，放入队列，可能会去松弛别的点
					inQ[e.to] = true
					q = append(q, e.to)
				}
			}
		}
	}
	return d, false
}

```