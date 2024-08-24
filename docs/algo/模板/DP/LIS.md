
# LIS

```go
// 状态表示 f[i][j]表示xxx(表示一类集合的一个属性)
// 状态转移方程
// dp计算顺序，计算每一个状态的时候，都要保证它依赖的状态已经计算过了。
// 状态不漏，状态不重复(算数量的时候)

// https://leetcode.cn/problems/longest-increasing-subsequence/
// 按照长度分类，每次都存储长度为n的结尾最小值, 整个结尾的值，从小到大是严格递增的
// q数组存储不同长度下上升子序列结尾的最小值
// 每次二分找到<a[i] ( 注意不是<=, <=的话就不是严格上升子序列，而是可以有相等的) 的最大的数，然后a[i]接到后面
func lengthOfLIS[T ~int | ~int64](a []T) int {
	lower := func(l, r int, f func(int) bool) (int, bool) {
		for l < r {
			m := l + (r-l)/2
			if f(m) {
				r = m
			} else {
				l = m + 1
			}
		}
		return l, f(l)
	}
	var q []T
	for _, x := range a {
		if len(q) == 0 || x > q[len(q)-1] {
			// x已经比q的最后一个数都大了，说明找不到一个q[y] <= x, 所以可以接到最后一个数后面
			q = append(q, x)
			continue
		}
		// 找到>=的第一个元素(<x最后一个元素的后一个元素)
		// p+1一定没有越界，因为如果越界了，那么p就是最后一个元素，那么上面二分的时候，说明所有数都比x小，那么就会走第一个if
		p, _ := lower(0, len(q)-1, func(t int) bool {
			return q[t] >= x
		})
		q[p] = x
	}
	// q数组维护的是一个最优的单调上升序列(保存的不是解，比如[2,3,1]，实际q是[1,3])
	return len(q)
}

```