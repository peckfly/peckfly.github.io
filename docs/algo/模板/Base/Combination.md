
# Combination

```go

// 组合: https://leetcode.cn/problems/combinations/
// 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合
func combine(n int, k int) [][]int {
	var ans [][]int
	var arr []int
	var bit int
	var dfs func(p, s int)
	dfs = func(p, s int) {
		if p >= k {
			add := make([]int, k)
			copy(add, arr)
			ans = append(ans, add)
			return
		}
		for i := s; i <= n; i++ {
			if bit>>i&1 != 0 {
				continue
			}
			bit |= 1 << i
			arr = append(arr, i)
			dfs(p+1, i+1)
			arr = arr[:len(arr)-1]
			bit &= ^(1 << i)
		}
	}
	dfs(0, 1)
	return ans
}

```