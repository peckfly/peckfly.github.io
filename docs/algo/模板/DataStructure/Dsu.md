# Dsu

```go
type Dsu struct {
	f []int
}

func NewDsu(n int) *Dsu {
	f := make([]int, n)
	for i := range f {
		f[i] = i
	}
	return &Dsu{f}
}

func (u *Dsu) Find(x int) int {
	if u.f[x] == x {
		return x
	}
	u.f[x] = u.Find(u.f[x])
	return u.f[x]
}

func (u *Dsu) Merge(from, to int) bool {
	x, y := u.Find(from), u.Find(to)
	if x == y {
		return false
	}
	u.f[x] = y
	return true
}

func (u *Dsu) Same(x, y int) bool {
	return u.Find(x) == u.Find(y)
}

```

