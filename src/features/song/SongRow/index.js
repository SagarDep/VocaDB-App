import React from 'react'
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types';
import Theme from '../../../theme'
import Icon from '../../../components/Icon/index'
import moment from 'moment'
import SongType from './../SongType'

class SongRow extends React.PureComponent {

    renderImage () {
        return (
            <View style={styles.image}>
                <Image
                    style={styles.image}
                    source={{ uri: this.props.image }}
                    resizeMode='cover'
                    resizeMethod='resize'
                />
                <View style={{  position: 'absolute', bottom: 4, right: 4 }}>
                    <SongType type={this.props.songType} />
                </View>
            </View>
        )
    }

    render () {

        const renderPrefix = () => {
            if(!this.props.prefix)  {
                return null;
            }

            return this.props.prefix;
        }
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={styles.listItem}>

                    {renderPrefix()}

                    <View style={styles.imageContainer}>
                        {this.renderImage()}
                    </View>

                    <View style={[styles.infoContainer, { justifyContent: 'space-between'}]}>
                        <View>
                            <Text style={Theme.rowTitle} numberOfLines={1}>{this.props.name}</Text>
                            <Text style={Theme.caption} numberOfLines={2}>{this.props.artist}</Text>
                            <Text style={Theme.caption}>{moment.utc(this.props.dateTime).fromNow()}</Text>
                        </View>
                        <View>
                            {this.props.pvServices.length > 0 && (
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {this.props.pvServices.map(pvService =>
                                        <Icon style={{ marginRight: 4 }} key={pvService} name={pvService} size='small' site />)}
                                </View>
                            )}
                        </View>


                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

SongRow.propTypes = {
    name: PropTypes.string,
    artist: PropTypes.string,
    hideArtist: PropTypes.bool,
    pvServices: PropTypes.array,
    songType: PropTypes.string,
    onPress: PropTypes.func
};

SongRow.defaultProps = {
    name: 'Unknown',
    artist: 'Unknown',
    hideArtist: false,
    songType: 'Other',
    pvServices: []
};

const styles =  StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 4,
        height: 100
    },
    imageContainer: {
        padding: 4,
        // backgroundColor: '#546E7A',
        width: 160
    },
    infoContainer: {
        flex: 1,
        padding: 4
    },
    image: {
        flex: 1
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4
    },
    subtitle: {

    }
})


export default SongRow;