const {remote} = require('electron')

console.log(remote.getGlobal('sharedObj').register)

function FormatNumberLength (num) {
  num = parseInt(num)
  var r = '' + num
  while (r.length < 3) {
    r = '0' + r
  }
  return r
}

function GetCommand (octal) {
  var code = null
  switch (octal.charAt(0)) {
    case '0':
      code = 'ST'
      break
    case '1':
      code = 'LD'
      break
    case '2':
      code = 'ADD'
      break
    case '3':
      code = 'BR'
      break
    case '4':
      code = 'BZ'
      break
    case '5':
      code = 'CLR'
      break
    case '6':
      code = 'DEC'
      break
    case '7':
      code = 'HALT'
      break
    default:
      break
  }
  return code
}

function memory () {
  for (var i = 0; i < 512; i++) {
    var octalN = remote.getGlobal('sharedObj').register[i]
    var octal = octalN.toString()
    var dec = FormatNumberLength(parseInt(octalN, 8))
    var hex = parseInt(octalN, 8).toString(16).toUpperCase()
    var command = GetCommand(octal)
    document.write(`<tr>
                      <td>` + FormatNumberLength(i.toString(8)) + `o</td>
                      <td>` + hex + `</td>
                      <td>` + octal + `</td>
                      <td>` + FormatNumberLength(dec) + `</td>
                      <td>` + String.fromCharCode(dec) + `</td>
                      <td>` + command)
    if (command !== 'CLR' && command !== 'DEC' && command !== 'HALT') {
      document.write(' /' + octal.substr(1) + 'o')
    }
    document.write('</td></tr>')
  }
}

function register () {
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
