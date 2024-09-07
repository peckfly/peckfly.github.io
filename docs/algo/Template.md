# Input Template

```go
package main

import (
	"bufio"
	"fmt"
	"os"
)

func solve() {

}

func main() {
	defer _w.Flush()
	var t int
	scan(&t)
	for tt := 1; tt <= t; tt++ {
		solve()
	}
}

var _r = bufio.NewReader(os.Stdin)
var _w = bufio.NewWriter(os.Stdout)

func scan(a ...interface{})                  { fmt.Fscan(_r, a...) }
func println(a ...interface{})               { fmt.Fprintln(_w, a...) }
func print(a ...interface{})                 { fmt.Fprint(_w, a...) }
func printf(format string, a ...interface{}) { fmt.Fprintf(_w, format, a...) }

func arrayPrint[T any](a []T) {
	if len(a) == 0 {
		return
	}
	print(a[0])
	for i := 1; i < len(a); i++ {
		print(" ", a[i])
	}
	println()
}

func arrayScan[T any](n int) []T {
	a := make([]T, n)
	for i := range a {
		scan(&a[i])
	}
	return a
}

func min[T ~int | ~int64 | ~string](a, b T) T {
	if a < b {
		return a
	}
	return b
}

func max[T ~int | ~int64 | ~string](a, b T) T {
	if a > b {
		return a
	}
	return b
}

func abs[T ~int | ~int64](a T) T {
	if a < 0 {
		return -a
	}
	return a
}

func reverse[T any](a []T) {
	for i, n := 0, len(a); i < n/2; i++ {
		a[i], a[n-1-i] = a[n-1-i], a[i]
	}
}

// a must be sorted
func unique[T comparable](a []T) (res []T) {
	for i, v := range a {
		if i == 0 || v != a[i-1] {
			res = append(res, v)
		}
	}
	return
}

func ceilDiv[T ~int | ~int64](x, y T) T {
	return (x + y - 1) / y
}

func arrayMax[T ~int | ~int64 | ~string](a []T) T {
	ans := a[0]
	for _, v := range a[1:] {
		if v > ans {
			ans = v
		}
	}
	return ans
}

func arrayMin[T ~int | ~int64 | ~string](a []T) T {
	ans := a[0]
	for _, v := range a[1:] {
		if v < ans {
			ans = v
		}
	}
	return ans
}

func contains[T comparable](a []T, value T) bool {
	for _, v := range a {
		if v == value {
			return true
		}
	}
	return false
}

func make2dArray[T any](n, m int) [][]T {
	a := make([][]T, n)
	for i := range a {
		a[i] = make([]T, m)
	}
	return a
}


```