import React from 'react';
import { connect } from 'react-redux';
import SongListPage from './SongSearch';
import { createSelector } from 'reselect';
import * as songActions from '../songActions';
import { selectSearchResult, selectSearchParams, selectNoResult } from '../songSelector';
import { selectLoading } from '../../../app/appSelector';
import Routes from './../../../app/appRoutes';
import i18n from './../../../common/i18n';

SongListPage.navigationOptions = ({ navigation }) => {

    const { params } = navigation.state;

    const navOptions = {
        title: params ? params.title : i18n.songs,
    }

    if(params && params.hideHeader) {
        navOptions.header = null
    }

    return navOptions;
}

const songListStateSelect = createSelector(
    selectSearchResult(),
    selectSearchParams(),
    selectLoading(),
    selectNoResult(),
    (songs, params, loading, isNoResult) => ({ songs, params, loading, isNoResult })
);


const mapDispatchToProps = (dispatch, props) => ({
    fetchSongs: () => dispatch(songActions.fetchSearchSongs()),
    fetchMoreSongs: () => dispatch(songActions.fetchMoreSearchResult()),
    onSearch: (value) => dispatch(songActions.onSearching(value)),
    back: () => props.navigation.goBack(),
    onPressSong: song => props.navigation.navigate(Routes.SongDetail, { id: song.id }),
    onPressFilter: () => props.navigation.navigate(Routes.SongFilter)
})

export default connect(songListStateSelect, mapDispatchToProps)(SongListPage)