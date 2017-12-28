import React, {Component} from 'react'
import $ from "jquery";
import 'jplayer'
import Progress from '../components/progress'
import './page.css'
import {Link} from 'react-router-dom'
import Pubsub from 'pubsub-js'

let duration = null;

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            volume: 2,
            leftTime: '0:00',
            isPlay: true
        }
    }

    componentDidMount() {
        $("#player").bind($.jPlayer.event.timeupdate, (e) => {
            duration = e.jPlayer.status.duration;
            this.setState({
                currentTime: Math.round(e.jPlayer.status.currentTime),
                progress: e.jPlayer.status.currentPercentAbsolute,
                volume: e.jPlayer.options.volume * 100,
                leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
            })
        })
    }

    componentWillUnmount() {
        $('#player').unbind($.jPlayer.event.timeupdate);
    }

    progressChangeHandler(progress) {
        $('#player').jPlayer('play', duration * progress);
    }

    changeVolumnHandler(progress) {
        $("#player").jPlayer('volume', progress)
    }

    play() {
        this.state.isPlay ? $("#player").jPlayer('pause') : $("#player").jPlayer('play')
        this.setState({
            isPlay: !this.state.isPlay
        })
    }

    formatTime(time) {
        let minuites = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${minuites}:${seconds}`
    }

    prev() {
        //define the method   in parent  with subsrcibe  use it in child with pubilish
        Pubsub.publish('PREV_MUSIC');
    }

    next() {
        /* this.setState({
             currentMusicItem:this.state.currentMusicItem-1;
         if()
             })*/
        //  this.PlayMusic(MUSIC_LIST[id+1])
        Pubsub.publish('NEXT_MUSIC');
    }

    changeRepeat() {
        Pubsub.publish('CHANGE_REPEAT')
    }

    render() {
        return (
            <div className="player-page">
                <h1 className="caption"><Link to='/list'>我的私人音乐坊 &gt;</Link></h1>
                <div className="mt20 row">
                    <div className="controll-wrapper">
                        <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                        <h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
                        <div className="row mt20">
                            <div className="left-time -col-auto">-{this.state.leftTime}</div>
                            <div className="volume-container">
                                <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                                <div className="volume-wrapper" style={{position: 'relative', top: 3}}>
                                    <Progress
                                        progress={this.state.volume}
                                        onProgressChange={this.changeVolumnHandler.bind(this)}
                                        barColor='green'
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{height: '10px', lineHeight: '10px', marginTop: '20px'}}>
                            <Progress
                                progress={this.state.progress}
                                currentTime={this.state.currentTime}
                                onProgressChange={this.progressChangeHandler.bind(this)}
                                bgColor='green'
                            />
                        </div>
                        <div className="mt35 row">
                            <div>
                                <i className="icon prev" onClick={this.prev}> </i>
                                <i className={`icon ml20  ${this.state.isPlay ? 'pause' : 'play'}`}
                                   onClick={this.play.bind(this)}> </i>
                                {/* <i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play.bind(this)}></i>*/}
                                <i className="icon next ml20" onClick={this.next}> </i>
                            </div>
                            <div className="-col-auto">
                                <i className={`icon repeat-${this.props.repeatType}`}
                                   onClick={this.changeRepeat.bind(this)}></i>
                            </div>
                        </div>
                    </div>
                    <div className="-col-auto cover">
                        <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
                    </div>
                </div>

            </div>


        );
    }
}


export default Page