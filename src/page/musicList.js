import React, {Component} from 'react'
import MusicListItem from "../components/musicListItem";
import {Link} from 'react-router-dom'

class musicList extends Component {


    render() {
        /* init the list ele*/
        let listEle = this.props.musicList.map((item) => {
            return (
                <div>
                    <MusicListItem item={item} key={item.id}
                                   focus={item === this.props.currentMusicItem}>

                    </MusicListItem>

                </div>
            )
        });
        /* this listEle wrapped with {}*/
        return <div style={{text:'right'}}>
            <ul>{listEle}</ul>
             <Link  to='/main'> Back</Link></div>

    }
}

export default musicList