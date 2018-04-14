import React from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import AlbumList from '../../album/AlbumList/index'
import Icon from '../../../components/Icon/index'
import TagGroup from '../../tag/TagGroup/index'
import ArtistRoleList from '../../artistRole/ArtistRoleList/index'
import WebLinkList from '../../webLink/WebLinkList/index'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import PVList from '../../pv/PVLIst/index'
import LyricGroup from '../../lyric/LyricGroup/index'
import Cover from '../../../components/Cover/index'
import Divider from '../../../components/Divider/index'
import Theme from '../../../theme'
import AlbumHorizontalList  from '../../album/AlbumHorizontalList'
import moment from 'moment'

class SongDetail extends React.PureComponent {

    componentDidMount () {
        if(this.props.navigation) {
            const { params } = this.props.navigation.state;
            this.props.fetchSong(params.id)
        }
    }

    render () {
        const song = this.props.song

        if(!song) {
            return (<View>
                <Text></Text>
            </View>)
        }


        const Section = props => (<View style={[{ paddingHorizontal: 4 },props.style]}>{props.children}</View>)

        const InfoPage = props => {

            const renderTagGroup = () => (
                <Section>
                    <Divider />
                    <TagGroup tags={song.tags} max={5} onPressTag={this.props.onPressTag} />
                </Section>
            )

            const renderPVList = () => (
                <Section>
                    <Divider />
                    <PVList pvs={song.pvs} type='Original' title='Original PVs' showHeader />
                </Section>
            )

            const renderAlbumList = () => (
                <Section>
                    <Divider />
                    <AlbumHorizontalList albums={this.props.albums} onPressItem={this.props.onPressAlbum} />
                </Section>
            )

            const renderWebLinkList = () => (
                <Section>
                    <Divider />
                    <WebLinkList webLinks={song.webLinks} category='Official' title='Official' />
                </Section>
            )

            return (
                <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                    <Cover
                        imageUri={song.thumbUrl}
                        title={song.defaultName}
                        subtitle={song.artistString}
                        subtitle2={(song && song.publishDate)? moment(song.publishDate).format('MM/DD/YYYY') : '' }
                    />
                    <Section style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                        {!this.props.isFavoriteSong && <Icon name='md-heart' text='Favorite' onPress={() => this.props.onPressFavorite(song)} />}
                        {this.props.isFavoriteSong && <Icon name='md-heart' text='Favorite' color={Theme.buttonActiveColor} onPress={() => this.props.onPressUnfavorite(song)} />}
                        <Icon name='md-share' text='Share' onPress={() => this.props.onPressShare(song)} />
                    </Section>

                    {song.tags && song.tags.length > 0 && renderTagGroup()}
                    {song.pvs && song.pvs.length > 0 && renderPVList()}
                    {song.albums && song.albums.length > 0 && renderAlbumList()}
                    {song.webLinks && song.webLinks.length > 0 && renderWebLinkList()}

                </ScrollView>
            )
        }

        const ArtistRoleListPage = () => (
            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                <ArtistRoleList artists={song.artists} onPressItem={this.props.onPressArtist} displayRole />
            </ScrollView>
        )

        const LyricGropuPage = () => (
            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                <LyricGroup lyrics={song.lyrics} />
            </ScrollView>
        )

        return (
            <ScrollableTabView>
                <InfoPage tabLabel='Info' />
                <ArtistRoleListPage tabLabel='Artists' />
                {song.lyrics && song.lyrics.length > 0 && <LyricGropuPage tabLabel='Lyrics' />}
            </ScrollableTabView>
        )
    }
}

SongDetail.detaulProps = {
}

export default SongDetail