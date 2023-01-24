const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
const saveTab = document.getElementById("save-tab")
let myInput = []
let getInputFromLocalStorage = JSON.parse( localStorage.getItem("myInput") )

if (getInputFromLocalStorage){
    myInput = getInputFromLocalStorage
    render(myInput)
}

saveTab.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myInput.push(tabs[0].url)
        localStorage.setItem("myInput", JSON.stringify(myInput) )
        render(myInput)
    })
})

inputBtn.addEventListener("click", function(){
    myInput.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myInput", JSON.stringify(myInput) )
    render(myInput) 
})

function render(firstInput) {
let listItems = ""
for (let i = 0; i < firstInput.length; i++) {
    listItems += `
                <li>
                    <a target='_blank' href='${firstInput[i]}'>
                    ${firstInput[i]}
                    </a> 
                </li>
    `
}
ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.removeItem("myInput")
    myInput = []
    render(myInput)
})