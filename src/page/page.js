import React, {Component} from 'react'
import $ from "jquery";
import 'jplayer'
import Progress from '../components/progress'
import './page.css'

let duration = null;

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            volume: 0,
            isPlay:true
        }
    }

    componentDidMount() {
        $("#player").bind($.jPlayer.event.timeupdate, (e) => {
            duration = e.jPlayer.status.duration;
            this.setState({
                currentTime: Math.round(e.jPlayer.status.currentTime),
                progress: e.jPlayer.status.currentPercentAbsolute,
                volume: e.jPlayer.options.volume * 100,

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
    play(){
        this.state.isPlay?$("#player").jPlayer('pause'):$("#player").jPlayer('play')
       this.setState({
            isPlay:!this.state.isPlay
       })
    }
    stop(){

    }
    prev(){

    }
    next(){

    }

    render() {
        return (
            <div className="player-page">
                <h1 className="caption">{/*<Link to='/list'>*/}我的私人音乐坊 &gt;{/*</Link>*/}</h1>
                <div className="mt20 row">
                    <div className="controll-wrapper">
                        <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                        <h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
                        <div className="row mt20">
                            <div className="left-time -col-auto">-SSS</div>
                            <div className="volume-container">
                                <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                                <div className="volume-wrapper" style={{position: 'relative', top: 3}}>
                                    <Progress
                                        progress={this.state.volume}
                                        onProgressChange={this.changeVolumnHandler}
                                        barColor='green'
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{height: '10px', lineHeight: '10px', marginTop: '20px'}}>
                            <Progress
                                progress={this.state.progress}
                                currentTime={this.state.currentTime}
                                onProgressChange={this.progressChangeHandler}
                                bgColor='green'
                            />
                        </div>
                        <div className="mt35 row">
                            <div>
                                <i className="icon prev"> </i>
                                <i className={`icon ml20  ${this.state.isPlay?'pause':'play'}`} onClick={this.play.bind(this)}> </i>
                               {/* <i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play.bind(this)}></i>*/}
                                <i className="icon next ml20"> </i>
                            </div>
                            <div className="-col-auto">
                                <i></i>
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