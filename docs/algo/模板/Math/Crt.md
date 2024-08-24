# Crt 

```go
// 中国剩余定理，注意前提m1, m2, ... mn为两两互质的整数，求x的最小非负整数解
// 参考dx算法
// 步骤
// 1、计算所有模数的积M
// 2、计算第i个方程的ci = M/mi
// 3、计算ci 在模m[i]意义下的逆元 1/ci
// 4、x=sum(r[i] * c[i] * 1/c[i]) % mod M
// https://www.luogu.com.cn/problem/P1495 https://www.luogu.com.cn/record/123024876
func crt(r, m []int64) int64 {
	M, ans := int64(1), int64(0)
	for i := range m {
		M *= m[i]
	}
	for i := range m {
		ci := M / m[i]
		// 注意是ci在mod m[i]下的逆元 ( 爆乘需要用mul)
		inv, _ := inverse(ci, 1, m[i])
		ans = (ans + binaryMul(binaryMul(r[i], ci, M), inv, M)) % M
	}
	return (ans + M) % M
}

// TODO 扩展中国剩余定理：也就是m1, m2, ... mn不一定两两互质的情况
// 参考dx算法 or https://www.cnblogs.com/zwfymqz/p/8425731.html
// solve x = ri (mod mi)
func exCrt(r, m []int64) int64 {
	return 0
}

```