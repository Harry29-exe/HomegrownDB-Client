import type { Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import {Editor} from "./editor/text-editor/Editor";
import {EditorWindow} from "./editor/EditorWindow";

const App: Component = () => {
    return (
        <div class="w-[100vw] h-[100vh] bg-slate-800 text-white">
            <EditorWindow/>
        </div>
    // <div class={styles.App}>
    //   <header class={styles.header}>
    //     <img src={logo} class={styles.logo} alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       class={styles.link}
    //       href="https://github.com/solidjs/solid"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn Solid
    //     </a>
    //   </header>
    // </div>
  );
};

export default App;
