// 将css文件在js中引入，
// 通过我们的css-loader和style-loader处理之后，他会把样式全部处理到我们的bundle。js文件中
import './Hello.css'
import './Hellow.scss'

import React, {Component} from 'react'
// import * as obj from './module'

// console.log(a)
// console.log(obj)

// 直接在js中定义样式，内嵌样式
let style = {
    backgroundColor: 'blue'
}

export default class Hello extends Component {
    render() {
        return (
            <div className="color" x="zifuchuan" varb='34545' >

                 <h1 style={style}>Hello Reacthkkhjkhjkhjkhjkhjkhjk ! aaaaaaaaaaaaaaaaaaaaaaaaa</h1>

                <img/>
            </div>
        )
    }
}
