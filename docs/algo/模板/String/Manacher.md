# Manacher
```go
// problem1: https://www.luogu.com.cn/problem/P3805 https://www.luogu.com.cn/record/101540809
// problem2: https://www.acwing.com/problem/content/submission/code_detail/21328293/
// problem3: https://leetcode.cn/problems/longest-palindromic-substring/description/
// 最长回文长度为maxLen - 1 (因为乘以了2)
// babas
// -> #b#a#b#a#s# -> maxIdx = 5, maxLen = 4
// tbabbabs
// -> #t#b#a#b#b#a#b#s -> maxIdx = 8, maxLen = 7
func longestPalindrome(t string) string {
	p, s := palindrome([]byte(t))
	maxLen, mi := 0, 0
	for i, radius := range p {
		if radius > maxLen {
			maxLen = radius
			mi = i
		}
	}
	// 最长回文长度 maxLen - 1
	var res []byte
	// cabbad -> #c[#a#b#b#a#]d# -> maxLen = 5, 5-1 = 4, i = 6
	// cabebad -> #c[#a#b#e#b#a#]d# -> maxLen = 6, 6-1 = 5, i = 7
	for i := mi - (maxLen - 1); i <= mi+(maxLen-1); i++ {
		if s[i] != '#' {
			res = append(res, s[i])
		}
	}
	return string(res)
}

// p[i]表示以s[i]为中心的最大回文串的半径是多少 (半径长度包括中心)（注意是添加了'#'的)
// 最终最大回文串的答案是 max(p[i]) - 1
// 比如 cabbad -> #c[#a#b#b#a#]d# -> 5-1 = 4
// 比如 cabebad -> #c[#a#b#e#b#a#]d# -> 6-1 = 5
func palindrome(t []byte) (p []int, s []byte) {
	// 就这个字符串改造，不能用string拼接，或者Builder，都会超时...
	// 注意这里len是0，cap是2*len(t)+1
	s = append(make([]byte, 0, len(t)*2+1))
	for _, c := range t {
		s = append(s, '#', c)
	}
	s = append(s, '#')

	min := func(a, b int) int {
		if a < b {
			return a
		}
		return b
	}

	// r:最右扩成功的位置的下一个位置, r表示的是第一个违规的位置
	// mid:代表中心位置
	p = make([]int, len(s)) // 存储最大回文半径
	for mid, r, i := -1, -1, 0; i < len(s); i++ {
		// i 位置扩出来的答案至少有多大
		if i < r { // i在r里面
			p[i] = min(p[2*mid-i], r-i)
		} else {
			// i在r外面，半径从1开始扩
			p[i] = 1
		}
		// i > r的情况或者i < r,且i'的边界和L重合
		for ; i+p[i] < len(s) && i-p[i] >= 0 && s[i+p[i]] == s[i-p[i]]; p[i]++ {
		}
		//更新最右r和中心
		if i+p[i] > r {
			r, mid = i+p[i], i
		}
	}
	return
}


```