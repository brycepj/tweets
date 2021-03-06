/// <reference path="../ts/lib/jquery.d.ts" />
/// <reference path="../ts/lib/underscore.d.ts" />
/// <reference path="../ts/lib/backbone.d.ts" />
/// <reference path="../ts/lib/moment.d.ts" />
/// <reference path="../ts/lib/highcharts.d.ts" />
declare module app {
}
declare module app {
    module util {
        function initModels(): void;
    }
}
declare module app {
    module util {
        function initViews(models: any): void;
    }
}
declare module app {
}
declare module app {
    module models {
        class DataByDate {
            public dataSet: any;
            public model: any;
            constructor(freshData: any);
            public init(): any;
        }
    }
}
declare module app {
    module models {
        class DataByHour {
        }
    }
}
declare module app {
    module models {
        class DataByWeekday {
        }
    }
}
declare module app {
    module models {
        class TextByDate extends Backbone.Model {
            public data: any;
            public model: any;
            constructor(DataByDate: any);
            public init(): void;
            public scrubTextByDate(): void;
        }
    }
}
declare module app {
    module models {
    }
}
declare module app {
    module models {
        class TweetReasonsModel extends Backbone.Model {
            public data: any;
            public model: any;
            constructor(DataByDate: any);
            public init(): void;
            public parseTweetReasons(): void;
        }
    }
}
declare module app {
    module models {
        class HashtagModel extends Backbone.Model {
            public data: any;
            public model: any;
            constructor(DataByDate: any);
            public init(): void;
            public scrubHashtags(): void;
            public parseHashtags(): void;
        }
    }
}
declare module app {
    module models {
        class NarcModel extends Backbone.Model {
            public data: any;
            public model: any;
            constructor(TextByDate: any);
            public init(): void;
            public parseNarcTotals(): void;
            public parseNarcByDay(): void;
        }
    }
}
declare module app {
    module models {
        class TweetReasonsConfig extends Backbone.Model {
            public data: any;
            public model: any;
            constructor(TweetReasons: any);
            public init(): void;
            public formatData(): {
                chartTitleText: string;
                chartType: string;
                seriesData: any;
            };
        }
    }
}
declare module app {
    function scrubRawData(data: any): any;
}
declare module app {
    module processors {
        function scrubTextByDate(data: any): {
            forTotals: any[];
            forDays: any[];
        };
    }
}
declare module app {
    module processors {
        function scrubForWords(data: any): void;
    }
}
declare module app {
    module processors {
        function scrubHashtags(data: any): any[];
    }
}
declare module app {
    module processors {
        function parseDataByDate(freshData: any): {
            forTotals: any[];
            forDays: any[];
        };
    }
}
declare module app {
    module processors {
        function parseNarcTotals(textByDate: any): {
            percent: number;
            frequency: number;
            counts: any[];
        };
    }
}
declare module app {
    module processors {
        function parseTweetReasons(dataByDate: any): {
            "total": number;
            "retweets": {
                "total": number;
                "percent": any;
                "favorites": {
                    all: any[];
                    topTen: any[];
                };
            };
            "replies": {
                "total": number;
                "percent": any;
                "favorites": {
                    all: any[];
                    topTen: any[];
                };
            };
            "statements": {
                "total": number;
                "percent": any;
                "favorites": {
                    all: any[];
                    topTen: any[];
                };
            };
        };
    }
}
declare module app {
    module processors {
        function parseHashtags(scrubbedHashtags: any): any;
    }
}
declare module app {
    module processors {
        function tweetReasonsFormatting(data: any): {
            chartTitleText: string;
            chartType: string;
            seriesData: any;
        };
    }
}
declare module app {
    module views {
        class TweetReasonsView extends Backbone.View {
            public data: any;
            constructor(model: any);
            public init(): void;
            public render(): any;
            public renderTemplate(): void;
            public renderChart(): void;
        }
    }
}
