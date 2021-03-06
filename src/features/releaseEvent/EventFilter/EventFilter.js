import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Modal } from 'react-native';
import Content from '../../../components/Content';
import Section from '../../../components/Section';
import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-material-dropdown';
import ArtistSelectModal from './../../artist/ArtistSelectModal';
import TagSelectModal from './../../tag/TagSelectModal';
import ArtistRow from './../../artist/ArtistRow';
import { Button } from 'react-native-material-ui';
import { categoryItems, category, filterField, sortItems  } from './../releaseEventConstant'
import Theme from '../../../theme';
import i18n from './../../../common/i18n';

class EventFilter extends React.PureComponent {

    constructor(props){
        super(props)
        this.state = {
            showArtistModal: false,
            showTagModal: false
        }
    }

    renderInputArtists () {
        return (
            <View>
                <Text style={[Theme.subhead, { marginHorizontal: 8 }]}>{i18n.artists}</Text>
                <View>
                    {this.props.filterArtists.map(a =>
                        <ArtistRow
                            key={a.id}
                            id={a.id}
                            image={a.image}
                            name={a.name}
                            rightIcon='ios-close'
                            onRightElementPress={() => this.props.onRemoveArtist(a)} />)}
                </View>
                <Button
                    raised
                    primary
                    style={{ container: { marginHorizontal: 16, marginVertical: 8 } }}
                    text={i18n.selectArtist}
                    onPress={() => { this.setState({ showArtistModal: true }) }} />

                <ArtistSelectModal
                    modalVisible={this.state.showArtistModal}
                    onBackPress={() => {
                        this.setState({ showArtistModal: false })
                    }}
                    onPressItem={artist => {
                        this.setState({ showArtistModal: false })
                        this.props.onAddArtist(artist)
                    }} />
            </View>
        )
    }

    renderInputTags () {
        return (
            <View>
                <Text style={[Theme.subhead, { marginHorizontal: 8 }]}>{i18n.tags}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                    {this.props.filterTags.map(t => {
                        return <Tag
                            showRemoveButton
                            key={t.id}
                            name={t.name}
                            style={{ margin: 4 }}
                            selected={t.selected}
                            onRemovePress={() => this.props.onRemoveFilterTag(t)} />
                    })}
                </View>
                <Button
                    raised
                    primary
                    style={{ container: { marginHorizontal: 16, marginVertical: 8 } }}
                    text={i18n.selectTag}
                    onPress={() => { this.setState({ showTagModal: true }) }} />
                <TagSelectModal
                    modalVisible={this.state.showTagModal}
                    onBackPress={() => {
                        this.setState({ showTagModal: false })
                    }}
                    onPressItem={tag => {
                        this.setState({ showTagModal: false })
                        this.props.onAddFilterTag(tag)
                    }} />
            </View>
        )
    }


    renderInputSort () {
        return (
            <View style={{ marginHorizontal: 8 }}>
                <Dropdown
                    label={i18n.sort}
                    value={this.props.params.sort}
                    onChangeText={text => {
                        this.props.onParamChanged(filterField.sort, text)
                    }}
                    data={sortItems}
                    labelExtractor={item => item.label}
                    valueExtractor={item => item.value}
                />
            </View>
        )
    }

    renderInputCategory () {
        return (
            <View style={{ marginHorizontal: 8 }}>
                <Dropdown
                    label={i18n.category}
                    value={this.props.params.category}
                    data={categoryItems}
                    onChangeText={text => {
                        this.props.onParamChanged(filterField.category, text)
                    }}
                    labelExtractor={item => item.label}
                    valueExtractor={item => item.value}
                />
            </View>
        )
    }

    renderInputDateRange() {
        return (

            <Section title={i18n.dateRange}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>

                    <View style={{ margin: 8, width: 50 }}>
                        <Text>{i18n.from}</Text>
                    </View>

                    <DatePicker
                        date={this.props.params.afterDate}
                        mode="date"
                        placeholder="Start date"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        onDateChange={(date) => this.props.onParamChanged(filterField.afterDate, date)}
                    />
                </View>

                <View style={{ height: 8 }} />

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <View style={{ margin: 8, width: 50 }}>
                        <Text>{i18n.to}</Text>
                    </View>
                    <DatePicker
                        date={this.props.params.beforeDate}
                        mode="date"
                        placeholder="End date"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        onDateChange={(date) => this.props.onParamChanged(filterField.beforeDate, date)}
                    />
                </View>
            </Section>

        )
    }

    renderClearFilter () {
        return (
            <Button raised icon='clear' text={i18n.clearFilter} style={{ container: { marginHorizontal: 16, marginVertical: 8 } }} onPress={this.props.onPressClearFilter} />
        )
    }

    render () {
        return (
            <Content>
                {this.renderInputDateRange()}
                {this.renderInputCategory()}
                {this.renderInputSort()}
                {this.renderInputArtists()}
                {this.renderInputTags()}
                {this.renderClearFilter()}
            </Content>
        )
    }
}

EventFilter.propTypes = {
    params: PropTypes.object,
    updateParam: PropTypes.func
}

EventFilter.defaultProps = {
    params: {
        afterDate: '2016-05-15',
        beforeDate: '2016-05-15',
        category: category.unspecified
    },
    updateParam: (name, value) => {}
}

export default EventFilter;