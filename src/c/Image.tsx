
import { Accessor, Component, createSignal, onMount } from 'solid-js';


const ImageComponent: Component<{ src: Accessor<string>; }> = (props) => {

  return (<>


    <img class="h-[500px]" src={props.src()} />

  </>
  );
};

export default ImageComponent;
