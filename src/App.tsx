import { Component, createSignal, Show, For, Switch, Match } from 'solid-js';
import AddImage from './c/AddImage';
import Lobby from './c/Lobby';

const App: Component = () => {

  let [userName, setUserName] = createSignal("");
  let [isUserName, setIsUserName] = createSignal(false);
  let [state, setState] = createSignal("add_image")

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let room = urlParams.get("room") ?? ""
  return (
    <>

      <Switch >
        <Match when={state() === "normal"} >
          <Show when={isUserName()} fallback={
            <div class="flex flex-col items-center justify-center h-full">
              <div class="p-12">set user name: <input onChange={(e: any) => setUserName(e.target.value)} class="input input-bordered" /></div>
              <div class="flex flex-col space-y-2">
                <Show when={room}>
                  <button
                    class="btn btn-primary"
                    onClick={() => {
                      // check if valid
                      setIsUserName(true)
                    }}
                  >join room: {room}</button>
                </Show>
                <button
                  class="btn "
                  onClick={() => {
                    // check if valid
                    room = "public"
                    setIsUserName(true)
                  }}
                >join public lobby</button>
                <button
                  class="btn "
                  onClick={() => {
                    // check if valid
                    room = userName().toLowerCase()
                    setIsUserName(true)
                  }}
                >join twitch channel (your name needs to be the same as the twitch channel)</button>
                <button
                  class="btn "
                  onClick={() => {
                    // check if valid
                    room = self.crypto.randomUUID()
                    setIsUserName(true)
                  }}
                >create private room</button>
              </div>
            </div>

          }>
            <Lobby room={room} user_name={userName} />
          </Show>
          <div class='flex w-full fixed bottom-0 justify-center'>
            <button onClick={() => {
              setState("add_image")
            }}>add image for everyone to play</button>
          </div>
        </Match>
        <Match when={state() === "add_image"} >

          <div class='w-full flex justify-center mb-28'>
            <span class='text-6xl font-bold'>I need more images before going live </span>
          </div>
          <AddImage />

          {/* <div class='flex w-full fixed bottom-0 justify-center'> */}
          {/*   <button onClick={() => { */}
          {/*     setState("normal") */}
          {/*   }}>back</button> */}
          {/* </div> */}
        </Match>
      </Switch>

    </>

  );
};

export default App;
