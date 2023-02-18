
import { Component, createSignal, Show, For, Accessor } from 'solid-js';

import Chart, { setData } from './Chart';
import Image from './Image';

let [image, setImage] = createSignal("");
let [state, setState] = createSignal("image")
let [results, setResults] = createSignal([])
let [result, setResult] = createSignal(0)
let [guess, setGuess] = createSignal();

const Lobby: Component<{ user_name: Accessor<string>, room: string }> = (props) => {
  let streamer = "soeren_______"


  if (props.room) {
    streamer = props.room

    window.history.pushState(streamer, streamer, `?room=${streamer}`);
  }

  let socket: any;

  let initWS = () => {
    socket = new WebSocket(`${import.meta.env.VITE_BACKEND_URL}/ws/${streamer}`)

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
        setGuess(undefined);
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
        <Show when={state() === "image"}>
          <div class="pl-[1.1rem] pr-1 w-full">
            <input class="w-full" min="1900" max="2023" onChange={(e: any) => {
              setGuess(e.target.value)

              if (guess()) {
                socket?.send(`${props.user_name()};${guess()}`)
              }
            }} type="range" />
          </div>
          <div>Your guess:{guess() ?? " make a guess"}</div >
        </Show>
      </Show>
      <Show when={state() === "afterImage" || state() === "results"}>
        <div class="flex flex-col justify-center items-center">
          <Show when={state() === "afterImage"} >
            Correct Result: <span class="font-bold">{result()}</span>
          </Show>
          <For each={results().sort((a, b) => b[1] - a[1])}>{(r, i) =>
            <li>
              {i() + 1}: {r[0]} {Math.floor(r[1])} Points
            </li>
          }</For>
        </div>
      </Show>
    </div></>

  );
};

export default Lobby;
