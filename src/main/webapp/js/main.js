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
        var url = this.url;
        if(name.length > 0) {
            url += "/" + name;
        }
        $.get(url, function (data) {
            resultHandler(data);
        });
    };
    RestService.prototype.addPost = function (name, comment, resultHandler) {
        var sendData = {
            "name": name,
            "comment": comment
        };
        $.post(this.url, sendData, function (data) {
            resultHandler();
        });
    };
    return RestService;
})();
