
function Agent(moves, memory, payoffs, learningRate, mutationRate, traitDict){
    if (moves === undefined) {moves = ['C','D'];}
    if (memory === undefined) {memory = 2;}
    if (payoffs === undefined) {payoffs = {'CC': 3, 'CD': 0, 'DC': 5, 'DD': 1};}
    if (learningRate === undefined) {learningRate = 0.25;}
    if (mutationRate === undefined) {mutationRate = 0.025;}
    if (traitDict === undefined) {traitDict = {};}

    this.moves = moves;
    this.learningRate = learningRate;
    this.mutationRate = mutationRate;
    this.payoffs = payoffs;
    this.memory = memory;
    this.score = 0;
    this.strategyDict = {};
    this.traits = {}; // can be set after a season with this.setTraits()
    this.traitDict = traitDict;
    this.startingRecentPast = [];
    this.recentPast = [];
    this.dotColor = 'rgb(0,0,0)';
    for (var i=0; i<this.memory; i++){
        this.startingRecentPast.push('--');
        this.recentPast.push('--');
    }
    this.myMoveHistory = {};
    this.moveCount = 0;
    this.theirMoveHistory = {};
    
    this.offspringStrategyDict = {}; // used to store the upcoming Dict
    this.maxPayoff = 0;
    this.minPayoff = 0;

    this.setRandomStrategy = function(){
        strategies = createStrategyList(this.memory, Object.keys(this.payoffs));
        this.strategyDict = {};
        for (var i in strategies){
            this.strategyDict[strategies[i]] = moves[Math.floor(Math.random()*moves.length)];
        } // end of i 
    };
    this.setRandomStrategy();
    this.outcomeHistory = {};

    this.setTFT = function(){
        for (var strategy in this.strategyDict){
            lastCharacter = strategy[strategy.length - 1];
            this.strategyDict[strategy] = lastCharacter;
        }
        this.strategyDict[this.startingRecentPast] = this.moves[0];
        this.dotColor = 'rgb(0,128,255)';
        this.learningRate = 0;
        this.mutationRate = 0;
    };


    this.setTraits = function(){
        this.traits = {};
        for (var trait in this.traitDict){
            this.traits[trait] = {'acted': 0, 'possible': 0};
            for (var strategy in this.strategyDict){
                if (this.traitDict[trait].possibleFunction(strategy) === true) {
                    this.traits[trait]['possible'] += this.outcomeHistory[strategy];
                    if (this.strategyDict[strategy] == this.traitDict[trait].move){
                        this.traits[trait]['acted'] += this.outcomeHistory[strategy];
                    }
                }
            } //end of for each strategy loop

        } //end of for each trait loop
    };

    this.describeTraits = function(){
        this.setTraits();
        traitString = '<p>';
        for (var trait in this.traits){
            traitString += trait + ': ' + this.traits[trait]['acted'] +
                           ' out of ' + this.traits[trait]['possible'] + '<br />';
        }
        traitString += 'Score: ' + this.score.toFixed(2);
        traitString += '</p>';
        return traitString;
    };//end of describeTraits function

    this.addHistory = function(mine, theirs, outcome){
        this.myMoveHistory[mine] += 1;
        this.theirMoveHistory[theirs] += 1;
        this.moveCount += 1;
        if (outcome in this.outcomeHistory){
            this.outcomeHistory[outcome] += 1;
        }
        else {
            this.outcomeHistory[outcome] = 1;
        }
    }; // end of addHistory function


    this.evolve = function(partnerStrategyDict){
        this.offspringStrategyDict = {};
        for (var strategy in this.strategyDict){
            whichParent = Math.random();
            if (whichParent < 0.5){
                this.offspringStrategyDict[strategy] = this.strategyDict[strategy];
            }
            else{
                this.offspringStrategyDict[strategy] = partnerStrategyDict[strategy];
            }
        }
    };// end of evolve function

    this.mutate = function(){
        for (var strategy in this.strategyDict){
            if (Math.random() < this.mutationRate){
                this.strategyDict[strategy] = this.moves[Math.floor(Math.random()*this.moves.length)];
            }
        }
    };

    this.resetMemory = function(){
        for (var outcome in this.recentPast){
            this.recentPast[outcome] = this.startingRecentPast[outcome];
        }
    };

    this.reset = function(){
        this.resetMemory();
        for (var move in this.moves){
            this.myMoveHistory[this.moves[move]] = 0;
            this.theirMoveHistory[this.moves[move]] = 0;
        }
        this.outcomeHistory = {};
        for (var strategy in this.strategyDict){
            this.outcomeHistory[strategy] = 0;
        }

        this.score = 0;
        this.moveCount = 0;
    };// end of reset function

    this.reset();

}
