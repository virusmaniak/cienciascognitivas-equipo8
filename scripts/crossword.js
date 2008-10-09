//========================================================================
//   "WebCrossword"  JavaScript Crossword 
//
//   Copyright (C) 2000,2003  Jan Mulder
//
//   This program is free software; you can redistribute it and/or modify
//   it under the terms of the GNU General Public License as published by
//   the Free Software Foundation; either version 2 of the License, or
//   (at your option) any later version, and as long as this notice is
//   kept unmodified at the top of the script source code.
//
//   This program is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   GNU General Public License (license.txt) for more details.
//
//   Contact: http://janmulder.com/contact/
//  
//   Last updated: 4th March 2003
//=======================================================================

doneLoading = false;
imageCount = 0;
var progressBar = '||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||';

// check for NS version 4 or less
var isNS4 = false;

if ( (navigator.appName == "Netscape") && ( (navigator.userAgent).indexOf("Gecko") == -1)  )
isNS4 = true;  


function doFunction(aFunction)
{
    if (aFunction.indexOf('(') > -1)
    eval( aFunction );
    else
    eval(aFunction+'()');
}

tempArray = new Array();

function updateProgress(ims)
{
    var cnt=0;

    for(var i = 0; i < ims.length; i++)
    if(ims[i].complete || ims[i].errored) cnt++;

    if(ims.length > 0)
    window.status='Cargando crucigrama  ['+Math.round((cnt / imageCount)*100)+'%] ' + progressBar.substring(0, cnt);

    if(cnt < ims.length)
    {
        tempArray = ims;
        setTimeout("updateProgress(tempArray)",200);
    }
    else
    onComplete();
}

function onComplete()
{
    window.status='Done';
    doneLoading = true;
}

function preloadImages()
{
    this.length = preloadImages.arguments.length;
    imageCount = this.length;
    for (var i = 0; i < this.length; i++)
    {
        this[i] = new Image();
        this[i].errored=false;
        this[i].onerror=new Function("this["+i+"].errored=true");
        //alert(preloadImages.arguments[i]);
        this[i].src = preloadImages.arguments[i];
    }
    updateProgress(this);
}

var pictures = new preloadImages(
    sourceDir+"black.gif", sourceDir+"white.gif",
    sourceDir+"1.gif", sourceDir+"2.gif", sourceDir+"3.gif", sourceDir+"4.gif", sourceDir+"5.gif", sourceDir+"6.gif",
    sourceDir+"7.gif", sourceDir+"8.gif", sourceDir+"9.gif", sourceDir+"10.gif", sourceDir+"11.gif", sourceDir+"12.gif",
    sourceDir+"13.gif", sourceDir+"14.gif", sourceDir+"15.gif", sourceDir+"16.gif", sourceDir+"17.gif", sourceDir+"18.gif",
    sourceDir+"19.gif", sourceDir+"20.gif", sourceDir+"21.gif", sourceDir+"22.gif", sourceDir+"23.gif", sourceDir+"24.gif",
    sourceDir+"25.gif",
    sourceDir+"a.gif", sourceDir+"b.gif", sourceDir+"c.gif", sourceDir+"d.gif", sourceDir+"e.gif", sourceDir+"f.gif",
    sourceDir+"g.gif", sourceDir+"h.gif", sourceDir+"i.gif", sourceDir+"j.gif", sourceDir+"k.gif", sourceDir+"l.gif",
    sourceDir+"m.gif", sourceDir+"n.gif", sourceDir+"o.gif", sourceDir+"p.gif", sourceDir+"q.gif", sourceDir+"r.gif",
    sourceDir+"s.gif", sourceDir+"t.gif", sourceDir+"u.gif", sourceDir+"v.gif", sourceDir+"w.gif", sourceDir+"x.gif",
    sourceDir+"y.gif", sourceDir+"z.gif"
);

function makePair(string, val)
{
    this.str = string;
    this.pos = val;
}

function fillArray(len, val)
{
    for (var i = 0; i < len; i++)
    this[i] = val;
}

function getPuzzleData(offset)
{
    for (var i = offset; i < (numAcross+numDown)*3; i = i+3)
    {
        if (i == offset)
        this[i-offset] = puzzleData[i];
        else
        this[(i-offset)/3] = puzzleData[i];
    }
}

var clueDirection = 0;
var numDone = 0;
var originalSources = new Array();
var letterSources = new Array();
var locationData = new Array();
var solvedItems = new Array();
var solvedData;
var types;
var clues;
var words;

function loadSources()
{
    for (i = 0; i < puzzleLayout.length; i++)
    {
        letter = puzzleLayout[i];
        if (letter.length > 1)
        {
            blockNumber = parseInt(letter);
            letter = letter.substring(('' + blockNumber).length, letter.length);
            direction = letter.charAt(0).toLowerCase();
            letter = letter.charAt(1).toLowerCase();
            originalSources[i] = sourceDir + blockNumber + '.gif';
            letterSources[i] = sourceDir  + letter + '.gif';
            if (blockNumber <= 0)
            {
                alert('debug:loadSources() - Error reading in letter #' + i);
            }
            else
            {
                if ((direction == 'd') || (direction == 'b'))
                locationData[locationData.length] = new makePair(blockNumber + 'D', i);
                if ((direction == 'a') || (direction == 'b'))
                locationData[locationData.length] = new makePair(blockNumber + 'A', i);
            }
        }
        else
        {
            if (letter == '-')
            {
                originalSources[i] = sourceDir + 'black.gif';
                letterSources[i] = sourceDir + 'black.gif';
            }
            else
            {
                originalSources[i] = sourceDir + 'white.gif';
                letterSources[i] = sourceDir + letter + '.gif';
            }
        }
    }
}

function loadBackground()
{
    for (i=0; i<height*width; i++)
    eval("document.box"+i+".src = '"+originalSources[i]+"';");
}

function loadForeground()
{
    for (i=0; i<height*width; i++)
    if (solvedData[i])
    {
        eval("document.box"+i+".src = '"+letterSources[i]+"';");
    }
}

function findIndex(clueTyp)
{
    for (i = 0; i < (numAcross+numDown); i++)
    if (locationData[i].str == clueTyp)
    return locationData[i].pos;
    alert('debug:findIndex(): string not found');
    return -1;
}

function checkSolved(iSolved)
{
    found = false;
    for (var i=0; i < solvedItems.length; i++)
    if (solvedItems[i] == iSolved)
    found = true;

    return found;
}

function checkGuess(userGuess, clueNum)
{
    if (userGuess == null)
    return false;
    wordLength = words[clueNum].length;
    correctWord = words[clueNum];

    if (userGuess.toLowerCase() == correctWord.toLowerCase())
    {
        var clueType = types[clueNum];
        clueIndex = findIndex(clueType);
        skip = 1;
        if (clueDirection != 0)
        skip = width;
        for (i = 0; i < wordLength; i++)
        {
            solvedData[clueIndex] = true;
            clueIndex += skip;
        }

        if (!checkSolved(clueNum))
        {
            solvedItems[solvedItems.length] = clueNum;
            numDone++;
        }

        loadForeground();
    }
    else
    {
        if ((userGuess != '') && (userGuess != null))
        {
            alert(wrongMessage);
        }
    }
    return (numDone == numAcross + numDown);
}

function redrawCrossword()
{
    loadBackground();
    loadForeground();
}

function clueClick(index)
{
    if (!doneLoading)
    {
        alert('El crucigrama se está cargando, favor de esperar.');
        return;
    }
    allDone = false;
    clueNum = index;

    dirn = 0;
    if (index>=numAcross) dirn = 1;
    clueDirection = dirn;

    if (types[clueNum].charAt(types[clueNum].length-1) == 'A')
    cluePrompt = parseInt(types[clueNum]) + ' Horizontal : ' + clues[clueNum];
    else
    cluePrompt = parseInt(types[clueNum]) + ' Vertical : ' + clues[clueNum];

    allDone = checkGuess(window.prompt(cluePrompt, ''), clueNum);

    if (allDone)
    if ((doneAction != null) && (doneAction != ''))
    doFunction(doneAction);
}

function mouseOver()
{
    window.status='Dale click a las pistas para contestar'; return true;
}

function mouseOut()
{
    window.status=' '; return true;
}

function drawCrossword()
{
    window.defaultStatus = "";
    stringC = '<table border="1" cellspacing=0 cellpadding=0 bgcolor="white" id="tableC" border=3>';
    for (i = 0; i < height; i++)
    {
        stringC += '<tr>';
        for (j = 0; j < width; j++){
            stringC += '<td background="'+originalSources[i*width+j]+'"><img src="'+originalSources[i*width+j]+'" width=21 height=21 name="box'+(i*width+j)+'"><br></td>';
        }
        stringC += '</tr>';
    }
    stringC += '</table>';
    $("#crucigrama").append(stringC);
}

function drawAcross()
{
    $("#crucigrama").append('<span class="heading">Horizontales:</span> <br>');

    for (i = 0; i < numAcross-1; i++)
    {
        $("#crucigrama").append('<a class="clues" href="javascript:void(clueClick('+i+'))" onMouseOver="mouseOver();" onMouseOut="mouseOut();">');
        $("#crucigrama").append(types[i].substring(0, types[i].length-1)+'. '+clues[i]+'</a>');
        if (!isNS4)
        $("#crucigrama").append('<BR>');
    }
    $("#crucigrama").append('<a class="clues" href="javascript:void(clueClick('+i+'))" onMouseOver="mouseOver();" onMouseOut="mouseOut();">');
    $("#crucigrama").append(types[i].substring(0, types[i].length-1)+'. '+clues[i]+'</a>');
    if (!isNS4)
    $("#crucigrama").append('<BR>');
}

function drawDown()
{
    $("#crucigrama").append('<span class="heading">Verticales:</span> <BR>');

    for (i = numAcross; i < ((numAcross+numDown)-1); i++)
    {
        $("#crucigrama").append('<a class="clues" href="javascript:void(clueClick('+i+'))" onMouseOver="mouseOver();" onMouseOut="mouseOut();">');
        $("#crucigrama").append(types[i].substring(0, types[i].length-1)+'. '+clues[i]+'</A>');
        if (!isNS4)
        $("#crucigrama").append('<BR>');
    }
    $("#crucigrama").append('<a class="clues" href="javascript:void(clueClick('+i+'))" onMouseOver="mouseOver();" onMouseOut="mouseOut();">');
    $("#crucigrama").append(types[i].substring(0, types[i].length-1)+'. '+clues[i]+'</A>');
    $("#crucigrama").append(' <BR>');
}