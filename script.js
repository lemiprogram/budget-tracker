
//variables
  //header heading
  const logo = document.querySelector("header .heading")
  // nav items
  const navItems = document.querySelectorAll(".nav-item");
  const [homeNav, tableNav, spreadSheetNav, filterNav]  = navItems
  // sections
  const sections = document.querySelectorAll(".section")
  const [homeSection,tableSection,spreadSheetSection,filterSection] = sections
  //btns
  const addTransactionBtn = document.querySelector("#add-transaction")
  //table
  const transactionTable = document.querySelector(".section-table table tBody")
  //arrays
  let transactions = [];

//functions

//renderPage = renders the page to the original set state
function renderPage(){
  // changeFocusNav(homeNav)
  transactionTable.innerHTML = transactions.map(transaction => `
    <tr>
                            <td>${transaction.date.toDateString().slice(4)}</td>
                            <td>${transaction.title}</td>
                            <td>${transaction.type === "expense"? transaction.amount:"-"}</td>
                            <td>${transaction.type === "income"? transaction.amount:"-"}</td>
                        </tr>
    `
  ).join("")

  
}
// changeFocusNav = adds the focus-nav class to the nav-link selected
  function changeFocusNav (e) {
    for(let nav of e.parentNode.querySelectorAll("li")){
      if(nav  === e){
        nav.classList.add("focus-nav")
        continue
      }
      nav.classList.remove("focus-nav")
    }
    changeSection(e.id)
  }
  // changeSection = add the hidden class to the nav-links not selected
  function changeSection(id){
    e = document.querySelector(`#section-${id}`)
    for(let section of e.parentNode.querySelectorAll(".section")){
      if(section === e){
        section.classList.remove("hidden")
        continue;
      }
      section.classList.add("hidden")
    }
    
  }
  //addTransaction = adds a transaction to the trasactions array
  function addTransaction(){
    const[title,amount] = document.querySelectorAll(".inp input")
    const type = document.querySelector(".inp select")
    transactions.push({
      date:new Date(),
      title:title.value,
      amount:Number(amount.value),
      type:type.value,
    });
    console.log(transactions)
    renderPage();
  } 
//add event listeners 
  //when a nav item is clicked it would evoke the changeFocusNav function on the item clicked
  navItems.forEach(item=>item.addEventListener("click",e=>changeFocusNav(e.target)))
  // when the logo is clicked it would evoke the changeFocusNav function on the homeNav
  logo.addEventListener("click",()=>changeFocusNav(homeNav))
  //when the add button is clicked it would add a transaction to the treansactions array 
  addTransactionBtn.addEventListener("click", addTransaction)
renderPage()