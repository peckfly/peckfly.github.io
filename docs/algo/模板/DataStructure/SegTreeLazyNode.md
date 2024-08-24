# Lazy SegTree Node


```go
type lazyNodeType interface {
	~int | ~int64 | ~float64
}

// seg := &lazyNode[int]{}
// seg.build(a, L, R), -1e18 <= L, R <= 1e18
// https://codeforces.com/problemset/problem/915/E（注：此题有多种解法）
// https://codeforces.com/edu/course/2/lesson/5/4/practice/contest/280801/problem/F https://www.luogu.com.cn/problem/P5848
// （内存受限，必须离散化+普通lazy）https://codeforces.com/problemset/problem/1557/D
// https://www.luogu.com.cn/record/102058658
type lazyNode[T lazyNodeType] struct {
	L, R *lazyNode[T]
	val  T
	add  T
}

func (*lazyNode[T]) base() T {
	return 0 // or -1, INF, -INF
}

func (t *lazyNode[T]) get() T {
	if t != nil {
		return t.val
	}
	return t.base()
}

func (*lazyNode[T]) op(a, b T) T {
	return a + b
}

func (t *lazyNode[T]) pushUp() {
	t.val = t.op(t.L.get(), t.R.get())
}

func (t *lazyNode[T]) pushDown(l int, r int) {
	// if sum
	m := (l + r) >> 1
	if t.L == nil {
		t.L = &lazyNode[T]{}
	}
	if t.R == nil {
		t.R = &lazyNode[T]{}
	}
	if add := t.add; add != 0 {
		t.L.add += add
		t.L.val += T(m-l+1) * add

		t.R.add += add
		t.R.val += T(r-m) * add
		t.add = 0
	}
	// if min/max
	// if add := t.add; add != 0 {
	//	t.L.add += add
	//	t.L.val += add
	//	t.R.add += add
	//	t.R.val += add // 最小值也增加add
	//	t.add = 0
	// }
}

func (t *lazyNode[T]) build0(l, r int) {
	if l == r {
		return
	}
	m := (l + r) >> 1
	t.L = &lazyNode[T]{}
	t.L.build0(l, m)
	t.R = &lazyNode[T]{}
	t.R.build0(m+1, r)
	t.pushUp()
}

func (t *lazyNode[T]) build(a []T, l, r int) {
	if l == r {
		t.val = a[l-1]
		return
	}
	m := (l + r) >> 1
	t.L = &lazyNode[T]{}
	t.L.build(a, l, m)
	t.R = &lazyNode[T]{}
	t.R.build(a, m+1, r)
	t.pushUp()
}

// 只在单点的基础上加上了 pushDown
func (t *lazyNode[T]) query(l, r, ql, qr int) T {
	if t == nil || ql > r || qr < l {
		// 和普通线段树不同，这里需要判断返回空(按照题意)
		return t.base()
	}
	if ql <= l && r <= qr {
		return t.val
	}
	t.pushDown(l, r)
	m := (l + r) >> 1
	if qr <= m {
		return t.L.query(l, m, ql, qr)
	}
	if ql >= m+1 {
		return t.R.query(m+1, r, ql, qr)
	}
	return t.op(t.L.query(l, m, ql, qr), t.R.query(m+1, r, ql, qr))
}

func (t *lazyNode[T]) addValue(l, r, ql, qr int, v T) {
	if ql <= l && r <= qr {
		t.add += v
		t.val += T(r-l+1) * v
		return
	}
	m := (l + r) >> 1
	t.pushDown(l, r)
	// 注意这里和单点的不同，这里不是if else, 而是三种情况, 需要分别去修改区间
	if ql <= m {
		if t.L == nil { // 这里好像可以不用写，好像一定不nil
			t.L = &lazyNode[T]{}
		}
		t.L.addValue(l, m, ql, qr, v)
	}
	if qr >= m+1 {
		if t.R == nil { // 这里好像可以不用写，好像一定不nil
			t.R = &lazyNode[T]{}
		}
		t.R.addValue(m+1, r, ql, qr, v)
	}
	// 上面的写法也可以写成这样
	//if qr <= m {
	//	t.L.addValue(l, m, ql, qr, v)
	//} else if ql >= m+1 {
	//	t.R.addValue(m+1, r, ql, qr, v)
	//} else {
	//	t.L.addValue(l, m, ql, qr, v)
	//	t.R.addValue(m+1, r, ql, qr, v)
	//}
	t.pushUp()
}

// EXTRA: 适用于需要提取所有元素值的场景
func (t *lazyNode[T]) pushDownAll(l, r int) {
	if l == r {
		return
	}
	m := (l + r) >> 1
	t.pushDown(l, r)
	if t.L != nil {
		t.L.pushDownAll(l, m)
	}
	if t.R != nil {
		t.R.pushDownAll(m+1, r)
	}
}

```