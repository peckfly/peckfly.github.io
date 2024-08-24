# SegTree Node

```go
type singleNodeType interface {
	~int | ~int64 | ~float64
}

// seg := &segNode[int]{}
// seg.build(a, L, R), -1e18 <= L, R <= 1e18
// https://leetcode-cn.com/problems/count-of-range-sum/
// https://www.luogu.com.cn/record/102057921
type segNode[T singleNodeType] struct {
	L, R *segNode[T]
	val  T
}

func (*segNode[T]) base() T {
	return 0 // or -1, INF, -INF
}

// 合并两个节点上的数据：maintain 和 query 通用
// 要求操作满足区间可加性
// 例如 + * | & ^ min max gcd mulMatrix 摩尔投票 最大子段和 ...
// return a + b、return gcd(a, b)、...
func (*segNode[T]) op(a, b T) T {
	return a + b
}

func (t *segNode[T]) get() T {
	if t != nil {
		return t.val
	}
	return t.base()
}

func (t *segNode[T]) pushUp() {
	t.val = t.op(t.L.get(), t.R.get())
}

func (t *segNode[T]) build0(l, r int) {
	if l == r {
		return
	}
	m := (l + r) >> 1
	t.L = &segNode[T]{}
	t.L.build0(l, m)
	t.R = &segNode[T]{}
	t.R.build0(m+1, r)
	t.pushUp()
}

func (t *segNode[T]) build(a []T, l, r int) {
	if l == r {
		t.val = a[l-1]
		return
	}
	m := (l + r) >> 1
	t.L = &segNode[T]{}
	t.L.build(a, l, m)
	t.R = &segNode[T]{}
	t.R.build(a, m+1, r)
	t.pushUp()
}

func (t *segNode[T]) query(l, r, ql, qr int) T {
	if t == nil || ql > r || qr < l {
		// 和普通线段树不同，这里需要判断返回空
		return t.base()
	}
	if ql <= l && r <= qr {
		return t.val
	}
	m := (l + r) >> 1
	if qr <= m {
		return t.L.query(l, m, ql, qr)
	}
	if ql >= m+1 {
		return t.R.query(m+1, r, ql, qr)
	}
	return t.op(t.L.query(l, m, ql, qr), t.R.query(m+1, r, ql, qr))
}

func (t *segNode[T]) update(l, r, p int, v T) {
	if l == r {
		t.val = v
		return
	}
	m := (l + r) >> 1
	if p <= m {
		if t.L == nil { // 注意子树可能不存在
			t.L = &segNode[T]{}
		}
		t.L.update(l, m, p, v)
	} else { // p >= m + 1
		if t.R == nil {
			t.R = &segNode[T]{}
		}
		t.R.update(m+1, r, p, v)
	}
	t.pushUp()
}

func (t *segNode[T]) add(l, r, p int, v T) {
	if l == r {
		t.val += v
		return
	}
	m := (l + r) >> 1
	if p <= m {
		if t.L == nil { // 注意子树可能不存在
			t.L = &segNode[T]{}
		}
		t.L.add(l, m, p, v)
	} else { // p >= m + 1
		if t.R == nil {
			t.R = &segNode[T]{}
		}
		t.R.add(m+1, r, p, v)
	}
	t.pushUp()
}

```