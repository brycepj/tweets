var app;
(function (app) {
    (function (util) {
        function initModels() {
            var rawData = $.getJSON('data/tweets.json');
            var rawTweetData, justText, textAndTime;
            var newNarc;
            var view1;

            rawData.done(function (data) {
                textAndTime = new app.model.TextAndTimeData(data);
            });

            rawData.done(function () {
            });

            rawData.done(function () {
            });

            rawData.fail(function () {
            });

            rawData.always(function () {
            });
        }
        util.initModels = initModels;
    })(app.util || (app.util = {}));
    var util = app.util;
})(app || (app = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var app;
(function (app) {
    (function (view) {
        var View1 = (function (_super) {
            __extends(View1, _super);
            function View1(model) {
                _super.call(this);

                this.model = model;
            }
            return View1;
        })(Backbone.View);
        view.View1 = View1;
    })(app.view || (app.view = {}));
    var view = app.view;
})(app || (app = {}));
var app;
(function (app) {
    (function (_model) {
        var RawTweetData = (function (_super) {
            __extends(RawTweetData, _super);
            function RawTweetData(model) {
                _super.call(this);

                this.data = model;
                this.clean = [];
                this.scrub();
                this.model = function () {
                    return this.clean;
                };
                console.log(this.model());
            }
            RawTweetData.prototype.scrub = function () {
                var array = this.data;
                for (var i = 0; i < array.length; i++) {
                    var obj = array[i];
                    delete obj.id;
                    this.clean.push(obj);
                }
            };
            return RawTweetData;
        })(Backbone.Model);
        _model.RawTweetData = RawTweetData;
    })(app.model || (app.model = {}));
    var model = app.model;
})(app || (app = {}));
var app;
(function (app) {
    (function (model) {
        var JustTextData = (function (_super) {
            __extends(JustTextData, _super);
            function JustTextData(data) {
                _super.call(this);

                this.data = data;
                this.tweetText = [];
                this.sortText();

                this.model = function () {
                    return this.tweetText;
                };
            }
            JustTextData.prototype.sortText = function () {
                var array = this.data;
                for (var i = 0; i < array.length; i++) {
                    var text = array[i].text;
                    this.tweetText.push(text);
                }
            };
            return JustTextData;
        })(Backbone.Model);
        model.JustTextData = JustTextData;
    })(app.model || (app.model = {}));
    var model = app.model;
})(app || (app = {}));
var app;
(function (app) {
    (function (_model) {
        var TextAndTimeData = (function (_super) {
            __extends(TextAndTimeData, _super);
            function TextAndTimeData(model) {
                _super.call(this);

                this.model = model;
                this.clean = [];

                this.scrub();
            }
            TextAndTimeData.prototype.scrub = function () {
                var array = this.model;
                for (var i = 0; i < array.length; i++) {
                    var obj = array[i];
                    var time = obj.created_at;
                    var text = obj.text;

                    var pairing = {
                        "time": time,
                        "text": text
                    };

                    this.clean.push(pairing);
                }

                console.log(this.clean);
            };
            return TextAndTimeData;
        })(Backbone.Model);
        _model.TextAndTimeData = TextAndTimeData;
    })(app.model || (app.model = {}));
    var model = app.model;
})(app || (app = {}));
var app;
(function (app) {
    (function (model) {
        var NarcModel = (function (_super) {
            __extends(NarcModel, _super);
            function NarcModel(textOnly) {
                _super.call(this);
            }
            return NarcModel;
        })(Backbone.Model);
        model.NarcModel = NarcModel;
    })(app.model || (app.model = {}));
    var model = app.model;
})(app || (app = {}));
var app;
(function (app) {
    (function () {
        $(document).ready(function () {
            app.util.initModels();
        });
    })();
})(app || (app = {}));
var app;
(function (app) {
    var LoadingMask = (function () {
        function LoadingMask() {
            console.log('kike shit');
        }
        return LoadingMask;
    })();
    app.LoadingMask = LoadingMask;
})(app || (app = {}));
