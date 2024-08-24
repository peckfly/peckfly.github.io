# SegTree

```go
type singleSegType interface {
	~int | ~int64 | ~float64
}

type seg[T singleSegType] []struct {
	val T
}

// 合并两个节点上的数据：maintain 和 query 通用
// 要求操作满足区间可加性
// 例如 + * | & ^ min max gcd mulMatrix 摩尔投票 最大子段和 ...
// return a + b、return gcd(a, b)、...
func (seg[T]) op(a, b T) T {
	return a + b
}

func (t seg[T]) pushUp(x int) {
	t[x].val = t.op(t[x<<1].val, t[x<<1|1].val)
}

// x=1,l=1,r=n，初始化线段树
func (t seg[T]) build0(x, l, r int) {
	if l == r {
		return
	}
	m := (l + r) >> 1
	t.build0(x<<1, l, m)
	t.build0(x<<1|1, m+1, r)
	t.pushUp(x)
}

// x=1,l=1,r=n，通过a数组初始化
func (t seg[T]) build(a []T, x, l, r int) {
	if l == r {
		t[x].val = a[l-1] // 注意l,r这些下标都是从1开始，但是a数组一般是从0开始，所以a[l-1]
		return
	}
	m := (l + r) >> 1
	t.build(a, x<<1, l, m)
	t.build(a, x<<1|1, m+1, r)
	t.pushUp(x)
}

// x=1,l=1,r=n  [ql,qr] 1<=ql<=qr<=n
func (t seg[T]) get(x, l, r, ql, qr int) T {
	if ql <= l && r <= qr {
		// 这里一定要写 ql <= l && r <= qr, 不然segment fault
		// 当前区间已经被查询的区间包围了，直接返回了
		return t[x].val
	}
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
func (t seg[T]) add(x, l, r, p int, v T) {
	if l == r {
		t[x].val += v
		return
	}
	m := (l + r) >> 1
	if p <= m {
		t.add(x<<1, l, m, p, v)
	} else {
		t.add(x<<1|1, m+1, r, p, v)
	}
	t.pushUp(x)
}

// x=1,l=1,r=n  1<=p<=n
func (t seg[T]) update(x, l, r, p int, v T) {
	if l == r {
		t[x].val = v
		return
	}
	m := (l + r) >> 1
	if p <= m {
		t.update(x<<1, l, m, p, v)
	} else {
		t.update(x<<1|1, m+1, r, p, v)
	}
	t.pushUp(x)
}

func (t seg[T]) queryAll() T { return t[1].val }

// a 不能为空
func newSegmentTree[T singleSegType](a []T) seg[T] {
	t := make(seg[T], 4*len(a))
	t.build(a, 1, 1, len(a))
	return t
}

func newSegmentTree0[T singleSegType](n int) seg[T] {
	t := make(seg[T], 4*n)
	t.build0(1, 1, n)
	return t
}

// EXTRA: 查询整个区间小于 v 的最靠左的位置
// 这里线段树维护的是区间最小值
// 需要先判断 t[1].min < v
func (t seg[T]) queryFirstLessPos(x, l, r int, v T) int {
	if l == r {
		return l
	}
	m := (l + r) >> 1
	if t[x<<1].val < v {
		return t.queryFirstLessPos(x<<1, l, m, v)
	}
	return t.queryFirstLessPos(x<<1|1, m+1, r, v)
}

// EXTRA: 查询 [l,r] 上小于 v 的最靠左的位置
// 这里线段树维护的是区间最小值
// 不存在时返回 0
func (t seg[T]) queryFirstLessPosInRange(x, l, r, ql, qr int, v T) int {
	if t[x].val >= v {
		return 0
	}
	if l == r {
		return l
	}
	m := (l + r) >> 1
	if l <= m {
		if pos := t.queryFirstLessPosInRange(x<<1, l, m, ql, qr, v); pos > 0 {
			return pos
		}
	}
	if m < r {
		if pos := t.queryFirstLessPosInRange(x<<1|1, m+1, r, ql, qr, v); pos > 0 { // 注：这里 pos > 0 的判断可以省略，因为 pos == 0 时最后仍然会返回 0
			return pos
		}
	}
	return 0
}
```