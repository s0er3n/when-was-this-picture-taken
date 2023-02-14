import { Component, createSignal, Show, For } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import Chart, { setData } from './c/Chart';
import Image from './c/Image';

let [image, setImage] = createSignal("");
let [state, setState] = createSignal("image")
let [results, setResults] = createSignal([])
let [result, setResult] = createSignal(0)
const App: Component = () => {
  let initWS = () => {
    let streamer = "mousewithbeer"
    let socket = new WebSocket(`ws://localhost:3030/ws/${streamer}`)

    socket.onmessage = (e) => {
      // console.log(e.data)
      const data = JSON.parse(e.data)
      if (data.Image) {
        setState("image")
        console.log(data.Image)

        setImage(data.Image.url)
        setData(data.Image.guesses)
      }
      if (data.AfterImage) {
        setState("afterImage")
        setImage(data.AfterImage.url)
        setData(data.AfterImage.guesses)
        setResults(data.AfterImage.scores)
        setResult(data.AfterImage.result)
      }
      if (data.Results) {
        setState("results")
        setResults(data.Results.scores)

      }
    }
    socket.onclose = () => {
      initWS()
    }
  }
  initWS()
  return (
    <><div
      class="p-5"
    >
      <Show when={state() !== "results"}>
        <div class="flex flex-col justify-center items-center">
          <a href="/"><h1 class="text-4xl">WhenWasThisPhotoTaken.com</h1></a>
          <Image src={image} />
        </div>
        <div><Chart /></div>
      </Show>
      <Show when={state() === "afterImage" || state() === "results"}>
        <Show when={state() === "afterImage"} >
          Correct Result: {result()}
        </Show>
        <For each={results().sort((a, b) => b[1] - a[1])}>{(r, i) =>
          <li>
            {i() + 1}: {r[0]} {Math.floor(r[1])}
          </li>
        }</For>
      </Show>
    </div></>

  );
};

export default App;
