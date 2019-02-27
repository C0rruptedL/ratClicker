var data = {};

data.mps = new Decimal("0");
data.mpc = new Decimal("1");
data.multiplier = 1;
data.money = new Decimal("0");
data.ratsTotal = 0;
data.rebirthRats = new Decimal("0");

var localStorage = window.localStorage;

class Rat {
    constructor() {
        this.total = 0;
    }
    money(a) {
        this.money = new Decimal(a);
        return this;
    }
    moneyPercent(a) {
        this.moneyPercent = a;
        return this;
    }
    text(a) {
        this.text = a;
        return this;
    }
    cost(a) {
        this.cost = new Decimal(a);
        return this;
    }
    costPercent(a) {
        this.costPercent = a;
        return this;
    }
    toJson() {
        var data = {};
        data.cost = this.cost;
        data.costPercent = this.costPercent;
        data.text = this.text;
        data.money = this.money;
        data.moneyPercent = this.moneyPercent;
        data.total = this.total;
        return data;
    }
    story(a) {
        this.story = a;
    }
    static fromJson(data) {
        try {
            var rat = new Rat().cost(data.cost.toString())
                .costPercent(data.costPercent)
                .money(data.money.toString())
                .moneyPercent(data.moneyPercent)
                .text(data.text);
            rat.total = data.total;
            return rat;
        } catch (error) {
            return data.rats[data];
        }
    }
    getFullText() {
        return (this.text + "$" + numberWithCommas(this.cost));
    }
    getStory() {
        return this.story;
    }
    getStats() { //total,cost,money
        return "Money: " + numberWithCommas(this.money).toString() + " Amount: " + this.total;
    }
}

data.rats = {};

data.rats.loanRat = new Rat().cost("1").costPercent(1.5).money("1").moneyPercent(1.1).text("Dead Rat | ");
data.rats.thiccRat = new Rat().cost("10").costPercent(1.05).money("1").moneyPercent(1.01).text("Thicc Ratt | ");
data.rats.hazmatRat = new Rat().cost("10000").costPercent(1.05).money("5000").moneyPercent(1.01).text("Hazmat Rat | ");
data.rats.cdcRat = new Rat().cost("1000000").costPercent(1.05).money("500000").moneyPercent(1.01).text("Delrao Rat | ");
data.rats.obamaRat = new Rat().cost("57000").costPercent(1.05).money("28500").moneyPercent(1.01).text("Kim Jung rat | ");
data.rats.ratrump = new Rat().cost("57000").costPercent(1.05).money("28500").moneyPercent(1.01).text("President Ratrump | ");
data.rats.stripperRat = new Rat().cost("999999999999").costPercent(1.05).money("499999999999.5").moneyPercent(1.01).text("NoPls Rat | ");
data.rats.gambinoRat = new Rat().cost("999999999999999").costPercent(1.05).money("499999999999999.5").moneyPercent(1.01).text("Gambino Rat | ");

data.rats.thiccRat.story("He thicc");
data.rats.hazmatRat.story("went sicko mode after eating a shart");
data.rats.cdcRat.story("ratTs");
data.rats.stripperRat.story("makes a living off state of the art machine learning techniques");
data.rats.obamaRat.story("pretty cool guy");
data.rats.ratrump.story("likes to build massive walls");
data.rats.loanRat.story("looks at exponential functions all day, weirdo");
data.rats.gambinoRat.story("aw rfik");

function loadButtons() {
    for (var key in data.rats) {
        if (isNull(data.rats[key])) continue;
        var ratName = key;
        var ratText = data.rats[key].getFullText();
        var ratCode = "<button class=\"btn btn-info ratBtn\" id=\"" + ratName + "\">" + ratText + "</button><br>";
        $(".shop").append(ratCode);
    }
}

function getJsonData() {
    console.log(data.money);
    return data;
}

function getRatsJson() {
    var ratTotalJson = {};
    for (var key in data.rats) {
        if (isNull(data.rats[key])) continue;
        var ratDataJson = data.rats[key].toJson();
        ratTotalJson[key] = ratDataJson;
    }
    return ratTotalJson;
}

function saveData() {
    var json = getJsonData();
    console.log(json);
    localStorage.setItem('data', btoa(JSON.stringify(json)));
}

function loadSaveData() {
    var json64 = localStorage.getItem('data');
    if (isNull(json64)) return;
    var json = JSON.parse(atob(json64));
    for(var key in json){
        if(key==="rats")continue;
        if(isNull(isNull(json[key])))continue;
        if(typeof json[key]==="string"){
            console.log(json[key],key);
            data[key] = new Decimal(json[key]);
        }else{
            data[key] = json[key];
        }
    }
    console.log(json);
    /*data.mps = new Decimal(json.mps);
    data.mpc = new Decimal(json.mpc);
    data.multiplier = json.multiplier;
    data.money = new Decimal(json.money);
    data.ratsTotal = json.ratsTotal;
    data.rebirthRats = new Decimal(json.rebirthRats);
    */
    var ratData = json.rats;
    if(isNull(ratData))return;
    for (var key2 in data.rats) {
        if (isNull(ratData[key2])) continue;
        var text = data.rats[key2].text;
        var story = data.rats[key2].story;
        data.rats[key2] = Rat.fromJson(ratData[key2]);
        data.rats[key2].text = text;
        data.rats[key2].story = story;
    }
}

function updateStats(stats) {
    $("#ratName").text(stats.name);
    $("#ratStory").text(stats.story);
    $("#ratStats").text(stats.stats);
}

function updateVals() {
    for (var key in data.rats) {
        if (isNull(data.rats[key])) continue;
        var rat = data.rats[key];
        $("#" + key).text(rat.getFullText());
    }
}

loadSaveData();

var brokeMessages = ["ur broke sir", "no monei", "no", "frikin heck", "stop", "bruh moment", "E", "F", "cmon dood", "no u", "Dis is not de whey"];
var timePassed = 0;
var d;
var oldTime;
$(function() {
    $(window).focus(function() {
        d = new Date();
        timePassed = d.getTime() - oldTime;
    }).blur(function() {
        d = new Date();
        oldTime = d.getTime();
    });
    loadButtons();
    updateVals();
    $("#rat").click(function() {
        data.money = data.money.add(data.mpc);
    });
    $(".ratBtn").click(function(e) {
        var clickedRat = data.rats[e.target.id];
        if (clickedRat.cost.gt(data.money)) {
            alertify.error(getRand(brokeMessages));
        } else {
            data.money = data.money.sub(clickedRat.cost);
            data.mps = Decimal.add(data.mps, clickedRat.money);
            clickedRat.cost = clickedRat.cost.times(clickedRat.costPercent);
            clickedRat.money = clickedRat.money.times(clickedRat.moneyPercent);
            clickedRat.total += 1;
            data.ratsTotal++;
            $(e.target).text(clickedRat.getFullText());
        }
    });
    $(".ratBtn").hover(function(e) { //hover in
        var clickedRat = data.rats[e.target.id];
        updateStats({
            name: e.target.id,
            story: clickedRat.getStory(),
            stats: clickedRat.getStats()
        });
    }, function(e) { //hover out
        updateStats({
            name: "",
            story: "",
            stats: ""
        });
    });
    $("#saveBtn").click(function(e) {
        saveData();
    });

});

var topMsg = ["ur rats are worldwide buddy", "rats are taking all our jobs",
    "rat epidemic threatens humanity", "ratS",
    "somebody once told me", "сука крыса", "indefinite integral of the cube root of tan x, dx. have fun with that",
    "the rats are in ur house and they stinkyy", "i shouldd make roblox rat simulator", "sub to pewdiepie", "poor russians dont have internet",
    "cuba needs to be blessed with da rats", "Unchi ratto?", "Ich bin ein Rat", "We are rats. We love rats. Rats love us.",
    "Ratosis - natural phenomenon when rat quantum tunnels through physical realm and transcends all other rats and grants him God-like power",
    "Cheese - a rats favorite meal", "chEesey", "May the rAt be with you...", "T-Gay", 
    "rat shart - similar to cheese except many times stronger. CAUTION do not overdose rats with sharts"
];

function changeMessage() {
    $("#topbar").text(getRand(topMsg));
}

function changePicture() {
    $("#randomRat").attr("src","images/Chef_Rat.png");
}

var fps = new Decimal(1000 / 30);

function main() {
    $("#money").text("Moneis: $" + numberWithCommas(data.money));
    $("#mps").text("Moneies per second: $" + numberWithCommas(data.mps));
    $("#mpc").text("Money clicke : $" + numberWithCommas(data.mpc));
    $("#rats").text("u got " + numberWithCommas(data.ratsTotal) + " rats");
    if (timePassed === 0) {
        data.money = Decimal.add(data.money, (Decimal.div(data.mps, fps)));
    } else {
        console.log("time passed");
        data.money = Decimal.add(data.money, Decimal.div(data.mps * (timePassed / 1000),fps));
        timePassed = 0;
    }
    //checkAchievements();
}
new AdjustingInterval(changePicture, 1000 * 25).start();
new AdjustingInterval(changeMessage, 1000 * 30).start();
new AdjustingInterval(main, fps.toNumber()).start();
new AdjustingInterval(saveData, 1000 * 60 * 3).start();
