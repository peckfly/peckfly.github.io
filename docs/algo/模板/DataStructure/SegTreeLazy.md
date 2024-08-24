
# Lazy Seg Tree

```go
type lazySegType interface {
	~int | ~int64 | ~float64
}

type lazySeg[T lazySegType] []struct {
	add T
	val T
}

// 合并两个节点上的数据：maintain 和 query 通用
// 要求操作满足区间可加性
// 例如 + * | & ^ min max gcd mulMatrix 摩尔投票 最大子段和 ...
// return a + b、return gcd(a, b)、...
func (lazySeg[T]) op(a, b T) T {
	return a + b
}

func (t lazySeg[T]) pushUp(x int) {
	t[x].val = t.op(t[x<<1].val, t[x<<1|1].val)
}

func (t lazySeg[T]) pushDown(x, l, r int) {
	// if sum
	m := (l + r) >> 1
	if add := t[x].add; add != 0 {
		t[x<<1].add += add
		t[x<<1].val += T(m-l+1) * add

		t[x<<1|1].add += add
		t[x<<1|1].val += T(r-m) * add
		t[x].add = 0
	}
	// if min/max
	// if add := t[x].add; add != 0 {
	//	t[x<<1].add += add
	//	t[x<<1].val += add
	//	t[x<<1|1].add += add
	//	t[x<<1|1].val += add // 最小值也增加add
	//	t[x].add = 0
	// }
}

// x=1,l=1,r=n，初始化线段树(同单点)
func (t lazySeg[T]) build0(x, l, r int) {
	if l == r {
		return
	}
	m := (l + r) >> 1
	t.build0(x<<1, l, m)
	t.build0(x<<1|1, m+1, r)
	t.pushUp(x)
}

// x=1,l=1,r=n，通过a数组初始化 (同单点)
func (t lazySeg[T]) build(a []T, x, l, r int) {
	if l == r {
		t[x].val = a[l-1] // 注意l,r这些下标都是从1开始，但是a数组一般是从0开始，所以a[l-1]
		return
	}
	m := (l + r) >> 1
	t.build(a, x<<1, l, m)
	t.build(a, x<<1|1, m+1, r)
	t.pushUp(x)
}

// x=1,l=1,r=n  [ql,qr] 1<=ql<=qr<=n (只在单点基础上加上pushDown(x, l, r)
func (t lazySeg[T]) get(x, l, r, ql, qr int) T {
	if ql <= l && r <= qr {
		// 当前区间已经被查询的区间包围了，直接返回了
		// 这里一定要写 ql <= l && r <= qr, 不然lazySegment fault
		return t[x].val
	}
	t.pushDown(x, l, r)
	m := (l + r) >> 1
	if qr <= m {
		return t.get(x<<1, l, m, ql, qr)
	}
	if ql >= m+1 {
		return t.get(x<<1|1, m+1, r, ql, qr)
	}
	return t.op(t.get(x<<1, l, m, ql, qr), t.get(x<<1|1, m+1, r, ql, qr))
}

// x=1,l=1,r=n  1<=p<=n
func (t lazySeg[T]) add(x, l, r, ql, qr int, v T) {
	if ql <= l && r <= qr { // 这里和单点修改的判断不同
		// 当前区间已经被修改的区间包围了，修改当前节点的信息，不用继续递归划分了, if update ? t[x].add = v - t[x].val; t[x].val = T(r-l+1) * v ???
		t[x].add += v            // % mod
		t[x].val += T(r-l+1) * v // % mod
		return
	}
	t.pushDown(x, l, r)
	m := (l + r) >> 1
	// 注意这里和单点的不同，这里不是if else, 而是三种情况, 需要分别去修改区间
	if ql <= m {
		t.add(x<<1, l, m, ql, qr, v)
	}
	if qr >= m+1 {
		t.add(x<<1|1, m+1, r, ql, qr, v)
	}
	// 上面的写法也可以写成这样
	//if qr <= m {
	//	t.add(x<<1, l, m, ql, qr, v)
	//} else if ql >= m+1 {
	//	t.add(x<<1|1, m+1, r, ql, qr, v)
	//} else {
	//	t.add(x<<1, l, m, ql, qr, v)
	//	t.add(x<<1|1, m+1, r, ql, qr, v)
	//}
	t.pushUp(x)
}

// 如果维护的数据（或者判断条件）具有单调性，我们就可以在线段树上二分
// 下面代码返回 [l,r] 内第一个值不低于 val 的下标（未找到时返回 n+1）
// x=1  [l,r] 1<=l<=r<=n
// https://codeforces.com/problemset/problem/1179/C
func (t lazySeg[T]) lowerBound(x, l, r, ql, qr int, v T) int {
	if l == r {
		if t[x].val >= v {
			return l
		}
		return l + 1
	}
	t.pushDown(x, l, r)
	m := (l + r) >> 1
	// 注意判断比较的对象是当前节点还是子节点，是先递归左子树还是右子树
	if t[x<<1].val >= v {
		return t.lowerBound(x<<1, l, m, ql, qr, v)
	}
	return t.lowerBound(x<<1|1, m+1, r, ql, qr, v)
}

// EXTRA: 适用于需要提取所有元素值的场景
func (t lazySeg[T]) pushDownAll(x, l, r int) {
	if l == r {
		return
	}
	m := (l + r) >> 1
	t.pushDown(x, l, r)
	t.pushDownAll(x<<1, l, m)
	t.pushDownAll(x<<1|1, m+1, r)
}

// a 从 0 开始
func newLazySegmentTree[T lazySegType](a []T) lazySeg[T] {
	t := make(lazySeg[T], 4*len(a))
	t.build(a, 1, 1, len(a))
	return t
}

```