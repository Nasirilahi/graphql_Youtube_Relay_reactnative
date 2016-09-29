import
  { GraphQLSchema
  , GraphQLObjectType
  , GraphQLInt
  , GraphQLString
  , GraphQLList
  , GraphQLNonNull
  , GraphQLID
  , GraphQLBoolean
  , GraphQLFloat
  } from 'graphql';
var fetch = require('node-fetch');

const youtubeApiBaseUrl = 'https://www.googleapis.com/youtube/v3'
const API_KEY = 'AIzaSyBasB_OlCFjWEcN4q0YRRpzyvwqqb9Lark'

const youtubeType =  new GraphQLObjectType({
  name:"Youtube",
  description:"Youtube search results",
  fields:()=>({
    kind:{ type:GraphQLString, resolve:(data)=> data.kind  },
    etag:{ type:GraphQLString, resolve:(data)=> data.etag },
    nextPageToken:{ type:GraphQLString, resolve:(data)=> data.nextPageToken  },
    regionCode:{ type:GraphQLString, resolve:(data)=> data.regionCode },
    pageInfo:{ type: pageInfoType, resolve:(data)=> data.pageInfo },
    items:{
      type:new GraphQLList(itemsType),
      resolve: (json) => json.items
    }
       
  })
});

const pageInfoType = new GraphQLObjectType({
  name:"PageInfo",
  description:"Page info of Page",
  fields:()=>({
    totalResults:{ type:GraphQLInt, resolve:(data)=> data.totalResults },
    resultsPerPage:{ type:GraphQLInt, resolve:(data)=> data.resultsPerPage }
  })
});
 

const itemsType = new GraphQLObjectType({
  name: "ItemList",
  description: "Items of the list",
  fields: () => ({
    kind: { type: GraphQLString, resolve:(data)=> data.kind},
    etag: { type: GraphQLString, resolve:(data)=> data.etag },
    id: { type: idType, resolve:(data)=> data.id },
    snippet: { type: snippitType, resolve:(data)=> data.snippet },
    statistics : {
        type: new GraphQLList(statisticsType),
        resolve : (json, args)=> {
                       return fetch(`${youtubeApiBaseUrl}/videos?part=statistics&id=${json.id.videoId}&maxResults=50&key=${API_KEY}`)
                        .then((resp) => resp.json())
                        .then((json) => json.items.map((item) => item.statistics ))
        }
    } ,
  }),
});

const idType = new GraphQLObjectType({
  name: "id",
  fields: () => ({
    videoId: { type: GraphQLString, resolve:(data)=> data.videoId },
    kind: { type: GraphQLString, resolve:(data)=> data.kind },
  })
});

const snippitType = new GraphQLObjectType({
  name: "snippet",
  fields: () => ({
    title: {type: GraphQLString, resolve:(data)=> data.title },
    channelId: {type: GraphQLString, resolve:(data)=> data.channelId },
    channelTitle: {type: GraphQLString, resolve:(data)=> data.channelTitle },
    description: { type: GraphQLString, resolve:(data)=> data.description },
    liveBroadcastContent: {type: GraphQLString, resolve:(data)=> data.liveBroadcastContent },
    publishedAt: {type: GraphQLString, resolve:(data)=> data.publishedAt },
    thumbnails: { type: thumbnailsType, resolve:(data)=> data.thumbnails },
  })
});

const thumbnailsType = new GraphQLObjectType({
  name: "thumbnails",
  fields: () => ({
    default: { type: urlType, resolve:(data)=> data.default },
    high: { type: urlType, resolve:(data)=> data.high },
    medium: { type: urlType, resolve:(data)=> data.medium },
  })
});

const urlType = new GraphQLObjectType({
  name: "url",
  fields: () => ({
    url: { type: GraphQLString, resolve:(data)=> data.url },
    width:{ type : GraphQLInt, resolve:(data)=> data.width },
    height:{ type: GraphQLInt, resolve:(data)=> data.height }
  })
});

const statisticsType = new  GraphQLObjectType({
  name: 'statistics',
  fields:() => ({
    viewCount: { type:  GraphQLString, resolve:(data)=> data.viewCount },
    likeCount: {type:  GraphQLString, resolve:(data)=> data.likeCount },
    dislikeCount: {type:  GraphQLString, resolve:(data)=> data.dislikeCount  },
    commentCount: {type:  GraphQLString, resolve:(data)=> data.commentCount  },
    favoriteCount:{ type:GraphQLString, resolve:(data)=> data.favoriteCount }
  }) 
});

export default youtubeType;
