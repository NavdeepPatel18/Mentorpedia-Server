const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });
const hits = [];

function multi_match(data) {
  return {
    query: {
      bool: {
        must: [
          {
            query_string: {
              fields: ["research_areas", "name", "college"],
              query: data + "*",
              fuzziness: "AUTO",
            },
          },
        ],
        should: [
          {
            multi_match: {
              query: data,
              type: "phrase_prefix",
              fields: ["research_areas*", "name", "college", "dept"],
            },
          },
        ],
      },
    },
  };
}

const multi_match_Search_csv = async (phrase) => {

  const Result = [];

  await client
    .search({
      index: "my_test_csv",
      type: "_doc",
      body: multi_match(phrase),
    })
    .catch((e) => console.log("errr", e))
    .then(
      function (resp) {
        Result.push(...resp.body.hits.hits)
      },
      function (err) {
        console.trace(err.message);
      }
    );

  // console.log("exite from multi match search function");
  return Result
};

module.exports = {
  multi_match_Search_csv,
};
