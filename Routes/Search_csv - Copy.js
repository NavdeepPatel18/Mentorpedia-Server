const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });


const phraseSearch_csv = async (phrase) => {
  const hits = [];
  // const search = phrase.split(" ");
  // search.push(phrase);
  // search[0] = phrase;
  // if (phrase.split(" ").length > 1) {
  //   search.push(...phrase.split(" "));
  // }

  // console.log(search);
  // console.log(search.length);

  function data_processing(Result) {
    if (
      Result &&
      Result.body &&
      Result.body.hits &&
      Result.body.hits.hits &&
      Result.body.hits.hits.length > 0
    ) {
      console.log(Result.body.hits.hits.length);
      for (i = 0; i < Result.body.hits.hits.length; i++) {

        if (!hits.some((hit) => hit._id === Result.body.hits.hits[i]._id)) {

          console.log(Result.body.hits.hits[i]._source["name"]);
          
          if (!Result.body.hits.hits[i]._source.hasOwnProperty("position")) {
            Result.body.hits.hits[i]._source["position"] = [null];
          } else {
            Result.body.hits.hits[i]._source[
              "position"
            ] = Result.body.hits.hits[i]._source["position"].split(",");
          }

          if (
            !Result.body.hits.hits[i]._source.hasOwnProperty("research_areas")
          ) {
            Result.body.hits.hits[i]._source["research_areas"] = [null];
          } else {
            Result.body.hits.hits[i]._source[
              "research_areas"
            ] = Result.body.hits.hits[i]._source["research_areas"].split(",");
          }

          if (!Result.body.hits.hits[i]._source.hasOwnProperty("email")) {
            Result.body.hits.hits[i]._source["email"] = null;
          }

          if (!Result.body.hits.hits[i]._source.hasOwnProperty("phone")) {
            Result.body.hits.hits[i]._source["phone"] = null;
          }

          hits.push(Result.body.hits.hits[i]);
        }
      }
      //hits.push(...Result.body.hits.hits);
    }
  }

  //searching data

  await client
      .search({
        index: "my_test_csv",
        type: "_doc",
        body: multi_match(phrase),
      })
      .catch((e) => console.log("errr", e))
      .then(
        function (resp) {
          data_processing(resp);
        },
        function (err) {
          console.trace(err.message);
        }
      );

  // for (i = 0; i < search.length; i++) {
  //   console.log(search[i]);
  //   const search_data = await client
  //     .search({
  //       index: "my_test_csv",
  //       type: "_doc",
  //       body: multi_match(search[i]),
  //     })
  //     .catch((e) => console.log("errr", e));

  //   data_processing(search_data);
  // }

  // await client
  // .search({
  //   index: "my_test_csv",
  //   type: "_doc",
  //   body: query_string(phrase),
  // })
  // .catch((e) => console.log("errr", e))
  // .then(
  //   function (resp) {
  //     data_processing(resp);
  //   },
  //   function (err) {
  //     console.trace(err.message);
  //   }
  // );

  // await client
  // .search({
  //   index: "my_test_csv",
  //   type: "_doc",
  //   body: fuzzy(phrase),
  // })
  // .catch((e) => console.log("errr", e))
  // .then(
  //   function (resp) {
  //     data_processing(resp);
  //   },
  //   function (err) {
  //     console.trace(err.message);
  //   }
  // );

  // await client
  // .search({
  //   index: "my_test_csv",
  //   type: "_doc",
  //   body: query_regexp(phrase),
  // })
  // .catch((e) => console.log("errr", e))
  // .then(
  //   function (resp) {
  //     data_processing(resp);
  //   },
  //   function (err) {
  //     console.trace(err.message);
  //   }
  // );

  // await client
  // .search({
  //   index: "my_test_csv",
  //   type: "_doc",
  //   body: query_regexp(phrase),
  // })
  // .catch((e) => console.log("errr", e))
  // .then(
  //   function (resp) {
  //     data_processing(resp);
  //   },
  //   function (err) {
  //     console.trace(err.message);
  //   }
  // );

  // await client
  // .search({
  //   index: "my_test_csv",
  //   type: "_doc",
  //   body: query_regexp(phrase),
  // })
  // .catch((e) => console.log("errr", e))
  // .then(
  //   function (resp) {
  //     data_processing(resp);
  //   },
  //   function (err) {
  //     console.trace(err.message);
  //   }
  // );

  return {
    hitsCount: hits.length,
    hits,
  };
};






function multi_match(data) {
  return {
    query: {
      multi_match: {
        query: data,
        type: "phrase_prefix",
        fields: ["research_areas*", "name", "college", "dept"],
      },
    },
  };
}

function match_phrase_prefix(phrase) {
  return {
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
  };
}

function query_string(phrase) {
  return {
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
  };
}

function fuzzy(phrase) {
  return {
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
  };
}

function query_regexp(phrase) {
  return {
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
  };
}



module.exports = {
  phraseSearch_csv,
};
