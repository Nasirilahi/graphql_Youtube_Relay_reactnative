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
 
import youtubeType from './youtubeType';

const API_KEY = 'AIzaSyBasB_OlCFjWEcN4q0YRRpzyvwqqb9Lark'
const youtubeApiBaseUrl = 'https://www.googleapis.com/youtube/v3'

function YTSearch(term){
    console.log("Term received ", term);
     let encodedKeyword = (term).replace(' ', '+')		
     return fetch(`${youtubeApiBaseUrl}/search?part=snippet&q=${encodedKeyword}&type=video&maxResults=5&key=${API_KEY}`)
		              .then((resp) => resp.json())
		              .then((json) =>json );
}


const query = new GraphQLObjectType({
    name:'Query',
    fields:() =>({
      youtube:{
                type: youtubeType,
                description:'Youtube Search API',
                args:{
                    term:{ 
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve:(_, {term}) => YTSearch(term).then((data)=> data)
      } 
    }) 
});

export const schema = new GraphQLSchema({ query });

 

 
 
