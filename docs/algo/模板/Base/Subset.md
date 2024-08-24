
# Subset 

```go

// https://leetcode.cn/problems/subsets/
func subsets(nums []int) [][]int {
	var ans [][]int
	for i := 0; i < (1 << len(nums)); i++ {
		var c []int
		for j := 0; j < len(nums); j++ {
			if (i>>j)&1 != 0 {
				c = append(c, nums[j])
			}
		}
		ans = append(ans, c)
	}
	return ans
}

// 返回x在二进制下的所有1的位置的子集
// 22 -> 10110 -> {1, 2, 4}，返回{1,2,4}的所有子集
func subset2(x int) [][]int {
	var nums []int
	for t := 0; x > 0; x, t = x>>1, t+1 {
		if x&1 != 0 {
			nums = append(nums, t)
		}
	}
	return subsets(nums)
}

```