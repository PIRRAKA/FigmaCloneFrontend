const axios = require('axios');

async function fetchFigmaDesign(fileKey, accessToken) {
  try {
    const url = `https://api.figma.com/v1/files/${fileKey}`;
    const response = await axios.get(url, {
      headers: {
        'X-Figma-Token': accessToken
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching Figma file: ${error.message}`);
  }
}

module.exports = { fetchFigmaDesign };
