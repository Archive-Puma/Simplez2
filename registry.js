function FormatNumberLength (num) {
  num = parseInt(num)
  var r = '' + num
  while (r.length < 3) {
    r = '0' + r
  }
  return r
}

function memory () {
  for (var i = 0; i < 512; i++) {
    // var element = array[i];
    document.write(`<tr>
                      <td>` + FormatNumberLength(i.toString(8)) + `o</td>
                      <td>0000</td>
                      <td>0000</td>
                      <td>0000</td>
                      <td>-</td>
                      <td>ST /000o</td>
                    </tr>`)
  }
}

function registerz () {
  document.write(`
                <table>
                  <tbody>
                    <tr>
                    <td></td>
                    <td>0000</td>
                    <td>0000</td>
                    <td>0000</td>
                    <td>-</td>
                    <td>ST /000o</td>
                    </tr>
                  </tbody>
                <table>
                `)
}
