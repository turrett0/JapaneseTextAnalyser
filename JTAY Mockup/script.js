// import data from './warodaiDB.js';

// function auto_grow(element, parentElement) {
//     element.addEventListener('input', ()=>{
//         console.log('change')
//         parentElement.style.height = (element.scrollHeight)+"px";
//     })
//     // element.style.height = "5px";
//     console.log(element)
// }

// auto_grow(document.querySelector('#text'), document.querySelector('.main-inner'))



// console.log(data.filter(dataItem =>{
//     return dataItem[0] == 'ヤング・タウン'
// })
// )

function hui(){
    console.log('opn')
    const rows = [
        ["name1", "city1", "some other info"],
        ["name2", "city2", "more info"]
    ];
    
    let csvContent = "data:text/csv;charset=utf-8," 
        + rows.map(e => e.join(",")).join("\n");
    
        var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
    console.log(encodedUri)

}

document.addEventListener('click', hui)