const https = require('https');
const fs = require('fs');

const url = "https://ak.picdn.net/shutterstock/videos/1027179065/preview/stock-footage-underwater-view-of-green-seagrass-in-the-ocean-swaying-in-the-current.mp4";
const dest = "./frontend/public/assets/seaweed_bg.mp4";

const file = fs.createWriteStream(dest);
https.get(url, function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close();  // close() is async, call cb after close completes.
    console.log("Download completed");
  });
}).on('error', function(err) { // Handle errors
  fs.unlink(dest, () => {}); // Delete the file async. (But we don't check the result)
  console.error("Error: " + err.message);
});
