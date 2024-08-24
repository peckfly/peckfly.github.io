# Test 

* 主目录下新建`main.go`文件
* 主目录下新建`fuzz`目录, `fuzz`目录下新建`tmp`目录
* fuzz目录下新建`rand.go`，`test.go`，`test.sh`，`correct.go`，`correct.cpp`文件
* 运行`test.go`

`rand.go`文件
```go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	// 生成[start, end)随机数
	get := func(start, end int) int { rand.NewSource(time.Now().UnixNano()); return rand.Intn(end-start) + start }
	print := func(a ...interface{}) { fmt.Print(a...) }
	println := func(a ...interface{}) { fmt.Println(a...) }
	printf := func(format string, a ...interface{}) { fmt.Printf(format, a...) }
	_, _, _, _ = get, print, println, printf

	println(get(1, 10), get(11, 20))
}

```


`test.go` 文件

```go
package main

import (
	"fmt"
	"os"
	"os/exec"
	"strconv"
	"sync"
	"sync/atomic"
)

func main() {
	var isCpp bool
	isCpp = true

	var wg sync.WaitGroup
	threadNum := 2
	wg.Add(threadNum)
	end := atomic.Bool{}
	end.Store(false)
	go func() {
		for i := 0; i < threadNum; i++ {
			go func() {
				for !end.Load() {
				}
				wg.Done()
			}()
		}
	}()
	for i := 0; i < threadNum; i++ {
		i := i
		go func() {
			var cmd *exec.Cmd
			if isCpp {
				cmd = exec.Command("sh", "./fuzz/test.sh", strconv.Itoa(i), "1")
			} else {
				cmd = exec.Command("sh", "./fuzz/test.sh", strconv.Itoa(i), "0")
			}
			cmd.Stdout = os.Stdout
			cmd.Stderr = os.Stderr
			_ = cmd.Run()
			end.Store(true)
		}()
	}
	wg.Wait()
	fmt.Println("ended...")
}

```

`test.sh`文件

```shell
#!/bin/sh

input_prefix="$PWD/fuzz/tmp/in_"
input_file="${input_prefix}$1"

rand_output_prefix="/tmp/gen_"
rand_output_file="${rand_output_prefix}$1.out"

program_output_1_prefix="/tmp/each_out_1_"
program_output_1_file="${program_output_1_prefix}$1"

program_output_2_prefix="/tmp/each_out_2_"
program_output_2_file="${program_output_2_prefix}$1"

# Build the main program
go build -o /tmp/main_program.out ./main.go # 根目录下的

# Build the correct program based on the second argument
if [ "$2" -eq 0 ]; then
  go build -o /tmp/correct_program.out ./fuzz/correct.go
else
  g++ -std=c++17 ./fuzz/correct.cpp -o /tmp/correct_program.out
fi

while true; do
    # Build the random input generator and generate the input file
    go build -o "$rand_output_file" ./fuzz/rand.go && "$rand_output_file" > "$input_file"

    # Run the main program and the correct program with the input file
    /tmp/main_program.out < "$input_file" > "$program_output_1_file"
    /tmp/correct_program.out < "$input_file" > "$program_output_2_file"

    # Check the exit status of the correct program
    if [ $? -ne 0 ]; then
        exit 0
    fi

    # Compare the outputs of the main program and the correct program
    if diff "$program_output_1_file" "$program_output_2_file"; then
        printf "AC\n"
    else
        printf "GG_GG case_%s\n" "$1"
        exit 0
    fi
done


```