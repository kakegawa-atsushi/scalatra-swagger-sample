/// <reference path="typings/jquery.d.ts" />
/// <reference path="typings/knockout.d.ts" />

var viewModel: ViewModel = null

$(() => {
    viewModel = new ViewModel()
    ko.applyBindings(viewModel)
    viewModel.executeSearch()
})

class ViewModel {

    posts: KnockoutObservableArray;
    service: RestService;

    constructor() {
        this.posts = ko.observableArray(null)
        this.service = new RestService("http://localhost:8080/posts")
    }

    sendButtonClickHandler(event) {
        var name = $("#nameInput").val()
        var comment = $("#commentInput").val()
        this.service.addPost(name, comment, () => {
            this.clearPostInputs()
            this.executeSearch()
        })
    }

    searchButtonClickHandler(event) {
        this.executeSearch()
    }

    executeSearch() {
        var name = $("#searchInput").val()
        this.service.searchByName(name, (posts) =>
            this.posts(posts)
        )
    }

    clearPostInputs() {
        $("#nameInput").val("")
        $("#commentInput").val("")
    }
}

class RestService {

    url: string;

    constructor(url) {
        this.url = url
    }

    searchByName(name: string, resultHandler: (posts: any[]) => void) {
        var url = this.url
        if (name.length > 0) {
            url += "/" + name
        }

        $.get(url, (data) => {
            resultHandler(data)
        })
    }

    addPost(name: string, comment: string, resultHandler: () => void) {
        var sendData = { "name" : name , "comment" : comment }
        $.post(this.url, sendData, (data) => {
            resultHandler()
        })
    }
}