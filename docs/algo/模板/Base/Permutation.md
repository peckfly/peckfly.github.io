# Permutation

```go

// 全排列 https://www.luogu.com.cn/problem/P1706
func getPerm(n int) [][]int {
	var perm [][]int
	var arr []int
	var bit int
	var dfs func(p int)
	dfs = func(p int) {
		if p >= n {
			add := make([]int, len(arr))
			copy(add, arr)
			perm = append(perm, add)
			return
		}
		for i := 0; i < n; i++ {
			if (bit>>i)&1 != 0 {
				continue
			}
			bit |= 1 << i
			arr = append(arr, i)
			dfs(p + 1)
			arr = arr[:len(arr)-1]
			bit &= ^(1 << i) // 取反, c语言是 bit &= ~(1 << i);
		}
	}
	dfs(0)
	return perm
}

```