
# Lca

```go
import "math/bits"

// https://oi-wiki.org/graph/lca/#%E5%80%8D%E5%A2%9E%E7%AE%97%E6%B3%95
// 模板题: https://www.luogu.com.cn/record/118179126
// dep表示深度
// 从u点跳到v点所需要的步数就是dep[u] - dep[v]中二进制的个数
// 定义f[u][i]表示从u点开始往上跳2^i次方步抵达的点
// 核心递推式:f[u][i] = f[f[u][i-1][i-1] 也就是先从u跳 2^(i-1)次方步，然后再跳2^(i-1)次方步到达
// 1、先把u、v跳到同一层(将dep[u]-dep[v]的二进制拆分进行跳)
// 2、将u、v一起跳到LCA的下一层 (从最大的i开始尝试，一直尝试到0，最后游标u、v一定可以停在LCA下一层)
// 3、完事之后 f[u][0]就是最终答案了(再上一层就好了)
func lca(n, root int, g [][]int) (lca func(u, v int) int) {
	dep := make([]int, n)
	mx := bits.Len(uint(n))
	f := make([][]int, n)
	for i := range f {
		f[i] = make([]int, mx)
	}
	//先求出深度和f数组
	var dfs func(u, p int)
	dfs = func(u, p int) {
		if p != -1 {
			dep[u] = dep[p] + 1
		}
		f[u][0] = p
		// 递推
		for i := 1; i < mx; i++ {
			if f[u][i-1] == -1 {
				f[u][i] = -1 // 注意这里一定要置为-1, 表示跳出去了, 不然后面f状态就不对了
			} else {
				f[u][i] = f[f[u][i-1]][i-1]
			}
		}
		for _, to := range g[u] {
			if to == p {
				continue
			}
			dfs(to, u)
		}
	}
	dfs(root, -1)
	return func(u, v int) int {
		if dep[u] < dep[v] {
			u, v = v, u
		}
		// 先跳到同一层(注意结束之后dep[u]一定等于dep[v])
		for i, t := 0, dep[u]-dep[v]; t > 0; i, t = i+1, t>>1 {
			if t&1 != 0 {
				u = f[u][i]
			}
		}
		if u == v {
			// 刚好碰到，那就是直接LCA了
			return u
		}
		for i := mx - 1; i >= 0; i-- {
			if f[u][i] != f[v][i] {
				// 如果下一层不是公共祖先就一直一起跳
				u, v = f[u][i], f[v][i]
			}
		}
		return f[u][0]
	}
}

```