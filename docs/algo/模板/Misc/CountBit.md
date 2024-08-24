
# Count Bit


```go
// 统计1～n中，每个bit的1的数量的总和
// https://leetcode.cn/problems/maximum-number-that-sum-of-the-prices-is-less-than-or-equal-to-k/description/
func countOnes(n int64) []int64 {
	result := make([]int64, bits.Len(uint(n)))
	for k := 0; k < bits.Len(uint(n)); k++ {
		count := int64(0)
		cycle := int64(int64(1) << int64(k+1))
		multiple := (n + 1) / cycle
		remainder := (n + 1) % cycle
		count += multiple * (1 << k)
		if remainder > (1 << k) {
			count += remainder - (1 << k)
		}
		result[k] = count
	}
	return result
}

```