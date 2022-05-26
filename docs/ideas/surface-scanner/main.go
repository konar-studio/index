package main

import (
	"math/rand"
	"time"
)

var (
	width  float64
	height float64
	// context js.Value
)

func getRandomNum() float64 {
	rand.New(rand.NewSource(time.Now().UnixNano()))
	n := float64(rand.Intn(10000))
	return n / 10000.0
}

func render() {

	// doc := js.Global().Get("body")
	// canvasEl := doc.Call("getElementById", "canvas")

	// width = doc.Get("body").Get("clientWidth").Float()
	// height = doc.Get("body").Get("clientHeight").Float()

	// canvasEl.Call("setAttribute", "width", width)
	// canvasEl.Call("setAttribute", "height", height)
	// context = canvasEl.Call("getContext", "2d")

	// fmt.Println(doc)
	// fmt.Println(height)

	// for i := 0; i < 50; i++ {
	// 	context.Call("beginPath")
	// 	context.Call("moveTo", getRandomNum()*width, getRandomNum()*height)
	// 	context.Call("lineTo", getRandomNum()*width, getRandomNum()*height)
	// 	context.Call("stroke")
	// }
}

func bootstrapApp() {
	render()
}

func main() {
	println("wasm app works")
	// bootstrap app
	bootstrapApp()
}
