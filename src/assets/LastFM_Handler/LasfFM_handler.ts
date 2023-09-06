/**
 * @file src/assets/LastFM_handler.ts
 * @description LastFM API handler.
 * @author Tom Planche (@tomPlanche)
 */

// IMPORTS ===================================================================================================  IMPORTS
import {LAST_FM_API_KEY} from "./secrets";
import axios from 'axios';
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLES
export const LASTFM_ERROR_CODES = {
  // 1 : This error does not exist
  STATUS_INVALID_SERVICE: 2,
  STATUS_INVALID_METHOD: 3,
  STATUS_AUTH_FAILED: 4,
  STATUS_INVALID_FORMAT: 5,
  STATUS_INVALID_PARAMS: 6,
  STATUS_INVALID_RESOURCE: 7,
  STATUS_OPERATION_FAILED: 8,
  STATUS_INVALID_SK: 9,
  STATUS_INVALID_API_KEY: 10,
  STATUS_OFFLINE: 11,
  STATUS_SUBSCRIBERS_ONLY: 12,
  STATUS_INVALID_SIGNATURE: 13,
  STATUS_TOKEN_UNAUTHORIZED: 14,
  STATUS_TOKEN_EXPIRED: 15,
  STATUS_TEMPORARILY_UNAVAILABLE: 16,
  STATUS_LOGIN_REQUIRED: 17,
  STATUS_TRIAL_EXPIRED: 18,
  // # 19 : This error does not exist
  STATUS_NOT_ENOUGH_CONTENT: 20,
  STATUS_NOT_ENOUGH_MEMBERS: 21,
  STATUS_NOT_ENOUGH_FANS: 22,
  STATUS_NOT_ENOUGH_NEIGHBOURS: 23,
  STATUS_NO_PEAK_RADIO: 24,
  STATUS_RADIO_NOT_FOUND: 25,
  STATUS_API_KEY_SUSPENDED: 26,
  STATUS_DEPRECATED: 27
}

export const METHODS = {
  user: {
    getInfo: "user.getInfo",
    getLovedTracks: "user.getLovedTracks",
    getRecentTracks: "user.getRecentTracks",
    getTopTracks: "user.getTopTracks",
    getPersonalTags: 'user.getPersonalTags',
    getFriends: 'user.getFriends',
    getTopAlbums: 'user.getTopAlbums',
    getTopArtists: 'user.getTopArtists',
    getTopTags: 'user.getTopTags',
    getWeeklyAlbumChart: 'user.getWeeklyAlbumChart',
    getWeeklyArtistChart: 'user.getWeeklyArtistChart',
    getWeeklyChartList: 'user.getWeeklyChartList',
    getWeeklyTrackChart: 'user.getWeeklyTrackChart',
  }
} as const;

// interface(s)
interface I_LastFM_handler {
  baseURL: string;
  endURL: string;

  username: string;
  getUsername: T_getUsername;
  setUsername: T_setUsername;
}

// Enum(s)
export enum E_Period {
  Overall = "overall",
  SevenDay = "7day",
  OneMonth = "1month",
  ThreeMonth = "3month",
  SixMonth = "6month",
  TwelveMonth = "12month"
}

// TYPES ============
// General types
type T_Image = {
  size: string;
  "#text": string;
}

type T_ArtistS = {
   mbid: string;
  '#text': string;
}

type T_ArtistM = {
  mbid: string;
  name: string;
  url: string;
}

type T_ArtistL = {
  image: T_Image[];
  mbid: string;
  name: string;
  url: string;
}

type T_ArtistTotal = {
  image: T_Image[];
  mbid: string;
  name: string;
  streamable: string;
  url: string;
  playcount: number | string;

  "@attr": {
    rank: number | string;
  }
}

type T_StreamableS = {
  fulltrack: boolean | string;
}

type T_StreamableL = {
  fulltrack: boolean | string;
  "#text": boolean | string;
}

type T_Attr = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  user: string;
}

type T_RegistredS = {
  unixtime: number | string;
}

type T_RegistredL = {
  unixtime: number | string;
  "#text": Date;
}

type T_WeelyXChartAttr = {
  from: number; // UNIX timestamp
  to: number; // UNIX timestamp
  user: string;
}

type T_Chart = {
  "#text": string;
  from: number; // UNIX timestamp
  to: number; // UNIX timestamp
}

type T_Tag = {
  name: string;
  count: number | string;
  url: string;
}

type T_ERROR = {
  code: number;
  message: string;
}

// params type(s)
type T_UserTopTracksParams = {
  limit: number;
  page: number;
  period: E_Period;
}

type T_RecentTracksParams = {
  extended: boolean; // Includes extended data in each artist, and whether the user has loved each track
  from: number;
  limit: number;
  page: number;
  to: number;
}

type T_UserLovedTracksParams = {
  limit: number;
  page: number;
}

type T_UserGetFriendsParams = {
  recenttracks: boolean;
  limit: number;
  page: number;
}

type T_UserGetTopAlbumsParams = {
  period: E_Period;
  limit: number;
  page: number;
}

type T_UserGetTopArtistsParams = {
  period: E_Period;
  limit: number;
  page: number;
}

type T_UserWeeklyXChartParams = {
  from: number; // UNIX timestamp
  to: number;
}

type T_UserGetTopTagsParams = {
  limit: number;
}

// track type(s)
type T_UserTopTracksTrack = {
  artist: T_ArtistM;
  duration: number | string;
  image: T_Image[];
  mbid: string;
  name: string;
  playcount: number | string;
  streamable: T_StreamableL
  url: string;

  "@attr": {
    rank: number | string;
  }
}

type T_RecentTracksTrack = {
  album: {
    mbid: string;
    '#text': string;
  }
  artist: T_ArtistS;
  image: T_Image[];
  mbid: string;
  name: string;
  streamable: T_StreamableS
  url: string;

  '@attr'?: {
    nowplaying: boolean | string;
  }
}

type T_RecentTracksTrackExtended = T_RecentTracksTrack & {
  artist: T_ArtistL;
  loved: boolean;
}

type T_RecentTracksTrackAll = T_RecentTracksTrack | T_RecentTracksTrackExtended;

type T_GoodParams =
  T_UserTopTracksParams
  | T_RecentTracksParams
  | T_UserLovedTracksParams
  | T_UserGetFriendsParams
  | T_UserGetTopAlbumsParams
  | T_UserGetTopArtistsParams
  | T_UserWeeklyXChartParams
  | T_UserGetTopTagsParams;


type Methods = typeof METHODS;
type Method = Methods["user"][keyof Methods["user"]];

type T_UserTopAlbumsAlbum = {
  artist: T_ArtistM;
  image: T_Image[];
  mbid: string;
  name: string;
  playcount: number | string;
  url: string;

  "@attr": {
    rank: number | string;
  }
}

// response type(s)
export type T_UserInfoRes = {
  age: number;
  album_count: number | string;
  artist_count: number | string;
  bootstrap: boolean | string;
  country: string;
  gender: string;
  id: string;
  image: string;
  name: string;
  playcount: number | string;
  playlists: number | string;
  realname: string;
  registered: T_RegistredS
  subscriber: number | string;
  track_count: number | string;
  type: string;
  url: string;
}

type T_RecentTracksRes = {
  recenttracks: {
    track: T_RecentTracksTrackAll[];
    "@attr": T_Attr;
  }
}

type T_UserTopTracksRes = {
  toptracks: {
    track: T_UserTopTracksTrack[];
    "@attr": T_Attr;
  }
}

type T_UserLovedTracksTrack = {
  artist: T_ArtistM;
  date: {
    uts: number
    "#text": Date;
  }
  image: T_Image[];
  mbid: string;
  name: string;
  streamable: T_StreamableL;
  url: string;
}

type T_UserLovedTracksRes = {
  lovedtracks: {
    track: T_UserLovedTracksTrack[];
    "@attr": T_Attr;
  }
}

type T_UserFriendsUser = {
  bootstrap: boolean | string;
  country: string;
  image: T_Image;
  name: string;
  playlists: number | string;
  playcount: number | string;
  registered: T_RegistredL
  realname: string;
  subscriber: number | string;
  type: string;
  url: string;
}

type T_UserFriendsRes = {
  friends: {
    "@attr": T_Attr;
    user: T_UserFriendsUser[];
  }
}

type T_UserTopAlbumsRes = {
  topalbums: {
    album: T_UserTopAlbumsAlbum[];
    "@attr": T_Attr;
  };
}

type T_UserTopArtistsRes = {
  topartists: {
    artist: T_ArtistTotal[];
    "@attr": T_Attr;
  }
}

type T_UserWeeklyAlbumChartRes = {
  weeklyalbumchart: {
    album: T_UserTopAlbumsAlbum[];
    "@attr": T_WeelyXChartAttr;
  }
}

type T_UserWeeklyArtistChartRes = {
  weeklyartistchart: {
    artist: T_ArtistTotal[];
    "@attr": T_WeelyXChartAttr;
  }
}

type T_UserWeeklyChartRes = {
  weeklychartlist: {
    chart: T_Chart[];
    "@attr": {
      user: string;
    }
  }
}

type T_UserWeeklyTrackChartRes = {
  weeklytrackchart: {
    track: T_UserTopAlbumsAlbum[];
    "@attr": T_WeelyXChartAttr;
  }
}

type T_UserGetTopTagsRes = {
  toptags: {
    tag: T_Tag[];
    "@attr": {
      user: string;
    }
  }
}

type T_ErrorRes = {
  error: T_ERROR;
}

type T_allResponse =
  T_UserInfoRes
  | T_UserTopTracksRes
  | T_RecentTracksRes
  | T_UserLovedTracksRes
  | T_UserFriendsRes
  | T_UserTopAlbumsRes
  | T_UserTopArtistsRes
  | T_UserWeeklyAlbumChartRes
  | T_UserWeeklyArtistChartRes
  | T_UserWeeklyChartRes
  | T_UserWeeklyTrackChartRes
  | T_UserGetTopTagsRes

// Function types

// Class types
type T_getInstance = (username?: string) => LastFM_handler;
type T_setUsername = (username: string) => void;
type T_getUsername = () => string;

// Methods types
type T_fetchData = (
  method: Method,
  params: Partial<T_GoodParams>,
) => Promise<T_allResponse | T_ErrorRes>;

// User methods types
type T_getUserInfo = () => Promise<T_UserInfoRes>;
type T_getUserTopTracks = (params?: Partial<T_UserTopTracksParams>) => Promise<T_UserTopTracksRes>;
type T_getUserRecentTracks = (params?: Partial<T_RecentTracksParams>) => Promise<T_RecentTracksRes>
type T_getUserLovedTracks = (params?: Partial<T_UserLovedTracksParams>) => Promise<T_UserLovedTracksRes>;
type T_getUserFriends = (params?: Partial<T_UserGetFriendsParams>) => Promise<T_UserFriendsRes>;
type T_getUserTopAlbums = (params?: Partial<T_UserGetTopAlbumsParams>) => Promise<T_UserTopAlbumsRes>;
type T_getUserTopArtists = (params?: Partial<T_UserGetTopArtistsParams>) => Promise<T_UserTopArtistsRes>;
type T_getUserWeeklyAlbumChart = (params?: Partial<T_UserWeeklyXChartParams>) => Promise<T_UserWeeklyAlbumChartRes>;
type T_getUserWeeklyArtistChart = (params?: Partial<T_UserWeeklyXChartParams>) => Promise<T_UserWeeklyArtistChartRes>;
type T_getUserWeeklyChartList = () => Promise<T_UserWeeklyChartRes>;
type T_getUserWeeklyTrackChart = (params?: Partial<T_UserWeeklyXChartParams>) => Promise<T_UserWeeklyTrackChartRes>;
type T_getUserTopTags = (params?: Partial<T_UserGetTopTagsParams>) => Promise<T_UserGetTopTagsRes>;

type T_isNowPlaying = () => Promise<T_RecentTracksTrackAll>;

// other types
type T_ResponseItem = {
  "@attr": {
    rank: number | string;
  },
  playcount: number | string;
};

type T_parseResponseItems = (items: T_ResponseItem[]) => void;
// error class(es)
export class NoCurrentlyPlayingTrackError extends Error {
  constructor() {
    super("No currently playing track.");
  }
}

// END VARIABLES ======================================================================================= END VARIABLES

// FUNCTIONS ================================================================================================ FUNCTIONS
const parseResponseItems: T_parseResponseItems = (items) => {
  items.forEach((item) => {
    item["@attr"].rank = Number(item["@attr"].rank);
    item.playcount = Number(item.playcount);
  });
}

const parseResponseAttr = (attr: {
  from: string | number;
  to: string | number;
}) => {
  attr.from = Number(attr.from);
  attr.to = Number(attr.to);
}

/**
 * @function castResponse
 * @description Casts the response to the correct type. The API returns types in string, so we need to cast them.
 *
 * @param response {T_allResponse} The response to cast.
 * @returns {T_allResponse} The cast response.
 */
const castResponse = <T extends T_allResponse | T_ErrorRes>(response: T): T => {
  if ("error" in response) {
    const errorName = Object.keys(LASTFM_ERROR_CODES).find((key) => {
      const finalKey = key as keyof typeof LASTFM_ERROR_CODES;

      return LASTFM_ERROR_CODES[finalKey] === Number(response.error);
    });

    const finalResponse = response as T_ErrorRes;

    throw {
      code: finalResponse.error.code,
      message: `${errorName} (${finalResponse.error.code}): ${finalResponse.error.message}`
    }
  }

  // Check which type the response is
  if ("recenttracks" in response) {
    response.recenttracks.track.forEach((track) => {
      track['@attr'] = track['@attr'] || {nowplaying: false};
      // @ts-ignore
      track.streamable = track.streamable === "1";
    })

    return response;
  }

  if ("toptracks" in response) {
    response.toptracks.track.forEach((track) => {
      track.streamable.fulltrack = track.streamable.fulltrack === "1";
      track.streamable["#text"] = track.streamable["#text"] === "1";
      track.duration = Number(track.duration);
      track.playcount = Number(track.playcount);

      track["@attr"].rank = Number(track["@attr"].rank);
    })

    return response;
  }

  if ("lovedtracks" in response) {
    response.lovedtracks.track.forEach((track) => {
      track.streamable.fulltrack = track.streamable.fulltrack === "1";
      track.streamable["#text"] = track.streamable["#text"] === "1";

      track.date.uts = Number(track.date.uts);
      track.date["#text"] = new Date(track.date["#text"]);
    })

    return response;
  }

  if ("friends" in response) {
    response.friends.user.forEach((user) => {
      user.bootstrap = user.bootstrap === "1";
      user.playlists = Number(user.playlists);
      user.playcount = Number(user.playcount);
      user.registered.unixtime = Number(user.registered.unixtime);
      user.subscriber = Number(user.subscriber);
    })

    return response;
  }

  if ("topalbums" in response) {
    response.topalbums.album.forEach((album) => {
      album["@attr"].rank = Number(album["@attr"].rank);
      album.playcount = Number(album.playcount);
    })

    response.topalbums["@attr"].page = Number(response.topalbums["@attr"].page);

    return response;
  }

  if ("topartists" in response) {
    response.topartists.artist.forEach((artist) => {
      artist["@attr"].rank = Number(artist["@attr"].rank);
      artist.playcount = Number(artist.playcount);
    })

    response.topartists["@attr"].page = Number(response.topartists["@attr"].page);

    return response;
  }

  if (
    "weeklyalbumchart" in response
    || "weeklyartistchart" in response
    || "weeklytrackchart" in response
  ) {
    if ("weeklyalbumchart" in response) {
      parseResponseItems(response.weeklyalbumchart.album)
      parseResponseAttr(response.weeklyalbumchart["@attr"])
    } else if ("weeklyartistchart" in response) {
      parseResponseItems(response.weeklyartistchart.artist)
      parseResponseAttr(response.weeklyartistchart["@attr"])
    } else if ("weeklytrackchart" in response) {
      parseResponseItems(response.weeklytrackchart.track)
      parseResponseAttr(response.weeklytrackchart["@attr"])
    }

    return response;

  }

  if ("weeklychartlist" in response) {
    response.weeklychartlist.chart.forEach((chart) => {
      chart.from = Number(chart.from);
      chart.to = Number(chart.to);
    })

    return response;
  }

  if ("toptags" in response) {
    response.toptags.tag.forEach((tag) => {
      tag.count = Number(tag.count);
    })

    return response;
  }

  response.age = Number(response.age);
  response.album_count = Number(response.album_count);
  response.artist_count = Number(response.artist_count);
  response.bootstrap = response.bootstrap === "1";
  response.playcount = Number(response.playcount);
  response.playlists = Number(response.playlists);
  response.subscriber = Number(response.subscriber);
  response.track_count = Number(response.track_count);

  return response;
}

// END FUNCTIONS ======================================================================================== END FUNCTIONS
/**
 * Singleton class to handle LastFM API requests.
 * @class LastFM_handler
 */
class LastFM_handler implements I_LastFM_handler {
  static instance: LastFM_handler;

  readonly baseURL: string = "http://ws.audioscrobbler.com/2.0/";
  readonly endURL: string = `&api_key=${LAST_FM_API_KEY}&format=json`;

  username = "LASTFM_USERNAME";

  constructor(username?: string) {
    if (username) {
      this.username = username;
    }
  }

  /**
   * @function getInstance
   * @description Returns the instance of the class.
   */
  static getInstance: T_getInstance = (username) => {
    if (!LastFM_handler.instance) {
      LastFM_handler.instance = new LastFM_handler(username ?? 'RJ');
    }

    if (username) {
      LastFM_handler.instance.setUsername(username);
    }

    return LastFM_handler.instance;
  }

  /**
   * @function setUsername
   * @description Sets the username.
   *
   * @param username {string} The username to set.
   * @returns {void}
   */
  setUsername: T_setUsername = (username: string): void => {
    this.username = username;
  }

  /**
   * @function getUsername
   * @description Gets the username.
   *
   * @returns {string} The username.
   */
  getUsername: T_getUsername = (): string => {
    return this.username;
  }

  /**
   * @function getUserInfo
   * @description Gets the user info.
   *
   * @returns {Promise<T_UserInfoRes>}
   */
  getUserInfo: T_getUserInfo = async (): Promise<T_UserInfoRes> => {
    return castResponse(
      await this.fetchData(METHODS.user.getInfo, {}) as T_UserInfoRes
    );
  }

  /**
   * @function getUserTopTracks
   * @description Gets the user top tracks.
   *
   * @param params {Partial<T_UserTopTracksParams>} The params to use.
   * @returns {Promise<T_UserTopTracksRes>}
   */
  getUserTopTracks: T_getUserTopTracks = async (
    params?: Partial<T_UserTopTracksParams>
  ): Promise<T_UserTopTracksRes> => {
    return castResponse(
      await this.fetchData(METHODS.user.getTopTracks, params ?? {}) as T_UserTopTracksRes
    );
  }

  /**
   * @function getUserRecentTracks
   * @description Gets the user recent tracks.
   *
   * @param params {Partial<T_RecentTracksParams>} The params to use.
   * @returns {Promise<T_RecentTracksRes>}
   */
  getUserRecentTracks: T_getUserRecentTracks = async (
    params?: Partial<T_RecentTracksParams>
  ): Promise<T_RecentTracksRes> => {
    return castResponse(
      await this.fetchData(METHODS.user.getRecentTracks, params ?? {}) as T_RecentTracksRes
    );
  }

  /**
   * @function getUserLovedTracks
   * @description Gets the user loved tracks.
   *
   * @param params {Partial<T_UserLovedTracksParams>} The params to use.
   * @returns {Promise<T_UserLovedTracksRes>}
   */
  getUserLovedTracks: T_getUserLovedTracks = async (
    params?: Partial<T_UserLovedTracksParams>
  ): Promise<T_UserLovedTracksRes> => {
    return castResponse(
      await this.fetchData(METHODS.user.getLovedTracks, params ?? {}) as T_UserLovedTracksRes
    );
  }

  /**
   * @function getUserFriends
   * @description Gets the user friends.
   *
   * @param params {Partial<T_UserGetFriendsParams>} The params to use.
   * @returns {Promise<T_UserFriendsRes>}
   */
  getUserFriends: T_getUserFriends = async (
    params?: Partial<T_UserGetFriendsParams>
  ): Promise<T_UserFriendsRes> => {
    return castResponse(
      await this.fetchData(METHODS.user.getFriends, params ?? {}) as T_UserFriendsRes
    );
  }

  /**
   * @function getUserTopAlbums
   * @description Gets the user top albums.
   *
   * @param params {Partial<T_UserGetTopAlbumsParams>} The params to use.
   * @returns {Promise<T_UserTopAlbumsRes>}
   */
  getUserTopAlbums: T_getUserTopAlbums = async (
    params?: Partial<T_UserGetTopAlbumsParams>
  ): Promise<T_UserTopAlbumsRes> => {
    return castResponse(
      await this.fetchData(METHODS.user.getTopAlbums, params ?? {}) as T_UserTopAlbumsRes
    );
  }

  /**
   * @function getUserTopArtists
   * @description Gets the user top artists.
   *
   * @param params {Partial<T_UserGetTopArtistsParams>} The params to use.
   * @returns {Promise<T_UserTopArtistsRes>}
   */
  getUserTopArtists: T_getUserTopArtists = async (
    params?: Partial<T_UserGetTopArtistsParams>
  ): Promise<T_UserTopArtistsRes> => {
    return castResponse(
      await this.fetchData(METHODS.user.getTopArtists, params ?? {}) as T_UserTopArtistsRes
    );
  }

  /**
   * @function getUserWeeklyAlbumChart
   * @description Gets the user weekly album chart.
   *
   * @param params {Partial<T_UserWeeklyXChartParams>} The params to use.
   * @returns {Promise<T_UserWeeklyAlbumChartRes>}
   */
  getUserWeeklyAlbumChart: T_getUserWeeklyAlbumChart = async (
    params?: Partial<T_UserWeeklyXChartParams>
  ): Promise<T_UserWeeklyAlbumChartRes> => {
    return castResponse(
      await this.fetchData(METHODS.user.getWeeklyAlbumChart, params ?? {}) as T_UserWeeklyAlbumChartRes
    );
  }

  /**
   * @function getUserWeeklyArtistChart
   * @description Gets the user weekly artist chart.
   *
   * @param params {Partial<T_UserWeeklyXChartParams>} The params to use.
   * @returns {Promise<T_UserWeeklyArtistChartRes>}
   */
  getUserWeeklyArtistChart: T_getUserWeeklyArtistChart = async (
    params?: Partial<T_UserWeeklyXChartParams>
  ): Promise<T_UserWeeklyArtistChartRes> => {
    return castResponse(
      await this.fetchData(METHODS.user.getWeeklyArtistChart, params ?? {}) as T_UserWeeklyArtistChartRes
    );
  }

  /**
   * @function getUserWeeklyChartList
   * @description Gets the user weekly chart list.
   *
   * @returns {Promise<T_UserWeeklyChartRes>}
   */
  getUserWeeklyChartList: T_getUserWeeklyChartList = async (): Promise<T_UserWeeklyChartRes> => {
    return castResponse(
      await this.fetchData(METHODS.user.getWeeklyChartList, {}) as T_UserWeeklyChartRes
    );
  }

  /**
   * @function getUserWeeklyTrackChart
   * @description Gets the user weekly track chart.
   *
   * @param params {Partial<T_UserWeeklyXChartParams>} The params to use.
   * @returns {Promise<T_UserWeeklyTrackChartRes>}
   */
  getUserWeeklyTrackChart: T_getUserWeeklyTrackChart = async (
    params?: Partial<T_UserWeeklyXChartParams>
  ): Promise<T_UserWeeklyTrackChartRes> => {
    return castResponse(
      await this.fetchData(METHODS.user.getWeeklyTrackChart, params ?? {}) as T_UserWeeklyTrackChartRes
    );
  }

  /**
   * @function getUserTopTags
   * @description Gets the user top tags.
   *
   * @param params {Partial<T_UserGetTopTagsParams>} The params to use.
   * @returns {Promise<T_UserGetTopTagsRes>}
   */
  getUserTopTags: T_getUserTopTags = async (
    params?: Partial<T_UserGetTopTagsParams>
  ): Promise<T_UserGetTopTagsRes> => {
    return castResponse(
      await this.fetchData(METHODS.user.getTopTags, params ?? {}) as T_UserGetTopTagsRes
    );
  }

  /**
   * @function ifNowPlaying
   * @description Checks if the user is currently playing a track.
   *
   * @returns {Promise<T_RecentTracksTrackAll>}
   */
  ifNowPlaying: T_isNowPlaying = async (): Promise<T_RecentTracksTrackAll> => {
    const track = castResponse(
      await this.fetchData(METHODS.user.getRecentTracks, {limit: 1}) as T_RecentTracksRes
    );

    if (!track.recenttracks.track[0]) throw NoCurrentlyPlayingTrackError

    // The '@attr' property is only present if the track is currently playing.
    if (track.recenttracks.track[0]["@attr"]?.nowplaying) {
      return track.recenttracks.track[0] as T_RecentTracksTrackAll;
    }

    throw NoCurrentlyPlayingTrackError;
  }

  /**
   * @function fetchData
   * @description Fetches data from the LastFM API.
   *
   * @param method {Method} The method to call.
   * @param params
   */
  private fetchData: T_fetchData = async (method, params) => {
    const paramsString = Object.keys(params).map((key) => {
      const
        finalKey = key as keyof T_GoodParams,
        finalValue = params[finalKey] as unknown as string;

      return `${encodeURIComponent(finalKey)}=${encodeURIComponent(finalValue)}`;
    }).join('&');

    const url = `${this.baseURL}?method=${method}&user=${this.username}${paramsString ? '&' + paramsString : ''}${this.endURL}`;

    return new Promise((resolve, reject) => {
      axios.get(url)
        .then((response) => {
          resolve(response.data);
        })
        // if the error is like {error: 6, message: "User not found"}
        .catch((error) => {
          // Check if error is due to Network problem
          if (error.code === "ERR_NETWORK") {
            reject({
              error: 0,
              message: "Network error."
            })
            // Reject does not cancel the thread - not sure
            return
          }

          const errorName = Object.keys(LASTFM_ERROR_CODES).find((key) => {
            const finalKey = key as keyof typeof LASTFM_ERROR_CODES;

            return LASTFM_ERROR_CODES[finalKey] === Number(error.response.data.error);
          });

          if (errorName) {
            reject({
              error: error.response.data.error,
              message: `${errorName} (${error.response.data.error}): ${error.response.data.message}`
            });

            return
          }

          reject({
            error: -1,
            message: `Unknown error: ${error.response.data.error} - ${error.response.data.message}`
          });
        })
    });
  }
}

export default LastFM_handler;

/**
 * End of file src/assets/lastFM_handler.js
 */
