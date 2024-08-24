
# Trie 01

```go
import (
	"math"
)

// 模板题: https://leetcode.cn/problems/maximum-xor-of-two-numbers-in-an-array/
// 一棵（所有叶节点深度都相同的）二叉树
// TODO LC1707 https://leetcode.cn/problems/maximum-xor-with-an-element-from-array/
// TODO LC1803 https://leetcode.cn/problems/count-pairs-with-xor-in-a-range/
// TODO LC2479 https://leetcode.cn/problems/maximum-xor-of-two-non-overlapping-subtrees/
// TODO https://codeforces.com/problemset/problem/706/D
// TODO https://codeforces.com/problemset/problem/282/E
// TODO https://codeforces.com/contest/1446/problem/C
func findMaximumXOR(a []int) int {
	tr := newTrie01()
	for _, x := range a {
		tr.add(x)
	}
	ans := 0
	for _, x := range a {
		t := tr.maxXor(x)
		if t > ans {
			ans = t
		}
	}
	return ans
}

type trie01Node struct {
	son [2]*trie01Node
	// 下面两个字段在特定题目中用到
	path int // 多少个点经过这里, 也就是叶子数量
	min  int // 子树最小值
}

type trie01 struct{ root *trie01Node }

func newTrie01() *trie01 { return &trie01{&trie01Node{min: math.MaxInt32}} }

const trieBitLen = 31 // 30 for 1e9, 63 for int64, or bits.Len(MAX_VAL)

func (t *trie01) add(v int) *trie01Node {
	o := t.root
	if v < o.min {
		o.min = v
	}
	for i := trieBitLen - 1; i >= 0; i-- {
		b := v >> i & 1
		if o.son[b] == nil {
			o.son[b] = &trie01Node{min: math.MaxInt32}
		}
		o = o.son[b]
		o.path++
		if v < o.min {
			o.min = v
		}
	}
	//o.val = v
	return o
}

// TODO https://codeforces.com/problemset/problem/282/E
// TODO LC1938 https://leetcode-cn.com/problems/maximum-genetic-difference-query/
func (t *trie01) del(v int) *trie01Node {
	o := t.root
	for i := trieBitLen - 1; i >= 0; i-- {
		o = o.son[v>>i&1]
		o.path--
	}
	return o
}

func (t *trie01) maxXor(v int) (ans int) {
	o := t.root
	for i := trieBitLen - 1; i >= 0; i-- {
		b := v >> i & 1
		// 尽量和b相反的那个分支走，就能获得更大值
		// 如果b = 0, 那希望是有1， 也就是0^1=1
		// 如果b = 1, 那希望是有0， 也就是1^1=0
		// 所以写成 b ^ 1
		if o.son[b^1] != nil {
			ans |= 1 << i
			o = o.son[b^1]
		} else {
			o = o.son[b]
		}
	}
	return
}

```