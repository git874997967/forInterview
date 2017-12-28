import React, {Component} from 'react';
import Header from './components/header'
import {BrowserRouter as Router, Route} from 'react-router-dom'
/*import {browserHistory} from 'react-router'*/
import $ from 'jquery'
import 'jplayer'
import Player from "./page/page";
import {MUSIC_LIST} from './config/musicList'
import MusicList from './page/musicList'
import Pubsub from 'pubsub-js'

let repeatTypeList = [
    'once',
    'cycle',
    'random'
]

class App extends Component {
    constructor() {
        super();
        this.state = {
            currentMusicItem: MUSIC_LIST[0],
            /*this musicList will pass to musicList  component*/
            musicList: MUSIC_LIST,
            repeatType: repeatTypeList[2]
        }
    }

    PlayMusic(item) {

        this.setState({
            currentMusicItem: item
        })
        $("#player").jPlayer('setMedia', {
            mp3: item.file
        }).jPlayer('play')

    }

    /* both next and prev realzie by this*/
    NextMusic(type = 'next') {
        let index = this.findMusicIndex(this.state.currentMusicItem)
        //next music =
        let newIndex = null;
        let musicLength = this.state.musicList.length;
        if (type === 'next') {
            newIndex = (index + 1) % musicLength;
        } else {
            //prev music
            newIndex = (index - 1 + musicLength) % musicLength;

        }
        this.PlayMusic(this.state.musicList[newIndex])

    }

    findMusicIndex(musicItem) {
        return this.state.musicList.indexOf(musicItem)
    }
    randomRange(over,under){
        return Math.ceil(Math.random()*(over-under)+under);
    }
    changeRepeat() {
        if (this.state.repeatType === 'once') {
            this.PlayMusic(this.state.currentMusicItem)
        } else if (this.state.repeatType === 'cycle') {
            this.NextMusic()
        } else if (this.state.repeatType === 'random') {
            let Index = this.state.musicList.indexOf(this.state.currentMusicItem);
            let randomIndex = this.randomRange(0, this.state.musicList.length - 1);
            while (randomIndex === Index) {
                randomIndex = this.randomRange(0, this.state.musicList.length - 1);
            }
            console.log(Index + 'and' + randomIndex)

            this.setState({
                currentMusitItem: this.state.musicList[randomIndex]
            })
            this.PlayMusic(this.state.musicList[randomIndex]);
        }
    }
    componentDidMount() {
        $("#player").jPlayer({
            supplied: "mp3",
            wmode: "window",
            useStateClassSkin: true
        });
        $('#player').bind($.jPlayer.event.ended, (e) => {
            this.changeRepeat()
        })
        this.PlayMusic(this.state.currentMusicItem)
        // listen the end of music switch to the next music automatic
        $('#player').bind($.jPlayer.event.end, (e) => {
            this.NextMusic()
        })
        Pubsub.subscribe('PLAY_MUSIC', (msg, item) => {

            this.PlayMusic(item)
        })
        Pubsub.subscribe('PREV_MUSIC', (msg, item) => {

            this.NextMusic('prev', item)
        })
        Pubsub.subscribe('NEXT_MUSIC', (msg, item) => {

            this.NextMusic('next', item)
        })
        Pubsub.subscribe('DELETE_MUSIC', (msg, item) => {
            this.setState({
                // filter the preovious list
                // musicList:MUSIC_LIST.splice(item,1)
                musicList: this.state.musicList.filter(musicItem => {
                    return musicItem !== item
                })
            })
            // do something else
            this.NextMusic('next', item)
        })
        Pubsub.subscribe('CHANGE_REPEAT', (msg, item) => {
            let index = repeatTypeList.indexOf(this.state.repeatType)
            index = (index + 1) % repeatTypeList.length
            this.setState({
                repeatType: repeatTypeList[index]
            })

        })


    }

    componentWillUnmount() {
        /* corespondent to the subscribe*/
        Pubsub.unsubscribe("PLAY_MUSIC");
        Pubsub.unsubscribe("DELETE_MUSIC");
        Pubsub.unsubscribe("PREV_MUSIC");
        Pubsub.unsubscribe("NEXT_MUSIC");
       //??? Pubsub.unsubscribe('CHANGE_REPEAT')
        //Unbind the jplayer
        $('#player').unbind($.jPlayer.event.ended);

    }

    render() {

        return (
            /*A <Router> may have only one child element*/


            <Router>
                <div><Header/>
                    <Route exact
                           path="/main"
                           render={() =>
                               <Player currentMusicItem={this.state.currentMusicItem}
                                       repeatType={this.state.repeatType}/>}>
                    </Route>
                    <Route exact
                           path="/list"
                           render={() =>

                               <MusicList currentMusicItem={this.state.currentMusicItem}
                                          musicList={this.state.musicList}/>}>

                    </Route>
                </div>
            </Router>

        );
    }
}

export default App;