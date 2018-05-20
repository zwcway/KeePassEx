"use strict";
const Base64 = require('base64-arraybuffer')
import axios from 'axios/dist/axios.min.js'
import {
    ChromePromiseApi
} from '$lib/chrome-api-promise.js'
import {
    OauthManager
} from '$services/oauthManager.js'
import { random } from 'case';

const chromePromise = ChromePromiseApi()

function BoxComFileManager(settings) {
    var accessTokenType = 'box.com';

    var state = {
        loggedIn: false
    }

    var oauth = {
        key: accessTokenType,
        accessTokenType: accessTokenType,
        origins: ['https://api.pcloud.com/'],
        authUrl: 'https://account.box.com/api/oauth2/authorize?response_type=code',
        supportedFeatures: ['incognito', 'listDatabases'],
        title: 'Box.com',
        icon: 'icon-box.com',
        chooseTitle: 'box.com',
        chooseDescription: 'Access password files stored on box.com. Files will be retrieved from box.com each time they are used.',
    };

    oauth.searchRequestFunction = function(token) {
        return axios({
            method: 'GET',
            url: 'https://api.box.com/2.0/search',
            params: {
                type: 'file',
                file_extensions: 'kdbx',
            },
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
    }

    oauth.searchRequestHandler = function(response) {

        var walk = function(files, contents, path) {
            contents.forEach( (file) => {
                if(file.isfolder) {
                    walk(files, file.contents, path + file.name + "/")
                }
                else {
                    file.path = path + file.name
                    files.push(file)
                }
            })
            return files
        }

        var files = walk([], response.data.metadata.contents, "/")
        return files.filter(function(fileInfo) {
            return fileInfo.name && /\.kdbx?$/.exec(fileInfo.name)
        }).map(function(fileInfo) {
            return {
                title: fileInfo.path,
                id: fileInfo.fileid
            };
        });
    }

    //get the minimum information needed to identify this file for future retrieval
    oauth.getDatabaseChoiceData = function(dbInfo) {
        return {
            title: dbInfo.title,
            id: dbInfo.id
        }
    }

    //given minimal file information, retrieve the actual file
    oauth.fileRequestFunction = function(dbInfo, token) {
        
    }

    oauth.revokeAuth = function() {
        return Promise.resolve()
    }

    oauth.handleAuthRedirectURI = function(redirect_url, randomState, resolve, reject) {
        console.log(redirect_url, randomState, "handleAuthRedirect...");
        // function parseAuthInfoFromUrl(url) {
        //     var code = /code=([^&]+)/.exec(url);
        //     var stateMatches = /state=([^&]+)/.exec(url);
        //     if (!code) {
        //         return null;
        //     }
        //     code = code[1];
        //     let checkState = decodeURIComponent(stateMatches[1]);
        //     if (checkState === randomState) {
		// 		state.loggedIn = true;
		// 		settings.getSetAccessToken(accessTokenType, access_token).then(function() {
		// 			resolve(access_token);
		// 		});
		// 	} else {
		// 		//some sort of error or parsing failure
		// 		reject();
		// 		console.error(redirect_url, " - state was found invalid");
		// 	}
        // }

        // var authInfo = parseAuthInfoFromUrl(redirect_url);
        // if (authInfo === null) {
        //     reject('Failed to extract authentication information from redirect url');
        // } else {
        //     settings.getSetAccessToken(accessTokenType, authInfo.access_token).then(function() {
        //         resolve(authInfo.access_token);
        //     });
        // }
    }

    return OauthManager(settings, oauth)
}

export {
    BoxComFileManager
}
