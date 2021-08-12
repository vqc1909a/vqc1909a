const fs = require("fs");
const Parser = require("rss-parser");
const parser = new Parser();

const LATEST_VIDEOS_PLACEHOLDER = "%{{latest_videos}}%";
const ICON_SIZE_PLACEHOLDER = "%{{icon_size}}%";
const ICON_SIZE = "40px";

(async() => {
 const markdownTemplate = fs.readFileSync("./README.md.tpl", {encoding:'utf8', flag:'r'});
 const {items} = await parser.parseURL("https://www.youtube.com/feeds/videos.xml?channel_id=UCRmvoSvGgaDw7RUFwRNVsbQ");

 let latestVideosMarkdown = "";
 const latestVideos = items.map(item => `<a href='${item.link}' target='_blank'>
   <img width='33%' src='https://img.youtube.com/vi/${item.link.slice(item.link.indexOf("v") + 2)}/mqdefault.jpg' alt='${item.title}' />
 </a>`)
 latestVideos.forEach(video => latestVideosMarkdown += video);

 let newMarkdown = markdownTemplate
 .replace(LATEST_VIDEOS_PLACEHOLDER, latestVideosMarkdown)
 .replaceAll(ICON_SIZE_PLACEHOLDER, ICON_SIZE);
 fs.writeFileSync("./README.md", newMarkdown);
})();

