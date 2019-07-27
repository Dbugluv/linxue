import Taro,{Component} from '@tarojs/taro'
import{View, Image, Text} from '@tarojs/components'
 
import './articlelist.scss'

export default class Articlelist extends Component {

  navigateTo(url) {
    Taro.navigateTo({url:url})
  }

  render () {
    return (
      <View className='feed_item'>
        <View className='feed_content'>
          <View className='title'>
            <Text>{this.props.title}</Text>                    
            </View>
            <View className='summary'>         
                <Text>{this.props.summary}</Text>
            </View>
        </View>
      </View>
    )
  }
}

