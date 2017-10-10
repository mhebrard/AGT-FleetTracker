var url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTgCZLJ0JRYEhUi4o-I57w6wMtm2EbW7svd8hzlowo1VN1jDZmyCfjLgeCPNoT6txvn3q4fnLGl4POc/pub?gid=0&single=true&output=tsv";

loadFile(url);

function loadFile(url) {
  d3.tsv(url, function(err, data) {
    console.log(data);
  });
}
