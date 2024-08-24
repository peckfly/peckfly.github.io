
# Misc

```go
import (
	"fmt"
	"strconv"
)

// 判断X是否是num的幂
func isPower(x int64, num int) bool {
	for x%int64(num) == 0 {
		x /= int64(num)
	}
	return x == 1
}

// 进制转换
func convertBit() {
	// 2进制转10进制
	u, _ := strconv.ParseInt("101", 2, 64)
	fmt.Println(u)
	// 10进制转2进制
	u2 := strconv.FormatInt(5, 2)
	fmt.Println(u2)
}
```