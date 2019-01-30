var mps = 0;
var mpc = 1;
var multiplier = 1;
var money = 0;
var ratsTotal = 0;

var localStorage = window.localStorage;

class Rats{
    constructor(){}
    money(a){
        this.money = a;
        return this;
    }
    moneyPercent(a){
        this.moneyPercent = a;
        return this;
    }
    text(a){
        this.text = a;
        return this;
    }
    cost(a){
        this.cost = a;
        return this;
    }
    costPercent(a){
        this.costPercent = a;
        return this;
    }
    toJson(){
        var data = {};
        data.cost = this.cost;
        data.costPercent = this.costPercent;
        data.text = this.text;
        data.money = this.money;
        data.moneyPercent = this.moneyPercent;
        return data;
    }
    static fromJson(data){
        var rat = new Rats().cost(data.cost)
        .costPercent(data.costPercent)
        .money(data.money)
        .moneyPercent(data.moneyPercent)
        .text(data.text);
        return rat;
    }
    getFullText(){
        return (this.text + this.cost.toFixed(1).toString() + "$");
    }
}

var vals = {};

vals.thiccRat = new Rats().cost(10).costPercent(1.05).money(1).moneyPercent(1.01).text("One Thic Ratt | ");
vals.hazmatRat = new Rats().cost(10000).costPercent(1.05).money(1).moneyPercent(1.01).text("Hazmat Rat | ");
vals.cdcRat = new Rats().cost(1000000).costPercent(1.05).money(1).moneyPercent(1.01).text("CDC Rat | ");
vals.stripperRat = new Rats().cost(999999999999).costPercent(1.05).money(1).moneyPercent(1.01).text("Stripper Rat | ");
vals.obamaRat = new Rats().cost(57000).costPercent(1.05).money(1).moneyPercent(1.01).text("President Barat | ");
vals.loanRat = new Rats().cost(1).costPercent(1.5).money(1).moneyPercent(1.1).text("Small loan of a million rats Rat | ");
vals.gambinoRat = new Rats().cost(999999999999999).costPercent(1.05).money(1).moneyPercent(1.01).text("Gambino Rat | ");

function getJsonData(){
    json = {};
    json.mps = mps;
    json.mpc = mpc;
    json.multiplier = multiplier;
    json.money = money;
    json.ratsTotal = ratsTotal;
    return json;
}

function getRatsJson(){
    var ratTotalJson = {};
    for (var key in vals) {
        if (!vals.hasOwnProperty(key)) continue;
        var ratDataJson = vals[key].toJson();
        ratTotalJson[key] = ratDataJson;
    }
    return ratTotalJson;
}

function saveData(){
    json = getJsonData();
    json.ratData = getRatsJson();
    localStorage.setItem('data',btoa(JSON.stringify(json)));
}

function loadSaveData(){
    json64 = localStorage.getItem('data');
    if(json64 === null) return;
    json = JSON.parse(atob(json64));
    mps = json.mps;
    mpc = json.mpc;
    multiplier = json.multiplier;
    money = json.money;
    ratsTotal = json.ratsTotal;

    var ratData = json.ratData;
    for (var key in vals) {
        if (!vals.hasOwnProperty(key)) continue;
        vals[key] = Rats.fromJson(ratData[key]);
    }
}

function updateVals(){
    for (var key in vals) {
        if (!vals.hasOwnProperty(key)) continue;
        var rat = vals[key];
        $("#"+key).text(rat.getFullText());
    }
}

loadSaveData();

$(function(){
    updateVals();
    $("#rat").click(function(){
        money += mpc;
    });
    $(".ratBtn").click(function(e){
        var clickedRat = vals[e.target.id];
        if(clickedRat.cost > money){
            alertify.error("ur broke sir");
        }else{
            money -= clickedRat.cost;
            mps += clickedRat.money;
            clickedRat.cost *= clickedRat.costPercent;
            clickedRat.money *= clickedRat.moneyPercent;
            ratsTotal++;
            $(e.target).text(clickedRat.getFullText());
        }
    });
    $("#saveBtn").click(function(e){
        saveData();
    });
    
    });

function main(){
    $("#money").text("Moneis: " + money.toFixed(1).toString());
    $("#mps").text("Moneies per second: " + mps.toFixed(1).toString());
    //$("#mpc").text("Money clicke :" + mpc.toFixed(1).toString());
    $("#rats").text("u got " + ratsTotal.toString() + " rats");
    money += mps/10;
}
new AdjustingInterval(main, 50).start();//10 fps pretty much
new AdjustingInterval(saveData, 1000*60*3).start();