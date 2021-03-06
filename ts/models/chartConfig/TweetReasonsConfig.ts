module app {

    export module models {

        export class TweetReasonsConfig extends Backbone.Model {

            data: any;
            model: any;

            constructor(TweetReasons) {
                super();

                this.data = TweetReasons;
                this.init();
                
            }

            init() {
                
                this.model = {model:this.data,chartData:this.formatData()};
                
            }
            
            formatData() {
                var data = this.data;
                
                return app.processors.tweetReasonsFormatting(data);
            
            }

        }

    }

}