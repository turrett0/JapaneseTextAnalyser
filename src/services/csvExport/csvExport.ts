import {IKuromojiArticle} from "../../store/kuromojiReducer/contracts/state";

export const csvPrepare = (
  kuromojiResponse: IKuromojiArticle[],
  filename: string
) => {
  let rows: Array<Array<string>> = [];

  kuromojiResponse.forEach((item: IKuromojiArticle) => {
    rows.push([
      item.basic_form,
      item.reading,
      item.pos,
      // item.meaning,
      // item.derivatives,
      // item.phrases,
    ]);
  });

  var processRow = function (row: Array<any>) {
    var finalVal = "";
    for (var j = 0; j < row.length; j++) {
      var innerValue = row[j] === null ? "" : row[j].toString();
      if (row[j] instanceof Date) {
        innerValue = row[j].toLocaleString();
      }
      var result = innerValue.replace(/"/g, '""');
      if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
      if (j > 0) finalVal += ",";
      finalVal += result;
    }
    return finalVal + "\n";
  };

  var csvFile = "";
  for (var i = 0; i < rows.length; i++) {
    csvFile += processRow(rows[i]);
  }

  var blob = new Blob([csvFile], {type: "text/csv;charset=utf-8;"});

  var link = document.createElement("a");
  if (link.download !== undefined) {
    // feature detection
    // Browsers that support HTML5 download attribute
    var url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
