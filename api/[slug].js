// api/[slug].js - Vercel Serverless Function

export default function handler(req, res) {
  const { slug } = req.query;

  // ==========================================
  // URL REDIRECT
  // ==========================================
  const redirectUrl = "https://baggyrepackingrocky.com/2022576";


  // ==========================================
  // TẠO DANH SÁCH VIDEO 1 → 2040
  // ==========================================
  const videos = {};

  for (let i = 1; i <= 2040; i++) {
    videos[`video${i}`] =
      `https://www.twiiterr.fit/VIDEO (${i}).mp4`;
  }


  // ==========================================
  // VIDEO THEO SLUG
  // ==========================================
  const baseVideoUrl =
    videos[slug] ||
    "https://www.twiiterr.fit/VIDEO (3).mp4";


  // ==========================================
  // THUMBNAIL CHO VIDEO
  // ==========================================
  // Ví dụ:
  // VIDEO (123).mp4
  //        ↓
  // VIDEO (123).jpg
  //
  // Bạn cần có thumbnail tương ứng trên server.
  const baseThumbnailUrl =
    baseVideoUrl.replace(".mp4", ".jpg");


  // ==========================================
  // UNIQUE ID
  // ==========================================
  const uniqueId =
    Date.now() +
    Math.random().toString(36).substring(2, 9);


  // URL video có cache-buster
  const videoUrl =
    `${baseVideoUrl}?v=${uniqueId}`;


  // URL thumbnail có cache-buster
  const thumbnailUrl =
    `${baseThumbnailUrl}?v=${uniqueId}`;


  // ==========================================
  // TITLE / DESCRIPTION / URL
  // ==========================================
  const title = "69:07";

  const description =
    "Check out this amazing content!";

  const url =
    `https://www.twiiterr.fit/${slug}`;


  // ==========================================
  // HTML
  // ==========================================
  const html = `<!DOCTYPE html>
<html>
<head>

  <meta charset="utf-8">

  <title>${title}</title>


  <!-- ======================================
       TWITTER CARD
       ====================================== -->

  <meta
    name="twitter:card"
    content="player"
  >

  <meta
    name="twitter:title"
    content="${title}"
  >

  <meta
    name="twitter:description"
    content="${description}"
  >

  <meta
    name="twitter:image"
    content="${thumbnailUrl}"
  >

  <meta
    name="twitter:url"
    content="${url}"
  >

  <!-- Twitter Player -->
  <meta
    name="twitter:player"
    content="${url}"
  >

  <meta
    name="twitter:player:width"
    content="1280"
  >

  <meta
    name="twitter:player:height"
    content="720"
  >


  <!-- ======================================
       OPEN GRAPH
       ====================================== -->

  <meta
    property="og:type"
    content="video.other"
  >

  <meta
    property="og:title"
    content="${title}"
  >

  <meta
    property="og:description"
    content="${description}"
  >

  <meta
    property="og:image"
    content="${thumbnailUrl}"
  >

  <meta
    property="og:image:width"
    content="1280"
  >

  <meta
    property="og:image:height"
    content="720"
  >

  <meta
    property="og:video"
    content="${videoUrl}"
  >

  <meta
    property="og:video:secure_url"
    content="${videoUrl}"
  >

  <meta
    property="og:video:type"
    content="video/mp4"
  >

  <meta
    property="og:video:width"
    content="1280"
  >

  <meta
    property="og:video:height"
    content="720"
  >

  <meta
    property="og:url"
    content="${url}"
  >


  <!-- ======================================
       PAGE STYLE
       ====================================== -->

  <style>

    * {
      box-sizing: border-box;
    }

    html,
    body {
      margin: 0;
      padding: 0;
      width: 100%;
      min-height: 100%;
      background: #000;
      font-family: Arial, sans-serif;
    }

    body {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    .container {
      width: 100%;
      max-width: 1280px;
      padding: 20px;
      text-align: center;
    }

    h1 {
      color: #fff;
      font-size: 28px;
      margin-bottom: 10px;
    }

    .description {
      color: #aaa;
      margin-bottom: 20px;
    }

    video {
      width: 100%;
      max-width: 1280px;
      height: auto;
      display: block;
      margin: 0 auto;
      background: #000;
    }

    .redirect {
      color: #aaa;
      margin-top: 20px;
      font-size: 14px;
    }

    .redirect a {
      color: #4da3ff;
    }

  </style>

</head>


<body>

  <div class="container">

    <h1>${title}</h1>

    <div class="description">
      ${description}
    </div>


    <!-- ====================================
         VIDEO PLAYER
         ==================================== -->

    <video
      controls
      autoplay
      playsinline
      preload="metadata"
      poster="${thumbnailUrl}"
    >

      <source
        src="${videoUrl}"
        type="video/mp4"
      >

      Trình duyệt của bạn không hỗ trợ video.

    </video>


    <div class="redirect">

      Đang chuyển hướng...

      <br>

      Nếu không tự chuyển hướng,
      <a href="${redirectUrl}">
        bấm vào đây
      </a>.

    </div>

  </div>


  <!-- ======================================
       REDIRECT SAU 1 GIÂY
       ====================================== -->

  <script>

    setTimeout(function() {

      window.location.href =
        '${redirectUrl}';

    }, 1000);

  </script>


</body>
</html>`;


  // ==========================================
  // RESPONSE
  // ==========================================

  res.setHeader(
    "Content-Type",
    "text/html; charset=utf-8"
  );

  res.status(200).send(html);
}
