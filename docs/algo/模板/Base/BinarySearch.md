# Binary Search

```go

func lower[T ~int | ~int64](l, r T, f func(T) bool) (T, bool) {
	for l < r {
		m := l + (r-l)/2
		if f(m) {
			r = m
		} else {
			l = m + 1
		}
	}
	return l, f(l)
}

func upper[T ~int | ~int64](l, r T, f func(T) bool) (T, bool) {
	for l < r {
		m := l + (r-l+1)/2
		if f(m) {
			l = m
		} else {
			r = m - 1
		}
	}
	return l, f(l)
}

func lowerFloat64(l, r, eps float64, f func(float64) bool) float64 {
	for r-l > eps {
		m := (l + r) / 2
		if f(m) {
			r = m
		} else {
			l = m
		}
	}
	return l
}

func upperFloat64(l, r, eps float64, f func(float64) bool) float64 {
	for r-l > eps {
		m := (l + r) / 2
		if f(m) {
			l = m
		} else {
			r = m
		}
	}
	return r
}

// https://cp-algorithms.com/num_methods/ternary_search.html
func ternaryDoubleMax(l, r, eps float64, f func(float64) float64) (float64, float64) {
	for r-l > eps {
		m1, m2 := l+(r-l)/3, r-(r-l)/3
		if f(m1) < f(m2) {
			l = m1
		} else {
			r = m2
		}
	}
	return r, f(r)
}

// https://cp-algorithms.com/num_methods/ternary_search.html
func ternaryDoubleMin(l, r, eps float64, f func(float64) float64) (float64, float64) {
	for r-l > eps {
		m1, m2 := l+(r-l)/3, r-(r-l)/3
		if f(m1) < f(m2) {
			r = m2
		} else {
			l = m1
		}
	}
	return l, f(l)
}

func ternaryIntMax[T ~int | ~int64](l, r T, f func(T) T) T {
	// The minimum interval length can be larger depending on the problem
	for r-l >= 3 {
		m1, m2 := l+(r-l)/3, r-(r-l)/3
		if f(m1) < f(m2) {
			l = m1
		} else {
			r = m2
		}
	}
	mx, I := f(l), l
	for i := l + 1; i <= r; i++ {
		v := f(i)
		if v > mx {
			mx = v
			I = i
		}
	}
	return I
}

func ternaryIntMin[T ~int | ~int64](l, r T, f func(T) T) T {
	// The minimum interval length can be larger depending on the problem
	for r-l >= 3 {
		m1, m2 := l+(r-l)/3, r-(r-l)/3
		if f(m1) < f(m2) {
			r = m2
		} else {
			l = m1
		}
	}
	mn, I := f(l), l
	for i := l + 1; i <= r; i++ {
		v := f(i)
		if v < mn {
			mn = v
			I = i
		}
	}
	return I
}

```