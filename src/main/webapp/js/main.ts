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
        var sendData = null
        if (name && name.length > 0) {
            sendData = { "name": name }
        }
        $.getJSON(this.url, sendData)
            .done((data) => resultHandler(data))
            .fail((jqHXR, textStatus, errorThrown) => console.log("getPosts failed. " + textStatus + errorThrown))
    }

    addPost(name: string, comment: string, resultHandler: () => void) {
        var sendData = { "name" : name , "comment" : comment }
        $.ajax({
            type: "POST",
            url: this.url, 
            data: JSON.stringify(sendData), 
            contentType: "application/json",
            dataType: "text"
        })
        .done((data) => resultHandler())
        .fail((jqHXR, textStatus, errorThrown) => console.log("addPost failed. " + textStatus + errorThrown))
    }
}