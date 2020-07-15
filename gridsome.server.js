// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const events = [
  {
    title: "DJ Kentucky Nightlife Party",
    color: "rgb(215, 12, 73)",
    image: require.resolve("./src/assets/images/party.png"),
    price: "Free",
    date: "Tomorrow",
    id: "evt-1",
  },
  {
    title: "Pineapple Mask & Costume Party",
    color: "rgb(53, 40, 27)",
    image: require.resolve("./src/assets/images/party1.png"),
    price: "N3,000",
    date: "Wednesday",
    id: "evt-2",
  },
  {
    title: "Bra, Cocktail, Disco Bash. Couple’s",
    color: "rgb(10, 68, 226)",
    image: require.resolve("./src/assets/images/party2.png"),
    price: "N1,500",
    date: "June, 27th, '20",
    id: "evt-3",
  },
  {
    title: "Ilorin Twitter Hangout",
    color: "rgb(60, 61, 63)",
    image: require.resolve("./src/assets/images/party3.png"),
    price: "N2,000",
    date: "July 8th, '20",
    id: "evt-4",
  },
  {
    title: "Smiley Face Mask Party, Vol. 6",
    color: "rgb(20, 173, 198)",
    image: require.resolve("./src/assets/images/party4.png"),
    price: "Mixed",
    date: "July 13th, '20",
    id: "evt-5",
  },
  {
    title: "Sounbar Relauncg Street Jamz",
    color: "rgb(160, 120, 140)",
    image: require.resolve("./src/assets/images/party5.png"),
    price: "Mixed",
    date: "Sept  7th, '20",
    id: "evt-6",
  },
];

module.exports = function(api) {
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    const eventsCollection = addCollection("Events");
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      eventsCollection.addNode(event);
    }
  });

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  });
};
