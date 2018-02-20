import React from 'react'
import { View, Text, Image } from 'react-native'
import PropTypes from 'prop-types'
import { material, materialColors } from 'react-native-typography'

class Cover extends React.Component {
    render () {
        return (
            <View style={{ height: 240, backgroundColor: '#000000', justifyContent: 'center' }}>
                <Image
                    style={{flex: 1, backgroundColor: '#FFFFFF', opacity: 0.57 }}
                    source={{ uri: this.props.imageUri }}
                    resizeMode='cover'
                    blurRadius={3}
                />
                <View style={{
                    position: 'absolute',
                    backgroundColor: 'transparent',
                    flex: 1,
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center'
                }}>
                    <Image style={{ width: 128, height: 128 }}
                           source={{ uri: this.props.imageUri }}
                           resizeMode='contain'
                    />
                    <Text style={[material.title, { color: materialColors.whitePrimary }]}>{this.props.title}</Text>
                    <Text style={[material.subheading, { color: materialColors.whitePrimary }]}>{this.props.subtitle}</Text>
                </View>
            </View>
        )
    }
}

Cover.propTypes = {
    imageUri: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string
}

export default Cover