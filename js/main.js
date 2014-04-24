var app;
(function (app) {
    (function (util) {
        function initModels() {
            var getRawData = $.getJSON('data/tweets.json');

            var timeData, contextData;

            getRawData.done(function (data) {
                console.log('request succeeded');
                timeData = new app.model.TimeData(data);
                contextData = new app.model.ContextData(data);
            }).fail(function () {
                console.log('request failed');
            });
        }
        util.initModels = initModels;
    })(app.util || (app.util = {}));
    var util = app.util;
})(app || (app = {}));
var app;
(function (app) {
    (function (util) {
        (function (parsers) {
            function tweetInterval(data) {
                var factor = [1, 60, 3600, 86400, 604800, 3144960];

                function getAverages() {
                    var avg, seconds;
                    var total = 0;
                    var array = data;
                    var length = array.length;

                    for (var i = 0; i < array.length; i++) {
                        var secs = array[i] / 1000;
                        total += secs;
                    }

                    seconds = total / length;

                    avg = {
                        "seconds": seconds / factor[0],
                        "minutes": seconds / factor[1],
                        "hours": seconds / factor[2],
                        "days": seconds / factor[3],
                        "weeks": seconds / factor[4],
                        "years": seconds / factor[5]
                    };
                    return avg;
                }

                function returnModel(avg) {
                    var pUnit, sUnit, pValue, sValue, avgPrint;

                    function getValues(high, low) {
                        var pValue = Math.floor(avg.seconds / high);
                        var sValue = Math.floor((avg.seconds - (pValue * high)) / low);

                        return {
                            "pValue": pValue,
                            "sValue": sValue
                        };
                    }

                    if (factor[0] < avg.seconds && avg.seconds < factor[1]) {
                        var high = factor[0];
                        var low = factor[0];

                        pUnit = "second";
                        sUnit = null;
                        pValue = getValues(high, low).pValue;
                        sValue = null;
                    } else if (factor[2] > avg.seconds && avg.seconds > factor[1]) {
                        var high = factor[1];
                        var low = factor[0];

                        pUnit = "minute";
                        sUnit = "second";
                        pValue = getValues(high, low).pValue;
                        sValue = getValues(high, low).sValue;
                    } else if (factor[3] > avg.seconds && avg.seconds > factor[2]) {
                        var high = factor[2];
                        var low = factor[1];

                        pUnit = "hour";
                        sUnit = "minute";
                        pValue = getValues(high, low).pValue;
                        sValue = getValues(high, low).sValue;
                    } else if (factor[4] > avg.seconds && avg.seconds > factor[3]) {
                        var high = factor[3];
                        var low = factor[2];

                        pUnit = "day";
                        sUnit = "hour";
                        pValue = getValues(high, low).pValue;
                        sValue = getValues(high, low).sValue;
                    } else if (avg.seconds > factor[4]) {
                        var high = factor[4];
                        var low = factor[3];

                        pUnit = "week";
                        sUnit = "day";
                        pValue = getValues(high, low).pValue;
                        sValue = getValues(high, low).sValue;
                    }

                    if (pValue != 1) {
                        pUnit = pUnit + "s";
                    }
                    if (sValue != 1) {
                        sUnit = sUnit + "s";
                    }

                    avgPrint = function () {
                        if (pUnit === "seconds") {
                            return pValue + " " + pUnit;
                        } else if (sValue == 0) {
                            return pValue + " " + pUnit;
                        } else {
                            return pValue + " " + pUnit + " and " + sValue + " " + sUnit;
                        }
                    };

                    return {
                        "pUnit": pUnit,
                        "pValue": pValue,
                        "sUnit": sUnit,
                        "sValue": sValue,
                        "print": avgPrint()
                    };
                }

                return returnModel(getAverages());
            }
            parsers.tweetInterval = tweetInterval;
        })(util.parsers || (util.parsers = {}));
        var parsers = util.parsers;
    })(app.util || (app.util = {}));
    var util = app.util;
})(app || (app = {}));
var app;
(function (app) {
    (function (util) {
        (function (parsers) {
            function tweetActivity(data) {
                var moments = data;

                function getTotalDays() {
                    var index = moments.length - 1;
                    var last = moments[0];
                    var first = moments[index];
                    var totalDays = last.diff(first, 'days');

                    return {
                        "days": totalDays
                    };
                }

                function createRawArray() {
                    var modelArray = [];

                    for (var i = 0; i < moments.length; i++) {
                        var index = moments.length - 1;
                        var momentObj = moments[i];
                        var dayOfWeek = momentObj.day();
                        var dateStr = momentObj.format("dddd, MMMM Do YYYY");
                        var age = momentObj.diff(moments[index], 'days');
                        var _a = momentObj._a;
                        var year = _a[0];
                        var month = _a[1];
                        var day = _a[2];

                        modelArray.push({
                            "year": year,
                            "month": month,
                            "day": day,
                            "age": age,
                            "dayOfWeek": dayOfWeek,
                            "dateStr": dateStr
                        });
                    }

                    return modelArray;
                }

                function createModelArray() {
                    var model = [];
                    var raw = createRawArray();
                    var current = null;
                    var count = 1;

                    for (var i = 0; i < raw.length; i++) {
                        if (current != raw[i].age) {
                            if (i > 0) {
                                raw[i].quantity = count;

                                model.push(raw[i]);

                                current = raw[i].age;
                                count = 1;
                            }
                        } else {
                            count++;
                        }
                    }

                    return model;
                }

                return [getTotalDays(), createModelArray()];
            }
            parsers.tweetActivity = tweetActivity;
        })(util.parsers || (util.parsers = {}));
        var parsers = util.parsers;
    })(app.util || (app.util = {}));
    var util = app.util;
})(app || (app = {}));
var app;
(function (app) {
    (function (util) {
        (function (parsers) {
            function tweetGeo(data) {
                var geoData = data;

                console.log(geoData);

                for (var i = 0; i < geoData.length; i++) {
                    if (geoData[i].geo) {
                        console.log(geoData[i]);
                    }
                    if (geoData[i].place) {
                        console.log(geoData[i]);
                    }
                }

                return "GALLO";
            }
            parsers.tweetGeo = tweetGeo;
        })(util.parsers || (util.parsers = {}));
        var parsers = util.parsers;
    })(app.util || (app.util = {}));
    var util = app.util;
})(app || (app = {}));
var app;
(function (app) {
    (function (util) {
        (function (parsers) {
            function tweetClient(data) {
                var clients = data;

                return "GALLO";
            }
            parsers.tweetClient = tweetClient;
        })(util.parsers || (util.parsers = {}));
        var parsers = util.parsers;
    })(app.util || (app.util = {}));
    var util = app.util;
})(app || (app = {}));
var app;
(function (app) {
    (function (util) {
        (function (parsers) {
            function tweetReason(data) {
                return "GALLO";
            }
            parsers.tweetReason = tweetReason;
        })(util.parsers || (util.parsers = {}));
        var parsers = util.parsers;
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
                console.log('this is the constructor starting up');
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
        var TimeData = (function (_super) {
            __extends(TimeData, _super);
            function TimeData(raw) {
                _super.call(this);

                this.raw = raw;

                this.init();

                console.log('raw data: ', this.raw);
                console.log('intervals: ', this.getIntervals());
                console.log('activity: ', this.getActivity());
            }
            TimeData.prototype.init = function () {
                this.rawIntervals = [];
                this.rawMoments = [];

                this.saveRawIntervals();
                this.saveRawMoments();
            };

            TimeData.prototype.saveRawIntervals = function () {
                var array = this.raw;

                for (var i = 1; i < array.length; i++) {
                    var index = i;
                    var prevIndex = i - 1;
                    var currentTime = array[index].created_at;
                    var prevTime = array[prevIndex].created_at;

                    var currentTimeObj = function () {
                        return new Date(Date.parse(currentTime.replace(/( +)/, ' UTC$1')));
                    };
                    var prevTimeObj = function () {
                        return new Date(Date.parse(prevTime.replace(/( +)/, ' UTC$1')));
                    };

                    var diff = Math.abs(currentTimeObj() - prevTimeObj());

                    this.rawIntervals.push(diff);
                }
            };

            TimeData.prototype.saveRawMoments = function () {
                var array = this.raw;

                for (var i = 0; i < array.length; i++) {
                    var current = array[i].created_at;

                    var momentObj = moment(current, "YYYY/MM/DD");
                    var dayOfWeek = momentObj.day();

                    this.rawMoments.push(momentObj);
                }
            };

            TimeData.prototype.getIntervals = function () {
                var array = this.rawIntervals;

                return app.util.parsers.tweetInterval(array);
            };

            TimeData.prototype.getActivity = function () {
                var array = this.rawMoments;

                return app.util.parsers.tweetActivity(array);
            };
            return TimeData;
        })(Backbone.Model);
        model.TimeData = TimeData;
    })(app.model || (app.model = {}));
    var model = app.model;
})(app || (app = {}));
var app;
(function (app) {
    (function (model) {
        var ContextData = (function (_super) {
            __extends(ContextData, _super);
            function ContextData(raw) {
                _super.call(this);

                this.raw = raw;

                this.init();
            }
            ContextData.prototype.init = function () {
                this.rawGeo = [];
                this.rawClient = [];
                this.rawReason = [];

                this.saveRawGeo();
                this.saveRawClient();
                this.saveRawReason();

                console.log(this.getGeos());
                console.log(this.getClients());
                console.log(this.getReasons());
            };

            ContextData.prototype.getGeos = function () {
                var array = this.rawGeo;

                return app.util.parsers.tweetGeo(array);
            };

            ContextData.prototype.getClients = function () {
                var array = this.rawClient;

                return app.util.parsers.tweetClient(array);
            };

            ContextData.prototype.getReasons = function () {
                var array = this.rawReason;

                return app.util.parsers.tweetReason(array);
            };

            ContextData.prototype.saveRawGeo = function () {
                var array = this.raw;

                for (var i = 0; i < array.length; i++) {
                    var obj = array[i];
                    var current = obj.created_at;
                    var date = moment(current, "YYYY/MM/DD");
                    var geo = obj.geo;
                    var place = obj.place;

                    this.rawGeo.push({
                        "date": date,
                        "geo": geo,
                        "place": place
                    });
                }
            };

            ContextData.prototype.saveRawClient = function () {
                var array = this.raw;

                for (var i = 0; i < array.length; i++) {
                    var obj = array[i];
                    var current = obj.created_at;
                    var date = moment(current, "YYYY/MM/DD");
                    var source = obj.source;

                    this.rawClient.push({
                        "date": date,
                        "source": source
                    });
                }
            };

            ContextData.prototype.saveRawReason = function () {
                var array = this.raw;

                for (var i = 0; i < array.length; i++) {
                    var obj = array[i];
                    var current = obj.created_at;
                    var date = moment(current, "YYYY/MM/DD");
                    var reply = obj.in_reply_to_screen_name;
                    var retweeted = obj.retweeted;
                    var text = obj.text;

                    this.rawReason.push({
                        "date": date,
                        "reply": reply,
                        "retweeted": retweeted,
                        "text": text
                    });
                }
            };
            return ContextData;
        })(Backbone.Model);
        model.ContextData = ContextData;
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
