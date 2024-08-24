
# Z Function

```go
// 题目1: https://codeforces.com/problemset/problem/25/E、https://leetcode.cn/problems/shortest-string-that-contains-three-strings/

// https://www.luogu.com.cn/record/101599056
// z[i] = LCP(s[i:], s) , 也就是s和s[i]开头的后缀的最长公公前缀的长度
// 比如 s = aaaaa, 则返回5 4 3 2 1
func zFunc(s string) []int {
	n := len(s)
	z := make([]int, n)
	for i, l, r := 1, 0, 0; i < n; i++ {
		if i <= r && z[i-l] < r-i+1 {
			z[i] = z[i-l]
		} else {
			z[i] = max(0, r-i+1)
			for i+z[i] < n && s[z[i]] == s[i+z[i]] {
				z[i]++
			}
		}
		if i+z[i]-1 > r {
			l, r = i, i+z[i]-1
		}
	}
	z[0] = n
	return z
}

// 字符串s的所有后缀 与 t 的最长公共前缀长度, 传入s, t, 以及t的z数组
// 比如 s = aaaabaa t = aaaaa
// 则返回 4 3 2 1 0 2 1
func extFunc(s, t string, z []int) []int {
	sn, tn := len(s), len(t)
	ext := make([]int, sn)
	for i, l, r := 1, 0, 0; i < sn; i++ {
		if i <= r && z[i-l] < r-i+1 {
			ext[i] = z[i-l]
		} else {
			ext[i] = max(0, r-i+1)
			for ext[i] < tn && i+ext[i] < sn && t[ext[i]] == s[i+ext[i]] {
				ext[i]++
			}
		}
		if i+ext[i]-1 > r {
			l, r = i, i+ext[i]-1
		}
	}
	for ext[0] < min(sn, tn) && t[ext[0]] == s[ext[0]] {
		ext[0]++
	}
	return ext
}

```