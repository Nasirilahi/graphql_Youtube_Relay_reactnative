# graphql_Youtube_Relay_reactnative
# GraphQL Server for youtube Search API.

### Future Updation will add React native project to query graphql server using Relay.

This is a GraphQL server for the Youtube API to search video.

Using this anyone can get more familier with GraphQL.

The App will access this through queries done by relay at react native side + Redux.

To use this :- 

Install all the dependencies.

....
npm install 
....

Run one more command to make it compatible with es6 features :- 

............................................
echo '{ "presets": ["es2015"] }' > .babelrc
............................................

## IMPORTANT

We need to provide Youtube API key to have this work.

* I have added this key at top in schema.js file.

To use GraphiQL, open your browser and go to http://localhost:8888/graphql

Review the Docs in the upper right hand corner to view more about the fields available.

 ere is a sample of all the available fields for the youtube search API.

```
{
  youtube(term:"good morning"){
   kind
   etag
    nextPageToken
    regionCode
    pageInfo{
      totalResults
      resultsPerPage
    }
    items{
      kind
      etag
      id {
        videoId
        kind
      }
      snippet{
       title
        channelId
        channelTitle
        description
        liveBroadcastContent
        publishedAt
        thumbnails{
          default{
            url
            width
            height
          }
          medium{
             url
            width
            height
          }
          high{
              url
            width
            height
          }
        }
      }
      statistics{
        viewCount
        likeCount
        dislikeCount
        commentCount
        favoriteCount
      }
    }
  }
}
# the sample app I plan will not require half of those fields, maybe just 4-5 of them!
