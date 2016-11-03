// var Vue = require('vue');
// localStorage persistence
var STORAGE_KEY = '記事本'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}
new Vue({
  el: '#events',

  data: {
    event: { title: '', detail: '', date: '' },
    events: todoStorage.fetch()
  },

  ready: function () {

    todoStorage.fetch();
  },
  watch: {
      events: {
        handler: function (todos) {
          todoStorage.save(todos)
        },
        deep: true
      }
    },
  methods: {


    addEvent: function () {


      this.events.push({
        id: todoStorage.uid++,
        title: this.event.title,
        detail: this.event.detail,
        date:this.event.date,
        completed: false
      })
      this.event = ''
    },

    deleteEvent: function (index) {
      if (confirm('確定要移除此項事件？')) {
        this.events.splice(index, 1);
    
      }
    }
  }
});
