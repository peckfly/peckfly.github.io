# Kmp

```go
// next[i]表示以i为终点的后缀和从0开始的前缀相等的最大长度
// next含义: next[i]表示 0 ~ i 之间，前缀和后缀最大相等的长度
// 比如next[i] = j, 那么就是p[0~j-1]和p[i-j+1~i]相等
// 比如abcdabcx
//
//	00001230
//
// 跳转的时候，是跳转到next[j-1]
func next(p string) (ne []int) {
	ne = make([]int, len(p))
	// i从1开始, 因为 ne[0] = 0
	for i, j := 1, 0; i < len(p); i++ {
		for j > 0 && p[i] != p[j] {
			j = ne[j-1]
		}
		// if p[i] == p[j] -> ne[i] = j + 1, else p[i] != p[j] then j must be 0, ne[i] = 0
		if p[i] == p[j] {
			j++ // ne[i] = j + 1
		}
		ne[i] = j
	}
	return
}

func kmp(s, p string, ne []int) (pos []int) {
	pLen := len(p)
	// 注意这里 i从0开始, 因为一开始i, j都在0位置，然后一直往前匹配
	for i, j := 0, 0; i < len(s); i++ {
		for j > 0 && s[i] != p[j] {
			j = ne[j-1]
		}
		// 匹配成功了，进行下一个
		if s[i] == p[j] {
			j++
		}
		if j == pLen {
			pos = append(pos, i-pLen+1)
			j = ne[j-1]
		}
	}
	return
}

// https://www.luogu.com.cn/problem/UVA455
// https://leetcode.cn/problems/repeated-substring-pattern/description/
// {循环节, 循环次数}
func minPeriod(s string) (string, int) {
	ne := next(s)
	n, m := len(s), ne[len(ne)-1]
	if m > 0 && n%(n-m) == 0 {
		return s[:n-m], n / (n - m)
	}
	return s, 1 // 无小于 n 的循环节
}

```