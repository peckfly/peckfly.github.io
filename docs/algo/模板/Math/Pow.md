
# Pow

```go
func binaryPow(a, b, p int64) int64 {
	res := int64(1)
	for ; b != 0; b >>= 1 {
		if b&1 != 0 {
			res = (res * a) % p
		}
		a = (a * a) % p
	}
	return res
}

// 计算 (a * b) % mod (主要场景是用于a和b都是long long,一相乘就爆的那种)
func binaryMul(a, b, p int64) int64 {
	res := int64(0)         // 幂的话是1
	for ; b != 0; b >>= 1 { // b -> b/2     右移  去掉最后一位 因为当前最后一位我们用完了，
		if b&1 != 0 { // 二进制最低位是1 --> 加上 a的 2^i 倍, 快速幂是乘上a的2^i ）
			res = (res + a) % p
		}
		a = (a << 1) % p // a = a * 2    a随着b中二进制位数而扩大 每次 扩大两倍。幂的话是 a = a * a
	}
	return res
}

```