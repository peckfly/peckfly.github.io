
# Fast Read

```go

import "os"

const eof = 0

var _i = 0
var _n = 0
var buf = make([]byte, 1<<12) // 4KB

// 读一个字符
func rc() byte {
	if _i == _n {
		_n, _ = os.Stdin.Read(buf)
		if _n == 0 { // EOF
			return eof
		}
		_i = 0
	}
	b := buf[_i]
	_i++
	return b
}

// 读一个数字或字母
func readByte() byte {
	b := rc()
	for ; '0' > b; b = rc() {
	}
	return b
}

// 读一个整数，支持负数
func readInt[T ~int | ~int64]() (x T) {
	b := rc()
	neg := false
	for ; '0' > b || b > '9'; b = rc() {
		// 某些多组数据的题目，不告诉有多少组数据，那么需要额外判断是否读到了 EOF
		if b == eof {
			return
		}
		if b == '-' {
			neg = true
		}
	}
	for ; '0' <= b && b <= '9'; b = rc() {
		x = x*10 + T(b&15)
	}
	if neg {
		return -x
	}
	return
}

// 读入一个字符串
func readString() (s []byte) {
	b := rc()
	for ; '0' > b; b = rc() {
	}
	for ; '0' <= b; b = rc() {
		s = append(s, b)
	}
	return s
}

// 读一个仅包含小写字母的字符串: readString(func(b byte) bool { return b >= 'a' && b <= 'z'})
func readStringFunc(f func(byte) bool) (s []byte) {
	b := rc()
	for ; !f(b); b = rc() { // 'A' 'Z'
	}
	for ; f(b); b = rc() { // 'A' 'Z'
		s = append(s, b)
	}
	return
}

// 读一个仅包含小写字母的长度为n字符串: readStringNLengthFunc(n, func(b byte) bool { return b >= 'a' && b <= 'z'})
func readStringNLengthFunc(n int, f func(byte) bool) []byte {
	b := rc()
	for ; !f(b); b = rc() {
	}
	s := make([]byte, 0, n)
	s = append(s, b)
	for i := 1; i < n; i++ {
		s = append(s, rc())
	}
	return s
}
```