function getType(item) {
  return Object.prototype.toString.call(item).slice(8, -1)
}

function transSpecialChar(s) {
  s = String(s)
  if (s.indexOf(',') > -1 || s.indexOf('"') > -1) {
    s = s.replace(/"/g, '""')
    return `"${s}"`
  }
  return s
}

export default class CSVExporter {
  constructor(options) {
    this.data = options.data || []
    this.fileName = `${options.fileName || new Date()}.csv`
    this.csv = ''
    this.columns = options.columns || []

    let header = ''
    this.columns.forEach((column) => {
      let title = `${getType(column) === 'Object' ? column.title : column}`
      title = transSpecialChar(title)
      header += `${title},`
    })
    this.csv += `${header.slice(0, -1)}\r\n`

    if (this.columns.length) {
      this.data.forEach(function(item) {
        let row = ''
        let value = ''
        this.columns.forEach(function(column, idx) {
          value = getType(item) === 'Object' ? item[column.key || column.title] : item[idx]
          if (getType(column) === 'Object' && getType(column.formatter) === 'Function') {
            value = column.formatter(value, item)
          }
          value = transSpecialChar(value)
          row += `${value},`
        })
        this.csv += `${row.slice(0, -1)}\r\n`
      }, this)
    }
  }

  getContent() {
    return this.csv
  }

  export () {
    const content = `\uFEFF${this.getContent()}`
    if (window.Blob) {
      const data = new Blob(
        [content], {
          type: 'text/csv'
        }
      )
      if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(data, this.fileName)
      } else if (window.URL && window.URL.createObjectURL) {
        const url = window.URL.createObjectURL(data)
        const alink = document.createElement('a')
        alink.id = 'downloadCSVLink'
        alink.href = url
        document.body.appendChild(alink)
        const linkDom = document.getElementById('downloadCSVLink')
        linkDom.setAttribute('download', this.fileName)
        linkDom.click()
        document.body.removeChild(linkDom)
        window.URL.revokeObjectURL(url)
      }
    } else {
      const frame = document.createElement('iframe')
      document.body.appendChild(frame)
      frame.contentWindow.document.open('text/html', 'replace')
      frame.contentWindow.document.write(`sep=,\r\n${content}`)
      frame.contentWindow.document.close()
      frame.contentWindow.focus()
      frame.contentWindow.document.execCommand('SaveAs', true, this.fileName)
      document.body.removeChild(frame)
    }
  }
}
