const Exporter = require('./browser-csv-exporter.min.js');

test('test1', () => {
  let exporter = new Exporter({
    columns: [{
      title: 'Name',
      key: 'name'
    }, {
      title: 'Age',
      key: 'age'
    }],
    data: [{
      name: 'A',
      age: 21
    }, {
      name: 'B',
      age: 23
    }]
  });
  expect(exporter.getContent()).toBe('Name,Age\r\nA,21\r\nB,23\r\n');
});

test('test2', () => {
  let exporter = new Exporter({
    columns: [{
      title: 'name',
    }, {
      title: 'age',
    }],
    data: [{
      name: 'A',
      age: 21
    }, {
      name: 'B',
      age: 23
    }]
  });
  expect(exporter.getContent()).toBe('name,age\r\nA,21\r\nB,23\r\n');
});

test('test3', () => {
  let exporter = new Exporter({
    columns: [{
      title: 'Name',
      key: 'name'
    }, {
      title: 'Age',
      key: 'age',
      formatter(age) {
        return age + 10;
      }
    }],
    data: [{
      name: 'A',
      age: 21
    }, {
      name: 'B',
      age: 23
    }]
  });
  expect(exporter.getContent()).toBe('Name,Age\r\nA,31\r\nB,33\r\n');
});

test('test4', () => {
  let exporter = new Exporter({
    columns: [{
      title: 'Name',
    }, {
      title: 'Age'
    }],
    data: [
      ['A', 21],
      ['B', 23]
    ]
  });
  expect(exporter.getContent()).toBe('Name,Age\r\nA,21\r\nB,23\r\n');
});

test('test5', () => {
  let exporter = new Exporter({
    columns: [{
      title: 'Name',
    }, {
      title: 'Age',
      formatter(age) {
        return age + 10;
      }
    }],
    data: [
      ['A', 21],
      ['B', 23]
    ]
  });
  expect(exporter.getContent()).toBe('Name,Age\r\nA,31\r\nB,33\r\n');
});

test('test6', () => {
  let exporter = new Exporter({
    columns: ['Name', 'Age'],
    data: [
      ['A', 21],
      ['B', 23]
    ]
  });
  expect(exporter.getContent()).toBe('Name,Age\r\nA,21\r\nB,23\r\n');
});

test('test7', () => {
  let exporter = new Exporter({
    columns: ['Name', 'Age'],
    data: [
      ['姓名1', 21],
      ['姓名2', 23]
    ]
  });
  expect(exporter.getContent()).toBe('Name,Age\r\n姓名1,21\r\n姓名2,23\r\n');
});
