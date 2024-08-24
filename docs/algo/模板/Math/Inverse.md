# Inverse

```go
// 同余:
// 若a，b为两个整数，且它们的差a-b能被某个自然数m所整除，则称a就模m来说同余于b
// 或者说a和b关于模m同余，记为：a≡b（mod m）。它意味着：a-b=m*k（k为某一个整数）。
// 32≡2（mod 5），此时k为6。

// 若a*x≡1（mod b) 且a，b互质，则称x为a的逆元，记为a^(-1)
// 例如8*x≡1（mod 5), 解得x=2,7,12...
// 根据逆元的定义，可转化为a*x+b*y＝1，用拓展欧几里得法求解。逆元可以用来在计算 （t/a） mod b时，转化为t * a^(-1) mod b      (重要: 可用于组合数求解 a!/(a-b)!*b!

// 费马小定理: 若p为质数，且a, p互质，则a^(p-1)≡1 (mod p)
// 给定两个数a, p, p是质数，求a模p的乘法逆元, 即a*x≡1(mod p), 求解x
// 因为根据费马小定理a^(p-1)≡1(mod p), 又a * a^(p-2)≡1(mod p)。所以a^(p-2)就是a模p的乘法逆元(此时可以直接用快速幂求解即可)

// 裴蜀定理: 一定存在整数x, y, 满足ax + by = gcd(a, b)
// 例:4x+6y=2, 因为gcd(4, 6)=2, 所以存在整数解:x=-1、y=1
// 而 4x+6y=3, 不存在整数解
// 扩展 一定存在正整数x, y, 满足ax + by = gcd(a,b) * n
// 再扩展一定存在整数x1...Xi, 满足,∑i=(1~n) (Ai*Xi) = gcd(A1, A2, ..., An)
// 例 4 * x1 + 6 * x2 + 2 * x3 = 4, 有整数解x1 = 1, x2 = 0, x3 = 0
// 模板题: https://www.luogu.com.cn/problem/P4549

// 扩展欧几里得算法(用于求解不定方程 ax + by = gcd(a, b)的一组整数解 x0, y0)
// 参考dx算法，很清晰
// https://cp-algorithms.com/algebra/extended-euclid-algorithm.html
// 当b=0时, ax + by = a, 故x=1, y=0
// 当b!=0时， 由gcd(a, b) = gcd(b, a%b)
// 以及裴蜀定理: ax + by = gcd(a, b)
// 构造 gcd(b, a%b) = b * x1 + (a%b) * y1 = b * x1 + (a - [a/b] * b) * y1 = a * y1 + b * (x1 - a/b * y1)
// 所以x = y1, y = x1 - a / b * y1
// 可以利用递归，先求出下一层的x1, y1, 然后回代到上一层，层层回代，可求特解(x0, y0)
// 构造通解 (考虑a * x + b * y = 0 构造)
// x = x0 + b/gcd(a, b) * k
// y = y0 - a/gcd(a, b) * k
// 例如8x + 6y = 2, 解得(1, -1), (4, -5), (7, -9)....
// exGcd 不仅可以求解ax+by=gcd(a, b)的方程的解，还可以求解ax+by=c的一组整数解 (dx算法有代码)
// 1、如果gcd(a, b) | c, 则有整数解， 先利用exGcd求解ax+by=gcd(a, b)，然后再乘以c/gcd(a,b)，即可以得到原方程的特解
// 2、否则，无整数解
func exGcd(a, b int64) (gcd, x, y int64) {
	if b == 0 {
		return a, 1, 0
	}
	gcd, x1, y1 := exGcd(b, a%b) // 先递归求解
	x, y = y1, x1-a/b*y1
	return
}

// 通过扩欧求解逆元(dx算法)
// 给定整数a, b, m 求解同余方程 ax≡b (mod m), 如果x存在整数解，则输出任意一个, 例如8x≡4 (mod 6), 整数解x=2
// 如何利用扩欧求解 线性同余方程
// 1、把同余方程转换为不定方程, 由ax≡b (mod m), 得到ax = m(-y) + b (同余的定义), 也就是ax + my = b, 由裴蜀定理， 当gcd(a, m) | b 时有解
// 2、先利用扩欧算法求 ax + my = gcd(a, m)的解，然后把x乘以b/gcd(a,m) 即可以得到原方程的解
// 模板题: https://www.luogu.com.cn/problem/P1082 https://www.luogu.com.cn/record/122989770
// 求解ax≡b (mod m)
// TODO: https://codeforces.com/contest/1748/problem/D
func inverse(a, b, m int64) (ans int64, ok bool) {
	g, x, _ := exGcd(a, m)
	if b%g == 0 {
		// 最小正整数解处理 (ans + m)%m (模加模)
		ans = (x*b/g%m + m) % m
		ok = true
	} else {
		ok = false
	}
	return
}

// 线性预处理a的逆元, 也就是求解所有a[i]*x≡b (mod m)
// https://www.luogu.com.cn/blog/DPair2005/solution-p5431
// 线性筛逆元1: https://www.luogu.com.cn/problem/P3811 https://www.luogu.com.cn/record/123019898
// 线性筛逆元2：https://www.luogu.com.cn/problem/P5431 https://www.luogu.com.cn/record/123021331
func inverseArray(a []int64, b, m int64) (ans []int64) {
	n := len(a)
	// 先计算前缀积
	s := make([]int64, n)
	for i := 0; i < n; i++ {
		if i == 0 {
			s[i] = a[i]
		} else {
			s[i] = (s[i-1] * a[i]) % m
		}
	}
	// 求出s[n-1]在mod m意义下的逆元
	inv := make([]int64, n)
	inv[n-1], _ = inverse(s[n-1], b, m)
	// 1/s[i] = 1 /(a[0]*a[1]*...*a[i]
	// --> 1/s[i-1] = 1/s[i] * a[i]
	for i := n - 2; i >= 0; i-- {
		inv[i] = (inv[i+1] * a[i+1]) % m
	}
	// 此时inv是s数组的逆元，然后推出来a数组的逆元
	// 1/a[i] = s[i-1] * 1/s[i]
	for i := 1; i < n; i++ {
		inv[i] = (s[i-1] * inv[i]) % m
	}
	return inv
}

```