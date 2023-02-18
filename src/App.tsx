import { Component, createSignal, Show, For } from 'solid-js';
import Lobby from './c/Lobby';

const App: Component = () => {

  let [userName, setUserName] = createSignal("");
  let [isUserName, setIsUserName] = createSignal(false);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let room = urlParams.get("room") ?? ""
  return (
    <>
      <Show when={isUserName()} fallback={
        <div class="flex flex-col items-center justify-center h-screen">
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

    </>

  );
};

export default App;
