var viewModel = null;
$(function () {
    viewModel = new ViewModel();
    ko.applyBindings(viewModel);
    viewModel.executeSearch();
});
var ViewModel = (function () {
    function ViewModel() {
        this.posts = ko.observableArray(null);
        this.service = new RestService("http://localhost:8080/posts");
    }
    ViewModel.prototype.sendButtonClickHandler = function (event) {
        var _this = this;
        var name = $("#nameInput").val();
        var comment = $("#commentInput").val();
        this.service.addPost(name, comment, function () {
            _this.clearPostInputs();
            _this.executeSearch();
        });
    };
    ViewModel.prototype.searchButtonClickHandler = function (event) {
        this.executeSearch();
    };
    ViewModel.prototype.executeSearch = function () {
        var _this = this;
        var name = $("#searchInput").val();
        this.service.searchByName(name, function (posts) {
            return _this.posts(posts);
        });
    };
    ViewModel.prototype.clearPostInputs = function () {
        $("#nameInput").val("");
        $("#commentInput").val("");
    };
    return ViewModel;
})();
var RestService = (function () {
    function RestService(url) {
        this.url = url;
    }
    RestService.prototype.searchByName = function (name, resultHandler) {
        var sendData = null;
        if(name && name.length > 0) {
            sendData = {
                "name": name
            };
        }
        $.getJSON(this.url, sendData).done(function (data) {
            return resultHandler(data);
        }).fail(function (jqHXR, textStatus, errorThrown) {
            return console.log("getPosts failed. " + textStatus + errorThrown);
        });
    };
    RestService.prototype.addPost = function (name, comment, resultHandler) {
        var sendData = {
            "name": name,
            "comment": comment
        };
        $.ajax({
            type: "POST",
            url: this.url,
            data: JSON.stringify(sendData),
            contentType: "application/json",
            dataType: "text"
        }).done(function (data) {
            return resultHandler();
        }).fail(function (jqHXR, textStatus, errorThrown) {
            return console.log("addPost failed. " + textStatus + errorThrown);
        });
    };
    return RestService;
})();
