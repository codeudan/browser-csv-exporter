# Browser CSV Exporter

Browser CSV Exporter 用来在浏览器中导出 CSV。

## 使用
```
npm install browser-csv-exporter --save

import CSVExporter from 'browser-csv-exporter';
new CSVExporter(options)
```
或者将本目录下载下来：
```
<script src="./browser-csv-exporter.min.js"></script>
let exporter = new CSVExporter(options);
exporter.export();

```

## Options
- fileName: 文件名称，默认：当前日期
- columns: 列，默认：[]
- data: 数据，默认：[]

### 支持的 Options 格式
```
{
  fileName: 'fileName',
  columns: [{
    title: 'Name',
    key: 'name'
  }, {
    title: 'Age',
    key: 'age'
  }],
  data: [{
    name: 'A',
    age: 23
  }, {
    name: 'B',
    age: 23
  }]
}
```

```
{
  fileName: 'fileName',
  columns: [{
    title: 'name',
  }, {
    title: 'age',
  }],
  data: [{
    name: 'A',
    age: 23
  }, {
    name: 'B',
    age: 23
  }]
}
```

```
{
  fileName: 'fileName',
  columns: [{
    title: 'Name',
    key: 'name',
    formatter(value, row) {
     return value + 10;
    }
  }, {
    title: 'Age',
    key: 'age'
  }],
  data: [{
    name: 'A',
    age: 23
  }, {
    name: 'B',
    age: 23
  }]
}
```

```
{
  fileName: 'fileName',
  columns: [{
    title: 'Name'
  }, {
    title: 'Age'
  }],
  data: [['A', 23], ['B', 23]]
}
```

```
{
  fileName: 'fileName',
  columns: [{
  	title: 'Name'
  },{
  	title: 'Age',
  	formatter(value, row) {
  	 return value + 10;
  	}
  }],
  data: [['A', 23], ['B', 23]]
}
```

```
{
  fileName: 'fileName',
  columns: ['Name', 'age'],
  data: [['A', 23], ['B', 23]]
}
```

🔥**同时已经支持 , 和 " 的自动转义，直接使用即可：**
```
{
  fileName: 'fileName',
  columns: [',姓名"', '年龄'],
  data: [['姓名,1"', 21], ['姓名2', 23]]
}
```

## API
- getContent(): 返回 CSV 格式的字符串
- export(): 在浏览器中下载 CSV

## 示例
example.html

## 兼容
兼容所有支持 Blob 的浏览器和 IE9+
