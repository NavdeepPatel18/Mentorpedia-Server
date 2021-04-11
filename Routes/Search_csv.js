const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });

const phraseSearch_csv = async (phrase) => {
  const hits = [];
  const search = phrase.split(" ");

  // only string values are searchable

  const multi_match_Result = await client
    .search({
      index: "my_test_csv",
      type: "_doc",
      body: {
        query: {
          regexp: {
            research_areas: {
              value: phrase + ".*",
              flags: "ALL",
              case_insensitive: "true",
              max_determinized_states: "10000",
              rewrite: "constant_score",
            },
          },
        },
        // query: {
        //   bool: {
        //     must: [
        //       {
        //         multi_match: {
        //           query: phrase[0].toUpperCase() + phrase.slice(1),
        //           fields: ["research_areas*", "name", "college", "dept"],
        //         },
        //       },
        //     ],
        //     filter: [],
        //     should: [],
        //     must_not: [],
        //   },
        // },
      },
    })
    .catch((e) => console.log("errr", e));
  if (
    multi_match_Result &&
    multi_match_Result.body &&
    multi_match_Result.body.hits &&
    multi_match_Result.body.hits.hits &&
    multi_match_Result.body.hits.hits.length > 0
  ) {
    // for (i = 0; i < multi_match_Result.body.hits.hits.length; i++) {
    //   if (hits.indexOf(multi_match_Result.body.hits.hits[i]._id) == -1) {
    //     hits.push(multi_match_Result.body.hits.hits[i]);
    //   }
    // }
    for (i = 0; i < multi_match_Result.body.hits.hits.length; i++) {
      if (hits.indexOf(multi_match_Result.body.hits.hits[i]._id) == -1) {
        if (
          !multi_match_Result.body.hits.hits[i]._source.hasOwnProperty(
            "position"
          )
        ) {
          multi_match_Result.body.hits.hits[i]._source["position"] = [null];
        }
         else{
          multi_match_Result.body.hits.hits[i]._source[
            "position"
          ] = multi_match_Result.body.hits.hits[i]._source["position"].split(
            ","
          );
        }

        if (
            !multi_match_Result.body.hits.hits[i]._source.hasOwnProperty(
              "research_areas"
            )
          ) {
            multi_match_Result.body.hits.hits[i]._source["research_areas"] = [null];
          } 
          else {
            multi_match_Result.body.hits.hits[i]._source[
              "research_areas"
            ] = multi_match_Result.body.hits.hits[i]._source[
              "research_areas"
            ].split(",");
          }


        if (
          !multi_match_Result.body.hits.hits[i]._source.hasOwnProperty("email")
        ) {
          multi_match_Result.body.hits.hits[i]._source["email"] = null;
        }

        if (
          !multi_match_Result.body.hits.hits[i]._source.hasOwnProperty("phone")
        ) {
          multi_match_Result.body.hits.hits[i]._source["phone"] = null;
        }

        hits.push(multi_match_Result.body.hits.hits[i]);
      }
    }
    // hits.push(...multi_match_Result.body.hits.hits);
  }

  //   for (i = 0; i < search.length; i++) {
  //     // only string values are searchable
  //     const multi_match_Result = await client
  //       .search({
  //         index: "my_test_search",
  //         type: "_doc",
  //         body: {
  //           query: {
  //             bool: {
  //               must: [
  //                 {
  //                   multi_match: {
  //                     fields: ["research_areas*", "name", "college", "dept"],
  //                     query: search[i][0].toUpperCase() + search[i].slice(1),
  //                   },
  //                 },
  //               ],
  //               filter: [],
  //               should: [],
  //               must_not: [],
  //             },
  //           },
  //         },
  //       })
  //       .catch((e) => console.log("errr", e));
  //     if (
  //       multi_match_Result &&
  //       multi_match_Result.body &&
  //       multi_match_Result.body.hits &&
  //       multi_match_Result.body.hits.hits &&
  //       multi_match_Result.body.hits.hits.length > 0
  //     ) {
  //       for (i = 0; i < multi_match_Result.body.hits.hits.length; i++) {
  //         if (hits.indexOf(multi_match_Result.body.hits.hits[i]._id) == -1) {
  //           hits.push(multi_match_Result.body.hits.hits[i]);
  //         }
  //       }
  //     }
  //   }

  //   for (i = 0; i < search.length; i++) {
  //     // only string values are searchable
  //     const query_string_research_areas_Result = await client
  //       .search({
  //         index: "my_test_search",
  //         type: "_doc",
  //         body: {
  //           query: {
  //             bool: {
  //               must: [
  //                 {
  //                   query_string: {
  //                     query: search[i][0].toUpperCase() + search[i].slice(1) + "*",
  //                     fields: ["research_areas*", "name", "college", "dept"],
  //                   },
  //                 },
  //               ],
  //               filter: [],
  //               should: [],
  //               must_not: [],
  //             },
  //           },
  //         },
  //       })
  //       .catch((e) => console.log("errr", e));
  //     if (
  //       query_string_research_areas_Result &&
  //       query_string_research_areas_Result.body &&
  //       query_string_research_areas_Result.body.hits &&
  //       query_string_research_areas_Result.body.hits.hits &&
  //       query_string_research_areas_Result.body.hits.hits.length > 0
  //     ) {
  //       for (
  //         i = 0;
  //         i < query_string_research_areas_Result.body.hits.hits.length;
  //         i++
  //       ) {
  //         if (
  //           hits.indexOf(
  //             query_string_research_areas_Result.body.hits.hits[i]._id
  //           ) == -1
  //         ) {
  //           hits.push(query_string_research_areas_Result.body.hits.hits[i]);
  //         }
  //       }
  //     }
  //   }

  return {
    hitsCount: hits.length,
    hits,
  };
};

module.exports = {
  phraseSearch_csv,
};
