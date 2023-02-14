
import { Accessor, Component, createSignal, onMount } from 'solid-js';


const ImageComponent: Component<{ src: Accessor<string>; }> = (props) => {

  return (<>


    <img class="w-1/2" src={props.src()} />

  </>
  );
};

export default ImageComponent;
