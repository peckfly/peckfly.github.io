# String Hash

```go
// CPP(int128 case): https://www.acwing.com/problem/content/submission/code_detail/21331687/
// uint64, overflow auto mod 1<<64
// inCpp: use __int128, or maybe use __uint128_t (LC2430)
func hash(s string) (hashValue func(l, r int) uint64) {
	const prime = 131
	h, p := make([]uint64, len(s)), make([]uint64, len(s))
	p[0], h[0] = uint64(1), uint64(s[0]-'a'+1) // or - '0' + 1, can't be 0
	for i := 1; i < len(s); i++ {              // 从1开始
		p[i] = p[i-1] * prime
		h[i] = h[i-1]*prime + uint64(s[i]-'a'+1)
	}
	hashValue = func(l, r int) uint64 {
		if l <= 0 {
			return h[r]
		}
		return h[r] - h[l-1]*p[r-l+1] // if int128 mod 1<<64, need (x + mod) % mod
	}
	return
}

```