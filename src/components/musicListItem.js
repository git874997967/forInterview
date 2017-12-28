import React, {Component} from 'react'
import './musicListItem.css'
import Pubsub from  'pubsub-js'
class musicListItem extends Component {


    playMusic(item){
    Pubsub.publish('PLAY_MUSIC',item);
    }
    deleteMusic(item,e){
        e.stopPropagation();
    Pubsub.publish('DELETE_MUSIC',item)
    }


    render() {
        /* this item get from the parent component which is musicList .
        *
        *
        * */
        let musicItem = this.props.item;

        return (
            <li onClick={this.playMusic.bind(this,musicItem)} className={`row components-listitem ${this.props.focus ? "focus" : ""}`}>
                <p><span  className='bold'>{musicItem.title} - {musicItem.artist}</span></p>
                <p onClick={this.deleteMusic.bind(this, musicItem)} className='-col-auto delete'/>
            </li>
        )
    }
}

export default musicListItem