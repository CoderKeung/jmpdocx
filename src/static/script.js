const loadGif = '<img src="loading.gif" id="loadGif" class="loadGif" alt="loading">'
$("#submitBtn").click(function () {
  $(".workArea").after("<p>加载中</p>")
  $.get(
    "/deal",
    { url: $("#url").val() },
    (data) => {
      const jsonData = JSON.parse(data)
      var title = (jsonData.title.length >= 28) ? jsonData.title.substring(0,28) + "……" : jsonData.title
      $("#docxArea").append(`
      <div class="docxItem">
        <div class="docxItemInfo">
          <img class="docxItemIcon" src="word.png" alt="icon"><span>${title}</span>
        </div>
      <button class="submitBtn docxItemDownload" id="submitBtn"><a href="${jsonData.path}"><span>下载</span></a></button>
      </div>
      `)

    })
})