import React, {Component} from 'react';
import Header from './components/header'

import $ from 'jquery'
import 'jplayer'
import Player from "./page/page";
import {MUSIC_LIST} from './config/musicList'
class App extends Component {
    constructor() {
        super();
        this.state = {
            currentMusicItem: MUSIC_LIST[5],
            musicList: MUSIC_LIST,
            repeatType: 'once'
        }
    }
    PlayMusic(item) {
        $("#player").jPlayer({
            ready: function () {
                $(this).jPlayer("setMedia", {
                    mp3: item.file
                }).jPlayer("play");
            },
            // necessary must set here so wired
            supplied: "mp3, oga",
            wmode: "window",
            useStateClassSkin: true
        });
        this.setState({
            currentMusicItem: item
        })
    }

    componentDidMount() {

        this.PlayMusic(this.state.currentMusicItem)
    }

    componentWillUnmount() {

    }
    render() {
        return (
            <div>
                <Header/>
                <Player currentMusicItem={this.state.currentMusicItem}/>
            </div>
        );
    }
}

export default App;