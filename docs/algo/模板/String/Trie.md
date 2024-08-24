
# Trie

```go
const ALPHABET = 26 // 10 or 26 or more
const MinChar = 'a' // '0' or 'a'

// 注：由于用的是指针写法，必要时禁止 GC，能加速不少
// func init() { debug.SetGCPercent(-1) }
// 为什么不和CPP一样用数组的写法，因为那样内存占用大，每次一个子节点，直接创建本身，而不是指针，超内存: https://leetcode.cn/submissions/detail/400319581/
// t, t2 := &trieNode{}, trieNode{}; fmt.Println(unsafe.Sizeof(t), ",", unsafe.Sizeof(t2)), 输出 8,224
type trieNode struct {
	son   [ALPHABET]*trieNode
	path  int
	words int
	val   int // or []int
	// AC 自动机：当 o.son[i] 不能匹配文本串 text 中的某个字符时，o.fail 即为下一个应该查找的结点
	//fail *trieNode
}

func (o *trieNode) empty() bool {
	for _, son := range o.son {
		if son != nil {
			return false
		}
	}
	return true
}

type trie struct{ root *trieNode }

func newTrie() *trie {
	// init with a root (empty string)
	return &trie{&trieNode{}}
}

// 特殊处理: https://www.luogu.com.cn/record/101673164
func (*trie) get(c byte) int { return int(c - MinChar) }

// 插入字符串 s，返回插入后字符串末尾对应的节点
func (t *trie) add(s []byte) *trieNode {
	node := t.root
	for _, ch := range s {
		idx := t.get(ch)
		if node.son[idx] == nil {
			node.son[idx] = &trieNode{}
		}
		node = node.son[idx]
		node.path++
	}
	node.words++
	return node
}

// 统计s在字典树中出现多少次
func (t *trie) count(s []byte) int {
	node := t.root
	for _, ch := range s {
		node = node.son[t.get(ch)]
		if node == nil { // no next child, can't find s
			return 0
		}
	}
	return node.words
}

// 统计字典树中有多少个字符串 是s的前缀
func (t *trie) countPrefix(s []byte, includeFull bool) int {
	node, count := t.root, 0
	for _, ch := range s {
		// 这里没有直接nextNode，第一个加的是ROOT, ROOT的words肯定是0(因为root是空节点)
		// 每次加的是上一个循环next出来的node, 所以需要有一个includeFull参数去判断是否要累加最后一个node
		count += node.words
		node = node.son[t.get(ch)]
		if node == nil {
			break
		}
	}
	// 是否包括自己，注意判断node >= 0(合法)
	if includeFull && node != nil {
		count += node.words
	}
	return count
}

// 统计s是字典树中多少个字符串的前缀
// https://www.luogu.com.cn/record/101673164
func (t *trie) prefixCount(s []byte) int {
	node := t.root
	for _, ch := range s {
		node = node.son[t.get(ch)]
		if node == nil {
			return 0
		}
	}
	return node.path
}

//	统计s的每个非空前缀 e 是字典树中多少个字符串的前缀, 并计算总和
//
// https://leetcode.cn/contest/weekly-contest-311/problems/sum-of-prefix-scores-of-strings/, 
func (t *trie) allPrefixCount(s []byte, includeFull bool) int {
	node, count := t.root, 0
	for _, ch := range s {
		// 这里没有直接nextNode，第一个加的是ROOT, ROOT的words肯定是0(因为root是空节点)
		// 每次加的是上一个循环next出来的node, 所以需要有一个includeFull参数去判断是否要累加最后一个node
		count += node.path
		node = node.son[t.get(ch)]
		if node == nil {
			break
		}
	}
	// 是否包括自己，注意判断node是否合法
	if includeFull && node != nil {
		count += node.path
	}
	return count
}

```