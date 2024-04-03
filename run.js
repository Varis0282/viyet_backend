const axios = require("axios");

// Using the example query "vincenzo", and looking at the 2nd page of results.
const url = "https://api.consumet.org/movies/dramacool";
const data = async () => {
    try {
        const response = await axios.get(url, { params: { page: 1 } });
        console.log(response);
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
};

data();
