const loadGif = '<img src="loading.gif" id="loadGif" class="loadGif" alt="loading">'
var articleArray = [];
var lock = false;

function isUrl(url) {
  return /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/.test(url)
}

function extractMaskIdFromUrl(url) {
  if (isUrl(url)) {
    let urlArray = url.split("/");
    let lastArray = urlArray[urlArray.length - 1];
    return (lastArray.lastIndexOf("?") === -1) ? lastArray : lastArray.substring(0, lastArray.lastIndexOf("?"))
  } else {
    return false
  }
}

function maskIdInArray(maskId, array) {
  for (let index = 0; index < array.length; index++) {
    if (maskId === array[index]) {
      return true;
    }
  }
  return false;
}

$("#submitBtn").click(function () {
  let value = $("#url").val();
  let mask_id = extractMaskIdFromUrl(value);
  if (mask_id) {
    lock = maskIdInArray(mask_id, articleArray)
  }
  console.log("lock:"+lock)
  console.log("mask_id:"+mask_id)
  console.log("articleArray:"+articleArray)
  if (!lock) {
  $(".workArea").after(loadGif)
  $.get(
    "/deal",
    { url: $("#url").val() },
    (data) => {
      const jsonData = JSON.parse(data)
      console.log(jsonData)
      $("#loadGif").remove();
      if (jsonData.success) {
        articleArray.push(jsonData.id);
        var title = (jsonData.title.length >= 28) ? jsonData.title.substring(0, 28) + "……" : jsonData.title
        $("#docxArea").append(`
      <div class="docxItem">
        <div class="docxItemInfo">
          <img class="docxItemIcon" src="word.png" alt="icon"><span>${title}</span>
        </div>
      <button class="submitBtn docxItemDownload" id="downloadBtn"><a href="${jsonData.path}"><span>下载</span></a></button>
      </div>
      `)
      swal("成功", "文章转换完成！", "success");
      } else {
        swal("错误", "请检查文章链接是否正确", "error");
      }
    })
  } else {
    swal("错误", "文章已经转换过了……", "error");
  }
})