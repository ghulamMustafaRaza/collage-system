import React from 'react'

export default class Loading extends React.Component{
    constructor(props){
        super(props)
        this.state={
            text: (props.text || "Loading"),
            speed: (props.speed || 200),
            boundry: (props.text || "Loading") + "..."
        }
    }
    componentDidMount(){
        this.interval = window.setInterval(()=>{
            this.state.text !== this.state.boundry?this.setState(prev=>({text:prev.text+'.'})):this.setState(prev=>({text:prev.text.slice(0,-3)}))
        }, this.state.speed)
    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }
    render(){
        return(
            <h1 className="text-center">{this.state.text}</h1>
        )
    }
}