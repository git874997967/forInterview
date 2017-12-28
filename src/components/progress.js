import React, {Component} from 'react'
import './progress.css'

class Progress extends Component {

    changeProgress(e){
        //获取进度条节点
        //with refs to retrive it
        let progressBar=this.refs.progressBar;
        //获取点击后的进度值
        let progress=(e.clientX-progressBar.getBoundingClientRect().left)/progressBar.clientWidth;
            // in child component use the function name to check the function is exist or not
        this.props.onProgressChange &&this.props.onProgressChange (progress)

    }
    render() {
        return (
            /* react use "ref" to find the dom element*/
            // must bind itself otherwise  it will make error
            <div className='components-progress' ref='progressBar' onClick={this.changeProgress.bind(this)}>
                <div className='progress' style={{width:`${this.props.progress}%`,background:this.props.barColor}} >
                    {this.props.currentTime}s
                </div>
            </div>
        )
    }
}
Progress.defaultProps = {
    barColor: "blue"
}
export default Progress