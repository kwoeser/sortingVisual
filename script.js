const n=40;
const array=[];

let audioCtx=null;


// Automaticlly adds bars to page and creates random array n
init();

// Initialize button
function init(){
    // Create random array of size 10
    for(let i=0;i<n;i++){
        array[i]=Math.random();
    }
    showBars();
}

// SPAM THE PLAY BUTTON TO GET HORROR GAME SOUND
// Play button
function play(){
    const swaps=bubbleSort([...array]);
    // const swaps=mergeSort([...array]);
    animate(swaps);
}


// Uncomment what sorting algorithm you want to see visualized.
// Change the const swaps variable in the play button to another sorting algo
// Add more sorting algos
// Bubble sort O(n^2)
function bubbleSort(array){
    const swaps=[];
    do{
        var swapped=false;
        for(let i=1;i<array.length;i++){
            if(array[i-1]>array[i]){
                swaps.push([i-1,i]);
                swapped=true;
                [array[i-1],array[i]]=[array[i],array[i-1]];
            }
        }
    }while(swapped);
    return swaps;
}



// Animate the bars 
function animate(swaps){
    if(swaps.length==0){
        showBars();
        return;
    }
    const [i,j]=swaps.shift(0);
    [array[i],array[j]]=[array[j],array[i]];
    showBars([i,j]);
    playNote(200+array[i]*500);
    playNote(200+array[j]*500);

    setTimeout(function(){
        animate(swaps);
    },30);
}





// Create and show bars to be sorted
function showBars(indices){
    container.innerHTML="";
    for(let i=0;i<array.length;i++){
        const bar=document.createElement("div");
        bar.style.height=array[i]*100+"%";
        bar.classList.add("bar");
        if(indices && indices.includes(i)){
            bar.style.backgroundColor="red";
        }
        container.appendChild(bar);
    }   
}


// Handling audio 
function playNote(freq){
    if(audioCtx==null){
        audioCtx=new(
            AudioContext || 
            webkitAudioContext || 
            window.webkitAudioContext
        )();
    }
    const dur=0.1;
    const osc=audioCtx.createOscillator();
    osc.frequency.value=freq;
    osc.start();
    osc.stop(audioCtx.currentTime+dur);
    const node=audioCtx.createGain();
    node.gain.value=0.1;
    node.gain.linearRampToValueAtTime(
        0, audioCtx.currentTime+dur
    );
    osc.connect(node);
    node.connect(audioCtx.destination);
}