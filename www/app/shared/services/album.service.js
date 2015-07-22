(function () {
    'use strict';
    angular
            .module('app.service')
            .factory('albumservice', albumservice);

    albumservice.$inject = ['dataservice', 'exception'];


    /* @ngInject */
    function albumservice(dataservice, exception)
    {
        var service = {
            ready: dataservice.ready,
            getAlbumById: getAlbumById,
            getTracks: getTracks,
            queryAlbum: queryAlbum,
            queryAlbumByTag : queryAlbumByTag
        };

        return service;

        ///////////////////////////////////////

        
        function getAlbumById(albumId) {
            var parms = {
                Id: albumId,
                fields: 'artists,names,pvs,tags,webLinks',
                nameMatchMode: 'Auto'
            };
            return dataservice.callApi('/api/albums/:Id', parms)
                    .then(getAlbumByIdComplete)
                    .catch(function (message) {
                        exception.catcher('Call API Failed for getAlbumById')(message);
                    });

            function getAlbumByIdComplete(data, status, headers, config) {
                return data;
            }
        }
        
        function getTracks(albumId) {
            var parms = {
                Id: albumId
            };
            var load = {
                'isArray': true
            };

            return dataservice.callApi('/api/albums/:Id/tracks', parms, load)
                    .then(getTracksComplete)
                    .catch(function (message) {
                        exception.catcher('Call API Failed for getTracks')(message);
                    });

            function getTracksComplete(data, status, headers, config) {
                return data;
            }
        }
        
        function queryAlbum(query,start) {
            var parms = {
                query: query,
                start: start,
                fields: 'artists,tags',
                maxResults:25,
                getTotalCount: false,
                nameMatchMode: 'Auto'
            };

            return dataservice.callApi('/api/albums', parms)
                    .then(queryAlbumComplete)
                    .catch(function (message) {
                        exception.catcher('Call API Failed for queryAlbum')(message);
                    });

            function queryAlbumComplete(data, status, headers, config) {
                return data;
            }
        }
        
        function queryAlbumByTag(tag) {
            var parms = {
                tag: tag,
                fields: 'artists,tags',
                maxResults:25,
                getTotalCount: false,
                nameMatchMode: 'Auto'
            };

            return dataservice.callApi('/api/albums', parms)
                    .then(queryAlbumByTagComplete)
                    .catch(function (message) {
                        exception.catcher('Call API Failed for queryAlbumByTag')(message);
                    });

            function queryAlbumByTagComplete(data, status, headers, config) {
                return data;
            }
        }

    }
})();