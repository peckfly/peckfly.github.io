# Big Number
```go
// https://leetcode.cn/problems/add-strings/
// https://www.luogu.com.cn/record/115747799
func addStrings(a, b string) string {
	var ans []byte
	t := 0
	for i, j := len(a)-1, len(b)-1; i >= 0 || j >= 0; i, j = i-1, j-1 {
		if i >= 0 {
			t += int(a[i] - '0')
		}
		if j >= 0 {
			t += int(b[j] - '0')
		}
		ans = append(ans, byte('0'+t%10))
		t /= 10
	}
	if t > 0 {
		ans = append(ans, byte('0'+1))
	}
	// 反转
	for i, n := 0, len(ans); i < n/2; i++ {
		ans[i], ans[n-1-i] = ans[n-1-i], ans[i]
	}
	return string(ans)
}

// https://www.luogu.com.cn/record/115747024
// https://www.luogu.com.cn/problem/P2142
func subStrings(a, b []byte) string {
	if string(a) == string(b) {
		return "0"
	}
	if len(a) < len(b) || (len(a) == len(b) && string(a) < string(b)) {
		return "-" + subStrings(b, a)
	}
	i, j := len(a)-1, len(b)-1
	var ans []byte
	t := 0 // t最多是1
	for i >= 0 && j >= 0 {
		if t > 0 {
			if a[i] == '0' {
				a[i] = '9'
			} else {
				a[i] -= 1
				t = 0
			}
		}
		x, y := int(a[i]-'0'), int(b[j]-'0')
		if x >= y {
			ans = append(ans, byte('0'+(x-y)))
		} else {
			// x <= y
			// 借位, 这里i一定不会为0，否则a_str < b_str
			ans = append(ans, byte('0'+(x+10-y)))
			t = 1
		}
		i, j = i-1, j-1
	}
	for i >= 0 {
		if t == 0 {
			ans = append(ans, a[i])
		} else {
			if a[i] == '0' {
				a[i] = '9'
				ans = append(ans, a[i])
			} else {
				a[i] -= 1
				ans = append(ans, a[i])
				t = 0
			}
		}
		i--
	}
	// 反转
	for i, n := 0, len(ans); i < n/2; i++ {
		ans[i], ans[n-1-i] = ans[n-1-i], ans[i]
	}
	// 去除前导0
	for len(ans) > 0 && ans[0] == '0' {
		ans = ans[1:]
	}
	return string(ans)
}

// https://leetcode.cn/problems/multiply-strings/
func multiply(s1 string, s2 string) string {
	n, m := len(s1), len(s2)
	// s1 * s2的结果长度最大是n + m，比如999*999=998001
	ans := make([]int, n+m)
	for j := m - 1; j >= 0; j-- {
		for i := n - 1; i >= 0; i-- {
			i2, j2 := n-i-1, m-j-1
			x, y := int(s1[i]-'0'), int(s2[j]-'0')
			ans[i2+j2] += (x * y) % 10
			ans[i2+j2+1] += (x * y) / 10
		}
	}
	for i := 0; i < n+m; i++ {
		if ans[i] >= 10 {
			ans[i+1] += ans[i] / 10
			ans[i] = ans[i] % 10
		}
	}
	for len(ans) > 1 && ans[len(ans)-1] == 0 {
		ans = ans[:len(ans)-1]
	}
	var res []byte
	for i := len(ans) - 1; i >= 0; i-- {
		res = append(res, byte(ans[i]+'0'))
	}
	return string(res)
}


```