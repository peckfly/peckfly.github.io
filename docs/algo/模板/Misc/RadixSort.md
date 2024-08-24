
# Radix Sort

```go
// https://leetcode.cn/problems/query-kth-smallest-trimmed-number/solutions/1676162/by-tsreaper-hlt7/
func smallestTrimmedNumbers(s []string, queries [][]int) []int {
	n, m := len(s), len(s[0])
	rounds := make([][]int, m+1)
	// 初始化，存储默认下标
	for i := 0; i < n; i++ {
		rounds[0] = append(rounds[0], i)
	}
	for i := 1; i <= m; i++ {
		B := make([][]int, 10)
		// 上一轮的下标
		for _, idx := range rounds[i-1] {
			b := s[idx][m-i] - '0'
			B[b] = append(B[b], idx) // 放到10个桶里面
		}
		for j := 0; j < 10; j++ {
			for _, x := range B[j] {
				rounds[i] = append(rounds[i], x)
			}
		}
	}
	var ans []int
	for _, q := range queries {
		ans = append(ans, rounds[q[1]][q[0]-1])
	}
	return ans
}

```