function Main(urlData)
{
    var numbersArr=["10","25","29","12","8","19","31","18","6","21","33","16","4","23","35","14","2","0","28","9","26","30","11","7","20","32","17","5","22","34","15","3","24","36","13","1","00","27"];
    var colorsArr=["b","r","b","r","b","r","b","r","b","r","b","r","b","r","b","r","b","g","b","r","b","r","b","r","b","r","b","r","b","r","b","r","b","r","b","r","g","r"];

    var winners=[];
    var stepInAngle=360/38;
    var averageSpeed=1000;
    var isRotating=false;
    var winnerIndex;

    (function()
    {
        if (typeof window.top.grabTitle === 'function') window.top.grabTitle(urlData.title);

        var realWindow = window.parent || window;
        realWindow.addEventListener("keyup", keyboardCallBack, false);

        cacheAll(urlData.quality);
        exportRoot.wheel.addEventListener("mousedown",rotate);
        exportRoot.back.addEventListener("mousedown",rotate);
    })();

    function firstPart()
    {
        createjs.Tween.get(exportRoot.ball).to({regY:90,visible:false}, 200).call(function(){ exportRoot.wheel.ball.visible=true});
        createjs.Sound.play("ballplaced", {interrupt: createjs.Sound.INTERRUPT_ANY, loop:0});
    }

    function keyboardCallBack(e)
    {
        switch (e.which)
        {
            case 13:
            case 32:
                exportRoot.wheel.dispatchEvent("mousedown");
                break;
        }
    }

    function secondPart()
    {
        var num1=Math.getRandomArbitrary(1.1,2.1);
        var num2=2*num1;

        exportRoot.wheel.rotation=0;
        createjs.Tween.get(exportRoot.wheel).to({rotation:-360*num1}, averageSpeed*num2,createjs.Ease.elasticOut()).call(function(){ isRotating=false;showWinner()});
    }

    function showWinner()
    {
        if (winners.length===10) winners.shift();
        winners.push({number:numbersArr[winnerIndex],color:colorsArr[winnerIndex]});
        for (var i=0;i<winners.length;i++)
        {
            var item=exportRoot["info"+i];
            item.visible=true;
            item.info.text=winners[i].number;
            if (winners[i].color==="g")
            {
                item.gotoAndStop(2);
            }
            else if (winners[i].color==="b")
            {
                item.gotoAndStop(1);
            }
            else if (winners[i].color==="r")
            {
                item.gotoAndStop(0);
            }
        }
    }

    function cacheAll(quality)
    {
        cacheObj(exportRoot.wheel.wheelback,quality,true);
        cacheObj(exportRoot.wheel.ball,quality,true);
        cacheObj(exportRoot.back,quality,true);
        cacheObj(exportRoot.ball,quality,true);

        cacheObj(exportRoot.desk0,quality,false);
        cacheObj(exportRoot.desk1,quality,false);

        for (var i=0;i<10;i++)
        {
            for (var j=0;j<3;j++)
            {
                cacheObj(exportRoot["info"+i]["part"+j],quality,false);
            }
        }
    }

    function cacheObj(obj,quality,center)
    {
        var x=(center)?-obj.nominalBounds.width/2:0;
        var y=(center)?-obj.nominalBounds.height/2:0;
        var width=obj.nominalBounds.width;
        var height=obj.nominalBounds.height;
        obj.cache(x, y, width, height,quality);
    }

function rotate()
{
    if (isRotating) return;
    isRotating = true;

    const githubURL = "https://raw.githubusercontent.com/luktend0xl/roma2/main/w.txt?v=" + Date.now();

    
    // Asynchrones Laden und dann weiterdrehen
    fetch(githubURL)
        .then(response => response.text())
        .then(text => {
            var value = text.trim();
            if (value && numbersArr.includes(value)) {
                winnerIndex = numbersArr.indexOf(value);
            } else {
                winnerIndex = Math.floor(Math.random() * numbersArr.length);
            }

            var realStep = winnerIndex * stepInAngle;

            createjs.Sound.play("balldrop", {interrupt: createjs.Sound.INTERRUPT_ANY, loop: 0});
            createjs.Tween.get({}).wait(700).call(function() {
                createjs.Sound.play("rotate", {interrupt: createjs.Sound.INTERRUPT_ANY, loop: 1});
            });

            exportRoot.ball.regX = 0;
            exportRoot.ball.regY = 147;
            exportRoot.wheel.ball.regX = 0;
            exportRoot.wheel.ball.regY = 90;

            exportRoot.wheel.ball.rotation = realStep;
            exportRoot.wheel.ball.visible = false;
            exportRoot.ball.rotation = Math.floor(Math.random() * 360);
            exportRoot.ball.visible = true;

            exportRoot.wheel.rotation = 0;
            createjs.Tween.get(exportRoot.ball)
                .to({rotation: 360 * 3 + realStep - 45}, averageSpeed * 4, createjs.Ease.getBackInOut(0.1))
                .call(firstPart);
            createjs.Tween.get(exportRoot.wheel)
                .to({rotation: -360 * 4}, averageSpeed * 5)
                .call(secondPart);
        })
        .catch(err => {
            console.error("GitHub fetch failed:", err);
            // Fallback auf zufällig
            winnerIndex = Math.floor(Math.random() * numbersArr.length);
            var realStep = winnerIndex * stepInAngle;

            createjs.Sound.play("balldrop", {interrupt: createjs.Sound.INTERRUPT_ANY, loop: 0});
            createjs.Tween.get({}).wait(700).call(function() {
                createjs.Sound.play("rotate", {interrupt: createjs.Sound.INTERRUPT_ANY, loop: 1});
            });

            exportRoot.ball.regX = 0;
            exportRoot.ball.regY = 147;
            exportRoot.wheel.ball.regX = 0;
            exportRoot.wheel.ball.regY = 90;

            exportRoot.wheel.ball.rotation = realStep;
            exportRoot.wheel.ball.visible = false;
            exportRoot.ball.rotation = Math.floor(Math.random() * 360);
            exportRoot.ball.visible = true;

            exportRoot.wheel.rotation = 0;
            createjs.Tween.get(exportRoot.ball)
                .to({rotation: 360 * 3 + realStep - 45}, averageSpeed * 4, createjs.Ease.getBackInOut(0.1))
                .call(firstPart);
            createjs.Tween.get(exportRoot.wheel)
                .to({rotation: -360 * 4}, averageSpeed * 5)
                .call(secondPart);
        });
}

}
