# Comb

```go
const N int = 6

var c [N + 1][N + 1]int

// 1、递推法求和组合数，杨辉三角
// https://leetcode.cn/problems/ccw6C7/description/
func initComb() {
	for i := 0; i <= N; i++ {
		c[i][0], c[i][i] = 1, 1
		for j := 1; j < i; j++ {
			// 假设要从i个物品中选j个，当前考虑第i个物品，那么有两种情况：
			// 1) 不选第i个物品，那么相当于是要从i-1个物品中选j个
			// 2) 选第i个物品,那么就相当于从i-1个物品中选j-1个
			c[i][j] = c[i-1][j] + c[i-1][j-1]
		}
	}
}

// 2、预处理C(a, b) = a!/(a-b)!*b!, 这种情况必须要保证逆元存在，所以P必须为质数，如果不是，则用卢卡斯定理求 https://zhuanlan.zhihu.com/p/116698264
// 0 <= a, b <= 1e6, P为质数, 且P >= a, P >= b (必须保证n和n-m的逆元存在, 不能是P的倍数) 如1e9 + 7
// 如果每次都求，时间复杂度是O(N * logN)的 (dx和dxc的讲解里面就是O(N *logN的) )
// 但是因为 inv[i + 1] = 1 / (i + 1)!
// inv[i + 1] * (i + 1) = 1 / i! = inv[i]
// 所以 inv[i + 1] * (i + 1) = inv[i]， 所以可以求出n!的逆元，然后倒着推，就可以求出所有 1!, 2!, ..., n!所有的逆元了
// 也就是预处理阶乘的逆元: https://www.luogu.com.cn/blog/zjp-shadow/cheng-fa-ni-yuan
// https://pepcy.top/icpc-templates/005Math/combi.html
// 开两个数组分别存模意义下的阶乘和阶乘的逆元
// fact存x! (mod p)的值
// invFact存 (x!)^(-1) (mod p)的值
// C(n, m) mod p = fact[n] * invFact[n-m] * invFact[m] (mod p)
// 模板题: https://leetcode.cn/problems/number-of-ways-to-reach-a-position-after-exactly-k-steps/
type comb struct {
	fact, invFact []int64
	P             int64
}

func newComb(mx int, P int64) *comb {
	cmb := &comb{make([]int64, mx+1), make([]int64, mx+1), P}
	cmb._init(mx)
	return cmb
}

func (c *comb) _init(mx int) {
	c.fact[0] = 1
	for i := 1; i <= mx; i++ {
		c.fact[i] = c.fact[i-1] * int64(i) % c.P
	}
	c.invFact[mx] = binaryPow(c.fact[mx], c.P-2, c.P)
	for i := mx - 1; i >= 0; i-- {
		c.invFact[i] = c.invFact[i+1] * int64(i+1) % c.P
	}
}

func (c *comb) C(n, m int64) int64 {
	if n < 0 || m < 0 || m > n {
		return 0
	}
	return c.fact[n] * c.invFact[n-m] % c.P * c.invFact[m] % c.P
}

// 3、lucas定理, 解决模数不是质数的情况
// 适用范围: 0 <= a, b <= 1e18, 0 <= P <= 1e5, P是质数, P可以小于a和b
// C(n,m)%p = C(n%p,m%p) * C(n/p,m/p) % p
// !!!!!! 注意初始化 fact 和 invFact 时 mx 取 mod-1 (不需要开太大的数组)
// 推论：n&m==m 时 C(n,m) 为奇数，否则为偶数
// https://zhuanlan.zhihu.com/p/116698264 https://oi-wiki.org/math/number-theory/lucas/
// 模板题: https://www.luogu.com.cn/problem/P3807 https://www.luogu.com.cn/record/123064958
func (c *comb) lucas(n, m int64) int64 {
	if m == 0 {
		return 1
	}
	return c.C(n%c.P, m%c.P) * c.lucas(n/c.P, m/c.P) % c.P
}

```