module app {

    export module models {

        export class TweetReasonsModel extends Backbone.Model {

            data:any;
            model:any;
            
            constructor(DataByDate) {
                super();
                
                this.data = DataByDate;                
                
                this.init();

            }

            init():void{
                this.model = {};
                this.parseTweetReasons();
            }
            
            parseTweetReasons():void{
            
                var array = this.data;
                
                this.model = app.processors.parseTweetReasons(array);
            
            }

        }

    }

}